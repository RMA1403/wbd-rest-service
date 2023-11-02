import express, { Express } from "express";
import cors from "cors";
import { DummyRouter } from "./routers/dummyRouter";
import { PrismaClient } from "@prisma/client";
import { EpisodeRouter } from "./routers/episodeRouter";
import { PodcastRouter } from "./routers/podcastRouter";
import { AuthRouter } from "./routers/authRouter";

export class App {
  private _port: number = 3000;
  server: Express;
  static prismaClient = new PrismaClient();

  constructor() {
    this.server = express();

    const dummyRouter = new DummyRouter();
    const episodeRouter = new EpisodeRouter();
    const podcastRouter = new PodcastRouter();
    const authRouter = new AuthRouter();

    this.server.use(
      cors(),
      express.json(),
      express.urlencoded(),
      dummyRouter.getRoute(),
      episodeRouter.getRoute(),
      podcastRouter.getRoute(),
      authRouter.getRoute()
    );
  }

  run() {
    this.server.listen(this._port, () =>
      console.log(`listening on port ${this._port}`)
    );
  }
}
