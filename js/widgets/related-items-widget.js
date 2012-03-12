/**
 Related Items Widget - A widget to display items related to the current item

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
 * @fileOverview A Related Items widget that displays related items via the RAMP Content APIs
 * @author Gal Zhovnriovsky <galzhov@gmail.com>
 * @version 1.0
 */
(function () {
	// private variables
	var defaults = {
		"api" : {
			"urls": {
				"baseUrl" : "http://api.ramp.com"
			},
			"key": "0302cd28e05e0800f752e0db235d5440",
			"version": "v1",
			"methods" : {
				"relatedto" : {
					"serviceName" : "relatedto"
				}
			}
		}
	};
	
	// constructor
	var RelatedItemsWidget = function(args) {
		this.initApiVars(args);
	};
	
	RelatedItemsWidget.prototype = {
		initApiVars : function (args) {
			this.defaults = defaults;
			if (args) {
				this.defaults = jQuery.extend(true, {}, defaults, args);
			}
			
			this.apiMethodRelatedToBaseUrl  = 	this.defaults.api.urls.baseUrl + "/" + 
												this.defaults.api.version + "/" + 
												this.defaults.api.methods.relatedto.serviceName + 
												"?apikey=" + this.defaults.api.key;
		},
		
		displayFull : function (itemid, title, max, hostDivId) {
			hostDivId = RampStringUtil.beginsWith("#", hostDivId) ? hostDivId : "#" + hostDivId;
			// Call the RelatedTo API
			jQuery.ajax({
				url: this.apiMethodRelatedToBaseUrl + "&itemid=" + itemid,
				context: this,
				dataType: "xml",
				beforeSend: function(xhr) {
					//jQuery(loadingHostDivId).show();
				},
				success: function(xml) {
					var relatedItems = this.getRelatedItems(xml);
					this.displayRelatedItemList(title, relatedItems, max, hostDivId);
				},
				error: function (xhr) {
				},
				complete: function(xhr) {
					//jQuery(loadingHostDivId).hide();
				}
			});	
		},
		
		getRelatedItems : function (xml) {
			var $xml = jQuery (xml);
			var relatedItems = new Array();
			var self = this;
			
			var relatedItemsXml = $xml.find("RelatedItems");
			if (undefined != relatedItemsXml) {
				relatedItemsXml.children ("Item").each( function (idx, xml) {
					relatedItems[idx] = new RampWidgets.RelatedItem(jQuery(this));
				});
			};
			
			return relatedItems;
		},
		
		displayRelatedItemList : function (title, relatedItems, max, hostDivId) {
			hostDivId = RampStringUtil.beginsWith("#", hostDivId) ? hostDivId : "#" + hostDivId;
			
			var numDisplayed = 0;
			var relatedItemHtml = ""; 
			var x;
			if (relatedItems.length > 0) {
				relatedItemHtml = "<div class=\"related-items-list\"><div class=\"title\">" + title + "</div><ul>";
				
				for (x = 0; x < relatedItems.length && numDisplayed < max; x++) {
					if (undefined != relatedItems[x].getThumbnail()) {
						relatedItemHtml += " \
							<li> \
								<a href='" + relatedItems[x].getLink() + "'> \
									<div cla	ss='overlay'></div> \
									<img class='thumb' src='" + relatedItems[x].getThumbnail() + "' /> \
								</a> \
								<a href='" + relatedItems[x].getLink() + "'> \
									<div class='title'>" + relatedItems[x].getTitle() + "</div> \
								</a> \
								<div class='pubDate'>" + relatedItems[x].getPubDate() + "</div> \
						";
						numDisplayed++;
					}
				}
				
				relatedItemHtml += "</ul></div>";
			}
			
			if (numDisplayed > 0) {
				jQuery(hostDivId).html( jQuery(hostDivId).html() + relatedItemHtml);
			}
		}
	};

	if (!window.RampWidgets) 
		window.RampWidgets = {};
		
	window.RampWidgets.RelatedItemsWidget = RelatedItemsWidget;
})();


(function() {
	var videoPagePath = "video.php";
	
	var RelatedItem = function (relatedItemXml, config) {
		if (undefined != config) {
			videoPagePath = config.pages.video.path ? config.pages.video.path : videoPagePath;
		}
		this.xml = relatedItemXml;
	}
	
	RelatedItem.prototype = {
		getMediaType : function () {
			return jQuery(this.xml).children("MediaType").text();
		},
		
		getTitle : function () {
			return jQuery(this.xml).children("Title").text();
		},
		
		getId : function () {
			return jQuery(this.xml).children("Id").text();
		},
		
		getDescription : function () {
			return jQuery(this.xml).children("Description").text();
		},
		
		getLink: function () {
			return videoPagePath + "?e=" + this.getId();
		},
		
		getPubDate : function (format) {
			var pubDate;
			var dates = jQuery(this.xml).children("Dates");	
			if (undefined != dates) {
				dates.children("Date").each ( function () {
				
					var type = jQuery(this).children("Type").text();
					if ( "PubDate" == type ) {
						if ("w3c" == format) {
							pubDate = jQuery(this).children("Value[format=\"w3c\"]").text();
						}
						else {
							pubDate = jQuery(this).children("Value[format=\"short\"]").text();
						}
					}
				});
			}
			return pubDate;
		},
		
		getThumbnail : function () {
			var thumbnail;
			var images = jQuery(this.xml).children("Images");
			if (undefined != images) {
				images.find("Image").each( function() {
					var type = jQuery(this).children( "Type" ).text();
					if ("thumbnail" == type) {
						var urls = thumbnail = jQuery(this).find("Urls");
						if (undefined != urls) {
							thumbnail = urls.children("Url[type=\"media\"]").text();
						}
					}
				});
			}
			return thumbnail;
		}
	};
	
	if (!window.RampWidgets)
		window.RampWidgets = {};
	
	window.RampWidgets.RelatedItem = RelatedItem;
})();