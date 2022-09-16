import {Container, injectable, interfaces} from "inversify";
import {DBService} from "../DBService";
import ClientServices from "../resources/clients/client.services";
import {DataSource} from "typeorm";
import {config} from "../config";
import Client from "../resources/clients/client.model";
import {ClientRepository} from "../resources/clients/client.repository";
import {migrations1663158015358} from "../migrations/1663158015358-migrations"

const container = new Container({
  defaultScope: "Singleton",
  skipBaseClassChecks: true
});

container.bind<DataSource>(DataSource).toConstantValue(new DataSource({
  type: "mysql",
  host: config.DATABASE.HOST,
  database: config.DATABASE.NAME,
  username: config.DATABASE.USER,
  password: config.DATABASE.PASSWORD,
  logging: ["migration"],
  entities: [Client],
  migrations: [
    migrations1663158015358,
  ],
  migrationsRun: true,
}));
container.bind(DBService).toSelf();
container.bind(ClientRepository).toSelf();
// container.bind<BaseDto>(CreateClientDto).to(CreateClientDto)
container.bind(ClientServices).toSelf();

export default container