import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty()
  @IsString()
  groupServiceCode: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  description?: string;
}
