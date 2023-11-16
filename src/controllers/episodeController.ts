import { Request, Response } from "express";
import { App } from "../app";
import fs from "fs";
import fetch2 from "node-fetch";
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
        const { premium } = req.query;

        if (!idEpisode) {
          return res.status(400).json({ message: "missing id" });
        }

        if (premium === "false") {
          const result = await fetch2(
            `http://tubes-php-app:80/public/episode-by-id?idEpisode=${idEpisode}`
          );
          const { episode } = await result.json();

          const response = {
            episode: {
              id_episode: +episode.id_episode,
              title: episode.title,
              url_thumbnail: episode.url_thumbnail,
              description: episode.description,
              url_audio: episode.url_audio,
              id_podcast: +episode.id_podcast,
            },
          };

          return res.status(200).json({ ...response });
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
}
