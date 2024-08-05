import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMaterialDto } from './create-material.dto';
import { IsString, IsNumber } from 'class-validator';

export class UpdateMaterialDto extends PartialType(CreateMaterialDto) {
  @ApiProperty()
  @IsString()
  name?: string;
  @ApiProperty()
  @IsString()
  description?: string;
  @ApiProperty()
  @IsString()
  importPrice?: string;
  @ApiProperty()
  @IsString()
  exportPrice?: string;
  @ApiProperty()
  @IsNumber()
  importQuantity?: number;
  @ApiProperty()
  @IsNumber()
  exportQuantity?: number;
  @ApiProperty()
  @IsString()
  groupServiceCode?: string;
}
