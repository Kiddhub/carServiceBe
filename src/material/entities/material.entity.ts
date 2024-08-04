import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Material extends EntityHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column({ type: String, nullable: false })
  @Index()
  name: string;
  @ApiProperty()
  @Column({ type: String, nullable: false })
  importPrice: string;
  @ApiProperty()
  @Column({ type: String, nullable: false })
  exportPrice: string;
  @ApiProperty()
  @Column({ type: Number, nullable: false })
  importQuantity: number;
  @ApiProperty()
  @Column({ type: Number, nullable: false })
  exportQuantity: number;
  @ApiProperty()
  @Column({ type: String, nullable: false })
  groupServiceCode: string;
  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
