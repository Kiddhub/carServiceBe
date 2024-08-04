import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGroupService1712642606293 implements MigrationInterface {
  name = 'CreateGroupService1712642606293';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "group_service" (
      "id" SERIAL NOT NULL,
      "key" character varying NOT NULL,
      "value" character varying NOT NULL,
      "status" character varying NOT NULL,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      "deletedAt" TIMESTAMP,
      CONSTRAINT "PK_cace4a159ff9f2512ff42373760" PRIMARY KEY ("id"));`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ffc9" ON "group_service" ("key")`,
    );
    await queryRunner.query(
      `CREATE TABLE "service" (
      "id" SERIAL NOT NULL,
      "groupServiceCode" character varying NOT NULL,
      "name" character varying NOT NULL,
      "description" character varying NOT NULL,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      "deletedAt" TIMESTAMP, 
      CONSTRAINT "PK_cace4a159ff9f2512gg42373760" PRIMARY KEY ("id"));`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ffc9"`,
    );
    await queryRunner.query(`DROP TABLE "group_service"`);

    await queryRunner.query(`DROP TABLE "service"`);
  }
}
