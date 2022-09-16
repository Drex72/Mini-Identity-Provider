import { ClientResponseDto } from "./client.response.dto";
import Client from "./client.model";
import { Routes } from "../../utils/constants.endpoints";

export class ClientMapper {
  /**
   * maps the values from the client object to the client response DTO
   * @requires {ClientResponseDto, Client} a client response dto object and
   * a client object containing database populated data
   * @param responseDTO
   * @param client
   * @returns ClientResponseDto client response DTO
   */
  static clientToClientResponseDTO(
    responseDTO: ClientResponseDto,
    client: Client
  ) {
    responseDTO.client_id = client.id;
    responseDTO.client_name = client.name;
    responseDTO.client_secret = client.clientSecret;
    responseDTO.redirect_uri = client.redirection_endpoint;
    responseDTO.authorization_endpoint = Routes.AUTHORIZATION_ENDPOINT;
    responseDTO.token_endpoint = Routes.TOKEN_ENDPOINT;
    return responseDTO;
  }
}
