import Todo from "./app";
import "todomvc-app-css";

const todo = new Todo("todomvc-typescript");

const setView = () => {
  todo.controller.setView(document.location.hash);
};

// todo 尝试移动到 Controller 中
window.addEventListener("load", setView, false);
window.addEventListener("hashchange", setView, false);
