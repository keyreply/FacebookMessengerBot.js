class Buttons {
  constructor(buttons) {
    this._buttons = [];

    if (buttons != null) {
      if (Array.isArray(buttons)) {
        buttons.forEach(button => this.add(button));
      } else {
        this.add(buttons);
      }
    }
  }

  add(button) {
    if (!button.data && !button.url && !button.event && !button.phone && !button.share) {
      throw Error(
        "Must provide a url or data i.e. {data: null} or {url: 'https://facebook.com'}"
      );
    }
    const _buttons = Object.assign({
      text: button.text || "Button"
    }, button)

    this._buttons.push(_buttons);
    return this;
  }

  toJSON() {
    const buttons = [];
    for (const button of this._buttons) {
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
        const payload = JSON.stringify({
          data: button.data,
          event: button.event
        });
        buttons.push({
          type: "postback",
          payload,
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

    return buttons;
  }

  static from(array) {
    const buttons = new Buttons();
    array.forEach(arg => buttons.add(arg));
    return buttons;
  }

  get length() {
    return this._buttons.length;
  }
}

export default Buttons;
