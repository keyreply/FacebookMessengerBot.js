import Buttons from "./Buttons";
import QuickReplies from "./QuickReplies";

class Elements {
  constructor(elements) {
    this._elements = [];
    this._quickreplies = null;
    this._listStyle = null;
    this._buttons = null;
    this._imageAspectRatio = "horizontal";

    if (elements != null) {
      if (Array.isArray(elements)) {
        elements.forEach(element => this.add(element));
      } else {
        this.add(elements);
      }
    }
  }

  add({ text, image, video, subtext, url, buttons, options }) {
    if (buttons) {
      if (!(buttons instanceof Buttons)) {
        if (Array.isArray(buttons)) {
          buttons = Buttons.from(buttons);
        } else {
          throw Error("Unable to parse buttons");
        }
      }
    }

    this._elements.push({
      text,
      image,
      video,
      subtext,
      url,
      buttons,
      options
    });
    return this;
  }

  setQuickReplies(quickreplies) {
    if (quickreplies) {
      if (!(quickreplies instanceof QuickReplies)) {
        if (Array.isArray(quickreplies)) {
          quickreplies = QuickReplies.from(quickreplies);
        } else {
          throw Error("Unable to parse quickreplies");
        }
      }
    }

    this._quickreplies = quickreplies;
    return this;
  }

  setListStyle(listStyle, buttons) {
    if (listStyle === "large" || listStyle === "compact") {
      this._listStyle = listStyle;
    } else {
      throw Error('Valid values for list styles are "large" or "compact"');
    }

    if (buttons) {
      if (!(buttons instanceof Buttons)) {
        if (Array.isArray(buttons)) {
          this._buttons = Buttons.from(buttons);
        } else {
          throw Error("Unable to parse buttons");
        }
      }
    }
    return this;
  }

  setImageAspectRatio(imageAspectRatio) {
    this._imageAspectRatio = imageAspectRatio;
  }

  getQuickReplies() {
    return this._quickreplies;
  }

  get length() {
    return this._elements.length;
  }

  toJSON() {
    const build = () => {
      if (this._elements.length > 1) {
        const elements = [];
        for (const e of this._elements) {
          const element = {};
          if (e.text) element.title = e.text;
          if (e.image) element.image_url = e.image;
          if (e.subtext) element.subtitle = e.subtext;
          if (e.url) element.item_url = e.url;
          if (e.buttons && e.buttons.length)
            element.buttons = e.buttons.toJSON();
          elements.push(element);
        }

        let buttons;
        if (this._buttons && this._buttons.length) {
          buttons = this._buttons.toJSON();
        }

        if (this._listStyle) {
          return {
            attachment: {
              type: "template",
              payload: {
                template_type: "list",
                top_element_style: this._listStyle,
                elements,
                buttons
              }
            }
          };
        } else if (!this._listStyle) {
          return {
            attachment: {
              type: "template",
              payload: {
                template_type: "generic",
                elements,
                image_aspect_ratio: this._imageAspectRatio
              }
            }
          };
        }
      } else if (this._elements.length === 1) {
        const e = this._elements[0];
        const element = {};
        if (e.text && (e.url || e.image || e.subtext)) {
          if (e.text) element.title = e.text;
          if (e.image) element.image_url = e.image;
          if (e.subtext) element.subtitle = e.subtext;
          if (e.url) element.item_url = e.url;
          if (e.buttons && e.buttons.length)
            element.buttons = e.buttons.toJSON();

          return {
            attachment: {
              type: "template",
              payload: {
                template_type: "generic",
                elements: [element],
                image_aspect_ratio: this._imageAspectRatio
              }
            }
          };
        } else if (e.text && e.buttons && e.buttons.length) {
          element.text = e.text;
          if (e.image) element.image_url = e.image;
          element.buttons = e.buttons.toJSON();
          return {
            attachment: {
              type: "template",
              payload: {
                template_type: "button",
                ...element
              }
            }
          };
        } else if (e.text) {
          return {
            text: e.text
          };
        } else if (e.image) {
          return {
            attachment: {
              type: "image",
              payload: {
                url: e.image
              }
            }
          };
        } else if (e.video) {
          return {
            attachment: {
              type: "video",
              payload: {
                url: e.video
              }
            }
          };
        } else if (e.url) {
          return {
            attachment: {
              type: "file",
              payload: {
                url: e.url
              }
            }
          };
        }
      }

      throw Error("Could not form a message. Have you followed the format?");
    };

    const built = build();

    if (this._quickreplies && this._quickreplies.length) {
      built.quick_replies = this._quickreplies.toJSON();
    }

    return built;
  }

  static from(array) {
    const element = new Elements();
    if (Array.isArray(array)) {
      array.forEach(arg => element.add(arg));
    } else {
      element.add(array);
    }
    return element;
  }
}

export default Elements;
