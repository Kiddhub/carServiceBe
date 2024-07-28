import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class AuthRegisterDto {
  @ApiProperty({ type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Minkey De Poet' })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  dob: string;
}
