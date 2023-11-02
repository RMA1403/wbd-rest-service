import { Router } from "express";
import { PodcastController } from "../controllers/podcastController";
import AuthMiddleware from "../middlewares/authMiddleware";

export class PodcastRouter {
  podcastController: PodcastController;

  constructor() {
    this.podcastController = new PodcastController();
  }

  getRoute() {
    return Router()
      .use("/podcast", new AuthMiddleware().verify())
      .get(
        "/podcast/random/:category",
        this.podcastController.getRandomPodcasts()
      );
  }
}
