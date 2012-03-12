/*********************************************/
/*************  RampStringUtil  **************/
/*********************************************/

(function () {
	var RampStringUtil = function() {
		// Empty Constructor
	}
	
	RampStringUtil.prototype = {
		endsWith : function (needle, haystack) {
			var endsWith = false;
			
			if (undefined != haystack && undefined != needle && 
				haystack.substr(haystack.length - needle.length) === needle) {
					endsWith = true;
			}
			
			return endsWith;
		},
		
		beginsWith : function (needle, haystack) {
			var beginsWith = false;
			
			if (undefined != haystack && undefined != needle && 
				haystack.substr(0, needle.length) === needle) {
					beginsWith = true;
			}
			
			return beginsWith;
		},
		
		pad: function ( pad, string, length, dir ) {
			var padAmount = length - string.toString().length;
			if (0 >= padAmount) {
				return string;
			}
			
			var x;
			for (x = 0; x < padAmount; x++) {			
				if ( dir == "left") {
					string = "" + pad + string;
				}
				else {
					string = "" + string + pad;
				}
			}
			
			return string;
		}
	}
	
	window.RampStringUtil = new RampStringUtil();
})();