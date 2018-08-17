import "../scss/main.scss";
import { Controller } from "./controller";
import { Model } from "./model";
import { View } from "./view";
import { Template } from "./template";
import { Store } from "./store";

new Controller(new Model(new Store()), new View(new Template()));
