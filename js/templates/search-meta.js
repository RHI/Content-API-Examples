/*********************************************/
/**********    RampSearchMeta   **************/
/*********************************************/
(function() {
	var RampSearchMeta = function () {};
	
	RampSearchMeta.prototype = {
		displayFull : function(xml, containerDivId) {
			$xml = jQuery(xml);
			var searchParams = $xml.find("SearchParams");
			var searchTerms = searchParams.find("SearchTerms").find("Term");
			
			var totalResults = $xml.attr("total-results");
			var resultCount = $xml.attr("results-returned");
			
			var sort = searchParams.attr("sort");
			var start = parseInt(searchParams.attr("start")) + 1;
			
			var queryTerm = "";
			searchTerms.each( function () {
				if (undefined != queryTerm && queryTerm.length > 0) {
					queryTerm += " ";
				}
				queryTerm += jQuery(this).text();
			});	
			
			containerDivId = RampStringUtil.beginsWith("#", containerDivId) ? containerDivId : "#" + containerDivId;
			var containerDiv = jQuery ( containerDivId );
			var queryTermHtml = "";
			if (resultCount > 0) {
				var sortOrderHtml = "news" == sort
					? 
						" \
							<span class='sort-type'><a href='" + RampUrlUtil.replaceQueryVar("sort", "date") + "'>Date</a></span> \
							&nbsp;|&nbsp; \
							<span class='sort-type selected'>Relevance</span>\
						"
					: 
						" \
							<span class='sort-type selected'>Date</span> \
							&nbsp;|&nbsp; \
							<span class='sort-type'><a href='" + RampUrlUtil.replaceQueryVar("sort", "news") + "'>Relevance</a></span>\
						"
					;
				
				queryTermHtml = "" == queryTerm ? "" : " <span class='query-term-label'>for </span><span class='query-term'>" + queryTerm + "</span>";
				containerDiv.html(
					containerDiv.html() + 
					" \
						<div class='search-meta'> \
							<div class='search-meta-info'> \
								<span class='label'>Showing results</span> \
								<span class='numbers'>" + start + " - " + (parseInt(resultCount) + start - 1) + " of " + totalResults + "</span>" +
								queryTermHtml + " \
							</div> \
							<div class='search-meta-sort-order'> \
								<span class='label'>Sort by: </span> \
								<span class='order'>" + sortOrderHtml + "</span> \
							</div> \
							<div class='ramp-clear-div'></div> \
						</div> \
					 \
					"
				);
			}
			else {
				queryTermHtml = "" == queryTerm ? "" : " <div class='search-meta not-found'><span class='no-results-found-label'>No Results Found For </span><span class='query-term'>" + queryTerm + "</span></div>";
				containerDiv.html(
					containerDiv.html() + queryTermHtml
				);
			}
			
		}
	}
	
	window.RampSearchMeta = new RampSearchMeta();
})();