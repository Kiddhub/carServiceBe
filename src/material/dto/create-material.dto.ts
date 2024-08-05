import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMaterialDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsString()
  importPrice: string;
  @ApiProperty()
  @IsString()
  exportPrice?: string;
  @ApiProperty()
  @IsNumber()
  importQuantity: number;
  @ApiProperty()
  @IsNumber()
  exportQuantity?: number;
  @ApiProperty()
  @IsString()
  groupServiceCode: string;
}
