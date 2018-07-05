import Event from "./event";

export default class Model {
  constructor() {
    this.tasks = [];
    this.selectedTasks = [];
    this.addTaskEvent = new Event(this);
    this.removeTaskEvent = new Event(this);
    this.setTasksAsCompleted = new Event(this);
    this.deleteTaskEvent = new Event(this);
  }

  addTask(task) {
    this.tasks.push({
      taskName: task,
      taskStatus: "uncompleted"
    });

    this.addTaskEvent.notify();
  }

  getTasks() {
    return this.tasks;
  }
}
