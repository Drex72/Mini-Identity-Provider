import { InversifyExpressServer } from "inversify-express-utils";
import express, { Application, NextFunction, Request, Response } from "express";
import { config } from "./config";
import container from "./core/DIContainer";
import { DBService } from "./DBService";
import compression from "compression";
import morgan from "morgan";
import { DataSource } from "typeorm";
import { BadRequestException } from "./utils/exceptions/bad.request.exception";
import HttpStatus from "http-status";
import { Routes } from "./utils/constants.endpoints";

export default class App {
  public setup(): void {
    const dbService: DBService = container.get(DBService);
    dbService.connect().then(async (dataSource: DataSource): Promise<void> => {
      console.log("Database connection established");
      await dataSource.runMigrations();
    });

    const NO_CUSTOM_ROUTER = null;
    const server: InversifyExpressServer = new InversifyExpressServer(
      container,
      NO_CUSTOM_ROUTER,
      {
        rootPath: Routes.BASE_ROUTE_PATH,
      }
    );

    server.setConfig((app: Application): void => {
      app.use(express.json());
      app.use(compression());
      app.use(morgan("dev"));
    });

    server.setErrorConfig((app: Application) => {
      app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof BadRequestException) {
          res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
            info: err.errors,
          });
          return;
        }
        console.log(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "Oops! an error occurred.",
        });
      });
    });

    const app: Application = server.build();

    app.listen(config.PORT, (): void => {
      console.log(`Server running on http://localhost:${config.PORT}`);
    });
  }
}
