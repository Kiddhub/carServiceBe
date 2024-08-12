import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCarHistory1712844808966 implements MigrationInterface {
  name = 'CreateCarHistory1712844808966';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "car_history" (
      "id" SERIAL NOT NULL,
      "plateNumber" character varying,
      "userId" integer,
      "checkIn" TIMESTAMP ,
      "checkOut" TIMESTAMP,
      "status" character varying,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      "deletedAt" TIMESTAMP,
      CONSTRAINT "PK_cace4a159ff9f2512kk42373760" PRIMARY KEY ("id"));`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "car_history"`);
  }
}
