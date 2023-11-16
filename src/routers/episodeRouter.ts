import { Router } from "express";
import { EpisodeController } from "../controllers/episodeController";
import AuthMiddleware from "../middlewares/authMiddleware";
import UploadMiddleware from "../middlewares/uploadMiddleware";

export class EpisodeRouter {
  uploadMiddleware: UploadMiddleware;
  authMiddleware: AuthMiddleware;

  episodeController: EpisodeController;

  constructor() {
    this.uploadMiddleware = new UploadMiddleware();
    this.authMiddleware = new AuthMiddleware();

    this.episodeController = new EpisodeController();
  }

  getRoute() {
    return Router()
      .use("/episode", this.authMiddleware.verify())
      .post(
        "/episode",
        this.uploadMiddleware.handleImageAndAudio(),
        this.episodeController.createEpisode()
      )
      .put(
        "/episode/:idEpisode",
        this.uploadMiddleware.handleImage(),
        this.episodeController.editEpisode()
      )
      .delete("/episode/:idEpisode", this.episodeController.deleteEpisode())
      .get("/episode/:idEpisode", this.episodeController.getEpisodeById());
  }
}
