'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduxBridge = exports.WebSocketBridge = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reconnectingWebsocket = require('reconnecting-websocket');

var _reconnectingWebsocket2 = _interopRequireDefault(_reconnectingWebsocket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var identity = function identity(action, stream) {
  return action;
};

var WebSocketBridge = function () {
  function WebSocketBridge() {
    _classCallCheck(this, WebSocketBridge);

    this._socket = null;
    this.streams = {};
  }

  _createClass(WebSocketBridge, [{
    key: 'connect',
    value: function connect(url) {
      var _url = void 0;
      if (url === undefined) {
        // Use wss:// if running on https://
        var scheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
        _url = scheme + '://' + window.location.host + '/ws';
      } else {
        _url = url;
      }
      this._socket = new _reconnectingWebsocket2.default(_url);
    }
  }, {
    key: 'reconnect',
    value: function reconnect(state) {
      // add recovery logic here..
    }
  }, {
    key: 'send',
    value: function send(action) {
      this._socket.send(JSON.stringify(action));
    }
  }, {
    key: 'demultiplex',
    value: function demultiplex(stream) {
      var transform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;

      this.streams[stream] = transform;
    }
  }, {
    key: 'stream',
    value: function stream(_stream) {
      var _this = this;

      return {
        send: function send(action) {
          var msg = {
            stream: _stream,
            payload: action
          };
          _this._socket.send(JSON.stringify(msg));
        }
      };
    }
  }]);

  return WebSocketBridge;
}();

exports.WebSocketBridge = WebSocketBridge;

var ReduxBridge = function (_WebSocketBridge) {
  _inherits(ReduxBridge, _WebSocketBridge);

  function ReduxBridge() {
    _classCallCheck(this, ReduxBridge);

    return _possibleConstructorReturn(this, (ReduxBridge.__proto__ || Object.getPrototypeOf(ReduxBridge)).apply(this, arguments));
  }

  _createClass(ReduxBridge, [{
    key: 'listen',
    value: function listen(store) {
      var _this3 = this;

      var transform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;

      this._socket.onmessage = function (event) {
        var msg = JSON.parse(event.data);
        var action = void 0;
        var stream = void 0;
        if (msg.stream !== undefined && _this3.streams[msg.stream] !== undefined) {
          action = msg.payload;
          stream = msg.stream;
          transform = _this3.streams[stream];
        } else {
          action = msg;
          stream = null;
        }
        _this3.receiveSocketMessage(store, action, stream, transform);
      };

      this._socket.onopen = function () {
        var state = store.getState();

        if (state.currentUser !== null) {
          // the connection was dropped. Call the recovery logic
          _this3.reconnect(state);
        }
      };
    }
  }, {
    key: 'receiveSocketMessage',
    value: function receiveSocketMessage(store, action, stream, transform) {
      /* We cheat by using the Redux-style Actions as our
       * communication protocol with the server. This hack allows
       * the server to directly act as a Action Creator, which we
       * simply `dispatch()`.  Consider separating communication format
       * from client-side msg API.
       */
      return store.dispatch(transform(action));
    }
  }]);

  return ReduxBridge;
}(WebSocketBridge);

var reduxBridge = exports.reduxBridge = new ReduxBridge();
exports.default = reduxBridge;