import { Router } from "express";
import { SubsController } from "../controllers/subsController";
import AuthMiddleware from "../middlewares/authMiddleware";

export class SubsRouter {
  authMiddleware: AuthMiddleware;
  subsController: SubsController;

  constructor() {
    this.authMiddleware = new AuthMiddleware();
    this.subsController = new SubsController();
  }

  getRoute() {
    return Router()
      .use("/subs", this.authMiddleware.verify())
      .get("/subs/expired", this.subsController.getExpired())
      .post("/subs/extend", this.subsController.extendSubs())  
  }
}