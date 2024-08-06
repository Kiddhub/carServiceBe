import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserCarDto {
  @ApiProperty()
  @IsString()
  mode: string;
  @ApiProperty()
  @IsString()
  plateNumber: string;
  @ApiProperty()
  @IsString()
  color: string;
}
