import assert from "assert";
import { QuickReplies } from "../..";

describe("QuickReplies", () => {
  it("#toJSON", () => {
    const quickReplies = new QuickReplies();
    quickReplies.add({ text: "Google", data: "http://google.com" });
    quickReplies.add({ text: "Address", isLocation: true });
    quickReplies.add({
      text: "Microsoft",
      data: "http://bing.com",
      image:
        "http://emojipedia-us.s3.amazonaws.com/cache/67/4c/674c07586a355f19682722ac443c77b7.png"
    });

    assert.deepEqual(
      [
        {
          payload: '{"data":"http://google.com"}',
          title: "Google",
          content_type: "text"
        },
        {
          payload: "{}",
          title: "Address",
          content_type: "location"
        },
        {
          payload: '{"data":"http://bing.com"}',
          image_url:
            "http://emojipedia-us.s3.amazonaws.com/cache/67/4c/674c07586a355f19682722ac443c77b7.png",
          title: "Microsoft",
          content_type: "text"
        }
      ],
      quickReplies.toJSON()
    );
  });

  it("should throw an error", () => {
    try {
      const quickReplies = new QuickReplies();
      quickReplies.add({});
      assert.fail("should have thrown an error");
    } catch (e) {
      assert.ok("does not have data/url attributes");
    }
  });

  it("should throw an error", () => {
    try {
      const quickReplies = new QuickReplies();
      quickReplies.add({ event: "simple-event" });
      assert.fail("should have thrown an error");
    } catch (e) {
      assert.ok("does not have data/url attributes");
    }
  });
});
