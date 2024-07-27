import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1700333930058 implements MigrationInterface {
  name = 'CreateUser1700333930058';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" (
      "id" SERIAL NOT NULL,
      "name" character varying NOT NULL,
      "dob" TIMESTAMP NOT NULL,
      "roleId" integer NOT NULL,
      "email" character varying NOT NULL,
      "phone" character varying NOT NULL,
      "accountId" integer NOT NULL,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      "deletedAt" TIMESTAMP,
      CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"));`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc9" ON "user" ("email") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3e4b8e70c4519dabf6b2f5e2f2" ON "user" ("phone") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0aac9" ON "user" ("name") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_3e4b8e70c4519dabf6b2f5e2f2"`);
    await queryRunner.query(`DROP INDEX "IDX_3d2f174ef04fb312fdebd0ddc9"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
