export class Event {
  private hub;

  constructor() {
    this.hub = Object.create(null);
  }

  emit(event: string, data) {
    (this.hub[event] || []).forEach(handler => handler(data));
  }

  on(event: string, handler) {
    this.hub[event] = this.hub[event] || [];

    this.hub[event].push(handler);
  }

  off(event: string, handler) {
    const i = (this.hub[event] || []).findIndex(h => h === handler);

    i > -1 && this.hub[event].splice(i, 1);
  }
}
