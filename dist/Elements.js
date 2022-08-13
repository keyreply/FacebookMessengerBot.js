"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _Buttons = require("./Buttons");

var _Buttons2 = _interopRequireDefault(_Buttons);

var _QuickReplies = require("./QuickReplies");

var _QuickReplies2 = _interopRequireDefault(_QuickReplies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Elements = function () {
  function Elements(elements) {
    var _this = this;

    (0, _classCallCheck3.default)(this, Elements);

    this._elements = [];
    this._quickreplies = null;
    this._listStyle = null;
    this._buttons = null;
    this._imageAspectRatio = "horizontal";

    if (elements != null) {
      if (Array.isArray(elements)) {
        elements.forEach(function (element) {
          return _this.add(element);
        });
      } else {
        this.add(elements);
      }
    }
  }

  (0, _createClass3.default)(Elements, [{
    key: "add",
    value: function add(_ref) {
      var text = _ref.text,
          image = _ref.image,
          video = _ref.video,
          subtext = _ref.subtext,
          url = _ref.url,
          buttons = _ref.buttons,
          options = _ref.options;

      if (buttons) {
        if (!(buttons instanceof _Buttons2.default)) {
          if (Array.isArray(buttons)) {
            buttons = _Buttons2.default.from(buttons);
          } else {
            throw Error("Unable to parse buttons");
          }
        }
      }

      this._elements.push({
        text: text,
        image: image,
        video: video,
        subtext: subtext,
        url: url,
        buttons: buttons,
        options: options
      });
      return this;
    }
  }, {
    key: "setQuickReplies",
    value: function setQuickReplies(quickreplies) {
      if (quickreplies) {
        if (!(quickreplies instanceof _QuickReplies2.default)) {
          if (Array.isArray(quickreplies)) {
            quickreplies = _QuickReplies2.default.from(quickreplies);
          } else {
            throw Error("Unable to parse quickreplies");
          }
        }
      }

      this._quickreplies = quickreplies;
      return this;
    }
  }, {
    key: "setListStyle",
    value: function setListStyle(listStyle, buttons) {
      if (listStyle === "large" || listStyle === "compact") {
        this._listStyle = listStyle;
      } else {
        throw Error('Valid values for list styles are "large" or "compact"');
      }

      if (buttons) {
        if (!(buttons instanceof _Buttons2.default)) {
          if (Array.isArray(buttons)) {
            this._buttons = _Buttons2.default.from(buttons);
          } else {
            throw Error("Unable to parse buttons");
          }
        }
      }
      return this;
    }
  }, {
    key: "setImageAspectRatio",
    value: function setImageAspectRatio(imageAspectRatio) {
      this._imageAspectRatio = imageAspectRatio;
    }
  }, {
    key: "getQuickReplies",
    value: function getQuickReplies() {
      return this._quickreplies;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var _this2 = this;

      var build = function build() {
        if (_this2._elements.length > 1) {
          var elements = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator3.default)(_this2._elements), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var e = _step.value;

              var element = {};
              if (e.text) element.title = e.text;
              if (e.image) element.image_url = e.image;
              if (e.subtext) element.subtitle = e.subtext;
              if (e.url) element.item_url = e.url;
              if (e.buttons && e.buttons.length) element.buttons = e.buttons.toJSON();
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
          if (_this2._buttons && _this2._buttons.length) {
            buttons = _this2._buttons.toJSON();
          }

          if (_this2._listStyle) {
            return {
              attachment: {
                type: "template",
                payload: {
                  template_type: "list",
                  top_element_style: _this2._listStyle,
                  elements: elements,
                  buttons: buttons
                }
              }
            };
          } else if (!_this2._listStyle) {
            return {
              attachment: {
                type: "template",
                payload: {
                  template_type: "generic",
                  elements: elements,
                  image_aspect_ratio: _this2._imageAspectRatio
                }
              }
            };
          }
        } else if (_this2._elements.length === 1) {
          var _e = _this2._elements[0];
          var _element = {};
          if (_e.text && (_e.url || _e.image || _e.subtext)) {
            if (_e.text) _element.title = _e.text;
            if (_e.image) _element.image_url = _e.image;
            if (_e.subtext) _element.subtitle = _e.subtext;
            if (_e.url) _element.item_url = _e.url;
            if (_e.buttons && _e.buttons.length) _element.buttons = _e.buttons.toJSON();

            return {
              attachment: {
                type: "template",
                payload: {
                  template_type: "generic",
                  elements: [_element],
                  image_aspect_ratio: _this2._imageAspectRatio
                }
              }
            };
          } else if (_e.text && _e.buttons && _e.buttons.length) {
            _element.text = _e.text;
            if (_e.image) _element.image_url = _e.image;
            _element.buttons = _e.buttons.toJSON();
            return {
              attachment: {
                type: "template",
                payload: (0, _extends3.default)({
                  template_type: "button"
                }, _element)
              }
            };
          } else if (_e.text) {
            return {
              text: _e.text
            };
          } else if (_e.image) {
            return {
              attachment: {
                type: "image",
                payload: {
                  url: _e.image
                }
              }
            };
          } else if (_e.video) {
            return {
              attachment: {
                type: "video",
                payload: {
                  url: _e.video
                }
              }
            };
          } else if (_e.url) {
            return {
              attachment: {
                type: "file",
                payload: {
                  url: _e.url
                }
              }
            };
          }
        }

        throw Error("Could not form a message. Have you followed the format?");
      };

      var built = build();

      if (this._quickreplies && this._quickreplies.length) {
        built.quick_replies = this._quickreplies.toJSON();
      }

      return built;
    }
  }, {
    key: "length",
    get: function get() {
      return this._elements.length;
    }
  }], [{
    key: "from",
    value: function from(array) {
      var element = new Elements();
      if (Array.isArray(array)) {
        array.forEach(function (arg) {
          return element.add(arg);
        });
      } else {
        element.add(array);
      }
      return element;
    }
  }]);
  return Elements;
}();

exports.default = Elements;
//# sourceMappingURL=Elements.js.map
