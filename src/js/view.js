import Event from "./event";

export default class View {
  constructor(model) {
    this.model = model;

    this.addTaskEvent = new Event(this);
    this.selectTaskEvent = new Event(this);
    this.unselectTaskEvent = new Event(this);
    this.completeTaskEvent = new Event(this);
    this.deleteTaskEvent = new Event(this);

    this.addTaskButton = this.addTaskButton.bind(this);
    this.addTask = this.addTask.bind(this);

    this.init();
  }

  init() {
    this.createChildren().enable();
  }

  createChildren() {
    this.$container = $(".js-container");
    this.$addTaskButton = this.$container.find(".js-add-task-button");
    this.$taskTextBox = this.$container.find(".js-task-textbox");
    this.$tasksContainer = this.$container.find(".js-tasks-container");

    return this;
  }

  enable() {
    this.$addTaskButton.on("click", this.addTaskButton);

    this.model.addTaskEvent.attach(this.addTask);
  }

  addTaskButton() {
    this.addTaskEvent.notify({
      task: this.$taskTextBox.val()
    });
  }

  addTask() {
    this.show();
  }

  show() {
    this.buildList();
  }

  buildList() {
    const tasks = this.model.getTasks();
    var html = "";
    var $tasksContainer = this.$tasksContainer;

    $tasksContainer.html("");

    var index = 0;

    for (var task in tasks) {
      if (tasks[task].taskStatus === "completed") {
        html += '<div style="color: green;">';
      } else {
        html += "<div>";
      }

      $tasksContainer.append(
        `${html}<label><input type="checkbox" class="js-task" data-index="${index}" data-task-selected="false">${
          tasks[task].taskName
        }</label></div>`
      );

      index++;
    }
  }
}
