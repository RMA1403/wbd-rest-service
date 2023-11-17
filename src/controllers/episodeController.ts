import { Request, Response } from "express";
import { App } from "../app";
import fs from "fs";
import { Category } from '@prisma/client'; 
import multer from 'multer';
export class EpisodeController {
  createEpisode() {
    return async (req: Request, res: Response) => {
      try {
        const { title, description, idPodcast } = req.body;
        const { imageFile, audioFile } = req.files as any;

        if (!title || !idPodcast || !imageFile[0] || !audioFile[0]) {
          return res.status(400).json({ message: "incomplete request" });
        }

        await App.prismaClient.premiumEpisodes.create({
          data: {
            title,
            description,
            id_podcast: +idPodcast,
            url_thumbnail: imageFile[0].filename,
            url_audio: audioFile[0].filename,
          },
        });

        return res.status(201).json({ message: "success" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal server error" });
      }
    };
  }

  editEpisode() {
    return async (req: Request, res: Response) => {
      try {
        const { idEpisode } = req.params;
        const { title, description, updateCover } = req.body;
        const file = req.file;

        if (!idEpisode || !title) {
          return res.status(400).json({ message: "incomplete request" });
        }

        if (updateCover === "true") {
          if (!file || !file.filename) {
            return res.status(400).json({ message: "missing file" });
          }

          const { url_thumbnail: oldImagePath } =
            (await App.prismaClient.premiumEpisodes.findUnique({
              where: {
                id_episode: +idEpisode,
              },
              select: {
                url_thumbnail: true,
              },
            })) ?? {};

          fs.unlinkSync("./src/storage/images/" + oldImagePath);
        }

        await App.prismaClient.premiumEpisodes.update({
          where: {
            id_episode: +idEpisode,
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

  deleteEpisode() {
    return async (req: Request, res: Response) => {
      try {
        const { idEpisode } = req.params;

        if (!idEpisode) {
          return res.status(400).json({ message: "missing id" });
        }

        const deletedEpisode = await App.prismaClient.premiumEpisodes.delete({
          where: {
            id_episode: +idEpisode,
          },
        });

        fs.unlinkSync("./src/storage/images/" + deletedEpisode.url_thumbnail);
        fs.unlinkSync("./src/storage/audio/" + deletedEpisode.url_audio);

        return res.status(200).json({ message: "success" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal server error" });
      }
    };
  }

  getEpisodeById() {
    return async (req: Request, res: Response) => {
      try {
        const { idEpisode } = req.params;

        if (!idEpisode) {
          return res.status(400).json({ message: "missing id" });
        }

        const episode = await App.prismaClient.premiumEpisodes.findUnique({
          where: {
            id_episode: +idEpisode,
          },
        });

        return res.status(200).json({ episode });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal server error" });
      }
    };
  }

  getEpisodeByIdOther() {
    return async (req: Request, res: Response) => {
      const { episodeId } = req.params;

      if (!episodeId) {
        res.status(400).send({ message: "Request parameter not found" });
        return;
      }

      // const result = await App.prismaClient.$queryRawUnsafe(
      //   `
      //   SELECT title, description, url_thumbnail AS imageurl FROM premium_episodes
      //   where id_episode = ${episodeId};
      //   `
      // );

      const result = await App.prismaClient.premiumEpisodes.findMany({
        select: {
          title: true,
          description: true,
          url_thumbnail: true,
        },
        where: {
          id_episode: +episodeId,
        },
      });

      return res.status(200).send({ episode: result });
    };
  }
}
