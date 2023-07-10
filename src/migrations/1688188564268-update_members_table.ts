import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMembersTable1688188564268 implements MigrationInterface {
  name = "UpdateMembersTable1688188564268";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`member\` ADD \`age\` int NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`member\` DROP COLUMN \`age\``);
  }

}
