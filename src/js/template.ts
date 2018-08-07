import { Todo } from "./interface";

export default class Template {
  show(todos: Todo[]): string {
    return todos
      .map(todo => {
        const { id, title, completed } = todo;

        return `
          <li data-id="${id}" ${completed ? `class="completed"` : ``}>
            <div class="view">
              <input 
                class="toggle" 
                type="checkbox" 
                autocompleted="off" 
                ${completed ? `checked` : ``}
              >
              <label>${title}</label>
              <button class="destroy"></button>
            </div>
          </li>
        `;
      })
      .join("");
  }

  todoCounter(active) {
    const plural = active < 2 ? "" : "s";

    return `
      <strong>${active}</strong> item${plural} left
    `;
  }
}
