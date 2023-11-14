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
    return (
      Router()
        // .use("/episode", new AuthMiddleware().verify())
        .post(
          "/episode",
          this.uploadMiddleware.handleEpisodeUpload(),
          this.episodeController.createEpisode()
        )
    );
  }
}
