import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccount1712571991659 implements MigrationInterface {
  name = 'CreateAccount1712571991659';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "account" (
      "id" SERIAL NOT NULL,
      "phone" character varying NOT NULL,
      "password" character varying NOT NULL,
      "userId" integer,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      "deletedAt" TIMESTAMP,
      CONSTRAINT "PK_cace4a159ff9f2512aa42373760" PRIMARY KEY ("id"));`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ccc9" ON "account" ("phone")`,
    );
    await queryRunner.query(
      `CREATE TABLE "session" (
      "id" SERIAL NOT NULL, 
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
      "deletedAt" TIMESTAMP, 
      "accountId" integer, 
      CONSTRAINT "PK_cace4a159ff9f2512bb42373760" PRIMARY KEY ("id"));`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0eec9" ON "session" ("accountId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_3d2f174ef04fb312fdebd0ccc9"`);
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(`DROP INDEX "IDX_3d2f174ef04fb312fdebd0eec9"`);
    await queryRunner.query(`DROP TABLE "session"`);
  }
}
