/*********************************************/
/***************  RampUrlUtil   **************/
/*********************************************/

var RampUrlUtil = {};

/*
 * Utility class for manipulating urls
 */
(function() {
	/*
	 * getQueryString
	 * Get the query string from the url without the leading "?".
	 */
	this.getQueryString = function (queryString) {
		if (undefined == queryString  || "" == queryString) {
			queryString = window.location.search;
		}
		
		if (RampStringUtil.beginsWith("?", queryString)) {
			queryString = queryString.substring(1);
		}
		
		return queryString;
	};
	
	
	this.replaceQueryVar = function (key, value, url, echo) {
		url = undefined == url ? window.location.toString() : url;
		
		var path = "";
		var query = "";
		
		if (url.indexOf("?") > 0) {
			path = url.substring(0, url.indexOf("?") + 1);
			query = url.substring(url.indexOf("?") + 1);
		}
		else {
			path = url + "?";
		}
		
		var vars = query.split("&");
		var finalVars = new Array();
		var finalVarsIdx = 0;
		var addParam = true;
		
		for (var i = 0; i < vars.length; i++) {
			if ("" != vars[i] && undefined != vars[i])
			{
				vars[i] = unescape(vars[i]);
				var pair = vars[i].split("=");
				if (pair[0] == key) {
					if ("" !== value) {
						finalVars[finalVarsIdx++] = escape(pair[0]) + "=" + escape(value);
					}
					addParam = false;
				}
				else if ("" != pair[1]) {
					finalVars[finalVarsIdx++] = escape(pair[0]) + "=" + escape(pair[1]);
				}
			}
			
		}
		
		path = path + finalVars.join("&");
		if (addParam && undefined != value && "" != value)
		{
			if (!RampStringUtil.endsWith("&", path) &&
				!RampStringUtil.endsWith("?", path))
				path += "&";
				
			path += key + "=" + value;
		}
		
		return path;
	};
	
	this.getUrlVar = function (key) {
		var returnValue = "";
		var query = RampUrlUtil.getQueryString();
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair[0] == key) {
				returnValue = pair[1];
				break;
			}
		}
		return returnValue;
	}
}).apply(RampUrlUtil);
