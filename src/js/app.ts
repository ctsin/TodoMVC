import { Model } from "./model";
import { View } from "./view";
import { Controller } from "./controller";

window.onload = () => {
  new Controller(new Model(), new View());
};
