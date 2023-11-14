import { Request, Response } from "express";
import { App } from "../app";

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
}
