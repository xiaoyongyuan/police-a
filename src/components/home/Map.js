import React, { Component, Fragment } from "react";
import { post } from "../../axios/tools.js";
import { Modal, Icon } from "antd";
import redpoint from "../../style/jhy/imgs/redpoint.png";
import greenpoint from "../../style/jhy/imgs/greenpoint.png";
import graypoint from "../../style/jhy/imgs/graypoint.png";
import "../../style/jhy/css/mapslayer.css";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markerList: [],
      zonename: "",
      deviceInfo: {},
      modalVisible: false, //详情弹层
      equipdat: {}, //设备详情,
      VidMo: false
    };
  }
  componentDidMount() {
    this.getMarkerList();
    
  }
  momenttime = bdate => {
    if (!bdate) return false;
    if (new Date().getTime() - new Date(bdate).getTime() > 60000) {
      return false;
    } else {
      return true;
    }
  };
  getMarkerList = () => {
    post({ url: "/api/camera_cop/getlist" }, res => {
      this.setState(
        {
          markerList: res.data,
          zonename: res.zonename
        },
        () => {
          const _this = this;
          this.initializeMap(_this);
        }
      );
    });
  };
  initializeMap = _this => {
    var BMap = window.BMap;

    var map = new BMap.Map("mapContainer"); // 创建Map实例
    var mapStyle = { style: "midnight" };
    map.setMapStyle(mapStyle);
    const defpoint = this.state.zonename;
    //以下写法我也很无奈，领导要求，就这样吧
    defpoint && defpoint.indexOf("汉中市汉台区") > 0
      ? map.centerAndZoom(new BMap.Point(107.053349, 33.191015), 12)
      : map.centerAndZoom(defpoint, 10);

    map.setCurrentCity(defpoint);
    map.setDefaultCursor("point");
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    map.enableContinuousZoom(); //开启缩放平滑




























    var BMapLib = window.BMapLib = BMapLib || {};

    (function () {
    
      
        var T,
        baidu = T = baidu || {version: "1.3.8"};
    
        (function (){
            //提出guid，防止在与老版本Tangram混用时
            //在下一行错误的修改window[undefined]
            baidu.guid = "$BAIDU$";
    
            //Tangram可能被放在闭包中
            //一些页面级别唯一的属性，需要挂载在window[baidu.guid]上
            window[baidu.guid] = window[baidu.guid] || {};
    
          
            baidu.dom = baidu.dom || {};
    
    
            baidu.dom.g = function (id) {
                if ('string' == typeof id || id instanceof String) {
                    return document.getElementById(id);
                } else if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
                    return id;
                }
                return null;
            };
    
            // 声明快捷方法
            baidu.g = baidu.G = baidu.dom.g;
    
          
            baidu.dom.getDocument = function (element) {
                element = baidu.dom.g(element);
                return element.nodeType == 9 ? element : element.ownerDocument || element.document;
            };
    
            baidu.lang = baidu.lang || {};
    
         
            baidu.lang.isString = function (source) {
                return '[object String]' == Object.prototype.toString.call(source);
            };
    
            // 声明快捷方法
            baidu.isString = baidu.lang.isString;
    
           
            baidu.dom._g = function (id) {
                if (baidu.lang.isString(id)) {
                    return document.getElementById(id);
                }
                return id;
            };
    
            // 声明快捷方法
            baidu._g = baidu.dom._g;
    
            baidu.browser = baidu.browser || {};
    
            if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
          
               baidu.browser.ie = baidu.ie = document.documentMode || + RegExp['\x241'];
            }
    
    
    
            baidu.dom.getComputedStyle = function(element, key){
                element = baidu.dom._g(element);
                var doc = baidu.dom.getDocument(element),
                    styles;
                if (doc.defaultView && doc.defaultView.getComputedStyle) {
                    styles = doc.defaultView.getComputedStyle(element, null);
                    if (styles) {
                        return styles[key] || styles.getPropertyValue(key);
                    }
                }
                return '';
            };
    
          
            baidu.dom._styleFixer = baidu.dom._styleFixer || {};
    
          
            baidu.dom._styleFilter = baidu.dom._styleFilter || [];
    
          
            baidu.dom._styleFilter.filter = function (key, value, method) {
                for (var i = 0, filters = baidu.dom._styleFilter, filter; filter = filters[i]; i++) {
                    if (filter = filter[method]) {
                        value = filter(key, value);
                    }
                }
                return value;
            };
    
            baidu.string = baidu.string || {};
    
      
            baidu.string.toCamelCase = function (source) {
                //提前判断，提高getStyle等的效率 thanks xianwei
                if (source.indexOf('-') < 0 && source.indexOf('_') < 0) {
                    return source;
                }
                return source.replace(/[-_][^-_]/g, function (match) {
                    return match.charAt(1).toUpperCase();
                });
            };
    
            
            baidu.dom.getStyle = function (element, key) {
                var dom = baidu.dom;
    
                element = dom.g(element);
                key = baidu.string.toCamelCase(key);
                //computed style, then cascaded style, then explicitly set style.
                var value = element.style[key] ||
                            (element.currentStyle ? element.currentStyle[key] : "") ||
                            dom.getComputedStyle(element, key);
    
                // 在取不到值的时候，用fixer进行修正
                if (!value) {
                    var fixer = dom._styleFixer[key];
                    if(fixer){
                        value = fixer.get ? fixer.get(element) : baidu.dom.getStyle(element, fixer);
                    }
                }
    
                /* 检查结果过滤器 */
                if (fixer = dom._styleFilter) {
                    value = fixer.filter(key, value, 'get');
                }
    
                return value;
            };
    
            // 声明快捷方法
            baidu.getStyle = baidu.dom.getStyle;
    
    
            if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
            
                baidu.browser.opera = + RegExp['\x241'];
            }
    
            
            baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);
    
           
            baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
    
           
            baidu.browser.isStrict = document.compatMode == "CSS1Compat";
    
           
            baidu.dom.getPosition = function (element) {
                element = baidu.dom.g(element);
                var doc = baidu.dom.getDocument(element),
                    browser = baidu.browser,
                    getStyle = baidu.dom.getStyle,
                
                    BUGGY_GECKO_BOX_OBJECT = browser.isGecko > 0 &&
                                             doc.getBoxObjectFor &&
                                             getStyle(element, 'position') == 'absolute' &&
                                             (element.style.top === '' || element.style.left === ''),
                    pos = {"left":0,"top":0},
                    viewport = (browser.ie && !browser.isStrict) ? doc.body : doc.documentElement,
                    parent,
                    box;
    
                if(element == viewport){
                    return pos;
                }
    
                if(element.getBoundingClientRect){ // IE and Gecko 1.9+
    
                    //当HTML或者BODY有border width时, 原生的getBoundingClientRect返回值是不符合预期的
                    //考虑到通常情况下 HTML和BODY的border只会设成0px,所以忽略该问题.
                    box = element.getBoundingClientRect();
    
                    pos.left = Math.floor(box.left) + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
                    pos.top  = Math.floor(box.top)  + Math.max(doc.documentElement.scrollTop,  doc.body.scrollTop);
    
                    // IE会给HTML元素添加一个border，默认是medium（2px）
                    // 但是在IE 6 7 的怪异模式下，可以被html { border: 0; } 这条css规则覆盖
                    // 在IE7的标准模式下，border永远是2px，这个值通过clientLeft 和 clientTop取得
                    // 但是。。。在IE 6 7的怪异模式，如果用户使用css覆盖了默认的medium
                    // clientTop和clientLeft不会更新
                    pos.left -= doc.documentElement.clientLeft;
                    pos.top  -= doc.documentElement.clientTop;
    
                    var htmlDom = doc.body,
                        // 在这里，不使用element.style.borderLeftWidth，只有computedStyle是可信的
                        htmlBorderLeftWidth = parseInt(getStyle(htmlDom, 'borderLeftWidth')),
                        htmlBorderTopWidth = parseInt(getStyle(htmlDom, 'borderTopWidth'));
                    if(browser.ie && !browser.isStrict){
                        pos.left -= isNaN(htmlBorderLeftWidth) ? 2 : htmlBorderLeftWidth;
                        pos.top  -= isNaN(htmlBorderTopWidth) ? 2 : htmlBorderTopWidth;
                    }
                } else {
                    // safari/opera/firefox
                    parent = element;
    
                    do {
                        pos.left += parent.offsetLeft;
                        pos.top  += parent.offsetTop;
    
                        // safari里面，如果遍历到了一个fixed的元素，后面的offset都不准了
                        if (browser.isWebkit > 0 && getStyle(parent, 'position') == 'fixed') {
                            pos.left += doc.body.scrollLeft;
                            pos.top  += doc.body.scrollTop;
                            break;
                        }
    
                        parent = parent.offsetParent;
                    } while (parent && parent != element);
    
                    // 对body offsetTop的修正
                    if(browser.opera > 0 || (browser.isWebkit > 0 && getStyle(element, 'position') == 'absolute')){
                        pos.top  -= doc.body.offsetTop;
                    }
    
                    // 计算除了body的scroll
                    parent = element.offsetParent;
                    while (parent && parent != doc.body) {
                        pos.left -= parent.scrollLeft;
                        // see https://bugs.opera.com/show_bug.cgi?id=249965
                        if (!browser.opera || parent.tagName != 'TR') {
                            pos.top -= parent.scrollTop;
                        }
                        parent = parent.offsetParent;
                    }
                }
    
                return pos;
            };
    
            
            baidu.event = baidu.event || {};
    
            
            baidu.event._listeners = baidu.event._listeners || [];
    
            
            baidu.event.on = function (element, type, listener) {
                type = type.replace(/^on/i, '');
                element = baidu.dom._g(element);
    
                var realListener = function (ev) {
                        // 1. 这里不支持EventArgument,  原因是跨frame的事件挂载
                        // 2. element是为了修正this
                        listener.call(element, ev);
                    },
                    lis = baidu.event._listeners,
                    filter = baidu.event._eventFilter,
                    afterFilter,
                    realType = type;
                type = type.toLowerCase();
                // filter过滤
                if(filter && filter[type]){
                    afterFilter = filter[type](element, type, realListener);
                    realType = afterFilter.type;
                    realListener = afterFilter.listener;
                }
    
                // 事件监听器挂载
                if (element.addEventListener) {
                    element.addEventListener(realType, realListener, false);
                } else if (element.attachEvent) {
                    element.attachEvent('on' + realType, realListener);
                }
    
                // 将监听器存储到数组中
                lis[lis.length] = [element, type, listener, realListener, realType];
                return element;
            };
    
            // 声明快捷方法
            baidu.on = baidu.event.on;
    
           
    
            (function(){
                //不直接使用window，可以提高3倍左右性能
                var guid = window[baidu.guid];
    
                baidu.lang.guid = function() {
                    return "TANGRAM__" + (guid._counter ++).toString(36);
                };
    
                guid._counter = guid._counter || 1;
            })();
    
            
    
            window[baidu.guid]._instances = window[baidu.guid]._instances || {};
    
            
            baidu.lang.isFunction = function (source) {
                // chrome下,'function' == typeof /a/ 为true.
                return '[object Function]' == Object.prototype.toString.call(source);
            };
    
            baidu.lang.Class = function(guid) {
                this.guid = guid || baidu.lang.guid();
                window[baidu.guid]._instances[this.guid] = this;
            };
            window[baidu.guid]._instances = window[baidu.guid]._instances || {};
    
            /**
             * 释放对象所持有的资源，主要是自定义事件。
             * @name dispose
             * @grammar obj.dispose()
             */
            baidu.lang.Class.prototype.dispose = function(){
                delete window[baidu.guid]._instances[this.guid];
    
                for(var property in this){
                    if (!baidu.lang.isFunction(this[property])) {
                        delete this[property];
                    }
                }
                this.disposed = true;
            };
    
            
            baidu.lang.Class.prototype.toString = function(){
                return "[object " + (this._className || "Object" ) + "]";
            };
    
            
            baidu.lang.Event = function (type, target) {
                this.type = type;
                this.returnValue = true;
                this.target = target || null;
                this.currentTarget = null;
            };
    
            
            baidu.lang.Class.prototype.addEventListener = function (type, handler, key) {
                if (!baidu.lang.isFunction(handler)) {
                    return;
                }
    
                !this.__listeners && (this.__listeners = {});
    
                var t = this.__listeners, id;
                if (typeof key == "string" && key) {
                    if (/[^\w\-]/.test(key)) {
                        throw("nonstandard key:" + key);
                    } else {
                        handler.hashCode = key;
                        id = key;
                    }
                }
                type.indexOf("on") != 0 && (type = "on" + type);
    
                typeof t[type] != "object" && (t[type] = {});
                id = id || baidu.lang.guid();
                handler.hashCode = id;
                t[type][id] = handler;
            };
    
           
            baidu.lang.Class.prototype.removeEventListener = function (type, handler) {
                if (typeof handler != "undefined") {
                    if ( (baidu.lang.isFunction(handler) && ! (handler = handler.hashCode))
                        || (! baidu.lang.isString(handler))
                    ){
                        return;
                    }
                }
    
                !this.__listeners && (this.__listeners = {});
    
                type.indexOf("on") != 0 && (type = "on" + type);
    
                var t = this.__listeners;
                if (!t[type]) {
                    return;
                }
                if (typeof handler != "undefined") {
                    t[type][handler] && delete t[type][handler];
                } else {
                    for(var guid in t[type]){
                        delete t[type][guid];
                    }
                }
            };
    
           
            baidu.lang.Class.prototype.dispatchEvent = function (event, options) {
                if (baidu.lang.isString(event)) {
                    event = new baidu.lang.Event(event);
                }
                !this.__listeners && (this.__listeners = {});
    
                // 20100603 添加本方法的第二个参数，将 options extend到event中去传递
                options = options || {};
                for (var i in options) {
                    event[i] = options[i];
                }
    
                var i, t = this.__listeners, p = event.type;
                event.target = event.target || this;
                event.currentTarget = this;
    
                p.indexOf("on") != 0 && (p = "on" + p);
    
                baidu.lang.isFunction(this[p]) && this[p].apply(this, arguments);
    
                if (typeof t[p] == "object") {
                    for (i in t[p]) {
                        t[p][i].apply(this, arguments);
                    }
                }
                return event.returnValue;
            };
    
    
            baidu.lang.inherits = function (subClass, superClass, className) {
                var key, proto,
                    selfProps = subClass.prototype,
                    clazz = new Function();
    
                clazz.prototype = superClass.prototype;
                proto = subClass.prototype = new clazz();
                for (key in selfProps) {
                    proto[key] = selfProps[key];
                }
                subClass.prototype.constructor = subClass;
                subClass.superClass = superClass.prototype;
    
                // 类名标识，兼容Class的toString，基本没用
                if ("string" == typeof className) {
                    proto._className = className;
                }
            };
            // 声明快捷方法
            baidu.inherits = baidu.lang.inherits;
        })();
    
    
        var _IMAGE_PATH = './img/blue';
    
        
        var _IMAGE_EXTENSION  = 'png';
    
        
        var TextIconOverlay =
           
            BMapLib.TextIconOverlay = function(position, text, options){
                this._position = position;
                this._text = text;
                this._options = options || {};
                this._styles = this._options['styles'] || [];
                (!this._styles.length) && this._setupDefaultStyles();
            };
    
        T.lang.inherits(TextIconOverlay, BMap.Overlay, "TextIconOverlay");
    
        TextIconOverlay.prototype._setupDefaultStyles = function(){
            
            this._styles.push({
                url:_IMAGE_PATH + '.' + _IMAGE_EXTENSION,
                size: new BMap.Size(92, 92)
            });
            //单条数据
    
        };
    
       
        TextIconOverlay.prototype.initialize = function(map){
            this._map = map;
    
            this._domElement = document.createElement('div');
            this._updateCss();
            this._updateText();
            this._updatePosition();
    
            this._bind();
    
            this._map.getPanes().markerMouseTarget.appendChild(this._domElement);
            return this._domElement;
        };
    
       
        TextIconOverlay.prototype.draw = function(){
            this._map && this._updatePosition();
        };
    
       
        TextIconOverlay.prototype.getText = function(){
            return this._text;
        };
    
       
        TextIconOverlay.prototype.setText = function(text){
            if(text && (!this._text || (this._text.value != text.value) || (this._text.name != text.name))){
                this._text = text;
                this._updateText();
                this._updateCss();
                this._updatePosition();
            }
        };
    
       
        TextIconOverlay.prototype.setPosition = function (position) {
            if(position && (!this._position || !this._position.equals(position))){
                this._position = position;
                this._updatePosition();
            }
        };
    
        
        TextIconOverlay.prototype._updateCss = function(){
            //var style = this.getStyleByText(this._text, this._styles);
            var style = this._styles[0];
            this._domElement.style.cssText = this._buildCssText(style);
        };
    
        /**
        *更新覆盖物的显示文字。
        *@return 无返回值。
        */
        TextIconOverlay.prototype._updateText = function(){
            if (this._domElement) {
                this._domElement.innerHTML = '<p>'+this._text.name+'</p>'+'<p>'+this._text.value+'</p>';
            }
        };
    
        /**
        *调整覆盖物在地图上的位置更新覆盖物的显示文字。
        *@return 无返回值。
        */
        TextIconOverlay.prototype._updatePosition = function(){
            if (this._domElement && this._position) {
                var style = this._domElement.style;
                var pixelPosition= this._map.pointToOverlayPixel(this._position);
                pixelPosition.x -= Math.ceil(parseInt(style.width) / 2);
                pixelPosition.y -= Math.ceil(parseInt(style.height) / 2);
                style.left = pixelPosition.x + "px";
                style.top = pixelPosition.y + "px";
            }
        };
    
        /**
        * 为该覆盖物的HTML元素构建CSS
        * @param {IconStyle}  一个图标的风格。
        * @return {String} 构建完成的CSSTEXT。
        */
        TextIconOverlay.prototype._buildCssText = function(style) {
            //根据style来确定一些默认值
            var url = style['url'];
            var size = style['size'];
            var anchor = style['anchor'];
            var offset = style['offset'];
            var textColor = style['textColor'] || '#fff';
            var textSize = style['textSize'] || 10;
    
            var csstext = [];
            // if (T.browser["ie"] < 7) {
            //     csstext.push('filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(' +
            //         'sizingMethod=scale,src="' + url + '");')
            // } else {
                // csstext.push('background-image:url(' + url + ');');
                // var backgroundPosition = '0 0';
                // (offset instanceof BMap.Size) && (backgroundPosition = offset.width + 'px' + ' ' + offset.height + 'px');
                // csstext.push('background-position:' + backgroundPosition + ';');
                csstext.push('background-color:'+style.backgroundColor+';');
                csstext.push('border-radius:'+size.width+'px;');
                csstext.push('opacity: 0.8;');
            // }
    
            if (size instanceof BMap.Size){
                if (anchor instanceof BMap.Size) {
                    if (anchor.height > 0 && anchor.height < size.height) {
                          csstext.push('height:' + (size.height - anchor.height) + 'px; padding-top:' + anchor.height + 'px;');
                    }
                    if(anchor.width > 0 && anchor.width < size.width){
                        csstext.push('width:' + (size.width - anchor.width) + 'px; padding-left:' + anchor.width + 'px;');
                    }
                } else {
                    csstext.push('height:' + size.height + 'px; line-height:' + 20 + 'px;');
                    csstext.push('width:' + size.width + 'px; text-align:center;');
                }
            }
    
            if(style.zIndex){
                csstext.push('z-index:'+style.zIndex+';');
            }else{
                csstext.push('z-index:2;');
            }
    
            csstext.push('cursor:pointer; color:' + textColor + '; position:absolute; font-size:' +
                textSize + 'px; font-family:Arial,sans-serif; font-weight:bold');
    
            return csstext.join('');
        };
    
        TextIconOverlay.prototype._bind = function(){
            if (!this._domElement){
                return;
            }
    
            var me = this;
            var map = this._map;
    
            var BaseEvent = T.lang.Event;
            function eventExtend(e, be){
                var elem = e.srcElement || e.target;
                var x = e.clientX || e.pageX;
                var y = e.clientY || e.pageY;
                if (e && be && x && y && elem){
                    var offset = T.dom.getPosition(map.getContainer());
                    be.pixel = new BMap.Pixel(x - offset.left, y - offset.top);
                    be.point = map.pixelToPoint(be.pixel);
                }
                return be;
            }//给事件参数增加pixel和point两个值
    
            T.event.on(this._domElement,"mouseover", function(e){
                me.dispatchEvent(eventExtend(e, new BaseEvent("onmouseover")));
            });
            T.event.on(this._domElement,"mouseout", function(e){
                me.dispatchEvent(eventExtend(e, new BaseEvent("onmouseout")));
            });
            T.event.on(this._domElement,"click", function(e){
                me.dispatchEvent(eventExtend(e, new BaseEvent("onclick")));
            });
        };
    
    })();
    
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
    
    var BMapLib = window.BMapLib = BMapLib || {};
    (function(){
    
      
        var getExtendedBounds = function(map, bounds, gridSize){
            bounds = cutBoundsInRange(bounds);
            var pixelNE = map.pointToPixel(bounds.getNorthEast());
            var pixelSW = map.pointToPixel(bounds.getSouthWest());
            pixelNE.x += gridSize;
            pixelNE.y -= gridSize;
            pixelSW.x -= gridSize;
            pixelSW.y += gridSize;
            var newNE = map.pixelToPoint(pixelNE);
            var newSW = map.pixelToPoint(pixelSW);
            return new BMap.Bounds(newSW, newNE);
        };
    
      
        var cutBoundsInRange = function (bounds) {
            var maxX = getRange(bounds.getNorthEast().lng, -180, 180);
            var minX = getRange(bounds.getSouthWest().lng, -180, 180);
            var maxY = getRange(bounds.getNorthEast().lat, -74, 74);
            var minY = getRange(bounds.getSouthWest().lat, -74, 74);
            return new BMap.Bounds(new BMap.Point(minX, minY), new BMap.Point(maxX, maxY));
        };
    
     
        var getRange = function (i, mix, max) {
            mix && (i = Math.max(i, mix));
            max && (i = Math.min(i, max));
            return i;
        };
    
      
        var isArray = function (source) {
            return '[object Array]' === Object.prototype.toString.call(source);
        };
    
      
        var indexOf = function(item, source){
            var index = -1;
            if(isArray(source)){
                if (source.indexOf) {
                    index = source.indexOf(item);
                } else {
                    for (var i = 0, m; m = source[i]; i++) {
                        if (m === item) {
                            index = i;
                            break;
                        }
                    }
                }
            }
            return index;
        };
    
        
        var MarkerClusterer =
    
            BMapLib.MarkerClusterer = function(map, options){
                if (!map){
                    return;
                }
                this._map = map;
                this._markers = [];//所有的点位
                this._clusters = [];//聚合的数组
    
                var opts = options || {};
                this._gridSize = opts["gridSize"] || 60;
                this._maxZoom = opts["maxZoom"] || 18;
                this._minClusterSize = opts["minClusterSize"] || 1;
                this._isAverageCenter = false;
                if (opts['isAverageCenter'] != undefined) {
                    this._isAverageCenter = opts['isAverageCenter'];
                }
                this._styles = opts["styles"] || [];
    
                var that = this;
                this._map.addEventListener("zoomend",function(){
                    that._redraw();
                });
    
                this._map.addEventListener("moveend",function(){
                     that._redraw();
                });
    
                var mkrs = opts["markers"];
                isArray(mkrs) && this.addMarkers(mkrs);
            };
    
       
        MarkerClusterer.prototype.addMarkers = function(markers){
            for(var i = 0, len = markers.length; i <len ; i++){
                this._pushMarkerTo(markers[i]);
            }
            this._createClusters();
        };
    
        MarkerClusterer.prototype._pushMarkerTo = function(marker){
            var index = indexOf(marker, this._markers);
            if(index === -1){
                marker.isInCluster = false;
                this._markers.push(marker);//Marker拖放后enableDragging不做变化，忽略
            }
        };
    
       
        MarkerClusterer.prototype.addMarker = function(marker) {
            this._pushMarkerTo(marker);
            this._createClusters();
        };
    
     
        MarkerClusterer.prototype._createClusters = function(){
            var mapBounds = this._map.getBounds();
            var extendedBounds = getExtendedBounds(this._map, mapBounds, this._gridSize);
            for(var i = 0, marker; marker = this._markers[i]; i++){
                if(!marker.isInCluster && extendedBounds.containsPoint(marker.getPosition()) ){
                    this._addToClosestCluster(marker);
                }
            }
        };
    
       
        MarkerClusterer.prototype._addToClosestCluster = function (marker){
            var distance = 4000000;
            var clusterToAddTo = null;
            var position = marker.getPosition();
            for(var i = 0, cluster; cluster = this._clusters[i]; i++){
                var center = cluster.getCenter();
                if(center){
                    var d = this._map.getDistance(center, marker.getPosition());
                    if(d < distance){
                        distance = d;
                        clusterToAddTo = cluster;
                    }
                }
            }
            if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)){
                clusterToAddTo.addMarker(marker);
            } else {
                //单个标记
                var cluster = new Cluster(this);
                cluster.addMarker(marker);
                this._clusters.push(cluster);
            }
        };
    
        MarkerClusterer.prototype._clearLastClusters = function(){
            for(var i = 0, cluster; cluster = this._clusters[i]; i++){
                cluster.remove();
            }
            this._clusters = [];//置空Cluster数组
            this._removeMarkersFromCluster();//把Marker的cluster标记设为false
        };
    
       
        MarkerClusterer.prototype._removeMarkersFromCluster = function(){
            for(var i = 0, marker; marker = this._markers[i]; i++){
                marker.isInCluster = false;
            }
        };
    
        MarkerClusterer.prototype._removeMarkersFromMap = function(){
            for(var i = 0, marker; marker = this._markers[i]; i++){
                marker.isInCluster = false;
                this._map.removeOverlay(marker);
            }
        };
    
    
        MarkerClusterer.prototype._removeMarker = function(marker) {
            var index = indexOf(marker, this._markers);
            if (index === -1) {
                return false;
            }
            this._map.removeOverlay(marker);
            this._markers.splice(index, 1);
            return true;
        };
    
    
        MarkerClusterer.prototype.removeMarker = function(marker) {
            var success = this._removeMarker(marker);
            if (success) {
                this._clearLastClusters();
                this._createClusters();
            }
            return success;
        };
    
     
        MarkerClusterer.prototype.removeMarkers = function(markers) {
            var success = false;
            for (var i = 0; i < markers.length; i++) {
                var r = this._removeMarker(markers[i]);
                success = success || r;
            }
    
            if (success) {
                this._clearLastClusters();
                this._createClusters();
            }
            return success;
        };
    
     
        MarkerClusterer.prototype.clearMarkers = function() {
            this._clearLastClusters();
            this._removeMarkersFromMap();
            this._markers = [];
        };
    
     
        MarkerClusterer.prototype._redraw = function () {
            this._clearLastClusters();
            //this._map.clearOverlays();
            this._createClusters();
        };
    
        /**
         * 获取网格大小
         * @return {Number} 网格大小
         */
        MarkerClusterer.prototype.getGridSize = function() {
            return this._gridSize;
        };
    
    
        MarkerClusterer.prototype.setGridSize = function(size) {
            this._gridSize = size;
            this._redraw();
        };
    
        MarkerClusterer.prototype.getMaxZoom = function() {
            return this._maxZoom;
        };
    
        MarkerClusterer.prototype.setMaxZoom = function(maxZoom) {
            this._maxZoom = maxZoom;
            this._redraw();
        };
    
        MarkerClusterer.prototype.getStyles = function() {
            return this._styles;
        };
    
        MarkerClusterer.prototype.setStyles = function(styles) {
            this._styles = styles;
            this._redraw();
        };
    
        MarkerClusterer.prototype.getMinClusterSize = function() {
            return this._minClusterSize;
        };
    
    
        MarkerClusterer.prototype.setMinClusterSize = function(size) {
            this._minClusterSize = size;
            this._redraw();
        };
    
    
        MarkerClusterer.prototype.isAverageCenter = function() {
            return this._isAverageCenter;
        };
    
    
        MarkerClusterer.prototype.getMap = function() {
          return this._map;
        };
    
        MarkerClusterer.prototype.getMarkers = function() {
            return this._markers;
        };
    
     
        MarkerClusterer.prototype.getClustersCount = function() {
            var count = 0;
        for(var i = 0, cluster; cluster = this._clusters[i]; i++){
                cluster.isReal() && count++;
            }
        return count;
        };
    
     
        function Cluster(markerClusterer){
            this._markerClusterer = markerClusterer;
            this._map = markerClusterer.getMap();
            this._minClusterSize = markerClusterer.getMinClusterSize();
            this._isAverageCenter = markerClusterer.isAverageCenter();
            this._center = null;//落脚位置
            this._markers = [];//这个Cluster中所包含的markers
            this._gridBounds = null;//以中心点为准，向四边扩大gridSize个像素的范围，也即网格范围
        this._isReal = false; //真的是个聚合
            this._styles = markerClusterer.getStyles();
            this._labels = [];
            this._clusterMarker = new BMapLib.TextIconOverlay(this._center, {name:'',value : ''}, {"styles":this._markerClusterer.getStyles()});
            //this._map.addOverlay(this._clusterMarker);
        }
    
       
        Cluster.prototype.addMarker = function(marker){
            if(this.isMarkerInCluster(marker)){
                return false;
            }//也可用marker.isInCluster判断,外面判断OK，这里基本不会命中
    
            if (!this._center){
                this._center = marker.getPosition();
                this.updateGridBounds();//
            } else {
                if(this._isAverageCenter){
                    var l = this._markers.length + 1;
                    var lat = (this._center.lat * (l - 1) + marker.getPosition().lat) / l;
                    var lng = (this._center.lng * (l - 1) + marker.getPosition().lng) / l;
                    this._center = new BMap.Point(lng, lat);
                    this.updateGridBounds();
                }//计算新的Center
            }
    
            marker.isInCluster = true;
            this._markers.push(marker);
    
            var len = this._markers.length;
            if(len < this._minClusterSize ){
                this._map.addOverlay(marker);
          //this.updateClusterMarker();
                return true;
            } else if (len === this._minClusterSize) {
                for (var i = 0; i < len; i++) {
                    this._markers[i].getMap() && this._map.removeOverlay(this._markers[i]);
                }
    
            }
            this._map.addOverlay(this._clusterMarker);
        this._isReal = true;
            this.updateClusterMarker();
            return true;
        };
    
     
        Cluster.prototype.isMarkerInCluster= function(marker){
            if (this._markers.indexOf) {
                return this._markers.indexOf(marker) != -1;
            } else {
                for (var i = 0, m; m = this._markers[i]; i++) {
                    if (m === marker) {
                        return true;
                    }
                }
            }
            return false;
        };
    
      
        Cluster.prototype.isMarkerInClusterBounds = function(marker) {
            return this._gridBounds.containsPoint(marker.getPosition());
        };
    
      Cluster.prototype.isReal = function(marker) {
            return this._isReal;
        };
    
       
        Cluster.prototype.updateGridBounds = function() {
            var bounds = new BMap.Bounds(this._center, this._center);
            this._gridBounds = getExtendedBounds(this._map, bounds, this._markerClusterer.getGridSize());
        };
    
        /**
         * 对于单个点添加label
         */
        Cluster.prototype.addLabel = function (marker) {
            //获取marker的坐标
            var position = marker.getPosition();
            //创建label
            var label = new BMap.Label({position : position});
            label.setStyle({
                height : '25px',
                color : "#fff",
                backgroundColor : this._styles[0].backgroundColor,
                border : 'none',
                borderRadius : "25px",
                fontWeight : 'bold',
                opacity : 0.9
            });
            var content = '<span style="color:'+this._styles[0].backgroundColor+'"><i class="fa fa-map-marker"></i></span>'
                        + '<p style="padding:0px 13px;text-align:center;margin-top:5px;cursor:pointer;">'+marker.getTitle()+'</p>';
            label.setContent(content)
            label.setPosition(position);
            label.addEventListener('click', function(){
                window.open("http://www.baidu.com");
            });
            this._labels.push(label);
            this._map.addOverlay(label);
        }
       
        Cluster.prototype.updateClusterMarker = function () {
            if (this._map.getZoom() > this._markerClusterer.getMaxZoom()) {
                this._clusterMarker && this._map.removeOverlay(this._clusterMarker);
                for (var i = 0, marker; marker = this._markers[i]; i++) {
                    //this._map.addOverlay(marker);
                    this.addLabel(marker);
                }
                return;
            }
    
            if (this._markers.length < this._minClusterSize) {
                this._clusterMarker.hide();
                return;
            }
    
            this._clusterMarker.setPosition(this._center);
    
            this._clusterMarker.setText({name : '' , value : ''});
    
            var thatMap = this._map;
            var thatBounds = this.getBounds();
            var center = this._center;
            this._clusterMarker.addEventListener("click", function(event){
                //这个方法容易造成晃动
                //thatMap.setViewport(thatBounds);
                //console.log(center);
                var zoom = thatMap.getZoom();
                zoom = zoom > 14 ? zoom : 14;
                thatMap.setZoom(zoom);
                thatMap.setCenter(center);
            });
    
            this._clusterMarker.addEventListener("mouseover", function(event){
                event.target._styles[0].zIndex=10;
                event.target._domElement.style.zIndex = 10;
                event.target._domElement.style.opacity = 1;
            });
    
            this._clusterMarker.addEventListener("mouseout", function(event){
                event.target._domElement.style.zIndex = 2;
                event.target._domElement.style.opacity = 0.9;
            });
        };
    
        
        Cluster.prototype.remove = function(){
            for (var i = 0, m; m = this._labels[i]; i++) {
                    this._map.removeOverlay(m);
            }//清除散的标记点
    
            this._map.removeOverlay(this._clusterMarker);
            this._markers.length = 0;
            delete this._markers;
        }
    
      
        Cluster.prototype.getBounds = function() {
            var bounds = new BMap.Bounds(this._center,this._center);
            for (var i = 0, marker; marker = this._markers[i]; i++) {
                bounds.extend(marker.getPosition());
            }
            return bounds;
        };
    
        
        Cluster.prototype.getCenter = function() {
            return this._center;
        };
    
    })();



//每次缩放地图，重新获取聚合点
 
      var dianarr = []
      this.state.markerList.map((el,i) => {
      dianarr.push({ 'x': el.lng, 'y':el.lat,})
    })

    var markers1 = [];
    var pt = null;
    for (var i in dianarr) {
       pt = new BMap.Point(dianarr[i].x , dianarr[i].y);
       markers1.push(new BMap.Marker(pt));
    }
    //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。

    var markerClusterer1 = new BMapLib.MarkerClusterer(map,
      {
        markers:markers1,
        girdSize : 100,
        styles : [{
                size: new BMap.Size(42,42),
          backgroundColor : '#4783E7'
        }],
      });
    markerClusterer1.setMaxZoom(12);
    markerClusterer1.setGridSize(100);

      
  




   














    const getBoundary = () => {
      var bdary = new BMap.Boundary();
      bdary.get(defpoint, function(rs) {
        //获取行政区域
        console.log("dian", rs.boundaries);
        
        var count = rs.boundaries.length; //行政区域的点有多少个

        for (var i = 0; i < count; i++) {
          var ply = new BMap.Polygon(rs.boundaries[i], {
            strokeWeight: 2, //设置多边形边线线粗
            strokeColor: "#2eccff", //设置多边形边线颜色
            strokeOpacity: 1, //设置多边形边线透明度0-1
            strokeStyle: "dashed", //设置多边形边线样式为实线或虚线，取值 solid 或 dashed
            fillColor: "#2eccff",
            fillOpacity: 0.2
          }); //建立多边形覆盖物
          map.addOverlay(ply); //添加覆盖物
        }
      });
    };

    getBoundary();
    const BMapLib = window.BMapLib;
    var geoc = new BMap.Geocoder();

    map.addEventListener("click", function(e) {
      var lnglat = JSON.stringify(e.point)
        .replace(/(")*/gi, "")
        .split(",");

      var lng = lnglat[0].slice(lnglat[0].indexOf(":") + 1);

      var lat = lnglat[1].slice(
        lnglat[1].indexOf(":") + 1,
        lnglat[1].length - 1
      );
      map.centerAndZoom(new BMap.Point(lng, lat), 12);
      // if (BMapLib.GeoUtils.isPointInPolygon(new BMap.Point(lng, lat), ply)) {
      // } else {
      //   return;
      // }
      var pt = e.point;
      geoc.getLocation(pt, function(rs) {
        var addComp = rs.addressComponents;
        _this.pointLoc.style.display = "inline-block";
        _this.pointLoc.value = `点击坐标：${JSON.stringify(e.point).replace(
          /(")*/gi,
          ""
        )}  详细地址：${addComp.province}${addComp.city}${addComp.district}${
          addComp.street
        }${addComp.streetNumber}`;
      });
    });


    // if (this.state.markerList && this.state.markerList.length > 0) {
    //   this.state.markerList.map((v, i) => {
    //     var pt = new BMap.Point(v.lng, v.lat);
    //     var myIcon = new BMap.Icon(
    //       `${v.count === "" ? greenpoint : redpoint}`,
    //       new BMap.Size(40, 40)
    //     );
    //     var offlineIcon = new BMap.Icon(graypoint, new BMap.Size(40, 40));
    //     var marker;
    //     if (!this.momenttime(v.lasttime) && !this.momenttime(v.hearttime)) {
    //       marker = new BMap.Marker(pt, { icon: offlineIcon });
    //     } else {
    //       marker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
    //     }
    //     map.addOverlay(marker);
    //     marker.addEventListener("click", function() {
    //       post(
    //         { url: "/api/camera_cop/getone", data: { code: v.code } },
    //         res => {
    //           if (res.success) {
    //             _this.setState({
    //               equipdat: Object.assign({}, res.data, res.alarm, {
    //                 prestatus:
    //                   _this.momenttime(res.data.hearttime) ||
    //                   _this.momenttime(res.alarm.atime)
    //               }),
    //               modalVisible: true
    //             });
    //           }
    //         }
    //       );
    //     });
    //     return;
    //   });
    // }
  };
  modalVis = () => {
    this.setState({ modalVisible: false });
  };
  showVidMo = (name, path) => {
    localStorage.setItem("vidpath", path);
    localStorage.setItem("vidtit", name);
    this.setState(
      {
        VidMo: true
      },
      () => {
        this.props.hideNewAla();
      }
    );
  };
  cancVidMo = () => {
    localStorage.setItem("vidpath", "");
    localStorage.setItem("vidtit", "");
    this.setState({
      VidMo: false
    });
  };

  render() {
    return (
      <Fragment>
        <div id="mapContainer" style={{ width: "100%", height: "100%" }} />
        <input
          className="pointLoc"
          style={{
            width: "570px",
            height: "40px",
            position: "absolute",
            top: "22px",
            right: "170px",
            background: "#e7ebed",
            padding: "5px",
            outline: "none",
            border: "none",
            display: "none"
          }}
          readOnly={true}
          ref={pointLoc => {
            this.pointLoc = pointLoc;
          }}
        />
        <div
          className="layerdatail"
          style={{
            display:
              this.state.equipdat.adminaccount && this.state.modalVisible
                ? "block"
                : "none"
          }}
        >
          <h3>
            设备详情
            <Icon
              type="close"
              onClick={this.modalVis}
              style={{
                cursor: "pointer",
                color: "#444",
                position: "absolute",
                top: "10px",
                right: "10px"
              }}
            />
          </h3>
          <p>
            <label>用户名：</label> <span>{this.state.equipdat.adminname}</span>
          </p>
          <p>
            <label>电话：</label>{" "}
            <span>{this.state.equipdat.adminaccount}</span>
          </p>
          <p>
            <label>设备名：</label> <span>{this.state.equipdat.name}</span>
          </p>
          <p>
            <label>设备状态：</label>{" "}
            <span>
              {this.state.equipdat.prestatus ? (
                <span
                  style={{
                    color: "green",
                    borderRadius: "2px",
                    border: "1px solid rgb(120,255,120)",
                    padding: "0 2px",
                    display: "inline-block",
                    lineHeight: "16px",
                    background: "rgb(180,255,180)"
                  }}
                >
                  在线
                </span>
              ) : (
                <span
                  style={{
                    color: "red",
                    borderRadius: "2px",
                    border: "1px solid rgb(255,80,80)",
                    padding: "0 2px",
                    lineHeight: "16px",
                    display: "inline-block",
                    background: "rgb(255,170,170)"
                  }}
                >
                  离线
                </span>
              )}
            </span>
          </p>
          <p>
            <label>设备地址：</label>{" "}
            <span>{this.state.equipdat.location}</span>
          </p>
          {this.state.equipdat.atime ? (
            <Fragment>
              <p>
                <label>现场情况：</label>{" "}
                <span>{this.state.equipdat.atime}</span>
              </p>
              <div>
                {this.state.equipdat.pic_min ? (
                  <img src={this.state.equipdat.pic_min} width="100%" alt="" />
                ) : null}
              </div>
              <div style={{ marginTop: "5px", textAlign: "center" }}>
                <video
                  src={this.state.equipdat.videopath}
                  width="100%"
                  autoPlay="autoplay"
                  loop="loop"
                />
                <button
                  // onClick={() => {
                  //   this.showVidMo(
                  //     this.state.equipdat.name,
                  //     this.state.equipdat.videopath
                  //   );
                  // }}
                  style={{
                    margin: "20px auto",
                    borderRadius: "2px",
                    background: "#313653",
                    border: "none",
                    color: "#fff"
                  }}
                >
                  实时视频
                </button>
              </div>
            </Fragment>
          ) : null}
          <Modal
            title={localStorage.getItem("vidtit")}
            visible={this.state.VidMo}
            onCancel={this.cancVidMo}
            footer={null}
            destroyOnClose={true}
            centered={true}
            width="60%"
          >
            <div>
              <video
                src={localStorage.getItem("vidpath")}
                autoPlay="autoplay"
                controls
                width="100%"
              />
            </div>
          </Modal>
        </div>
      </Fragment>
    );
  }
}

export default Map;
