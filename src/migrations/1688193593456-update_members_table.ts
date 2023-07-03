import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMembersTable1688193593456 implements MigrationInterface {
    name = 'UpdateMembersTable1688193593456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`member\` ADD \`address\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`member\` DROP COLUMN \`address\``);
    }

}
