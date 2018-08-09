import { Model } from "./model";
import { View } from "./view";

export class Controller {
  constructor(private model: Model, private view: View) {
    console.log("CONTROLLER");
  }
}
