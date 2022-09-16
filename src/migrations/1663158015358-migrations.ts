import {MigrationInterface, QueryRunner, Table} from "typeorm"

export class migrations1663158015358 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "clients",
      columns: [
        {
          name: "id",
          type: "varchar",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "uuid"
        },
        {
          name: "name",
          type: "varchar",
        },
        {
          name: "redirection_endpoint",
          type: "varchar",
          isNullable: false
        },
        {
          name: "secret",
          type: "varchar",
          length: "70",
          isNullable: false
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()"
        },
        {
          name: "deleted_at",
          type: "timestamp",
          isNullable: true,
          default: null
        }
      ]
    }), true);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("clients");
  }

}
