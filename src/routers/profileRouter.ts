import { Router } from "express";
import { ProfileController } from "../controllers/profileController";
import AuthMiddleware from "../middlewares/authMiddleware";

export class QueueRouter {
    profileController: ProfileController;

    constructor() {
        this.profileController = new ProfileController();
    }

    getRoute() {
        return Router()
        .use("/queue", new AuthMiddleware().verify())
        .get("/queue", this.profileController.getProfile())
    }
}
