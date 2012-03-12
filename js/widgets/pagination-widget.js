/**
 Pagination Widget - A widget to add pagination controls to a search results page

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
 * @fileOverview A Pagination Widget that uses the RAMP APIs
 * @author Gal Zhovnriovsky <galzhov@gmail.com>
 * @version 1.0
 */
(function() {
	var PaginationWidget = function() {};
	
	PaginationWidget.prototype = {
		getWidget : function(resultSet, resultsHostId) {
			this.displayFull( resultSet, resultsHostId );
		},
		
		displayFull : function(xml, containerDivId) {
			$xml = jQuery(xml);
			var searchParams = $xml.find("SearchParams");
			
			var hasNext = $xml.attr("has-next");
			var hasPrevious = $xml.attr("has-previous");
			var totalResults = $xml.attr("total-results");
			var numPerPage = parseInt(searchParams.attr("number"));
			var start = parseInt(searchParams.attr("start"));
			
			var indexBuffer = 2;
			var numPages = Math.ceil( totalResults / numPerPage );
			var activePage = Math.floor( start / numPerPage ) + 1;
			var startPage = parseInt((activePage - indexBuffer));
			var endPage = parseInt((activePage + indexBuffer));
			
			containerDivId = RampStringUtil.beginsWith("#", containerDivId) ? containerDivId : "#" + containerDivId;
			
			startPageOverflow = 0;
			endPageOverflow = 0;
			if (startPage < 1)
			{
				startPageOverflow = Math.abs(startPage) + 1;
				startPage = 1;
			}
			
			if (endPage > numPages)
			{
				endPageOverflow = endPage - numPages;
				endPage = numPages;
			}
			
			startPage -= endPageOverflow;
			endPage += startPageOverflow;
			
			if (startPage < 1)
			{
				startPage = 1;
			}
			
			if (endPage > numPages)
			{
				endPage = numPages;
			}
			
			
			var nextButtonHtml = "true" == hasNext
				?
					" \
						<div class='next-button active'> \
							<a href='" + RampUrlUtil.replaceQueryVar("start", start + numPerPage) + "'>&nbsp;>&nbsp;</a> \
						</div> \
					"
				:
					" \
						<div class='next-button active'> \
							<span>&nbsp;>&nbsp;</span> \
						</div> \
					"
				;

			var previousButtonHtml = "true" == hasPrevious
				?
					" \
						<div class='previous-button active'> \
							<a href='" + RampUrlUtil.replaceQueryVar("start", start - numPerPage) + "'>&nbsp;<&nbsp;</a> \
						</div> \
					"
				:
					" \
						<div class='previous-button active'> \
							<span>&nbsp;<&nbsp;</span> \
						</div> \
					"
				;
				
			var previousElipses = startPage > indexBuffer - 1 
				?
					" <div class='previous-elipses'>...</div>"
				:
					""
				;
			
			var nextElipses = endPage < (numPages - indexBuffer + 1)
				?
					" <div class='next-elipses'>...</div>"
				:
					""
				;
				
			if (1 < numPages)
			{

				var containerDiv = jQuery ( containerDivId );
				var pagination = "<div class='ramp-pagination'> " + previousButtonHtml + previousElipses;
				for (x = startPage; x <= endPage; x++)
				{
					if (activePage == x)
					{
						pagination += " <div class='page active'><span>" + x + "</span></div> ";
					}
					else
					{
						pagination += " <div class='page'><a href='" + RampUrlUtil.replaceQueryVar("start", (x-1) * numPerPage) + "'>" + x + "</a></span></div> ";
					}
				}	
				pagination += nextElipses + nextButtonHtml + "<div class='ramp-clear-div'></div></div>";
				containerDiv.html(containerDiv.html() + pagination);
			}
		}
	}
	
	if (!window.RampWidgets)
		window.RampWidgets = {};
		
	window.RampWidgets.PaginationWidget = new PaginationWidget();
})();