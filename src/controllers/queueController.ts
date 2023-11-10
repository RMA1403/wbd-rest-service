import { Request, Response } from "express";
import { App } from "../app";

export class QueueController {
  getUserQueue() {
    return async (req: Request, res: Response) => {
      const { idUser } = req.body;

      const result = await App.prismaClient.queue.findMany({
        where: {
          id_queue: +idUser,
          position: {
            gte: 0,
          },
        },
        select: {
          Episode: {
            select: {
              title: true,
              description: true,
              url_thumbnail: true,
              PremiumPodcast: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
      });

      return res.status(200).json({ queue: result });
    };
  }

  addPodcastToQueue() {
    return async (req: Request, res: Response) => {
      const { idPodcast, idUser } = req.body;

      const [episodes, positions] = await Promise.all([
        App.prismaClient.premiumEpisodes.findMany({
          where: {
            id_podcast: idPodcast,
          },
        }),
        App.prismaClient.queue.findMany({
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
          position: (positions[0]?.position ?? -1) + idx + 1,
        })) || [];

      await App.prismaClient.queue.createMany({
        data: queueData,
      });

      return res.status(200).json({ message: "success" });
    };
  }

  getOneQueue(options: "CURRENT" | "NEXT" | "PREV") {
    return async (req: Request, res: Response) => {
      const { idUser } = req.body;

      const result = await App.prismaClient.queue.findUnique({
        where: {
          id_queue_position: {
            id_queue: +idUser,
            position: options === "CURRENT" ? 0 : options === "NEXT" ? 1 : -1,
          },
        },
        select: {
          Episode: true,
        },
      });

      return res.status(200).json({ result: result?.Episode });
    };
  }

  moveForward() {
    return async (req: Request, res: Response) => {
      try {
        const { idUser } = req.body;

        // Checks if next episode exists
        const nextEpisode = await App.prismaClient.queue.findUnique({
          where: {
            id_queue_position: {
              id_queue: +idUser,
              position: 1,
            },
          },
          select: {
            id_episode: true,
          },
        });
        if (!nextEpisode) {
          return res.status(200).json({ message: "no more episode in queue" });
        }

        const updatePosition = App.prismaClient.queue.updateMany({
          where: {
            id_queue: +idUser,
          },
          data: {
            position: {
              decrement: 1,
            },
          },
        });

        const deleteHistory = App.prismaClient.queue.deleteMany({
          where: {
            id_queue: +idUser,
            position: {
              lte: -6,
            },
          },
        });

        await App.prismaClient.$transaction([updatePosition, deleteHistory]);

        return res.status(200).json({ message: "success" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "error" });
      }
    };
  }

  moveBackward() {
    return async (req: Request, res: Response) => {
      try {
        const { idUser } = req.body;

        // Checks if previous episode exists and get the length of user's queue
        const [prevEpisode, positions] = await Promise.all([
          App.prismaClient.queue.findUnique({
            where: {
              id_queue_position: {
                id_queue: +idUser,
                position: -1,
              },
            },
            select: {
              id_episode: true,
            },
          }),
          App.prismaClient.queue.findMany({
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
        if (!prevEpisode) {
          return res.status(200).json({ message: "empty history" });
        }

        const updatePositionFirst = App.prismaClient.queue.updateMany({
          where: {
            id_queue: +idUser,
          },
          data: {
            position: {
              increment: positions[0]?.position + 6,
            },
          },
        });
        const updatePositionSecond = App.prismaClient.queue.updateMany({
          where: {
            id_queue: +idUser,
          },
          data: {
            position: {
              decrement: positions[0]?.position + 5,
            },
          },
        });

        await App.prismaClient.$transaction([
          updatePositionFirst,
          updatePositionSecond,
        ]);

        return res.status(200).json({ message: "success" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "error" });
      }
    };
  }
}
