'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebsocketBridge = undefined;

var _reconnectingWebsocket = require('reconnecting-websocket');

var _reconnectingWebsocket2 = _interopRequireDefault(_reconnectingWebsocket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var receiveSocketMessage = function receiveSocketMessage(store, msg) {
  /* We cheat by using the Redux-style Actions as our
   * communication protocol with the server. This hack allows
   * the server to directly act as a Action Creator, which we
   * simply `dispatch()`.  Consider separating communication format
   * from client-side msg API.
   */
  var action = void 0;
  if (_socket.stream !== undefined && _socket.stream === msg.stream) {
    action = msg.payload;
  } else {
    action = msg;
  }
  if (action !== undefined) {
    return store.dispatch(action);
  }
};

var reconnect = function reconnect(state) {
  // add recovery logic here..
};

var _socket = null;

var WebsocketBridge = exports.WebsocketBridge = {
  connect: function connect(stream) {
    // Use wss:// if running on https://
    var scheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
    var url = scheme + '://' + window.location.host + '/ws';
    _socket = new _reconnectingWebsocket2.default(url);
    _socket.stream = stream;
  },

  listen: function listen(store, stream) {
    _socket.onmessage = function (event) {
      var msg = JSON.parse(event.data);
      receiveSocketMessage(store, msg);
    };

    _socket.onopen = function () {
      var state = store.getState();

      if (state.currentUser !== null) {
        // the connection was dropped. Call the recovery logic
        reconnect(state);
      }
    };
  },

  send: function send(action) {
    var msg = void 0;
    if (_socket.stream) {
      msg = {
        stream: _socket.stream,
        payload: action
      };
    } else {
      msg = action;
    }
    _socket.send(JSON.stringify(msg));
  }
};

exports.default = WebsocketBridge;