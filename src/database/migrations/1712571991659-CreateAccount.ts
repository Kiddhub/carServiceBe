import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccount1712571991659 implements MigrationInterface {
  name = 'CreateAccount1712571991659';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "account" (
      "id" SERIAL NOT NULL,
      "phone" character varying NOT NULL,
      "password" character varying NOT NULL,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      "deletedAt" TIMESTAMP,
      CONSTRAINT "PK_cace4a159ff9f2512aa42373760" PRIMARY KEY ("id"));`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0aac9" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."FK_3d2f174ef04fb312fdebd0aac9"`,
    );
    await queryRunner.query(`DROP TABLE "account"`);
  }
}
