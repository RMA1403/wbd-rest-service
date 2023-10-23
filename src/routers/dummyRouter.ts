import { Router } from "express";
import { DummyController } from "../controllers/dummyController";

export class DummyRouter {
  dummyController: DummyController;

  constructor() {
    this.dummyController = new DummyController();
  }

  getRoute() {
    return Router().get("/dummy", this.dummyController.getDummyData());
  }
}
