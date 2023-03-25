import { MigrationInterface, QueryRunner } from "typeorm";

export class addsEmailConfirmationColumnsToUserTable1675437347208 implements MigrationInterface {
    name = 'addsEmailConfirmationColumnsToUserTable1675437347208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_user" ADD "email_confirmation_token" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "app_user" ADD "email_confirmation_token_expiration" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() + interval '24 hours'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "email_confirmation_token_expiration"`);
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "email_confirmation_token"`);
    }

}
