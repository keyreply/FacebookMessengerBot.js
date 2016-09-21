'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Buttons = function () {
  function Buttons() {
    (0, _classCallCheck3.default)(this, Buttons);

    this._buttons = [];
  }

  (0, _createClass3.default)(Buttons, [{
    key: 'add',
    value: function add(_ref) {
      var text = _ref.text;
      var data = _ref.data;
      var url = _ref.url;
      var phone = _ref.phone;
      var event = _ref.event;
      var account_linking = _ref.account_linking;

      if (!data && !url && !event && !phone) {
        throw Error('Must provide a url or data i.e. {data: null} or {url: \'https://facebook.com\'}');
      }

      this._buttons.push({ text: text || 'Button', event: event, data: data, phone: phone, url: url, account_linking: account_linking });
      return this;
    }
  }, {
    key: 'toJSON',
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
              buttons.push({ type: 'account_unlink' });
            } else if (button.url) {
              buttons.push({ type: 'account_link', url: button.url });
            } else {
              console.log('[fb-msger-bot] Missing url for account linking');
            }
          } else if (button.url) {
            buttons.push({ type: 'web_url', url: button.url, title: button.text });
          } else if (button.data) {
            var payload = (0, _stringify2.default)({ data: button.data, event: button.event });
            buttons.push({ type: 'postback', payload: payload, title: button.text });
          } else if (button.phone) {
            buttons.push({ type: 'phone_number', payload: button.phone, title: button.text });
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
    key: 'length',
    get: function get() {
      return this._buttons.length;
    }
  }], [{
    key: 'from',
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
