import { Request, Response } from "express";
import { App } from "../app";
import { Prisma } from "@prisma/client";
import { Category } from '@prisma/client'; 

export class PodcastController {
  getRandomPodcasts() {
    return async (req: Request, res: Response) => {
      const { category } = req.params;

      if (!["TECHNOLOGY", "COMEDY", "HORROR"].includes(category)) {
        res.status(400).send({ message: "Invalid category" });
        return;
      }

      const result = await App.prismaClient.$queryRawUnsafe(`
        SELECT id_podcast AS idPodcast, title, description, url_thumbnail AS imageURL FROM premium_podcasts
        WHERE category = '${category}'
        ORDER BY random()
        LIMIT 5;
      `);

      return res.status(200).send({ podcasts: result });
    };
  }
  getPodcastByFilter() {
    return async (req: Request, res: Response) => {
      const { keyword, genre, eps } = req.params;

      const result = await App.prismaClient.premiumPodcasts.findMany({
        where: {
          OR: [
            {
              title: {
                contains: keyword,
              },
            },
            {
              description: {
                contains: keyword,
              },
            },
          ],
          category: genre as Category,
        },
        include: {PremiumEpisodes: true},
      });

      return res.status(200).send({ podcasts: result });
    };
  }
}
