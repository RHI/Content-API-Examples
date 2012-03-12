/**
 Ramp Search Form Widget - A widget to display a search form that points to a site's search results page

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
 * @fileOverview A Search Form Widget that points to a sites search results page
 * @author Gal Zhovnriovsky <galzhov@gmail.com>
 * @version 1.0
 */
(function() {
	// private static variables
	var defaults = {
		"widgets": {
			"searchForm": {
				"queryVar" : "q"
			}
		}
	};

	var SearchFormWidget = function(args) {
		this.defaults = defaults;
		if (args) {
			this.defaults = jQuery.extend(true, {}, defaults, args);
		}
	};
	
	SearchFormWidget.prototype = {
		getSearchForm : function(hostDivId, searchPage) {
			this.displayFull(searchPage, formHostId);
		},
		
		displayFull : function(containerDivId, searchPage) {
			containerDivId = RampStringUtil.beginsWith("#", containerDivId) ? containerDivId : "#" + containerDivId;
			var query = unescape(RampUrlUtil.getUrlVar(this.defaults.widgets.searchForm.queryVar).replace("+", " "));
			var html = " \
				<form id='ramp-search-form' action='" + searchPage + "' method='GET'>\
					<input class='search-query-input' type='text' name='q' value='" + query + "'></input> \
					<input type='button' value='Search' onclick='jQuery(\"#ramp-search-form\").submit(); '></input> \
				</form>\
			";
			var containerDiv = jQuery ( containerDivId );
			containerDiv.html(containerDiv.html() + html);
		}
	}
	
	if (!window.RampWidgets)
		window.RampWidgets = {};
		
	window.RampWidgets.SearchFormWidget = SearchFormWidget;
})();