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
      .post(
        "/queue/podcast",
        this.queueController.addPodcastToQueue()
      );
  }
}
