import { Request, Response } from "express";
import { App } from "../app";

export class PodcastController {
  getRandomPodcasts() {
    return async (req: Request, res: Response) => {
      const { category } = req.params;

      if (!["TECHNOLOGY", "COMEDY", "HORROR"].includes(category)) {
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

  getPodcastById() {
    return async (req: Request, res: Response) => {
      const { podcastId } = req.params;

      if(!podcastId){
        res.status(400).send({message: "Request parameter not found"});
        return;
      }

      const result = await App.prismaClient.$queryRawUnsafe(
        ` 
        SELECT category, id_user AS creator, title, description, url_thumbnail AS imageurl FROM premium_podcasts
        WHERE id_podcast = '${podcastId}';
        `
      );

      return res.status(200).send({ podcast: result });
    };
  }

  getPodcastEpisode() {
    return async (req: Request, res: Response) => {
      const { podcastId } = req.params;
      if(!podcastId){
        res.status(400).send({ message: "Request parameter not found"});
        return;
      }

      const result = await App.prismaClient.$queryRawUnsafe(
        `
        SELECT title, description, url_thumbnail AS imageurl FROM premium_episodes 
        WHERE id_podcast = '${podcastId}';
        `
        );

      return res.status(200).send({ episodes: result });
    };
  }

  // getPodcast() {
  //   return async (req: Request, res: Response) => {
      
  //     const result = await App.prismaClient.premiumUsers.findMany();

  //     return res.status(200).send({ podcast: result[0] });
  //   };
  // }
}
