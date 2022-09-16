import {
  controller,
  httpPost,
  requestBody,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import ClientServices from "./client.services";
import { CreateClientDTO, validateIncomingRequest } from "./create.client.dto";
import { BaseController } from "../base.controller";

@controller("/auth/clients")
export class ClientController extends BaseController {
  constructor(private readonly clientServices: ClientServices) {
    super();
  }

  @httpPost("/", validateIncomingRequest())
  public async register(
    @response() res: Response,
    @requestBody() createUserDto: CreateClientDTO
  ) {
    const clientResponseDto = await this.clientServices.register(createUserDto);
    this.sendResponse(
      res,
      201,
      "Client registered successfully",
      clientResponseDto
    );
  }
}
