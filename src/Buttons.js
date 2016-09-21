class Buttons {
  constructor() {
    this._buttons = [];
  }

  add({text, data, url, phone, event, account_linking}) {
    if (!data && !url && !event && !phone) {
      throw Error('Must provide a url or data i.e. {data: null} or {url: \'https://facebook.com\'}');
    }

    this._buttons.push({text: text || 'Button', event, data, phone, url, account_linking});
    return this;
  }

  toJSON() {
    const buttons = [];
    for (const button of this._buttons) {
      if (button.account_linking) {
        if (!button.account_linking.linking) {
          buttons.push({type: 'account_unlink'})
        }
        else if (button.url) {
          buttons.push({type: 'account_link', url: button.url});
        }
        else {
          console.log('[fb-msger-bot] Missing url for account linking');
        }
      }
      else if (button.url) {
        buttons.push({type: 'web_url', url: button.url, title: button.text});
      } else if (button.data) {
        const payload = JSON.stringify({data: button.data, event: button.event});
        buttons.push({type: 'postback', payload, title: button.text});
      } else if (button.phone) {
        buttons.push({type: 'phone_number', payload: button.phone, title: button.text});
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
