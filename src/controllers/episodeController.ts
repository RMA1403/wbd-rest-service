import { Request, Response } from "express";
import fs from "fs";
import { App } from "../app";

export class EpisodeController {
  playEpisode() {
    return async (req: Request, res: Response) => {
      const { range } = req.headers;
      if (!range) {
        res.status(400).send("Requires range header");
        return;
      }

      const audioPath = "src/storage/audiotester.mp3";
      const audioSize = fs.statSync(audioPath).size;

      const chunkSize = 512 * 10 ** 3;
      const start = Number(range.replace(/\D/g, ""));
      const end = Math.min(start + chunkSize, audioSize - 1);
      const contentLength = end - start + 1;

      const headers = {
        "Content-Range": `bytes ${start}-${end}/${audioSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "audio/mp3",
      };
      res.writeHead(206, headers);

      const audioStream = fs.createReadStream(audioPath, { start, end });
      audioStream.pipe(res);
    };
  }

  getEpisodeById() {
    return async (req: Request, res: Response) => {
      const { episodeId } = req.params;

      if(!episodeId){
        res.status(400).send({message: "Request parameter not found"});
        return;
      }

      const result = await App.prismaClient.$queryRawUnsafe(
        `
        SELECT title, description, url_thumbnail AS imageurl FROM premium_episodes
        where id_episode = ${episodeId};
        `
      );

      return res.status(200).send({ episode: result });
    }
  }

}