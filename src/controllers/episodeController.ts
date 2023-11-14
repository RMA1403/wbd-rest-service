import { Request, Response } from "express";

export class EpisodeController {
  createEpisode() {
    return async (req: Request, res: Response) => {
      try {
        return res.status(200).json({ body: req.body, files: req.files });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal server error" });
      }
    };
  }
}
