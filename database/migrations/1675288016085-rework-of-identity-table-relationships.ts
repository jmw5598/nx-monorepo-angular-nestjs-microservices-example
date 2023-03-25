import { MigrationInterface, QueryRunner } from "typeorm";

export class reworkOfIdentityTableRelationships1675288016085 implements MigrationInterface {
    name = 'reworkOfIdentityTableRelationships1675288016085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_profile" DROP CONSTRAINT "FK_44c4b52c20d3613614b5dbd0698"`);
        await queryRunner.query(`ALTER TABLE "app_account" DROP CONSTRAINT "FK_ecfc2de7f9741a6569d8850ad29"`);
        await queryRunner.query(`ALTER TABLE "app_profile" DROP CONSTRAINT "REL_44c4b52c20d3613614b5dbd069"`);
        await queryRunner.query(`ALTER TABLE "app_profile" DROP COLUMN "app_user_id"`);
        await queryRunner.query(`ALTER TABLE "app_profile" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "app_tenant" DROP COLUMN "domain"`);
        await queryRunner.query(`ALTER TABLE "app_tenant" DROP COLUMN "connection_string"`);
        await queryRunner.query(`ALTER TABLE "app_account" DROP CONSTRAINT "REL_ecfc2de7f9741a6569d8850ad2"`);
        await queryRunner.query(`ALTER TABLE "app_account" DROP COLUMN "app_tenant_id"`);
        await queryRunner.query(`ALTER TABLE "app_address" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_profile" ADD "summary" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_profile" ADD "avatar_url" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_user" ADD "app_profile_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_user" ADD CONSTRAINT "UQ_9b10662aaf679e9c3b7f67fb59c" UNIQUE ("app_profile_id")`);
        await queryRunner.query(`ALTER TABLE "app_tenant" ADD "app_account_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_tenant" ADD CONSTRAINT "UQ_c07ad4fd985e31b0ca14e7b3165" UNIQUE ("app_account_id")`);
        await queryRunner.query(`ALTER TABLE "app_user" ADD CONSTRAINT "FK_9b10662aaf679e9c3b7f67fb59c" FOREIGN KEY ("app_profile_id") REFERENCES "app_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_tenant" ADD CONSTRAINT "FK_c07ad4fd985e31b0ca14e7b3165" FOREIGN KEY ("app_account_id") REFERENCES "app_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_tenant" DROP CONSTRAINT "FK_c07ad4fd985e31b0ca14e7b3165"`);
        await queryRunner.query(`ALTER TABLE "app_user" DROP CONSTRAINT "FK_9b10662aaf679e9c3b7f67fb59c"`);
        await queryRunner.query(`ALTER TABLE "app_tenant" DROP CONSTRAINT "UQ_c07ad4fd985e31b0ca14e7b3165"`);
        await queryRunner.query(`ALTER TABLE "app_tenant" DROP COLUMN "app_account_id"`);
        await queryRunner.query(`ALTER TABLE "app_user" DROP CONSTRAINT "UQ_9b10662aaf679e9c3b7f67fb59c"`);
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "app_profile_id"`);
        await queryRunner.query(`ALTER TABLE "app_profile" DROP COLUMN "avatar_url"`);
        await queryRunner.query(`ALTER TABLE "app_profile" DROP COLUMN "summary"`);
        await queryRunner.query(`ALTER TABLE "app_address" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "app_account" ADD "app_tenant_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_account" ADD CONSTRAINT "REL_ecfc2de7f9741a6569d8850ad2" UNIQUE ("app_tenant_id")`);
        await queryRunner.query(`ALTER TABLE "app_tenant" ADD "connection_string" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_tenant" ADD "domain" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_profile" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_profile" ADD "app_user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_profile" ADD CONSTRAINT "REL_44c4b52c20d3613614b5dbd069" UNIQUE ("app_user_id")`);
        await queryRunner.query(`ALTER TABLE "app_account" ADD CONSTRAINT "FK_ecfc2de7f9741a6569d8850ad29" FOREIGN KEY ("app_tenant_id") REFERENCES "app_tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_profile" ADD CONSTRAINT "FK_44c4b52c20d3613614b5dbd0698" FOREIGN KEY ("app_user_id") REFERENCES "app_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
