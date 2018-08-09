import { Model } from "./model";
import { View } from "./view";
import { Controller } from "./controller";

$(() => {
  new Controller(new Model(), new View());
});
