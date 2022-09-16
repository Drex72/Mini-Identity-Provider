import { injectable } from "inversify";
import { ClientRepository } from "./client.repository";
import { CreateClientDTO } from "./create.client.dto";
import { randomBytes } from "crypto";
import { plainToInstance } from "class-transformer";
import { ClientResponseDto } from "./client.response.dto";
import { Routes } from "../../utils/constants.endpoints";
import Client from "./client.model";

@injectable()
export default class ClientServices {
  public constructor(private readonly clientRepo: ClientRepository) {}

  public async register(
    createClientDTO: CreateClientDTO
  ): Promise<ClientResponseDto> {
    createClientDTO.secret = randomBytes(18).toString("hex");
    const client = (await this.clientRepo.saveAndReturn(
      createClientDTO
    )) as Client;
    const clientResponseDto = plainToInstance(ClientResponseDto, client);
    clientResponseDto.token_endpoint = Routes.TOKEN_ENDPOINT;
    clientResponseDto.authorization_endpoint = Routes.AUTHORIZATION_ENDPOINT;
    return clientResponseDto;
  }
}
