import { Router } from "express";
import { PodcastController } from "../controllers/podcastController";
import AuthMiddleware from "../middlewares/authMiddleware";
import UploadMiddleware from "../middlewares/uploadMiddleware";

export class PodcastRouter {
  uploadMiddleware: UploadMiddleware;
  authMiddleware: AuthMiddleware;

  podcastController: PodcastController;

  constructor() {
    this.uploadMiddleware = new UploadMiddleware();
    this.authMiddleware = new AuthMiddleware();

    this.podcastController = new PodcastController();
  }

  getRoute() {
    return Router()
      .use("/podcast", this.authMiddleware.verify())
      .get(
        "/podcast/random/:category",
        this.podcastController.getRandomPodcasts()
      )
  }
}
