import { Body, Controller, HttpCode, HttpStatus, Post, SerializeOptions } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Account } from '../account/entities/account.entity';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { NullableType } from '../utils/types/nullable.type';
import { AuthLoginDto } from './dto/auth-login.dto';
import { LoginResponseType } from './types/login-response.type';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public login(@Body() loginDto: AuthLoginDto): Promise<LoginResponseType> {
    return this.service.validateLogin(loginDto);
  }

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: '', type: Account })
  public register(
    @Body() register: AuthRegisterDto,
  ): Promise<NullableType<Account>> {
    return this.service.register(register);
  }
}
