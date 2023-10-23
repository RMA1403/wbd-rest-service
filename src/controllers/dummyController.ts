import { Request, Response } from "express";
import { App } from "../app";

export class DummyController {
  getDummyData() {
    return async (req: Request, res: Response) => {
      const data = await App.prismaClient.dummyTable.findMany();
      res.send(data[0])
    }
  }
}