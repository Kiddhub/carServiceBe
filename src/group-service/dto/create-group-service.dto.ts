import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGroupServiceDto {
  @ApiProperty()
  @IsNotEmpty()
  key: string;

  @ApiProperty()
  @IsNotEmpty()
  value: string;

  @ApiProperty()
  @IsOptional()
  status?: string;
}
