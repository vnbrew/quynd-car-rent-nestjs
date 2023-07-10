import { MigrationInterface, QueryRunner } from "typeorm";

export class InitizaliTable1688188358702 implements MigrationInterface {
  name = "InitizaliTable1688188358702";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`member\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`gender\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`CREATE TABLE \`cat\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_aad5842554387ee4ac802df41a\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_aad5842554387ee4ac802df41a\` ON \`cat\``);
    await queryRunner.query(`DROP TABLE \`cat\``);
    await queryRunner.query(`DROP TABLE \`member\``);
  }

}
