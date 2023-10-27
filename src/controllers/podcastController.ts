import { Request, Response } from "express";
import { App } from "../app";

export class PodcastController {
  getRandomPodcasts() {
    return async (req: Request, res: Response) => {
      const { category } = req.params;

      if (!["technology", "comedy", "horror"].includes(category)) {
        res.status(400).send({ message: "Invalid category" });
        return;
      }

      const result = await App.prismaClient.$queryRawUnsafe(`
        SELECT title, description, url_thumbnail AS imageURL FROM premium_podcasts
        WHERE category = '${category}'
        ORDER BY random()
        LIMIT 5;
      `);

      return res.status(200).send({ podcasts: result });
    };
  }
}
