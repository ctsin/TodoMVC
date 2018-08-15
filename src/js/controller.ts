import { Model } from "./model";
import { View } from "./view";

/**
 * 控制器
 */
export class Controller {
  constructor(private model: Model, private view: View) {}
}
