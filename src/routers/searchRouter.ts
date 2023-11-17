import { Router } from "express";
import { SearchController } from "../controllers/searchController";
import AuthMiddleware from "../middlewares/authMiddleware";

export class SearchRouter {
  authMiddleware: AuthMiddleware;

  searchController: SearchController;

  constructor() {
    this.authMiddleware = new AuthMiddleware();
    this.searchController = new SearchController();
  }


  getRoute() {
    return Router()
        .use("/search", this.authMiddleware.verify())
        .get("/search/podcast", this.searchController.getPodcastByFilter())
        .get("/search/episode", this.searchController.getEpisodeByFilter())
  }
}