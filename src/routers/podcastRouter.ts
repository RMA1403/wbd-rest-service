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
        this.podcastController.getRandomPodcasts())
      .get(
        "/podcast/test/:podcastId",
        this.podcastController.getPodcastById()
      )
      .get(
        "/podcast/episode/:podcastId",
        this.podcastController.getPodcastEpisode()
      );
      
  }

  // getSearch() {
  //     return Router().get("/search", this.podcastController.getPodcast());
  // }
}
