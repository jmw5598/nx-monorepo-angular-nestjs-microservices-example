import { MigrationInterface, QueryRunner } from "typeorm";

export class addsIndexToRefreshTokenColumnOnRefreshTokenTable1675370581790 implements MigrationInterface {
    name = 'addsIndexToRefreshTokenColumnOnRefreshTokenTable1675370581790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_c911d809b9f41e7c6d15f394ea" ON "app_refresh_token" ("refresh_token") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_c911d809b9f41e7c6d15f394ea"`);
    }

}
