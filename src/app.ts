import express, { Express } from "express";
import cors from "cors";
import { DummyRouter } from "./routers/dummyRouter";
import { PrismaClient } from "@prisma/client";
import { EpisodeRouter } from "./routers/episodeRouter";
import { PodcastRouter } from "./routers/podcastRouter";
import seed from "../prisma/seed";
import { AuthRouter } from "./routers/authRouter";
import { QueueRouter } from "./routers/queueRouter";
import { SearchRouter } from "./routers/searchRouter";

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
    const queueRouter = new QueueRouter();
    const searchRouter = new SearchRouter();

    this.server.use(
      cors(),
      express.json(),
      express.urlencoded(),
      express.static("src/storage"),
      dummyRouter.getRoute(),
      episodeRouter.getRoute(),
      podcastRouter.getRoute(),
      authRouter.getRoute(),
      queueRouter.getRoute(),
      searchRouter.getRoute()
    );
  }

  async isSeed() {
    const premiumEpisodesCount = await App.prismaClient.premiumEpisodes.count();

    if (premiumEpisodesCount === 0) {
     return false;
    } 

    return true;
  }


  run() {
    this.isSeed().then((isSeed) => {
      if (!isSeed) {
        seed().then(() => {
          this.server.listen(this._port, () =>
            console.log(`listening on port ${this._port}`)
          );
        });
      } else {
        this.server.listen(this._port, () =>
          console.log(`listening on port ${this._port}`)
        );
      }
    });
  }
}
