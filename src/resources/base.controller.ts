import { Response } from "express";

export abstract class BaseController {
  protected sendResponse(
    res: Response,
    status: number,
    message: string,
    data: any
  ): Response {
    return res.status(status).json({
      status,
      message,
      data: [data],
    });
  }
}
