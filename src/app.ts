import express, { Express } from "express";
import cors from "cors";
import { DummyRouter } from "./routers/dummyRouter";
import { PrismaClient } from "@prisma/client";
import { EpisodeRouter } from "./routers/episodeRouter";
import { PodcastRouter } from "./routers/podcastRouter";
import seed from "../prisma/seed";

export class App {
  private _port: number = 3000;
  server: Express;
  static prismaClient = new PrismaClient();

  constructor() {
    this.server = express();

    const dummyRouter = new DummyRouter();
    const episodeRouter = new EpisodeRouter();
    const podcastRouter = new PodcastRouter();

    this.server.use(
      cors(),
      express.json(),
      dummyRouter.getRoute(),
      episodeRouter.getRoute(),
      podcastRouter.getRoute()
      // podcastRouter.getSearch()
    );
  }


  run() {
    seed().then(() => 
      this.server.listen(this._port, () =>
        console.log(`listening on port ${this._port}`)
      )
    );
  }
}
