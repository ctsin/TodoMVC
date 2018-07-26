import { Todo } from "./interface";

export default class Template {
  show(todos: Todo[]): string {
    return todos
      .map(todo => {
        const { id, title, completed } = todo;

        return `
          <li data-id="${id}" class="${completed}">
            <div class="view">
              <input class="toggle" type="checkbox" ${
                completed ? "checked" : ""
              }>
              <label>${title}</label>
              <button class="destroy"></button>
            </div>
          </li>
        `;
      })
      .join("");
  }
}
