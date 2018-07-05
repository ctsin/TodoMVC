export default class Event {
  constructor(sender) {
    this.sender = sender;
    this.listeners = [];
  }

  attach(listener) {
    this.listeners.push(listener);
  }

  notify(args) {
    for (let i = 0, length = this.listeners.length; i < length; i++) {
      this.listeners[i](this.sender, args);
    }
  }
}
