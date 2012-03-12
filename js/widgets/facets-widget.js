/**
 Ramp Facets Widget - A widget to display search facets on a search results page

 Copyright (c) 2011 RAMP Holdings, Inc.

 Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 Created: 2011 by Gal Zhovnriovsky <galzhov@gmail.com>

 Dependencies: jQuery 1.7.1 

 */
/**
 * @fileOverview A Facets Widget that displays search facets on a search results page using the RAMP Content APIs
 * @author Gal Zhovnriovsky <galzhov@gmail.com>
 * @version 1.0
 */
(function () {
	var defaults = {
		"api" : {
			"urls": {
				"baseUrl" : "http://api.ramp.com"
			},
			"key": "0302cd28e05e0800f752e0db235d5440",
			"version": "v1",
			"methods" : {
				"facets" : {
					"serviceName" : "facets"
				}
			}
		}
	};

	// constructor
	var FacetsWidget = function(args) {
		this.defaults = defaults;
		if (args) {
			this.defaults = jQuery.extend(true, {}, defaults, args);
		}
		
		this.apiMethodFacetsBaseUrl  = 	this.defaults.api.urls.baseUrl + "/" + 
										this.defaults.api.version + "/" + 
										this.defaults.api.methods.facets.serviceName + 
										"?apikey=" + this.defaults.api.key;
	};
	
	// Static methods
	//
	
	// Class definition
	FacetsWidget.prototype = {
		displayFull : function(hostDivId, loadingHostDivId, facets) {
			var x;
			for (x in facets) {
				// use function call to add scope
				//
				this._ajaxFacets(facets[x], hostDivId, loadingHostDivId);
			}
		},
		
		// ONLY CALL THIS FROM AN AJAX CALL
		//
		_ajaxFacets : function(facet, hostDivId, loadingHostDivId) {
			var facetName = facet.name;
			hostDivId = RampStringUtil.beginsWith("#", hostDivId) ? hostDivId : "#" + hostDivId;
			loadingHostDivId = RampStringUtil.beginsWith("#", loadingHostDivId) ? loadingHostDivId : "#" + loadingHostDivId;
			
			var displayName = facet.displayName;
			var facetHostDivId = facet.hostDivId;
			var numFacetItems = facet.numFacetItems;
			facetHostDivId = RampStringUtil.beginsWith("#", facetHostDivId) ? facetHostDivId : "#" + facetHostDivId;
			var url = this.apiMethodFacetsBaseUrl + "&" + RampUrlUtil.getQueryString() + "&name=" + facetName + "&number=" + numFacetItems;
			
			// Call the Facets API
			jQuery.ajax({
				url: url,
				context: this,
				dataType: "xml",
				beforeSend: function(xhr) {
					jQuery(loadingHostDivId).show();
				},
				success: function(xml) {
					var facetsList = this.getFacetsList(xml, displayName);
					var facetContainerDiv = jQuery ( facetHostDivId );
					if (undefined != facetsList && "" != facetsList)
					{
						facetContainerDiv.html(facetContainerDiv.html() + facetsList);
					}
					facetContainerDiv.show();
				},
				error: function (xhr) {
					var containerDiv = jQuery ( hostDivId );
					var facetContainerDiv = jQuery ( facetHostDivId );
					if (undefined == facetContainerDiv.html() || "" == facetContainerDiv.html()) {
						containerDiv.hide();
					}
				},
				complete: function(xhr) {
					jQuery(loadingHostDivId).hide();
				},
			});			
		},
		
		getFacetsList : function(xml, displayName) {
			var $xml = jQuery( xml );

			var facetXml = $xml.find("Facet");
			var elementsXml = facetXml.find("Element");
			var facetName = facetXml.find("Name").text();
			
			var facetValueParamLabel = "facetValue" + facetName;
			var facetNameParamLabel = "facetName" + facetName;
			
			// workaround for known issue
			//
			var facetValueParam = (unescape(unescape(unescape(RampUrlUtil.getUrlVar(facetValueParamLabel)))));
			if (RampStringUtil.endsWith("navigator", facetName)) {
				facetName = facetName.substr(0, facetName.length - "navigator".length);
			}
		
			var allFacetsItem = "<li class='facet-item clear-item selected'><span>All " + displayName + "</span></li>";
			
			var clearItem = "";
			var facetsList = "";
			elementsXml.each( function () {
				var itemCount = jQuery(this).find("ItemCount").text();
				var path = jQuery(this).find("Path").text();
				var selectedCss = facetValueParam == path ? " selected " : "";
				if (facetValueParam != path)
				{
					// workaround for known issue
					//
					var escapedFacetValue = (escape(escape(path)));
					
					var url = RampUrlUtil.replaceQueryVar(facetValueParamLabel, escapedFacetValue);
					url = RampUrlUtil.replaceQueryVar(facetNameParamLabel, facetName, url);
					url = RampUrlUtil.replaceQueryVar("start", "", url);
					
					facetsList += "\
						<li class='facet-item " + selectedCss + "'> \
							<a href='" + url + "'>" + path + " <span class='facet-number'>(" + itemCount + ")<span></a> \
						</li> \
					";
				}
				else 
				{				
					facetsList += "<li class='facet-item " + selectedCss + "'><span>" + path + "</span></li>";
					
					var url = RampUrlUtil.replaceQueryVar(facetValueParamLabel, "");
					url = RampUrlUtil.replaceQueryVar(facetNameParamLabel, "", url);
					url = RampUrlUtil.replaceQueryVar("start", "", url);
					allFacetsItem = "<li class='facet-item clear-item'><a href='" + url + "'>All " + displayName + "</a></li>";
				}
				
			});
			
			if ("" != facetsList)
			{
				facetsList = "<ul class='facets-list'>" + allFacetsItem + facetsList + "</ul>";
			}
			return facetsList;
		}
		
	};
	
	if (!window.RampWidgets) 
		window.RampWidgets = {};
		
	window.RampWidgets.FacetsWidget = FacetsWidget;
})();