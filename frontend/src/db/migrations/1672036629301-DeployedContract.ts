import { MigrationInterface, QueryRunner } from "typeorm";

export class DeployedContract1672036629301 implements MigrationInterface {
    name = 'DeployedContract1672036629301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`deployed_contract\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`version\` varchar(10) NOT NULL, \`interface\` varchar(128) NOT NULL, \`address\` char(42) NOT NULL, \`description\` varchar(255) NULL, \`chainId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`deployed_contract\``);
    }

}
