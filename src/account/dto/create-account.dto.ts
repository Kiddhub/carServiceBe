import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty()
  phone: string;

  @ApiProperty()
  password: string;
}
