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
      .post(
        "/podcast",
        this.uploadMiddleware.handleImage(),
        this.podcastController.createPodcast()
      )
      .put(
        "/podcast/:idPodcast",
        this.uploadMiddleware.handleImage(),
        this.podcastController.editPodcast()
      )
      .delete("/podcast/:idPodcast", this.podcastController.deletePodcast())
      .get("/podcast/:idPodcast", this.podcastController.getPodcastById())
      .get("/podcast/by-user/:idUser", this.podcastController.getUserPodcasts())
      .get("/podcast/episode/:podcastId", this.podcastController.getPodcastEpisode())
  }
}
