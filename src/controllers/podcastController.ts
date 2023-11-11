import { Request, Response } from "express";
import { App } from "../app";

export class PodcastController {
  getRandomPodcasts() {
    return async (req: Request, res: Response) => {
      const { category } = req.params;

      if (
        !["TECHNOLOGY", "COMEDY", "HORROR"].includes(category.toUpperCase())
      ) {
        res.status(400).send({ message: "Invalid category" });
        return;
      }

      const result = await App.prismaClient.$queryRawUnsafe(`
        SELECT id_podcast AS idPodcast, title, description, url_thumbnail AS imageURL FROM premium_podcasts
        WHERE category = '${category.toUpperCase()}'
        ORDER BY random()
        LIMIT 5;
      `);

      return res.status(200).send({ podcasts: result });
    };
  }

  // getPodcast() {
  //   return async (req: Request, res: Response) => {

  //     const result = await App.prismaClient.premiumUsers.findMany();

  //     return res.status(200).send({ podcast: result[0] });
  //   };
  // }
}
