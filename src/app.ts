import express, { Express } from "express";
import cors from "cors"
import { DummyRouter } from "./routers/dummyRouter";
import { PrismaClient } from "@prisma/client";

export class App {
  private _port: number = 3000;
  server: Express;
  static prismaClient = new PrismaClient()

  constructor() {
    this.server = express();

    const dummyRouter = new DummyRouter();

    this.server.use(cors(), express.json(), dummyRouter.getRoute());
  }

  run() {
    this.server.listen(this._port, () =>
      console.log(`listening on port ${this._port}`)
    );
  }
}
