import express, { Express } from "express";
import cors from "cors";
import { DummyRouter } from "./routers/dummyRouter";
import { PrismaClient } from "@prisma/client";
import { EpisodeRouter } from "./routers/episodeRouter";
import { PodcastRouter } from "./routers/podcastRouter";
import seed from "./lib/restSeed";
import { AuthRouter } from "./routers/authRouter";
import { QueueRouter } from "./routers/queueRouter";
import { PlaylistRouter } from "./routers/playlistRouter"
import { SeedRouter } from "./routers/seedRouter";
import { SearchRouter } from "./routers/searchRouter";
import { ProfileRouter } from "./routers/profileRouter";
import { SubsRouter } from "./routers/subsRouter";
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
    const playlistRouter = new PlaylistRouter();
    const seedRouter = new SeedRouter();
    const searchRouter = new SearchRouter();
    const profileRouter = new ProfileRouter();
    const subsRouter = new SubsRouter();

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
      playlistRouter.getRoute(),
      seedRouter.getRoute(),
      searchRouter.getRoute(),
      profileRouter.getRoute(),
      subsRouter.getRoute()
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
    // this.isSeed().then((isSeed) => {
    //   if (!isSeed) {
    //     seed().then(() => {
    this.server.listen(this._port, () =>
      console.log(`listening on port ${this._port}`)
    );
    // });
    //   } else {
    //     this.server.listen(this._port, () =>
    //       console.log(`listening on port ${this._port}`)
    //     );
    //   }
    // });
  }
}
