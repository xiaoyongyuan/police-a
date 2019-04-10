(function($) {
 
	$.config = {
        appKey:'',
		chanel:''
	};
 
	$.init=function(config) {
		this.config = config;
		return this;
	};
 
	/**
	 * ����webcocket
	 */
	$.connect = function() {
		//var protocol = (window.location.protocol == 'http:') ? 'ws:' : 'wss:';
		var protocol =  'ws://192.168.1.125:8010/websoctet';
		this.host = protocol +'?appKey='+this.config.appKey+'&chanel='+this.config.chanel;
 
		window.WebSocket = window.WebSocket || window.MozWebSocket;
		if(!window.WebSocket) { // ��������֧��  
			this.error('Error: WebSocket is not supported .');
			return;
		}
		this.socket = new WebSocket(this.host); // �������Ӳ�ע����Ӧ����  
		this.socket.onopen = function() {
			$.onopen();
		};
		this.socket.onmessage = function(message) {
			$.onmessage(message); 
		};
		this.socket.onclose = function() {
			$.onclose();
			$.socket = null; // ����  
		};
		this.socket.onerror = function(errorMsg) {
			$.onerror(errorMsg);
		}
		return this;
	}
 
	/**
	 * �Զ����쳣����
	 * @param {Object} errorMsg
	 */
	$.error = function(errorMsg) {
		this.onerror(errorMsg);
	}
 
	/**
	 * ��Ϣ����
	 */
	$.send = function(message) {
		if(this.socket) {
			this.socket.send(message);
			return true;
		}
		this.error('please connect to the server first !!!');
		return false;
	}
 
	$.close = function() {
		if(this.socket != undefined && this.socket != null) {
			this.socket.close();
		} else {
			this.error("this socket is not available");
		}
	}
 
	/**
	 * ��Ϣ���{
	 * @param {Object} message
	 */
	$.onmessage = function(message) {
 
	}
 
	/**
	 * ���ӻص�����
	 */
	$.onopen = function() {
 
	}
 
	/**
	 * �رջص�
	 */
	$.onclose = function() {
 
	}
 
	/**
	 * �쳣�ص�
	 */
	$.onerror = function() {
 
	}
 
})(pushJs = {});
