'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _ = require('../..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('QuickReplies', function () {
  it('#toJSON', function () {
    var quickReplies = new _.QuickReplies();
    quickReplies.add({ text: 'Google', data: 'http://google.com' });
    quickReplies.add({ text: 'Address', isLocation: true });
    quickReplies.add({ text: 'Microsoft', data: 'http://bing.com', image: 'http://emojipedia-us.s3.amazonaws.com/cache/67/4c/674c07586a355f19682722ac443c77b7.png' });

    _assert2.default.deepEqual([{
      payload: '{"data":"http://google.com"}',
      title: 'Google',
      content_type: 'text'
    }, {
      payload: '{}',
      title: 'Address',
      content_type: 'location'
    }, {
      payload: '{"data":"http://bing.com"}',
      image_url: 'http://emojipedia-us.s3.amazonaws.com/cache/67/4c/674c07586a355f19682722ac443c77b7.png',
      title: 'Microsoft',
      content_type: 'text'
    }], quickReplies.toJSON());
  });

  it('should throw an error', function () {
    try {
      var quickReplies = new _.QuickReplies();
      quickReplies.add({});
      _assert2.default.fail('should have thrown an error');
    } catch (e) {
      _assert2.default.ok('does not have data/url attributes');
    }
  });

  it('should throw an error', function () {
    try {
      var quickReplies = new _.QuickReplies();
      quickReplies.add({ event: 'simple-event' });
      _assert2.default.fail('should have thrown an error');
    } catch (e) {
      _assert2.default.ok('does not have data/url attributes');
    }
  });
});
//# sourceMappingURL=QuickReplies-test.js.map
