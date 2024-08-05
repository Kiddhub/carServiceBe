import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMaterial1712738375998 implements MigrationInterface {
  name = 'CreateMaterial1712738375998';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "material" (
      "id" SERIAL NOT NULL,
      "name" character varying NOT NULL,
      "description" character varying NOT NULL,
      "importPrice" character varying NOT NULL,
      "exportPrice" character varying NOT NULL,
      "importQuantity" integer NOT NULL,
      "exportQuantity" integer NOT NULL,
      "groupServiceCode" character varying NOT NULL,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      "deletedAt" TIMESTAMP,
      CONSTRAINT "PK_cace4a159ff9f2512hh42373760" PRIMARY KEY ("id"));`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ggc9" ON "material" ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ggc9"`,
    );
    await queryRunner.query(`DROP TABLE "material"`);
  }
}
