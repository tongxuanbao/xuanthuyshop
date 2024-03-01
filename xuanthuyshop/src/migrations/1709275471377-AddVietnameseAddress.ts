import { MigrationInterface, QueryRunner } from "typeorm";

export class VietnameseAddress1709275471377 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "address" ADD COLUMN "district" text`
        );
        await queryRunner.query(
            `ALTER TABLE "address" ADD COLUMN "ward" text`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "address" DROP COLUMN "district"`
        );
        await queryRunner.query(
            `ALTER TABLE "address" DROP COLUMN "ward"`
        );
    }

}
