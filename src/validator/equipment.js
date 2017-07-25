/**
 * 测试设备信息
 */
module.exports = {
	isWeiXin: function() {
	  var ua = window.navigator.userAgent.toLowerCase();
	  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
	    return true;
	  } else {
	    return false;
	  }
	},
  isAmaze: function() {
    var ua = window.navigator.userAgent;
    var regStr_appVersion = /LeapWebKit\/[\d.]+/gi;
    var regStr_appName = /(AmazeDev|Amaze)\/[\w.]+/gi;
    if (ua.match(regStr_appName) instanceof Array) {
      return true
    } else {
      return false
    }
  }
}