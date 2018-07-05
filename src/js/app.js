import View from "./view";
import Model from "./model";
import Controller from "./controller";

$(() => {
  const model = new Model();
  const view = new View(model);

  new Controller(model, view);
});
