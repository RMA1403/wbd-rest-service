import { Router } from "express";
import { SeedController } from "../controllers/seedController";

export class SeedRouter {
  seedController: SeedController;

  constructor() {
    this.seedController = new SeedController();
  }

  getRoute() {
    return Router().post("/seed", this.seedController.seedData());
  }
}
