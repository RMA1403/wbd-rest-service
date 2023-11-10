import { Router } from "express";
import { QueueController } from "../controllers/queueController";
import AuthMiddleware from "../middlewares/authMiddleware";

export class QueueRouter {
  queueController: QueueController;

  constructor() {
    this.queueController = new QueueController();
  }

  getRoute() {
    return Router()
      .use("/queue", new AuthMiddleware().verify())
      .get("/queue", this.queueController.getUserQueue())
      .get("/queue/current", this.queueController.getOneQueue("CURRENT"))
      .get("/queue/next", this.queueController.getOneQueue("NEXT"))
      .get("/queue/previous", this.queueController.getOneQueue("PREV"))
      .post("/queue/podcast", this.queueController.addPodcastToQueue())
      .post("/queue/forward", this.queueController.moveForward())
      .post("/queue/backward", this.queueController.moveBackward());
  }
}
