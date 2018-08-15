import { RENDER } from "./constant";

/**
 * 事件总栈
 */
export const EventHub = {
  /**
   * 事件池
   */
  hub: Object.create(null),

  /**
   * 触发事件
   * @param event 事件名
   * @param data 事件载荷
   */
  $emit(event: RENDER, data) {
    (this.hub[event] || []).forEach(handler => handler(data));
  },

  /**
   * 监听事件
   * @param event 事件名
   * @param handler 事件回调
   */
  $on(event: RENDER, handler) {
    this.hub[event] = this.hub[event] || [];

    this.hub[event].push(handler);
  },

  /**
   * 卸载事件对应的监听回调
   * @param event 事件名
   * @param handler 需要卸载的回调
   */
  $off(event: RENDER, handler) {
    const i = (this.hub[event] || []).findIndex(h => h === handler);

    i > -1 && this.hub[event].splice(i, 1);
  }
};
