import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserCar1712739648183 implements MigrationInterface {
  name = 'CreateUserCar1712739648183';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_car" (
      "id" SERIAL NOT NULL,
      "mode" character varying NOT NULL,
      "plateNumber" character varying NOT NULL,
      "color" character varying NOT NULL,
      "userId" integer NOT NULL,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      "deletedAt" TIMESTAMP,
      CONSTRAINT "PK_cace4a159ff9f2512ii42373760" PRIMARY KEY ("id"));`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0hhc9" ON "user_car" ("plateNumber")`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ggc9"`,
    );
    await queryRunner.query(`DROP TABLE "material"`);
  }
}
