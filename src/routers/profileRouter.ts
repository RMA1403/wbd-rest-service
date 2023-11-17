import { Router } from "express";
import { ProfileController } from "../controllers/profileController";
import AuthMiddleware from "../middlewares/authMiddleware";
import bodyParser from "body-parser";
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

export class ProfileRouter {
    profileController: ProfileController;

    constructor() {
        this.profileController = new ProfileController();
    }

    getRoute() {
        return Router()
        .use("/profile", new AuthMiddleware().verify())
        .get("/profile", this.profileController.getProfile())
        .put("/profile",urlencodedParser, this.profileController.updateProfile())
    }
}
