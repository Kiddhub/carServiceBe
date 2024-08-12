import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1700333930058 implements MigrationInterface {
  name = 'CreateUser1700333930058';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" (
      "id" SERIAL NOT NULL,
      "name" character varying ,
      "dob" TIMESTAMP,
      "roleId" integer,
      "email" character varying ,
      "phone" character varying ,
      "createdAt" TIMESTAMP DEFAULT now(),
      "updatedAt" TIMESTAMP DEFAULT now(),
      "deletedAt" TIMESTAMP,
      CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"));`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc9" ON "user" ("email") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3e4b8e70c4519dabf6b2f5e2f2" ON "user" ("phone") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_3e4b8e70c4519dabf6b2f5e2f2"`);
    await queryRunner.query(`DROP INDEX "IDX_3d2f174ef04fb312fdebd0ddc9"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
