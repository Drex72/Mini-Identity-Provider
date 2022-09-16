import { DataSource, Repository } from "typeorm";
import Client from "./client.model";
import { injectable, decorate } from "inversify";
import { CreateClientDTO } from "./create.client.dto";

decorate(injectable(), Repository);

@injectable()
export class ClientRepository extends Repository<Client> {
  constructor(private readonly dataSource: DataSource) {
    super(Client, dataSource.createEntityManager());
  }

  public async isEmailTaken(clientName: string): Promise<Boolean> {
    return (
      (await this.createQueryBuilder("clients")
        .where("clients.name = :name", { name: clientName })
        .getCount()) > 0
    );
  }

  public async saveAndReturn(createClientDTO: CreateClientDTO) {
    return await this.createQueryBuilder("clients")
      .insert()
      .into(Client)
      .values([createClientDTO])
      .execute()
      .then((value) => {
        const id = value.identifiers[0].id;
        return this.createQueryBuilder("clients")
          .where("clients.id = :id", { id })
          .getOne();
      })
      .catch((err) => {
        throw err;
      });
  }
}
