import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRole1712569933853 implements MigrationInterface {
  name = 'CreateRole1712569933853';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" (
      "id" SERIAL NOT NULL,
      "name" character varying NOT NULL,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      "deletedAt" TIMESTAMP,
      CONSTRAINT "PK_cace4a159ff9f2512ee42373760" PRIMARY KEY ("id"));`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0aac9" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."FK_3d2f174ef04fb312fdebd0aac9"`,
    );
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
