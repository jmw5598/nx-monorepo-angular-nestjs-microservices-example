import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedNullabilityOfIdentityTables1675289752142 implements MigrationInterface {
    name = 'updatedNullabilityOfIdentityTables1675289752142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_address" ALTER COLUMN "street" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_address" ALTER COLUMN "street2" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_address" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_address" ALTER COLUMN "state" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_address" ALTER COLUMN "zip" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_address" ALTER COLUMN "country" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_profile" ALTER COLUMN "summary" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_profile" ALTER COLUMN "avatar_url" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_tenant" ALTER COLUMN "is_locked_out" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_tenant" ALTER COLUMN "is_locked_out" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "app_profile" ALTER COLUMN "avatar_url" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_profile" ALTER COLUMN "summary" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_address" ALTER COLUMN "country" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_address" ALTER COLUMN "zip" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_address" ALTER COLUMN "state" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_address" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_address" ALTER COLUMN "street2" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_address" ALTER COLUMN "street" SET NOT NULL`);
    }

}
