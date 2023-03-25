import { MigrationInterface, QueryRunner } from "typeorm";

export class addIdentifierUuidColumnToAccountTable1675529565374 implements MigrationInterface {
    name = 'addIdentifierUuidColumnToAccountTable1675529565374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_account" ADD "identifier" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "app_user" ALTER COLUMN "email_confirmation_token_expiration" SET DEFAULT NOW() + interval '24 hours'`);
        await queryRunner.query(`CREATE INDEX "IDX_251249fb48fa662a11429909eb" ON "app_account" ("identifier") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_251249fb48fa662a11429909eb"`);
        await queryRunner.query(`ALTER TABLE "app_user" ALTER COLUMN "email_confirmation_token_expiration" SET DEFAULT (now() + '24:00:00')`);
        await queryRunner.query(`ALTER TABLE "app_account" DROP COLUMN "identifier"`);
    }

}
