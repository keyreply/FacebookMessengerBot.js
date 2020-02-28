"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bot = exports.wait = exports.QuickReplies = exports.Buttons = exports.Elements = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _bluebird = require("bluebird");

var wait = exports.wait = function () {
  var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee(time) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new _promise2.default(function (resolve) {
              return setTimeout(function () {
                return resolve();
              }, time);
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function wait(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _events = require("events");

var _events2 = _interopRequireDefault(_events);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require("express");

var _Elements = require("./Elements.js");

var _Elements2 = _interopRequireDefault(_Elements);

var _Buttons = require("./Buttons.js");

var _Buttons2 = _interopRequireDefault(_Buttons);

var _QuickReplies = require("./QuickReplies.js");

var _QuickReplies2 = _interopRequireDefault(_QuickReplies);

var _fetch = require("./libs/fetch.js");

var _fetch2 = _interopRequireDefault(_fetch);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Elements = _Elements2.default;
exports.Buttons = _Buttons2.default;
exports.QuickReplies = _QuickReplies2.default;


var userCache = {};

var Bot = function (_EventEmitter) {
  (0, _inherits3.default)(Bot, _EventEmitter);

  function Bot(token, verification) {
    var debug = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    (0, _classCallCheck3.default)(this, Bot);

    // support multiple tokens with backwards compatibility
    var _this = (0, _possibleConstructorReturn3.default)(this, (Bot.__proto__ || (0, _getPrototypeOf2.default)(Bot)).call(this));

    if ((typeof token === "undefined" ? "undefined" : (0, _typeof3.default)(token)) === "object") {
      _this._tokens = token;
    } else {
      _this._token = token;
    }
    _this._debug = debug;
    _this._verification = verification;
    return _this;
  }

  (0, _createClass3.default)(Bot, [{
    key: "setGreeting",
    value: function () {
      var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(text, pageId) {
        var _ref3, result;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // support multiple tokens with backwards compatibility
                if (pageId && this._tokens) {
                  this._token = this._tokens[pageId];
                }

                _context2.next = 3;
                return (0, _fetch2.default)("https://graph.facebook.com/v6.0/me/thread_settings", {
                  method: "post",
                  json: true,
                  query: { access_token: this._token },
                  body: { setting_type: "greeting", greeting: { text: text } }
                });

              case 3:
                _ref3 = _context2.sent;
                result = _ref3.body.result;
                return _context2.abrupt("return", result);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setGreeting(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return setGreeting;
    }()
  }, {
    key: "setGetStarted",
    value: function () {
      var _ref4 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(input, pageId) {
        var _ref5, _result, data, event, _ref6, result;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // support multiple tokens with backwards compatibility
                if (pageId && this._tokens) {
                  this._token = this._tokens[pageId];
                }

                if (input) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 4;
                return (0, _fetch2.default)("https://graph.facebook.com/v6.0/me/thread_settings", {
                  method: "delete",
                  json: true,
                  query: { access_token: this._token },
                  body: {
                    setting_type: "call_to_actions",
                    thread_state: "new_thread"
                  }
                });

              case 4:
                _ref5 = _context3.sent;
                _result = _ref5.body.result;
                return _context3.abrupt("return", _result);

              case 7:
                data = input.data, event = input.event;
                _context3.next = 10;
                return (0, _fetch2.default)("https://graph.facebook.com/v6.0/me/thread_settings", {
                  method: "post",
                  json: true,
                  query: { access_token: this._token },
                  body: {
                    setting_type: "call_to_actions",
                    thread_state: "new_thread",
                    call_to_actions: [{ payload: (0, _stringify2.default)({ data: data, event: event }) }]
                  }
                });

              case 10:
                _ref6 = _context3.sent;
                result = _ref6.body.result;
                return _context3.abrupt("return", result);

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setGetStarted(_x5, _x6) {
        return _ref4.apply(this, arguments);
      }

      return setGetStarted;
    }()
  }, {
    key: "setPersistentMenu",
    value: function () {
      var _ref7 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(input, pageId) {
        var _ref8, _result2, _ref9, result;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // support multiple tokens with backwards compatibility
                if (pageId && this._tokens) {
                  this._token = this._tokens[pageId];
                }

                if (input) {
                  _context4.next = 7;
                  break;
                }

                _context4.next = 4;
                return (0, _fetch2.default)("https://graph.facebook.com/v6.0/me/thread_settings", {
                  method: "delete",
                  json: true,
                  query: { access_token: this._token },
                  body: {
                    setting_type: "call_to_actions",
                    thread_state: "existing_thread"
                  }
                });

              case 4:
                _ref8 = _context4.sent;
                _result2 = _ref8.body.result;
                return _context4.abrupt("return", _result2);

              case 7:
                _context4.next = 9;
                return (0, _fetch2.default)("https://graph.facebook.com/v6.0/me/thread_settings", {
                  method: "post",
                  json: true,
                  query: { access_token: this._token },
                  body: {
                    setting_type: "call_to_actions",
                    thread_state: "existing_thread",
                    call_to_actions: input
                  }
                });

              case 9:
                _ref9 = _context4.sent;
                result = _ref9.body.result;
                return _context4.abrupt("return", result);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function setPersistentMenu(_x7, _x8) {
        return _ref7.apply(this, arguments);
      }

      return setPersistentMenu;
    }()
  }, {
    key: "setTyping",
    value: function () {
      var _ref10 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(to, state, pageId) {
        var action, _ref11, result;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // support multiple tokens with backwards compatibility
                if (pageId && this._tokens) {
                  this._token = this._tokens[pageId];
                }

                action = state ? "typing_on" : "typing_off";
                _context5.next = 4;
                return (0, _fetch2.default)("https://graph.facebook.com/v6.0/me/messages", {
                  method: "post",
                  json: true,
                  query: { access_token: this._token },
                  body: { recipient: { id: to }, sender_action: action }
                });

              case 4:
                _ref11 = _context5.sent;
                result = _ref11.body.result;
                return _context5.abrupt("return", result);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function setTyping(_x9, _x10, _x11) {
        return _ref10.apply(this, arguments);
      }

      return setTyping;
    }()
  }, {
    key: "sendPrivateMessage",
    value: function () {
      var _ref12 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(id, message, pageId) {
        var text, err;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;

                // support multiple tokens with backwards compatibility
                if (pageId && this._tokens) {
                  this._token = this._tokens[pageId];
                }
                _context6.next = 4;
                return (0, _fetch2.default)("https://graph.facebook.com/v6.0/" + id + "/private_replies", {
                  method: "post",
                  json: true,
                  query: { access_token: this._token },
                  body: { id: id, message: message }
                });

              case 4:
                _context6.next = 15;
                break;

              case 6:
                _context6.prev = 6;
                _context6.t0 = _context6["catch"](0);

                if (!_context6.t0.text) {
                  _context6.next = 14;
                  break;
                }

                text = _context6.t0.text;

                try {
                  err = JSON.parse(_context6.t0.text).error;

                  text = (err.type || "Unknown") + ": " + (err.message || "No message");
                } catch (ee) {
                  // ignore
                }

                throw Error(text);

              case 14:
                throw _context6.t0;

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 6]]);
      }));

      function sendPrivateMessage(_x12, _x13, _x14) {
        return _ref12.apply(this, arguments);
      }

      return sendPrivateMessage;
    }()
  }, {
    key: "send",
    value: function () {
      var _ref13 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(to, message) {
        var notification_type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "REGULAR";
        var pageId = arguments[3];
        var tag = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "NON_PROMOTIONAL_SUBSCRIPTION";
        var text, err;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                // support multiple tokens with backwards compatibility
                if (pageId && this._tokens) {
                  this._token = this._tokens[pageId];
                }

                if (this._debug) {
                  console.log({
                    recipient: { id: to },
                    message: message ? message.toJSON() : message,
                    notification_type: notification_type,
                    tag: tag
                  });
                }

                _context7.prev = 2;
                _context7.next = 5;
                return (0, _fetch2.default)("https://graph.facebook.com/v6.0/me/messages", {
                  method: "post",
                  json: true,
                  query: { access_token: this._token },
                  body: { recipient: { id: to }, message: message, notification_type: notification_type, tag: tag }
                });

              case 5:
                _context7.next = 16;
                break;

              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7["catch"](2);

                if (!_context7.t0.text) {
                  _context7.next = 15;
                  break;
                }

                text = _context7.t0.text;

                try {
                  err = JSON.parse(_context7.t0.text).error;

                  text = (err.type || "Unknown") + ": " + (err.message || "No message");
                } catch (ee) {
                  // ignore
                }

                throw Error(text);

              case 15:
                throw _context7.t0;

              case 16:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[2, 7]]);
      }));

      function send(_x15, _x16) {
        return _ref13.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: "fetchUser",
    value: function () {
      var _ref14 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(id) {
        var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "first_name,last_name,profile_pic";
        var cache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var pageId = arguments[3];

        var key, props, _ref15, body;

        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                // support multiple tokens with backwards compatibility
                if (pageId && this._tokens) {
                  this._token = this._tokens[pageId];
                }

                key = id + fields;
                props = void 0;

                if (!(cache && userCache[key])) {
                  _context8.next = 8;
                  break;
                }

                props = userCache[key];
                props.fromCache = true;
                _context8.next = 15;
                break;

              case 8:
                _context8.next = 10;
                return (0, _fetch2.default)("https://graph.facebook.com/v6.0/" + id, {
                  query: { access_token: this._token, fields: fields },
                  json: true
                });

              case 10:
                _ref15 = _context8.sent;
                body = _ref15.body;


                props = body;
                props.fromCache = false;

                if (cache) {
                  userCache[key] = props;
                }

              case 15:
                return _context8.abrupt("return", props);

              case 16:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function fetchUser(_x19) {
        return _ref14.apply(this, arguments);
      }

      return fetchUser;
    }()
  }, {
    key: "handleStandby",
    value: function () {
      var _ref16 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(input) {
        var body, message;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                body = JSON.parse((0, _stringify2.default)(input));
                message = body.entry[0].standby[0];

                //filter for message_delivered events

                if (message.delivery && message.delivery.mids && message.delivery.mids[0]) {
                  this.emit("standby", message);
                }

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function handleStandby(_x22) {
        return _ref16.apply(this, arguments);
      }

      return handleStandby;
    }()
  }, {
    key: "handleMessage",
    value: function () {
      var _ref17 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(input) {
        var _this2 = this;

        var body, entry, message, postback, _postback, attachments, location;

        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                body = JSON.parse((0, _stringify2.default)(input));
                entry = body.entry[0];

                if (!(body.object === "page" && Array.isArray(entry.changes) && entry.changes.length > 0)) {
                  _context11.next = 4;
                  break;
                }

                return _context11.abrupt("return", this.emit("page", entry.changes, entry.id, entry.time));

              case 4:
                message = body.entry[0].messaging[0];


                (0, _assign2.default)(message, message.message);
                delete message.message;

                message.raw = input;

                message.sender.fetch = function () {
                  var _ref18 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(fields, cache) {
                    var props;
                    return _regenerator2.default.wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            _context10.next = 2;
                            return _this2.fetchUser(message.sender.id, fields, cache, message.recipient.id);

                          case 2:
                            props = _context10.sent;

                            (0, _assign2.default)(message.sender, props);
                            return _context10.abrupt("return", message.sender);

                          case 5:
                          case "end":
                            return _context10.stop();
                        }
                      }
                    }, _callee10, _this2);
                  }));

                  return function (_x24, _x25) {
                    return _ref18.apply(this, arguments);
                  };
                }();

                // POSTBACK

                if (!message.postback) {
                  _context11.next = 15;
                  break;
                }

                postback = {};


                try {
                  postback = JSON.parse(message.postback.payload) || {};
                } catch (e) {
                  // ignore
                }
                message.isButton = true;

                if (postback.hasOwnProperty("data")) {
                  //message.postback = postback;
                  message.data = postback.data;
                  message.event = postback.event;

                  this.emit("postback", message.event, message, message.data);

                  if (postback.hasOwnProperty("event")) {
                    this.emit(message.event, message, message.data);
                  }
                } else {
                  this.emit("invalid-postback", message, message.postback);
                }

                return _context11.abrupt("return");

              case 15:
                if (!message.delivery) {
                  _context11.next = 21;
                  break;
                }

                (0, _assign2.default)(message, message.delivery);
                message.delivered = message.delivery.mids;

                delete message.delivery;

                this.emit("delivery", message, message.delivered);
                return _context11.abrupt("return");

              case 21:
                if (!message.optin) {
                  _context11.next = 26;
                  break;
                }

                message.param = message.optin.ref || true;
                message.optin = message.param;
                this.emit("optin", message, message.optin);
                return _context11.abrupt("return");

              case 26:
                if (!(message.quick_reply && !message.is_echo)) {
                  _context11.next = 32;
                  break;
                }

                _postback = {};


                try {
                  _postback = JSON.parse(message.quick_reply.payload) || {};
                } catch (e) {
                  // ignore
                }

                message.isQuickReply = true;

                if (_postback.hasOwnProperty("data")) {
                  message.postback = _postback;
                  message.data = _postback.data;
                  message.event = _postback.event;

                  this.emit("postback", message.event, message, message.data);

                  if (_postback.hasOwnProperty("event")) {
                    this.emit(message.event, message, message.data);
                  }
                } else {
                  this.emit("invalid-postback", message, message.postback);
                }

                return _context11.abrupt("return");

              case 32:
                attachments = _lodash2.default.groupBy(message.attachments, "type");


                if (attachments.file) {
                  message.files = attachments.file.map(function (a) {
                    return a.payload.url;
                  });
                }

                if (attachments.image) {
                  message.images = attachments.image.map(function (a) {
                    return a.payload.url;
                  });
                }

                if (attachments.video) {
                  message.videos = attachments.video.map(function (a) {
                    return a.payload.url;
                  });
                }

                if (attachments.audio) {
                  message.audio = attachments.audio.map(function (a) {
                    return a.payload.url;
                  })[0];
                }

                if (attachments.location) {
                  location = attachments.location[0];

                  message.location = (0, _extends3.default)({}, location, location.payload.coordinates);
                  delete message.location.payload;
                }

                message.object = body.object;

                delete message.attachments;

                this.emit("message", message);

              case 41:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function handleMessage(_x23) {
        return _ref17.apply(this, arguments);
      }

      return handleMessage;
    }()
  }, {
    key: "router",
    value: function router() {
      var _this3 = this;

      var router = new _express.Router();

      router.use(_bodyParser2.default.json());

      router.get("/", function (req, res) {
        if (req.query["hub.verify_token"] === _this3._verification) {
          res.send(req.query["hub.challenge"]);
        } else {
          res.send("Error, wrong validation token");
        }
      });

      router.post("/", function (req, res) {
        if (req.body.entry[0].standby) {
          _this3.handleStandby(req.body);
        } else {
          _this3.handleMessage(req.body);
        }
        res.send().status(200);
      });

      return router;
    }
  }]);
  return Bot;
}(_events2.default);

Bot.Buttons = _Buttons2.default;
Bot.Elements = _Elements2.default;
Bot.wait = wait;
exports.Bot = Bot;
exports.default = Bot;
//# sourceMappingURL=Bot.js.map
