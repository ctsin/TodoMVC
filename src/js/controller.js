export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.addTask = this.addTask.bind(this);

    this.init();
  }

  init() {
    this.enable();
  }

  enable() {
    this.view.addTaskEvent.attach(this.addTask);

    return this;
  }

  addTask(sender, args) {
    this.model.addTask(args.task);
  }
}
