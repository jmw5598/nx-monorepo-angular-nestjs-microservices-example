import { MigrationInterface, QueryRunner } from "typeorm";

export class addsIndexOnTokenColumnsOfUserTable1675438937228 implements MigrationInterface {
    name = 'addsIndexOnTokenColumnsOfUserTable1675438937228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_user" ALTER COLUMN "email_confirmation_token_expiration" SET DEFAULT NOW() + interval '24 hours'`);
        await queryRunner.query(`CREATE INDEX "IDX_74d26806c12ca0ffe06e10ed3b" ON "app_user" ("password_reset_token") `);
        await queryRunner.query(`CREATE INDEX "IDX_5efce9296730f676181e76309e" ON "app_user" ("email_confirmation_token") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_5efce9296730f676181e76309e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_74d26806c12ca0ffe06e10ed3b"`);
        await queryRunner.query(`ALTER TABLE "app_user" ALTER COLUMN "email_confirmation_token_expiration" SET DEFAULT (now() + '24:00:00')`);
    }

}
