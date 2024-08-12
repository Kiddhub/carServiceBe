import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMaterial1712738375998 implements MigrationInterface {
  name = 'CreateMaterial1712738375998';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "material" (
      "id" SERIAL NOT NULL,
      "name" character varying,
      "description" character varying ,
      "importPrice" character varying ,
      "exportPrice" character varying ,
      "importQuantity" integer ,
      "exportQuantity" integer ,
      "groupServiceCode" character varying ,
      "createdAt" TIMESTAMP  DEFAULT now(),
      "updatedAt" TIMESTAMP  DEFAULT now(),
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
