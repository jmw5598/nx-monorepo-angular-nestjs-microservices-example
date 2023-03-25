import { MigrationInterface, QueryRunner } from "typeorm";

export class initialIdentityTables1675278266078 implements MigrationInterface {
    name = 'initialIdentityTables1675278266078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "app_claim" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "type" character varying NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_7ea87920d35581113ca901ce6ae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_device_code" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "token" character varying NOT NULL, CONSTRAINT "UQ_bc5e1aa5ced60e043b9fa953729" UNIQUE ("token"), CONSTRAINT "PK_cc62527be86d7c1eb1704ab41d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bc5e1aa5ced60e043b9fa95372" ON "app_device_code" ("token") `);
        await queryRunner.query(`CREATE TABLE "app_address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "street" character varying NOT NULL, "street2" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "zip" character varying NOT NULL, CONSTRAINT "PK_3acf65fdedca22bd00fa7a8cc87" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "app_address_id" uuid NOT NULL, "app_user_id" uuid NOT NULL, CONSTRAINT "REL_69e5e32644fd8d77ca9bbbcd6a" UNIQUE ("app_address_id"), CONSTRAINT "REL_44c4b52c20d3613614b5dbd069" UNIQUE ("app_user_id"), CONSTRAINT "PK_28ba403c42233b5b3c8d5c4a7a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "refresh_token" character varying NOT NULL, "is_blacklisted" boolean NOT NULL DEFAULT false, "app_user_id" uuid NOT NULL, CONSTRAINT "PK_c2ba96083bdc5d8d804f2a33efa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, CONSTRAINT "UQ_5b741af93e7206264d17d783343" UNIQUE ("name"), CONSTRAINT "PK_6247c97e5e63af6c5d6cc8a5e3c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "username" character varying NOT NULL, "password" character varying NOT NULL, "password_reset_token" uuid NOT NULL DEFAULT uuid_generate_v4(), "password_reset_token_expiration" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "email" character varying NOT NULL, "is_email_confirmed" boolean NOT NULL DEFAULT false, "is_locked_out" boolean NOT NULL DEFAULT false, "app_tenant_id" uuid NOT NULL, CONSTRAINT "UQ_c480e576dd71729addbc2d51b67" UNIQUE ("username"), CONSTRAINT "UQ_3fa909d0e37c531ebc237703391" UNIQUE ("email"), CONSTRAINT "PK_22a5c4a3d9b2fb8e4e73fc4ada1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c480e576dd71729addbc2d51b6" ON "app_user" ("username") `);
        await queryRunner.query(`CREATE TABLE "app_tenant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "identifier" uuid NOT NULL DEFAULT uuid_generate_v4(), "domain" character varying NOT NULL, "connection_string" character varying NOT NULL, "is_locked_out" boolean NOT NULL, CONSTRAINT "PK_0a0d871e841c6c7d3d6d4d1c9a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2e424c718b864444f8b11593a5" ON "app_tenant" ("identifier") `);
        await queryRunner.query(`CREATE TABLE "app_account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "app_tenant_id" uuid NOT NULL, CONSTRAINT "REL_ecfc2de7f9741a6569d8850ad2" UNIQUE ("app_tenant_id"), CONSTRAINT "PK_67616a35344586911a7e0e936f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "indentifier" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_590bef46cbebaa44cbbecdf9bd9" UNIQUE ("indentifier"), CONSTRAINT "PK_03e6036388b279d785e1a4e86e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_590bef46cbebaa44cbbecdf9bd" ON "app_client" ("indentifier") `);
        await queryRunner.query(`CREATE TABLE "app_role_claim" ("app_role_id" uuid NOT NULL, "app_claim_id" uuid NOT NULL, CONSTRAINT "PK_25e354cd22d7b431d5d2dce05e3" PRIMARY KEY ("app_role_id", "app_claim_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_32d50cb2917777213a4fa33840" ON "app_role_claim" ("app_role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_189459db8beefb7748a53f3e96" ON "app_role_claim" ("app_claim_id") `);
        await queryRunner.query(`CREATE TABLE "app_user_role" ("app_user_id" uuid NOT NULL, "app_role_id" uuid NOT NULL, CONSTRAINT "PK_812b603c86950ac48e81cee0f71" PRIMARY KEY ("app_user_id", "app_role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0099ab8422881c97a065df9d02" ON "app_user_role" ("app_user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_083a77f0c71c5be9b53468ce8f" ON "app_user_role" ("app_role_id") `);
        await queryRunner.query(`CREATE TABLE "app_user_claim" ("app_user_id" uuid NOT NULL, "app_claim_id" uuid NOT NULL, CONSTRAINT "PK_d1e424a40a35d52f9a290cfd00c" PRIMARY KEY ("app_user_id", "app_claim_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bf676fb33203d498a09e7fadd7" ON "app_user_claim" ("app_user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6e2b4373035e57d4979ed727f3" ON "app_user_claim" ("app_claim_id") `);
        await queryRunner.query(`CREATE TABLE "app_user_device_code" ("app_user_id" uuid NOT NULL, "app_device_code_id" uuid NOT NULL, CONSTRAINT "PK_9c440edfbc838f27fe0ee213b6d" PRIMARY KEY ("app_user_id", "app_device_code_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e566bfcfd39966a07a904814c2" ON "app_user_device_code" ("app_user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_38f9125a35ea3612cfaabbb101" ON "app_user_device_code" ("app_device_code_id") `);
        await queryRunner.query(`CREATE TABLE "app_client_role" ("app_client_id" uuid NOT NULL, "app_role_id" uuid NOT NULL, CONSTRAINT "PK_aaf6c4db6a2eaa0bfba6f9f5e9f" PRIMARY KEY ("app_client_id", "app_role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_277fb92a4b5302014c282cc702" ON "app_client_role" ("app_client_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_bc0ac83a58b8a3ede68ffb8245" ON "app_client_role" ("app_role_id") `);
        await queryRunner.query(`ALTER TABLE "app_profile" ADD CONSTRAINT "FK_69e5e32644fd8d77ca9bbbcd6a0" FOREIGN KEY ("app_address_id") REFERENCES "app_address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_profile" ADD CONSTRAINT "FK_44c4b52c20d3613614b5dbd0698" FOREIGN KEY ("app_user_id") REFERENCES "app_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_refresh_token" ADD CONSTRAINT "FK_0c02f0abf9c252b0ba08cecd938" FOREIGN KEY ("app_user_id") REFERENCES "app_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_user" ADD CONSTRAINT "FK_eacfb19d80880051b15820e8913" FOREIGN KEY ("app_tenant_id") REFERENCES "app_tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_account" ADD CONSTRAINT "FK_ecfc2de7f9741a6569d8850ad29" FOREIGN KEY ("app_tenant_id") REFERENCES "app_tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_role_claim" ADD CONSTRAINT "FK_32d50cb2917777213a4fa33840d" FOREIGN KEY ("app_role_id") REFERENCES "app_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "app_role_claim" ADD CONSTRAINT "FK_189459db8beefb7748a53f3e969" FOREIGN KEY ("app_claim_id") REFERENCES "app_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "app_user_role" ADD CONSTRAINT "FK_0099ab8422881c97a065df9d02c" FOREIGN KEY ("app_user_id") REFERENCES "app_user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "app_user_role" ADD CONSTRAINT "FK_083a77f0c71c5be9b53468ce8fc" FOREIGN KEY ("app_role_id") REFERENCES "app_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "app_user_claim" ADD CONSTRAINT "FK_bf676fb33203d498a09e7fadd76" FOREIGN KEY ("app_user_id") REFERENCES "app_user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "app_user_claim" ADD CONSTRAINT "FK_6e2b4373035e57d4979ed727f39" FOREIGN KEY ("app_claim_id") REFERENCES "app_claim"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "app_user_device_code" ADD CONSTRAINT "FK_e566bfcfd39966a07a904814c21" FOREIGN KEY ("app_user_id") REFERENCES "app_user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "app_user_device_code" ADD CONSTRAINT "FK_38f9125a35ea3612cfaabbb1013" FOREIGN KEY ("app_device_code_id") REFERENCES "app_device_code"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "app_client_role" ADD CONSTRAINT "FK_277fb92a4b5302014c282cc702c" FOREIGN KEY ("app_client_id") REFERENCES "app_client"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "app_client_role" ADD CONSTRAINT "FK_bc0ac83a58b8a3ede68ffb82451" FOREIGN KEY ("app_role_id") REFERENCES "app_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_client_role" DROP CONSTRAINT "FK_bc0ac83a58b8a3ede68ffb82451"`);
        await queryRunner.query(`ALTER TABLE "app_client_role" DROP CONSTRAINT "FK_277fb92a4b5302014c282cc702c"`);
        await queryRunner.query(`ALTER TABLE "app_user_device_code" DROP CONSTRAINT "FK_38f9125a35ea3612cfaabbb1013"`);
        await queryRunner.query(`ALTER TABLE "app_user_device_code" DROP CONSTRAINT "FK_e566bfcfd39966a07a904814c21"`);
        await queryRunner.query(`ALTER TABLE "app_user_claim" DROP CONSTRAINT "FK_6e2b4373035e57d4979ed727f39"`);
        await queryRunner.query(`ALTER TABLE "app_user_claim" DROP CONSTRAINT "FK_bf676fb33203d498a09e7fadd76"`);
        await queryRunner.query(`ALTER TABLE "app_user_role" DROP CONSTRAINT "FK_083a77f0c71c5be9b53468ce8fc"`);
        await queryRunner.query(`ALTER TABLE "app_user_role" DROP CONSTRAINT "FK_0099ab8422881c97a065df9d02c"`);
        await queryRunner.query(`ALTER TABLE "app_role_claim" DROP CONSTRAINT "FK_189459db8beefb7748a53f3e969"`);
        await queryRunner.query(`ALTER TABLE "app_role_claim" DROP CONSTRAINT "FK_32d50cb2917777213a4fa33840d"`);
        await queryRunner.query(`ALTER TABLE "app_account" DROP CONSTRAINT "FK_ecfc2de7f9741a6569d8850ad29"`);
        await queryRunner.query(`ALTER TABLE "app_user" DROP CONSTRAINT "FK_eacfb19d80880051b15820e8913"`);
        await queryRunner.query(`ALTER TABLE "app_refresh_token" DROP CONSTRAINT "FK_0c02f0abf9c252b0ba08cecd938"`);
        await queryRunner.query(`ALTER TABLE "app_profile" DROP CONSTRAINT "FK_44c4b52c20d3613614b5dbd0698"`);
        await queryRunner.query(`ALTER TABLE "app_profile" DROP CONSTRAINT "FK_69e5e32644fd8d77ca9bbbcd6a0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc0ac83a58b8a3ede68ffb8245"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_277fb92a4b5302014c282cc702"`);
        await queryRunner.query(`DROP TABLE "app_client_role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_38f9125a35ea3612cfaabbb101"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e566bfcfd39966a07a904814c2"`);
        await queryRunner.query(`DROP TABLE "app_user_device_code"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6e2b4373035e57d4979ed727f3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf676fb33203d498a09e7fadd7"`);
        await queryRunner.query(`DROP TABLE "app_user_claim"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_083a77f0c71c5be9b53468ce8f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0099ab8422881c97a065df9d02"`);
        await queryRunner.query(`DROP TABLE "app_user_role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_189459db8beefb7748a53f3e96"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_32d50cb2917777213a4fa33840"`);
        await queryRunner.query(`DROP TABLE "app_role_claim"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_590bef46cbebaa44cbbecdf9bd"`);
        await queryRunner.query(`DROP TABLE "app_client"`);
        await queryRunner.query(`DROP TABLE "app_account"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2e424c718b864444f8b11593a5"`);
        await queryRunner.query(`DROP TABLE "app_tenant"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c480e576dd71729addbc2d51b6"`);
        await queryRunner.query(`DROP TABLE "app_user"`);
        await queryRunner.query(`DROP TABLE "app_role"`);
        await queryRunner.query(`DROP TABLE "app_refresh_token"`);
        await queryRunner.query(`DROP TABLE "app_profile"`);
        await queryRunner.query(`DROP TABLE "app_address"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc5e1aa5ced60e043b9fa95372"`);
        await queryRunner.query(`DROP TABLE "app_device_code"`);
        await queryRunner.query(`DROP TABLE "app_claim"`);
    }

}
