import { Todo } from "./interface";

/**
 * 渲染模板
 */
export class Template {
  /**
   * 渲染模板：新增
   */
  renderTodoAdded({ id, title, completed }: Todo) {
    return `
      <li data-id="${id}" class="${completed ? `completed` : ``}">${title}</li>
      `;
  }
}
