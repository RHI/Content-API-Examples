/*********************************************/
/*********    RampSearchResult   ************/
/*********************************************/
(function() {
	// private static variables
	var defaults = {
		"pages" : {
			"video" : {
				"url" : "video.php"
			}
		},
		"widgets" : {
			"snippets" : {
				"maxWords" : 30
			}
		}
	};
	
	var RampSearchResult = function (args) {
		this.defaults = jQuery.extend(true, {}, defaults, args);
	};
	
	RampSearchResult.prototype = {
		getSearchResult : function(xml, showSnippet) {
			var $xml = jQuery ( xml );
			var searchResult = "";

			var episodeMetaData = $xml.find("EpisodeMetaData");
			var snippets = new RampSnippets(xml, this.defaults);
			var title = episodeMetaData.find("Title").text();
			var titleHighlightedWords = episodeMetaData.find("M");
			titleHighlightedWords.each( function() {
				title = title.replace(jQuery(this).text(), "<b>" + jQuery(this).text() + "</b>");
			});
			
			var searchParams = $xml.find("SearchParams");
			var searchTerms = searchParams.find("SearchTerms").find("Term");
			
			var url = episodeMetaData.attr("media-url");
			if (this.defaults.pages.video.url) {
				url = this.defaults.pages.video.url + "?e=" + episodeMetaData.attr("id");
			}

			var numThumbs = snippets.getNumSnippets() > 0 ? snippets.getNumSnippets() : 1;
			var thumbs = RampThumbnail.getThumbnails($xml.find("EpisodeMetaData"), numThumbs);
			var mediaType = episodeMetaData.attr("media-type");
			var pubDate = episodeMetaData.attr("pub-date");
			
			var description = $xml.find("Description").text();
			var descriptionMaxWords = defaults.widgets.snippets.maxWords;
			var descriptionWords = description.split(" ");
			description = descriptionWords.splice(0, descriptionMaxWords).join(" ") + "...";
			
			var thumbOverlayHtml = "";
			if ("audio" == mediaType || "video" == mediaType) {
				thumbOverlayHtml = "<div class='thumb-overlay'><div class='arrow-wrapper'><div class='arrow'></div></div></div>";

				var snippetsHtml = "";
				if (undefined != snippets && showSnippet && snippets.getNumSnippets() > 0) {
					description = snippets.getFirstSnippetHtmlExcerpt();
					snippetsHtml = snippets.getSnippetsHtmlList(url);
				}
			}
			
			
			var thumbHtml = "";
			var x, thumbFile, css;
			for (x = 0; x < snippets.getNumSnippets() || x == 0; x++) {
				thumbFile = thumbs[x];
				timestamp = "";
				css = "ez-primaryThumb";
				if (x > 0) {
					css = "ez-snippetThumb ez-hidden";
					timestamp = (snippets.getSnippets())[x].getStartOffset();
				}
				thumbHtml += "<img ts=\"" + timestamp + "\" src=\"" + thumbFile + "\" onerror=\"\" class=\"" + css + "\"> ";
			}
			
			searchResult = 
				" \
					<div class='search-result ez-itemMod-item'> \
						<div class=\"ez-thumbs\"> \
							<div class='thumb'> \
								" + thumbOverlayHtml + " \
								<a class='thumb-link' href='" + url + "'> \
									" + thumbHtml + "\
								</a> \
							</div> \
						</div> \
						<div class='body'> \
							<div class='title'> \
								<a href='" + url + "'>" + title + "</a> \
							</div> \
							<div class='meta'> \
								<div class='media-type'>" + mediaType + "</div> \
								<div class='separator'>&nbsp;|&nbsp;</div> \
								<div class='pub-date'>" + pubDate + "</div> \
							</div> \
							<div class='description'>" + description + "</div> \
							<div class='snippets'>" + snippetsHtml + "</div> \
						</div> \
						<div class='ramp-clear-div'></div> \
					</div> \
				 \
				";
				
			return searchResult;
		}
	}
	
	window.RampSearchResult = new RampSearchResult();
})();