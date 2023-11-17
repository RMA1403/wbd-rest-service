import { Request, Response } from "express";
import { App } from "../app";
import { Category } from '@prisma/client'; 
import fs from "fs";

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
  getPodcastByIdOther() {
    return async (req: Request, res: Response) => {
      const { podcastId } = req.params;

      if (!podcastId) {
        res.status(400).send({ message: "Request parameter not found" });
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
      if (!podcastId) {
        res.status(400).send({ message: "Request parameter not found" });
        return;
      }

      // const result = await App.prismaClient.$queryRawUnsafe(
      //   `
      //   SELECT title, description, url_thumbnail AS imageurl FROM premium_episodes
      //   WHERE id_podcast = '${podcastId}';
      //   `
      //   );
      const result = await App.prismaClient.premiumEpisodes.findMany({
        select: {
          title: true,
          description: true,
          url_thumbnail: true,
          id_episode: true,
        },
        where: {
          id_podcast: +podcastId,
        },
      });

      return res.status(200).send({ episodes: result });
    };
  }
  createPodcast() {
    return async (req: Request, res: Response) => {
      try {
        const { title, description, idUser, category } = req.body;
        const file = req.file;

        if (!title || !idUser || !file || !category) {
          return res.status(400).json({ message: "incomplete request" });
        }

        if (
          !["TECHNOLOGY", "COMEDY", "HORROR"].includes(category.toUpperCase())
        ) {
          res.status(400).send({ message: "Invalid category" });
          return;
        }

        await App.prismaClient.premiumPodcasts.create({
          data: {
            title,
            description,
            id_user: +idUser,
            url_thumbnail: file.filename,
            category: category.toUpperCase() as Category,
          },
        });

        return res.status(201).json({ message: "success" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal server error" });
      }
    };
  }

  editPodcast() {
    return async (req: Request, res: Response) => {
      try {
        const { idPodcast } = req.params;
        const { title, description, updateCover } = req.body;
        const file = req.file;

        if (!idPodcast || !title) {
          return res.status(400).json({ message: "incomplete request" });
        }

        if (updateCover === "true") {
          if (!file || !file.filename) {
            return res.status(400).json({ message: "missing file" });
          }

          const { url_thumbnail: oldImagePath } =
            (await App.prismaClient.premiumPodcasts.findUnique({
              where: {
                id_podcast: +idPodcast,
              },
              select: {
                url_thumbnail: true,
              },
            })) ?? {};

          fs.unlinkSync("./src/storage/images/" + oldImagePath);
        } else {
          fs.unlinkSync("./src/storage/images/" + file?.filename);
        }

        await App.prismaClient.premiumPodcasts.update({
          where: {
            id_podcast: +idPodcast,
          },
          data: {
            title,
            description: description || undefined,
            url_thumbnail: updateCover === "true" ? file?.filename : undefined,
          },
        });

        return res.status(200).json({ message: "success" });
      } catch (err) {
        console.log(err);
        fs.unlinkSync("./src/storage/images/" + req.file?.filename);
        return res.status(500).json({ message: "internal server error" });
      }
    };
  }

  deletePodcast() {
    return async (req: Request, res: Response) => {
      try {
        const { idPodcast } = req.params;

        if (!idPodcast) {
          return res.status(400).json({ message: "missing id" });
        }

        const deletedPodcast = await App.prismaClient.premiumPodcasts.delete({
          where: {
            id_podcast: +idPodcast,
          },
        });

        fs.unlinkSync("./src/storage/images/" + deletedPodcast.url_thumbnail);

        return res.status(200).json({ message: "success" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal server error" });
      }
    };
  }

  getPodcastById() {
    return async (req: Request, res: Response) => {
      try {
        const { idPodcast } = req.params;

        if (!idPodcast) {
          return res.status(400).json({ message: "missing id" });
        }

        const podcast = await App.prismaClient.premiumPodcasts.findUnique({
          where: {
            id_podcast: +idPodcast,
          },
          include: {
            PremiumEpisodes: true,
          },
        });

        return res.status(200).json({ podcast });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal server error" });
      }
    };
  }

  getUserPodcasts() {
    return async (req: Request, res: Response) => {
      try {
        const { idUser } = req.params;

        if (!idUser) {
          return res.status(400).json({ message: "missing id" });
        }

        const podcasts = await App.prismaClient.premiumPodcasts.findMany({
          where: {
            id_user: +idUser,
          },
          include: {
            PremiumEpisodes: true,
          },
        });

        return res.status(200).json({ podcasts });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal server error" });
      }
    };
  }
}
