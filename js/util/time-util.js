/*********************************************/
/************    RampTimeUtil   **************/
/*********************************************/
(function () {
	var RampTimeUtil = function() {};
	RampTimeUtil.prototype = {
		secondsToClock : function (seconds) {
			seconds = parseInt(seconds);
			var clockFormat = "00:00:00";
			var secondsVal = RampStringUtil.pad("0", (seconds % 60), 2, "left");
			var minVal = RampStringUtil.pad("0", Math.floor(seconds / 60), 2, "left");
			var hourVal = RampStringUtil.pad("0", Math.floor(seconds / 3600), 2, "left");
			
			//clockFormat = hourVal + ":" + minVal + ":" + secondsVal;
			clockFormat = minVal + ":" + secondsVal;
			return clockFormat;
		}
	};
	window.RampTimeUtil = new RampTimeUtil();
})();