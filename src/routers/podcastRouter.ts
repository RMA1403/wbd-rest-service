import { Router } from "express";
import { PodcastController } from "../controllers/podcastController";

export class PodcastRouter {
  podcastController: PodcastController;

  constructor() {
    this.podcastController = new PodcastController();
  }

  getRoute() {
      return Router().get("/podcast/random/:category", this.podcastController.getRandomPodcasts());
  }

  // getSearch() {
  //     return Router().get("/search", this.podcastController.getPodcast());
  // }
}
