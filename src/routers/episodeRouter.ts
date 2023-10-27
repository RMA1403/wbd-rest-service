import { Router } from "express";
import { EpisodeController } from "../controllers/episodeController";

export class EpisodeRouter {
  episodeController: EpisodeController;

  constructor() {
    this.episodeController = new EpisodeController();
  }

  getRoute() {
    return Router().get("/audio", this.episodeController.playEpisode());
  }
}
