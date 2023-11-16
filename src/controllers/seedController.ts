import { Request, Response } from "express";
import { App } from "../app";
import restSeed from "../lib/restSeed";
import soapSeed from "../lib/soapSeed";
import phpSeed from "../lib/phpSeed";

export class SeedController {
  seedData() {
    return async (req: Request, res: Response) => {
      try {
        const premiumEpisodesCount =
          await App.prismaClient.premiumEpisodes.count();

        if (premiumEpisodesCount > 0) {
          return res.status(200).json({ message: "already seeded" });
        }

        await Promise.all([restSeed(), soapSeed(), phpSeed()]);

        return res.status(200).json({ message: "success" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "fail to seed" });
      }
    };
  }
}
