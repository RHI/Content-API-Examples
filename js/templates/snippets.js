/*********************************************/
/************    RampSnippets   **************/
/*********************************************/

(function() {
	// private static variables
	var snippetWordsArray;
	var firstMatch;
	var startOffset;
	var xml;
	
	var defaults = {
		"pages" : {
			"video" : {
				"url" : "video.php"
			}
		},
		"widgets" : {
			"snippets" : {
				"maxWords" : 30,
				"matchWordPad" : 5
			}
		}
	};
	
	var RampSnippet = function (xml, args) {
		this.init(xml);
		this.defaults = jQuery.extend(true, {}, defaults, args);
	};
	
	RampSnippet.prototype = {
		init : function(xml) {
			this.xml = xml;
			this.snippetWordsArray = this.getSnippetWordsArray();
			this.firstMatch = this.getFirstSnippetMatchIdx();
			this.startOffset = this.getStartOffset();
		},
		
		getStartOffset : function () {
			if (undefined == this.startOffset) {
				this.startOffset = jQuery(this.xml).attr("start-offset");
			}
			return this.startOffset;
		},
		
		getSnippetWordsArray : function () {
			if (undefined == this.snippetWordsArray) {
				var snippetWords = new Array();
				var idx = 0;
				
				jQuery(this.xml).find("T").each( function () {
					var matchFound = false;
					jQuery(this).find("M").each( function() {
						snippetWords[idx++] = "<b>" + jQuery(this).text() + "</b>";
						matchFound = true;
					});
					if (!matchFound && undefined != jQuery(this).text())
					{
						snippetWords[idx++] = jQuery(this).text();
					}
				});
				this.snippetWordsArray = snippetWords;
			}
			
			return this.snippetWordsArray;
		},
		
		getFirstSnippetMatchIdx : function () {
			var length = this.getSnippetWordsArray().length;
			var idx = 0;
			var x;
			for (x = 0; x < length; x++) {
				if (RampStringUtil.beginsWith("<b>", this.snippetWordsArray[x])) {
					idx = x;
					break;
				}
			}
			return idx;
		},
		
		getHtmlExcerpt: function() {
			var matchWordPad = this.defaults.widgets.snippets.matchWordPad;
			var maxWordLength = this.defaults.widgets.snippets.maxWords;
			var firstIdx = this.firstMatch;
			var startElipses = "";
			var endElipses = "";
			var startIdx = 0;
			var length = this.snippetWordsArray.length;
			if (firstIdx > matchWordPad) 
			{
				startIdx = firstIdx - matchWordPad;
				startElipses = "...";
			}
			
			if (length - startIdx > maxWordLength) 
			{
				length = maxWordLength;
				endElipses = "...";
			}
			
			
			var tmpSnippetWordsArray = this.snippetWordsArray.slice(0);
			return startElipses + tmpSnippetWordsArray.splice(startIdx, length).join(" ") + endElipses;
		}
	};
	
	window.RampSnippet = RampSnippet;
})();

(function() {
	var xml;
	var snippets;

	var RampSnippets = function(xml) {
		this.xml = xml;
		var idx = 0;
		var self = this;
		this.snippets = new Array();
		jQuery(xml).find("Snippet").each ( function () {
			self.snippets[idx++] = new RampSnippet(jQuery(this));
		});
	};
	
	RampSnippets.prototype = {
		getSnippetsHtmlList : function (url) {
			var snippets = this.getSnippets();
			var queryTerm = RampUrlUtil.getUrlVar("q");
			var landerUrl = "video.php?e=";
			
			var listHtml = "<div class=\"ez-snippets\">";
			var timestampsHtml =	" \
				<p class=\"ez-timestamps\"> \
					<b class=\"ez-timestampTerm\">" + queryTerm + "</b> \
					<span> found at </span> \
			";
			var highlightsHtml = " \
				<div class=\"ez-highlights\"> \
								<div class=\"ez-box-top\"> \
									<div> \
										<div> \
										</div> \
									</div> \
								</div> \
			";
			
			var length = snippets.length;
			if (length > 0 ) {
				var x;
				var snippet, startOffsetSeconds, startOffsetClock, seekUrl;
				for (x = 0; x < length; x++) {
					snippet = snippets[x];
					startOffsetSeconds = snippet.getStartOffset() ;
					startOffsetClock = RampTimeUtil.secondsToClock(startOffsetSeconds);
					seekUrl = RampUrlUtil.replaceQueryVar("seek", startOffsetSeconds, url);
					
					//listHtml += "<li><a href='.' ts='" + snippet.getStartOffset() + "' class='ez-timelinestamp'>" + RampTimeUtil.secondsToClock(snippets[x].getStartOffset()) + ", " + snippets[x].getHtmlExcerpt() + "</a></li>";
					timestampsHtml += " \
								<a ts=\"" + startOffsetSeconds + "\" title=\"Matched '" + queryTerm + "' at " + startOffsetClock + " - play here\" target=\"\" onclick=\"EZDATA.trackGaEvent('search', 'navigation', '');\" href=\"" + seekUrl + "\" class=\"ez-timelinestamp\">" + startOffsetClock + "</a> \
					";
					
					highlightsHtml += " \
								<div ts=\"" + startOffsetSeconds + "\" href=\"" + seekUrl + "\" class=\"ez-highlight\"> \
									" + snippet.getHtmlExcerpt() + " \
								</div> \
					";
				}
			}
			timestampsHtml += "</p>";
			highlightsHtml += " \
							<div class=\"ez-box-bottom\"> \
									<div> \
										<div> \
										</div> \
									</div> \
								</div> \
							</div> \
			";
			listHtml += timestampsHtml + highlightsHtml + "</div>";
			return listHtml;
		},
		
		getSnippets : function() {
			return this.snippets;
		},
		
		getNumSnippets : function() {
			return this.snippets.length;
		},
		
		getFirstSnippetHtmlExcerpt : function() {
			var snippetHtmlExcerpt = "";
			var numSnippets = this.getNumSnippets();
			
			if (numSnippets > 0) {
				snippetHtmlExcerpt = (this.getSnippets())[0].getHtmlExcerpt();
			}
			return snippetHtmlExcerpt;
		},
		
		buildSnippetWordsArrays : function(snippets) {
			var snippetWordArrays = new Array();
			var snippetWordArraysIdx = 0;
			var self = this;
			$xml.find("Snippet").each ( function () {
				snippetWordArrays[snippetWordArraysIdx++] = self.buildSnippetWordsArray(jQuery(this));
			});
			
			return snippetWordArrays;
		}
	};
	
	window.RampSnippets = RampSnippets;
})();