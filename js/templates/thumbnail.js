/*********************************************/
/*************    RampThumbnail   ************/
/*********************************************/

var RampThumbnail = {};

/*
 * Template class to generate thumbnails html
 */
(function() {
	this.getThumbnails = function(xml, numThumbnails) {
		var $xml = jQuery ( xml );
		var mediaType = $xml.attr("media-type");
		
		var thumbs = new Array();
		var idx = 1;
		if ("video" == mediaType || "audio" == mediaType) {
			while (idx <= numThumbnails) {
				thumbs[idx-1] = RampThumbnail.getMultiMediaThumbnailFile(xml, idx);
				idx++;
			}
		}
		return thumbs;
	}
	
	this.getMultiMediaThumbnailFile = function(xml, idx) {
		var $xml = jQuery ( xml );
		var thumb = "";
		
		var timedThumbRate = $xml.attr("timed-thumbnail-rate");
		var thumbFileNameLen = $xml.attr("timed-thumbnail-name-length");
		var thumbFileExt = $xml.attr("timed-thumbnail-ext");
		if (undefined != thumbFileNameLen) 
		{
			var thumb = timedThumbRate * idx;
			
			thumb = RampStringUtil.pad("0", thumb, thumbFileNameLen, "left");
			thumb = $xml.attr("timed-thumbnail-root-url") + thumb + "." + thumbFileExt;
		}
		
		return thumb;
	}
	
}).apply(RampThumbnail);
