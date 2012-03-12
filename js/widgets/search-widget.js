/**
 Ramp Search Widget - A widget that displays search results 

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
 * @fileOverview A search results widget for HTML5/Javascript for use with RAMP Content APIs
 * @author Gal Zhovnriovsky <galzhov@gmail.com>
 * @version 1.0
 */
 
(function() {

	var $ = jQuery;
	
	var defaults = {
		"api" : {
			"urls": {
				"baseUrl" : "http://api.ramp.com"
			},
			"key": "0302cd28e05e0800f752e0db235d5440",
			"version": "v1",
			"methods" : {
				"search" : {
					"serviceName" : "search"
				}
			}
		}
	};
	
	var SearchWidget = function (args) {
		this.defaults = defaults;
		if (args) {
			this.defaults = jQuery.extend(true, {}, defaults, args);
		}
		
		this.apiMethodSearchBaseUrl  = 	this.defaults.api.urls.baseUrl + "/" + 
										this.defaults.api.version + "/" + 
										this.defaults.api.methods.search.serviceName + 
										"?apikey=" + this.defaults.api.key;
	};

	SearchWidget.prototype = {
		displayFull : function(hostDivId, loadingHostDivId) {
			hostDivId = RampStringUtil.beginsWith("#", hostDivId) ? hostDivId : "#" + hostDivId;
			loadingHostDivId = RampStringUtil.beginsWith("#", loadingHostDivId) ? loadingHostDivId : "#" + loadingHostDivId;
			
			$.ajax({
				url: this.apiMethodSearchBaseUrl + "&" + RampUrlUtil.getQueryString(),
				context: this,
				dataType: "xml",
				beforeSend: function(xhr) {
					$(loadingHostDivId).show();
				},
				success: function(xml) {
					this.displaySearchResults(xml, hostDivId);
					EZDATA.itemMod_init();
				},
				complete: function(xhr) {
					$(loadingHostDivId).hide();
				}
			});
		},
		
		displaySearchResults : function(xml, hostDivId) {
			var $xml = $( xml );
			var searchParams = $xml.find("SearchParams")
			var searchTerms = searchParams.find("SearchTerms");
			var resultSet = $xml.find("ResultSet");
			var showSnippets = undefined != searchTerms && searchTerms.length > 0 ? true : false;
			hostDivId = RampStringUtil.beginsWith("#", hostDivId) ? hostDivId : "#" + hostDivId;
			
			RampSearchMeta.displayFull( resultSet, hostDivId );
			
			$xml.find( "CompleteResult" ).each(function() {
				var searchResult = RampSearchResult.getSearchResult($(this), showSnippets);
				$( hostDivId ).html($( hostDivId ).html() + searchResult);
			});
			
			RampWidgets.PaginationWidget.displayFull( resultSet, hostDivId );
		}
	}
	
	if (!window.RampWidgets)
		window.RampWidgets = {};
	
	window.RampWidgets.SearchWidget = SearchWidget;
})();

var EZDATA = {};
/*
 * Initializes the video/audio highlights
 */
EZDATA.itemMod_init = function(sticky, scriptId, highlightClasses){
	sticky = false;
    
    //var target = jQuery(".ez-mod-content[scriptid=" + scriptId +"]");
	var target = jQuery("#ramp-search-widget-container");
    
    /* Switch the currently displayed snippet thumbnail */
    var switchThumbnails = function(ts, item){
        var highlightText = jQuery(".ez-highlight[ts='"+ ts +"']", item);
		if (highlightText.length == 0) return;
        
        // switch thumbnail
        var itemThumb = jQuery(".ez-thumbs .ez-snippetThumb[ts='"+ ts +"']", item);
        itemThumb.removeClass("ez-hidden");
        itemThumb.siblings("img").addClass("ez-hidden");
        
        // make the markers active
        var indicator = jQuery(".ez-snippetThumbIndicator[ts='"+ ts +"']", item);
        
        indicator.addClass("ez-active").removeClass("ez-inactive");
        indicator.siblings().removeClass("ez-active").addClass("ez-inactive");
    };
    
    /* Hide the currently displayed snippet thumbnail */
    var hideThumbnails = function(ts, item){
        var highlightText = jQuery(".ez-highlight[ts='"+ ts +"']", item);
        if (highlightText.length == 0) return;
        
        // show primary thumbnail
        jQuery(".ez-thumbs .ez-snippetThumb", item).addClass("ez-hidden");
        jQuery(".ez-thumbs .ez-primaryThumb", item).removeClass("ez-hidden");
        
        // activate primary indicator
        var indicator = jQuery(".ez-snippetThumbIndicator", item);
        indicator.removeClass("ez-active");
        indicator.addClass("ez-inactive");
        
        jQuery(".ez-primaryThumbIndicator", item).addClass("ez-active").removeClass("ez-inactive");
    };
    
    /* Initialize the timeline markers/thumbs */
    jQuery(".ez-itemMod-item .ez-timestamps", target).each(function(){
		var currentTimeline = jQuery(this);
        var item = currentTimeline.parent().parent().parent().parent();
        var timeStamps = jQuery(".ez-timelinestamp", currentTimeline);
        
        timeStamps.each(function(){
            var stamp = jQuery(this);
            var ts = stamp.attr("ts");
		    var h = jQuery(".ez-highlight[ts='" + ts + "']", stamp.parent().parent());
			if (highlightClasses == "" || !highlightClasses) {
				var highlightClasses = "ui-tooltip-jtools";
			}
			
			//EZDATA.itemMod_truncate2(h, 150, "...", "...");
			//console.log(h.html());
		    stamp.qtip({
		        content: {
		            text: h.html()
		        },
		        show: {
		            event: "mouseenter"
		        },
		        position: {
		          my: 'bottom center',  // Position my top left...
		          at: 'top center', // at the bottom right of...
		          target: stamp // my target
		       },
			   style: {
			      classes: highlightClasses // eg. 'ui-tooltip-jtools'
			   }
		    });
			
            stamp.bind("mouseover", function(){
                switchThumbnails(stamp.attr("ts"), item);
            });
            
            if (!sticky){
                hideThumbnails(stamp.attr("ts"), item);
                
                stamp.bind("mouseout", function(){
                    hideThumbnails(stamp.attr("ts"), item);
                });
            }
            
        });        
        if (sticky) {
            switchThumbnails(jQuery(timeStamps[0]).attr("ts"), item);
        }
        
    });
    
    /* Initialize the thumb indicators */
    jQuery(".ez-itemMod-item .ez-snippetThumbIndicators", target).each(function(){
        var item = jQuery(this).parent().parent();
        var indicators = jQuery(".ez-snippetThumbIndicator", this);
        
        indicators.each(function(){
            var stamp = jQuery(this);
            
            stamp.bind("mouseover", function(){
                switchThumbnails(stamp.attr("ts"), item);
            });
            
            if (!sticky){
                stamp.bind("mouseout", function(){
                    hideThumbnails(stamp.attr("ts"), item);
                });
            }
        });
        
        var primaryIndicator = jQuery(".ez-primaryThumbIndicator", this);
        
        var primaryMouseOver = function(){
            var primaryThumb = jQuery(".ez-primaryThumb", item);
            primaryThumb.removeClass("ez-hidden");
            primaryThumb.siblings("img").addClass("ez-hidden");
            
            var timeStamp = jQuery(".ez-timelinestamp.ez-active", item);
			var ts = timeStamp.attr("ts");
			
			indicators.removeClass("ez-active").addClass("ez-inactive");
        };
        
        primaryIndicator.bind("mouseover", primaryMouseOver);
        primaryIndicator.bind("click", function(){
            //EZDATA.trackGaEvent(EZDATA.pageName, 'navigation', jQuery(".ez-main .ez-title", item).attr("galabel"));
            location.href = jQuery(".ez-main .ez-title", item).attr("href");
        });
        
        if (sticky) {
            primaryMouseOver();
        }
    });
    
    /* bind highlight click events */
    if (sticky) {
        jQuery(".ez-itemMod-item .ez-highlight", target).each(function(){
            var item = jQuery(this).parent().parent().parent().parent();
            var gaLabel = jQuery(".ez-main .ez-title", item).attr("galabel");
            
            jQuery(this).bind("click", function(){
                //EZDATA.trackGaEvent(EZDATA.pageName, 'navigation', gaLabel);
                location.href = jQuery(this).attr("href");
            });
        });
    }
                
    //video & audio thumb overlays
    jQuery(document).ready(function() {
        jQuery(".ez-Video .ez-thumbs a", target).each(function() {
            var ah = jQuery(this).height();
            jQuery('<div class="ez-plainOverlay"></div>').appendTo(jQuery(this));
            jQuery(".ez-plainOverlay", jQuery(this)).css("height", ah + "px");
        });   
        jQuery(".ez-Audio .ez-thumbs a", target).each(function() {
            var ah = jQuery(this).height();
            jQuery('<div class="ez-plainOverlay"></div>').appendTo(jQuery(this));
            jQuery(".ez-plainOverlay", jQuery(this)).css("height", ah + "px");
        });     
    });     

};