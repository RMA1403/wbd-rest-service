import { Router } from "express";
import { PlaylistController } from "../controllers/playlistController";
import AuthMiddleware from "../middlewares/authMiddleware";

export class PodcastRouter {
  authMiddleware: AuthMiddleware;

  playlistController: PlaylistController;

  constructor() {
    this.authMiddleware = new AuthMiddleware();

    this.playlistController = new PlaylistController();
  }

  getRoute() {
    return Router()
      .use("/playlist", this.authMiddleware.verify())
      .get("/playlist/:idPlaylist", this.playlistController.getPlaylistPodcasts())
      .get("/library/:idUser", this.playlistController.getUserPlaylists())
      .post("/library/:idUser", this.playlistController.createPlaylist())
      .delete("/library/:idUser", this.playlistController.deletePlaylist())
      
    } 
}


// TODO : get get user playlist, get user library