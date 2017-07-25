(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ToolCabinet"] = factory();
	else
		root["ToolCabinet"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @time 2017-07-24 14:07:50
 * @author sam.lee
 * @info 完成处理URL字符串
 *
 */


var urlString = [];
var location = window.location;

module.exports = {
	/**
	 * [parse 处理一个字符串URL]
	 * @param  {[String]} url [传入一个字符串url]
	 * @return {[Object]}     [返回一个object对象]
	 */
	parse: function(url) {
		var temp = document.createElement('a');
		temp.href = url;
		var result = {
			"port": temp.port,
			"protocol": temp.protocol.replace(':', ''),
			"hash": temp.hash.replace('#', ''),
			"host": temp.host,
			"href": temp.href,
			"hostname": temp.hostname,
			"pathname": temp.pathname,
			"search": temp.search,
			"query": {}
		};
		var seg = result.search.replace(/^\?/, '').split('&'),
			leng = seg.length,
			i = 0,
			target;
		for (; i < leng; i++) {
			if (!seg[i]) continue;
			target = seg[i].split('=');
			result.query[target[0]] = target[1];
		}
		temp = null;
		return result;
	},
	/**
	 * [format 拼接一个完整的url字符串]
	 * @param  {[String]} url [URL]
	 * @param  {[Object]} obj [需要拼接的query或者hash参数]
	 * @return {[String]}     [返回一个完整的URL字符串]
	 */
	format: function(url, obj) {
		var i = 0,
			query = obj.query,
			hash = obj.hash;
		urlString.length = 0;
		urlString.push(url.lastIndexOf('?') > -1 ? url : url + '?');
		if (query) {
			for (var key in query) {
				var val = query[key]
				if (!i) {
					i++;
					urlString.push(key + '=' + val)
				} else {
					urlString.push('&' + key + '=' + val);
				}
			}
		};
		if (hash) {
			urlString.push(hash.indexOf('#') > -1 ? hash : '#' + hash);
		};
		return urlString.join('');
	},
	/**
	 * [resolve 将参数 to 位置的字符解析到一个绝对路径里]
	 * @param  {[String]} from [源路径]
	 * @param  {[String]} to   [将被解析到绝对路径的字符串]
	 * @return {[String]}      [返回一个绝对路径字符串]
	 */
	resolve: function(from, to) {
		/**
		 *  路径描述 ./当前路径 ../父路径
		 */
		if (/^(.\/)/.test(to)) {
			to = to.replace(/^(.\/)/, '/');
		};

		if (/^(..\/)/.test(to)) {
			from = from.substr(0, from.lastIndexOf('/'));
			to = to.replace(/^(..\/)/, '/');
		};
		return from + to;
	},
	/**
	 * [extname 返回指定文件名的扩展名称]
	 * @param  {[String]} p [description]
	 * @return {[String]}   [description]
	 */
	extname: function(p) {
		var _p = p.split('.');
		return _p[_p.length - 1] || '';
	},
	/**
	 * [parseSearch 将search参数转换为obj]
	 * @param  {[type]} query [description]
	 * @return {[type]}       [description]
	 */
	parseSearch:function(query){
		var _query = {};
		var seg = query.replace(/^\?/, '').split('&'),
			leng = seg.length,
			i = 0,
			value,
			target;
		for (; i < leng; i++) {
			if (!seg[i]) continue;
			target = seg[i].split('=');
			value = target[1];
			if ((/^\[/.test(value) && /\]$/.test(value)) || (/^{/.test(value) || /\}$/.test(value))) {
				value = JSON.parse(value);
			};
			_query[target[0]] = value;
		}
		return _query;
	}
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @time 2017-07-24 14:13:33
 * @author  sam.lee
 * @info  跨域模拟Ajax的Form表单
 */



var url = __webpack_require__(0);
var uniqueId = __webpack_require__(2);

var AjaxForm = function(options){
	options = options || {};
	this.$el = typeof options.el === 'string' ? $(options.el) : options.el;
	this.uid = uniqueId('AjaxForm-');
	this.loadState = false;
	this._init();
};

AjaxForm.prototype._init = function(){
	var defer = $.Deferred();
	$.extend(this,defer.promise());
	this._createIframe();
	this._addEvent(defer);
};

AjaxForm.prototype._createIframe = function(){
	var iframeHTML = '<iframe id="'+this.uid+'" name="'+this.uid+'"  style="display: none;" src="about:blank"></iframe>';
	this.$el.attr('target',this.uid);
	this.$el.append(iframeHTML);
	this._iframe = $('#'+this.uid);
};

AjaxForm.prototype._addEvent = function(promise){
	var self = this;
	this._iframe.on('load',function(){
		if (self.loadState) {
			var cw = this.contentWindow;
			var loc = cw.location;
			if (loc.href === 'about:blank') {
				promise.reject(cw);
			}else{
				try {//如果后台没有作跨域处理，则需手动触发onComplete
					var body = this._iframe[0].contentWindow.document.body;
					innerText = body.innerText;
					if (!innerText) {
						innerText = body.innerHTML;
					};
					if (innerText) {
						promise.resolve($.parseJSON(innerText));
					};
				} catch (e) {
					promise.resolve(cw);
				}
			};
			self.loadState = false;
		};
	});
};

AjaxForm.prototype.encrypto = function(secret){
	var self = this;
	$.each(secret, function(key, value) {
		var $item = self.$el.find('[name=' + key + ']');
		if ($item.length === 0) {
			$('<input />').attr({
				type : 'hidden',
				name : key,
				value : value
			}).appendTo(self.$el);
		} else {
			$item.val(value);
		}
	});
};

var shared = null;
AjaxForm.sharedInstanceAjaxForm = function(element,options){
	if (!shared) {
		options = options || {};
		options.el = element;
		shared = new AjaxForm(options);
	}
	return shared;
};
AjaxForm.classInstanceAjaxForm = function(element,options){
	options = options || {};
	options.el = element;
	return new AjaxForm(options);
};

module.exports = AjaxForm;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * [exports description]
 * 2017年07月24日11:09:19
 * created by samli
 * for unique id for tool
 */
module.exports = uniqueId;

var idCounter = 0;
function uniqueId(prefix) {
  var id = ++idCounter + '';
  return prefix ? prefix + id : id;
};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__version_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__communication_jsBridge_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__communication_jsBridge_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__communication_jsBridge_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_cookie_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_cookie_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__store_cookie_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_url_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_url_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__util_url_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__upload_AjaxForm_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__upload_AjaxForm_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__upload_AjaxForm_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__upload_UploadFile_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__upload_UploadFile_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__upload_UploadFile_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_rem_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_rem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__util_rem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__validator_equipment_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__validator_equipment_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__validator_equipment_js__);









/* harmony default export */ __webpack_exports__["default"] = ({
	version: __WEBPACK_IMPORTED_MODULE_0__version_js__["a" /* default */],
	JsBridge: __WEBPACK_IMPORTED_MODULE_1__communication_jsBridge_js___default.a,
	cookie: __WEBPACK_IMPORTED_MODULE_2__store_cookie_js___default.a,
	AjaxForm: __WEBPACK_IMPORTED_MODULE_4__upload_AjaxForm_js___default.a,
	UploadFile: __WEBPACK_IMPORTED_MODULE_5__upload_UploadFile_js___default.a,
	rem: __WEBPACK_IMPORTED_MODULE_6__util_rem_js___default.a,
	equiValid: __WEBPACK_IMPORTED_MODULE_7__validator_equipment_js___default.a
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ('0.0.2');

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * jsBridge 客户端与前端的交互
 * Created by liminshen on 2017/5/8.
 */


var uId = 1314;
function JsBridge(options,cb) {
	var options = options || {};
	this.schemeProtocol = options.protocol || 'jsbridge';
	this.params = options.params;
	this.action = options.action;
	this.cbName = 'jsBridgeFn'+(uId++);
	this.cb = cb;
	this.init();
}
JsBridge.prototype = {
	constructor : JsBridge,
	init : function () {
		this.initUrl();
		this.initJsBridgeFn();
		this.initIframe();
		this.loadIframe();
	},
	initUrl : function () {
		this.url = this.schemeProtocol+'://'+this.action+'?';
		for(var name in this.params){
			this.url += name + '=' + this.params[name] +'&';
		}
		this.url += 'callBackFunction' + '=' + this.cbName;
	},
	initIframe : function () {
		this.iframe = document.createElement('iframe');
		this.iframe.style.width = '1px';
		this.iframe.style.height = '1px';
		this.iframe.style.display = 'none';
		this.iframe.src = this.url;
	},
	initJsBridgeFn : function () {
		var self = this;
		window[this.cbName] = function (repsonse) {
			self.cb(repsonse);
		}
	},
	loadIframe : function () {
		var self = this;
		document.body.appendChild(this.iframe);
		setTimeout(function() {
			self.iframe.remove();
		}, 100);
	}
}
module.exports = JsBridge;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
    引用`https://github.com/js-cookie/js-cookie` 2.1.0
 */



module.exports = init(function () {});

function extend () {
  var i = 0;
  var result = {};
  for (; i < arguments.length; i++) {
    var attributes = arguments[ i ];
    for (var key in attributes) {
      result[key] = attributes[key];
    }
  }
  return result;
}

function init (converter) {
  function api (key, value, attributes) {
    var result;

    // Write

    if (arguments.length > 1) {
      attributes = extend({
        path: '/'
      }, api.defaults, attributes);

      if (typeof attributes.expires === 'number') {
        var expires = new Date();
        expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
        attributes.expires = expires;
      }

      try {
        result = JSON.stringify(value);
        if (/^[\{\[]/.test(result)) {
          value = result;
        }
      } catch (e) {}

      if (!converter.write) {
        value = encodeURIComponent(String(value))
          .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
      } else {
        value = converter.write(value, key);
      }

      key = encodeURIComponent(String(key));
      key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
      key = key.replace(/[\(\)]/g, escape);

      return (document.cookie = [
        key, '=', value,
        attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
        attributes.path    && '; path=' + attributes.path,
        attributes.domain  && '; domain=' + attributes.domain,
        attributes.secure ? '; secure' : ''
      ].join(''));
    }

    // Read

    if (!key) {
      result = {};
    }

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling "get()"
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    var rdecode = /(%[0-9A-Z]{2})+/g;
    var i = 0;

    for (; i < cookies.length; i++) {
      var parts = cookies[i].split('=');
      var name = parts[0].replace(rdecode, decodeURIComponent);
      var cookie = parts.slice(1).join('=');

      if (cookie.charAt(0) === '"') {
        cookie = cookie.slice(1, -1);
      }

      try {
        cookie = converter.read ?
          converter.read(cookie, name) : converter(cookie, name) ||
          cookie.replace(rdecode, decodeURIComponent);

        if (this.json) {
          try {
            cookie = JSON.parse(cookie);
          } catch (e) {}
        }

        if (key === name) {
          result = cookie;
          break;
        }

        if (!key) {
          result[name] = cookie;
        }
      } catch (e) {}
    }

    return result;
  }

  api.get = api.set = api;
  api.getJSON = function () {
    return api.apply({
      json: true
    }, [].slice.call(arguments));
  };
  api.defaults = {};

  api.remove = function (key, attributes) {
    api(key, '', extend(attributes, {
      expires: -1
    }));
  };

  api.withConverter = init;

  return api;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @time 2017-07-24 14:14:03
 * @author  sam.lee
 * @info  跨域上传图片，只支持iframe的方式
 */



var url = __webpack_require__(0);
var AjaxForm = __webpack_require__(1);
var uniqueId = __webpack_require__(2);

var UploadFile = function(options){
	var self = this;
	this.$el = typeof options.el === 'string' ? $(options.el) : options.el;
	this.uid = uniqueId('UploadFile-');
	this.options = options;
	this._data = options.data || {};
	this._filename = options.filename || 'image';
	this._url = options.url;
	if (!this._url) {
		console.warn('配置上传URL');
		return;
	};
	this._init();
};

UploadFile.prototype._init = function(){
	this._createElement();
};

UploadFile.prototype._createElement = function(){
	var inputs = '';
	for(var name in this._data){
		var value = this._data[name];
		var type = Object.prototype.toString.call(value);
		if (type === '[object Object]' || type === '[object Array]') {
			value = JSON.stringify(value);
		};
		inputs += '<input type="hidden" name="'+name+'" value=\''+value+'\'/>';
	};
	inputs += '<input type="file" class="opacity0 upload-file '+this.options.className+'" name="'+this._filename+'"  />';
	this.$el.attr('method','POST');
	this.$el.attr('action',this._url);
	this.$el.attr('enctype','multipart/form-data');
	this.$el.append(inputs);
};

//错误码消息映射
UploadFile.prototype.parseErrorMsg = function(res){
	if(res && res.state == 'SUCCESS'){
		return true;
	}
	var code = res.errCode *1 || 0;
	switch(code){
		case 29:
			return '上传的文件太大了,请重新上传';
		case 31:
			return '请上传JPGE,JPG,PNG,GIF等格式的图片文件';
	}
	return '文件上传失败,请重新上传';
};

/**
 * [submit 提交文件]
 * @return {[type]} [description]
 */
UploadFile.prototype.submit = function(){
	this.ajaxForm.loadState = true;
	if (typeof this._before === 'function' ) {
		this._before();
	};
	var defer = $.Deferred();
	this.ajaxForm = AjaxForm.classInstanceAjaxForm(this.$el,{
		type:'img'
	});
	this.ajaxForm.done(function(cw){
		var loc = cw.location;
		var search = decodeURIComponent(loc.search);
		var query = url.parseSearch(search);
		defer.resolve(query);
	});
	this.ajaxForm.fail(function(){
		defer.reject(this);
	});
	this.$el.submit();
	return defer.promise();
};

var shared = null;
UploadFile.sharedInstanceUploadFile = function(options){
	if (!shared) {
		shared = new UploadFile(options);
	}
	return shared;
};
UploadFile.classInstanceUploadFile = function(options){
	return new UploadFile(options);
};

module.exports = UploadFile;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * Created by samli on 2017/1/23.
 */
;(function(win, lib) {
	var doc = win.document;
	var docEl = doc.documentElement;
	var metaEl = doc.querySelector('meta[name="viewport"]');
	var flexibleEl = doc.querySelector('meta[name="flexible"]');
	var dpr = 0;
	var scale = 0;
	var tid;
	var flexible = lib.flexible || (lib.flexible = {});
	
	if (metaEl) {
		var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
		if (match) {
			scale = parseFloat(match[1]);
			dpr = parseInt(1 / scale);
		}
	} else if (flexibleEl) {
		var content = flexibleEl.getAttribute('content');
		if (content) {
			var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
			var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
			if (initialDpr) {
				dpr = parseFloat(initialDpr[1]);
				scale = parseFloat((1 / dpr).toFixed(2));
			}
			if (maximumDpr) {
				dpr = parseFloat(maximumDpr[1]);
				scale = parseFloat((1 / dpr).toFixed(2));
			}
		}
	}
	
	if (!dpr && !scale) {
		var isAndroid = win.navigator.appVersion.match(/android/gi);
		var isIPhone = win.navigator.appVersion.match(/iphone/gi);
		var devicePixelRatio = win.devicePixelRatio;
		if (isIPhone) {
			// iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
			if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
				dpr = 3;
			} else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
				dpr = 2;
			} else {
				dpr = 1;
			}
		} else {
			// 其他设备下，仍旧使用1倍的方案
			dpr = 1;
		}
		scale = 1 / dpr;
	}
	
	docEl.setAttribute('data-dpr', dpr);
	if (!metaEl) {
		metaEl = doc.createElement('meta');
		metaEl.setAttribute('name', 'viewport');
		metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
		if (docEl.firstElementChild) {
			docEl.firstElementChild.appendChild(metaEl);
		} else {
			var wrap = doc.createElement('div');
			wrap.appendChild(metaEl);
			doc.write(wrap.innerHTML);
		}
	}
	
	function refreshRem(){
		var width = docEl.getBoundingClientRect().width;
		if (width / dpr > 640) {
			width = 640 * dpr;
		}
		var rem = width / 10;
		docEl.style.fontSize = rem + 'px';
		flexible.rem = win.rem = rem;
	}
	
	win.addEventListener('resize', function() {
		clearTimeout(tid);
		tid = setTimeout(refreshRem, 300);
	}, false);
	win.addEventListener('pageshow', function(e) {
		if (e.persisted) {
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}
	}, false);
	
	if (doc.readyState === 'complete') {
		doc.body.style.fontSize = 12 * dpr + 'px';
	} else {
		doc.addEventListener('DOMContentLoaded', function(e) {
			doc.body.style.fontSize = 12 * dpr + 'px';
		}, false);
	}
	
	
	refreshRem();
	
	flexible.dpr = win.dpr = dpr;
	flexible.refreshRem = refreshRem;
	flexible.rem2px = function(d) {
		var val = parseFloat(d) * this.rem;
		if (typeof d === 'string' && d.match(/rem$/)) {
			val += 'px';
		}
		return val;
	}
	flexible.px2rem = function(d) {
		var val = parseFloat(d) / this.rem;
		if (typeof d === 'string' && d.match(/px$/)) {
			val += 'rem';
		}
		return val;
	}
	
})(window, window['lib'] || (window['lib'] = {}));

/***/ }),
/* 9 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);
});
//# sourceMappingURL=toolCabinet.js.map