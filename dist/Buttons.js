"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Buttons = function () {
  function Buttons(buttons) {
    var _this = this;

    (0, _classCallCheck3.default)(this, Buttons);

    this._buttons = [];

    if (buttons != null) {
      if (Array.isArray(buttons)) {
        buttons.forEach(function (button) {
          return _this.add(button);
        });
      } else {
        this.add(buttons);
      }
    }
  }

  (0, _createClass3.default)(Buttons, [{
    key: "add",
    value: function add(button) {
      if (!button.data && !button.url && !button.event && !button.phone && !button.share) {
        throw Error("Must provide a url or data i.e. {data: null} or {url: 'https://facebook.com'}");
      }
      var _buttons = (0, _assign2.default)({
        text: button.text || "Button"
      }, button);

      this._buttons.push(_buttons);
      return this;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var buttons = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(this._buttons), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var button = _step.value;

          if (button.account_linking) {
            if (!button.account_linking.linking) {
              buttons.push({ type: "account_unlink" });
            } else if (button.url) {
              buttons.push({ type: "account_link", url: button.url });
            } else {
              throw Error("Missing url for account linking");
            }
          } else if (button.url) {
            buttons.push({
              type: "web_url",
              url: button.url,
              title: button.text,
              messenger_extensions: button.messenger_extensions,
              webview_height_ratio: button.webview_height_ratio || "full"
            });
          } else if (button.data != null) {
            var payload = (0, _stringify2.default)({
              data: button.data,
              event: button.event
            });
            buttons.push({
              type: "postback",
              payload: payload,
              title: button.text,
              options: button.options
            });
          } else if (button.share) {
            buttons.push({ type: "element_share" });
          } else if (button.phone) {
            buttons.push({
              type: "phone_number",
              payload: button.phone,
              title: button.text
            });
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return buttons;
    }
  }, {
    key: "length",
    get: function get() {
      return this._buttons.length;
    }
  }], [{
    key: "from",
    value: function from(array) {
      var buttons = new Buttons();
      array.forEach(function (arg) {
        return buttons.add(arg);
      });
      return buttons;
    }
  }]);
  return Buttons;
}();

exports.default = Buttons;
//# sourceMappingURL=Buttons.js.map
