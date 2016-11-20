'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Buttons = require('./Buttons');

var _Buttons2 = _interopRequireDefault(_Buttons);

var _QuickReplies = require('./QuickReplies');

var _QuickReplies2 = _interopRequireDefault(_QuickReplies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Elements = function () {
  function Elements() {
    (0, _classCallCheck3.default)(this, Elements);

    this._elements = [];
    this._quickreplies = null;
    this._listStyle = null;
    this._buttons = null;
  }

  (0, _createClass3.default)(Elements, [{
    key: 'add',
    value: function add(_ref) {
      var text = _ref.text,
          image = _ref.image,
          subtext = _ref.subtext,
          url = _ref.url,
          buttons = _ref.buttons;

      if (buttons) {
        if (!(buttons instanceof _Buttons2.default)) {
          if (Array.isArray(buttons)) {
            buttons = _Buttons2.default.from(buttons);
          } else {
            throw Error('Unable to parse buttons');
          }
        }
      }

      this._elements.push({
        text: text,
        image: image,
        subtext: subtext,
        url: url,
        buttons: buttons
      });
      return this;
    }
  }, {
    key: 'setQuickReplies',
    value: function setQuickReplies(quickreplies) {
      if (quickreplies) {
        if (!(quickreplies instanceof _QuickReplies2.default)) {
          if (Array.isArray(quickreplies)) {
            quickreplies = _QuickReplies2.default.from(quickreplies);
          } else {
            throw Error('Unable to parse quickreplies');
          }
        }
      }

      this._quickreplies = quickreplies;
    }
  }, {
    key: 'setListStyle',
    value: function setListStyle(listStyle, buttons) {
      if (listStyle === 'large' || listStyle === 'compact') {
        this._listStyle = listStyle;
      } else {
        throw Error('Valid values for list styles are "large" or "compact"');
      }

      if (buttons) {
        if (!(buttons instanceof _Buttons2.default)) {
          if (Array.isArray(buttons)) {
            this._buttons = _Buttons2.default.from(buttons);
          } else {
            throw Error('Unable to parse buttons');
          }
        }
      }
    }
  }, {
    key: 'getQuickReplies',
    value: function getQuickReplies() {
      return this._quickreplies;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var _this = this;

      var build = function build() {
        if (_this._elements.length > 1) {
          var elements = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator3.default)(_this._elements), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _e = _step.value;

              var element = {};
              if (_e.text) element.title = _e.text;
              if (_e.image) element.image_url = _e.image;
              if (_e.subtext) element.subtitle = _e.subtext;
              if (_e.url) element.item_url = _e.url;
              if (_e.buttons && _e.buttons.length) element.buttons = _e.buttons.toJSON();
              elements.push(element);
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

          var buttons = void 0;
          if (_this._buttons && e._buttons.length) {
            buttons = _this._buttons.toJSON();
          }

          if (_this._listStyle) {
            return {
              attachment: {
                type: 'template',
                payload: {
                  template_type: 'list',
                  top_element_style: _this._listStyle,
                  elements: elements,
                  buttons: buttons
                }
              }
            };
          } else if (!_this._listStyle) {
            return {
              attachment: {
                type: 'template',
                payload: {
                  template_type: 'generic',
                  elements: elements
                }
              }
            };
          }
        } else if (_this._elements.length === 1) {
          var _e2 = _this._elements[0];
          var _element = {};
          if (_e2.text && _e2.buttons && _e2.buttons.length && (_e2.image || _e2.subtext)) {
            _element.title = _e2.text;
            if (_e2.image) _element.image_url = _e2.image;
            if (_e2.subtext) _element.subtitle = _e2.subtext;
            _element.buttons = _e2.buttons.toJSON();
            return {
              attachment: {
                type: 'template',
                payload: {
                  template_type: 'generic',
                  elements: [_element]
                }
              }
            };
          } else if (_e2.text && _e2.buttons && _e2.buttons.length) {
            _element.text = _e2.text;
            if (_e2.image) _element.image_url = _e2.image;
            _element.buttons = _e2.buttons.toJSON();
            return {
              attachment: {
                type: 'template',
                payload: (0, _extends3.default)({
                  template_type: 'button'
                }, _element)
              }
            };
          } else if (_e2.text) {
            return {
              text: _e2.text
            };
          } else if (_e2.image) {
            return {
              attachment: {
                type: 'image',
                payload: {
                  url: _e2.image
                }
              }
            };
          }
        }

        throw Error('Could not form a message. Have you followed the format?');
      };

      var built = build();

      if (this._quickreplies && this._quickreplies.length) {
        built.quick_replies = this._quickreplies.toJSON();
      }

      return built;
    }
  }, {
    key: 'length',
    get: function get() {
      return this._elements.length;
    }
  }]);
  return Elements;
}();

exports.default = Elements;
//# sourceMappingURL=Elements.js.map
