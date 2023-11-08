import { Router } from "express";
import { AuthController } from "../controllers/authController";

export class AuthRouter {
  authController: AuthController;

  constructor() {
    this.authController = new AuthController();
  }

  getRoute() {
    return Router()
      .post("/token/create", this.authController.createToken())
      .post("/token/verify", this.authController.verify());
  }
}
