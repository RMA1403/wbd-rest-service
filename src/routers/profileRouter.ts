import { Router } from "express";
import { ProfileController } from "../controllers/profileController";
import AuthMiddleware from "../middlewares/authMiddleware";

export class ProfileRouter {
    profileController: ProfileController;

    constructor() {
        this.profileController = new ProfileController();
    }

    getRoute() {
        return Router()
        .use("/profile", new AuthMiddleware().verify())
        .get("/profile", this.profileController.getProfile())
        .post("/profile", this.profileController.updateProfile())
    }
}
