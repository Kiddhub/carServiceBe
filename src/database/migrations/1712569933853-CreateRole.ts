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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
