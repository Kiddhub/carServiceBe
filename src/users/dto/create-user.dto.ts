import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  // decorators here
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsOptional()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  phone: string;
  @ApiProperty()
  @IsOptional()
  dob: Date;
  @ApiProperty()
  @IsOptional()
  roleId: number;
}
