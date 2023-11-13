import { Request, Response } from "express";
import { App } from "../app";
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
      const podcasts = await App.prismaClient.premiumPodcasts.findMany({
        select: {
          id_podcast: true,
          title: true,
          description: true,
        },
        where: {
          title: {
            contains: req.query.keyword as string ? req.query.keyword as string : undefined,
            mode: "insensitive",
          },
          category: req.query.genre as Category ? req.query.genre as Category : undefined,
        },
      });
      
      const podcastsWithEpisodeCount = await Promise.all(
        podcasts.map(async (podcast:any) => {
          const episodeCount = await App.prismaClient.premiumEpisodes.count({
            where: {
              id_podcast: podcast.id_podcast,
            },
          });
      
          return {
            ...podcast,
            episodeCount,
          };
        })
      );

      return res.status(200).send({ podcasts: podcastsWithEpisodeCount });
    };
  }
}
