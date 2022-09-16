import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";
import { override } from "joi";

export interface IClient {
  readonly id: string;
  name?: string;
  redirection_endpoint: string;
}

@Entity("clients")
export default class Client extends BaseEntity implements IClient {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  redirection_endpoint: string;

  @Column({
    type: "varchar",
    length: 70,
  })
  private secret: string;
}
