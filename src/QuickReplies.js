import { cut } from "./libs/utils";

class QuickReplies {
  constructor(quickreplies) {
    this._quickReplies = [];

    if (quickreplies != null) {
      if (Array.isArray(quickreplies)) {
        quickreplies.forEach(reply => this.add(reply));
      } else {
        this.add(quickreplies);
      }
    }
  }

  add({ text, data, event, image, isLocation, options }) {
    if (!data && !event && !isLocation) {
      throw Error("Must provide data i.e. {data: null}");
    }

    this._quickReplies.push({
      text: text,
      event,
      data,
      image,
      isLocation,
      options
    });
    return this;
  }

  toJSON() {
    const quickReplies = [];
    for (const reply of this._quickReplies) {
      let contentType = "text";
      const payload = JSON.stringify({ data: reply.data, event: reply.event });
      if (!reply.text) {
        throw new Error("No text attribute");
      }
      if (reply.isLocation) {
        contentType = "location";
      }
      let pill = {
        payload,
        title: cut(String(reply.text), 20),
        content_type: contentType
      };
      if (reply.image) {
        pill.image_url = reply.image;
      }
      quickReplies.push(pill);
    }

    return quickReplies;
  }

  static from(array) {
    const quickreplies = new QuickReplies();
    array.forEach(arg => quickreplies.add(arg));
    return quickreplies;
  }

  get length() {
    return this._quickReplies.length;
  }
}

export default QuickReplies;
