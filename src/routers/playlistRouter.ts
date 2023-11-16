import { Router } from "express";
import { PlaylistController } from "../controllers/playlistController";
import AuthMiddleware from "../middlewares/authMiddleware";

export class PlaylistRouter {
  authMiddleware: AuthMiddleware;

  playlistController: PlaylistController;

  constructor() {
    this.authMiddleware = new AuthMiddleware();

    this.playlistController = new PlaylistController();
  }

  getRoute() {
    return Router()
      .use("/playlist", this.authMiddleware.verify())
      .use("/library", this.authMiddleware.verify())
      .get("/playlist/:idPlaylist", this.playlistController.getPlaylistPodcasts())
      .get("/library", this.playlistController.getUserPlaylists())
      .post("/library", this.playlistController.createPlaylist())
      .delete("/playlist/:idPlaylist", this.playlistController.deletePlaylist())
      .get("/playlist/title/:idPlaylist", this.playlistController.getPlaylistById())
      .post("/playlist/podcast/:podcastId", this.playlistController.addPodcastToPlaylist())
    } 
}


// TODO : get get user playlist, get user library