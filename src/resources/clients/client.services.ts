import { injectable } from "inversify";
import { ClientRepository } from "./client.repository";
import { CreateClientDTO } from "./create.client.dto";
import { randomBytes } from "crypto";
import { ClientResponseDto } from "./client.response.dto";
import Client from "./client.model";
import { ClientMapper } from "./client.mapper";

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
    return ClientMapper.clientToClientResponseDTO(
      new ClientResponseDto(),
      client
    );
  }
}
