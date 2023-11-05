import { Request, Response } from "express";
import { App } from "../app";

export class QueueController {
  getUserQueue() {
    return async (req: Request, res: Response) => {
      const { idUser } = req.body;

      const result = await App.prismaClient.queue.findMany({
        where: {
          id_queue: +idUser,
        },
      });

      return res.status(200).json({ queue: result });
    };
  }

  addPodcastToQueue() {
    return async (req: Request, res: Response) => {
      const { idPodcast, idUser } = req.body;

      const [episodes, positions] = await Promise.all([
        await App.prismaClient.premiumEpisode.findMany({
          where: {
            id_podcast: idPodcast,
          },
        }),
        await App.prismaClient.queue.findMany({
          where: {
            id_queue: +idUser,
          },
          select: {
            position: true,
          },
          orderBy: {
            position: "desc",
          },
          take: 1,
        }),
      ]);

      const queueData =
        episodes?.map((episode, idx) => ({
          id_queue: +idUser,
          id_episode: episode.id_episode,
          position: (positions[0]?.position || -1) + idx + 1,
        })) || [];

      await App.prismaClient.queue.createMany({
        data: queueData,
      });

      return res.status(200).json({ message: "success" });
    };
  }
}
