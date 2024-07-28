import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { AllConfigType } from '../config/config.type';
import { MailService } from '../mail/mail.service';
import { SessionService } from '../session/session.service';
import { AccountService } from '../account/account.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { LoginResponseType } from './types/login-response.type';
import { Account } from '../account/entities/account.entity';
import { Session } from '../session/entities/session.entity';
import { User } from '../users/entities/user.entity';
import bcrypt from 'bcryptjs';
import ms from 'ms';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';
import { NullableType } from '../utils/types/nullable.type';
import { JwtRefreshPayloadType } from './strategies/types/jwt-refresh-payload.type';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { RoleEnum } from '../roles/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectEntityManager('default')
    private readonly entityManager: EntityManager,
    private jwtService: JwtService,
    private usersService: UsersService,
    private accountService: AccountService,
    private sessionService: SessionService,
    private mailService: MailService,
    private configService: ConfigService<AllConfigType>,
  ) {}

  async validateLogin(loginDto: AuthLoginDto): Promise<LoginResponseType> {
    const account = await this.accountService.findOne({
      phone: loginDto.phone,
    });
    if (!account) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errors: {
            walletAddress: 'account is not exist',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const session = await this.sessionService.create({
      account,
    });
    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: account.id,
      phone: account.phone,
      sessionId: session.id,
      role: account.user.role,
      user: account.user,
    });
    return {
      refreshToken,
      token,
      tokenExpires,
    };
  }
  async me(userJwtPayload: JwtPayloadType): Promise<NullableType<any>> {
    const account = await this.accountService.findOne({
      id: userJwtPayload.id,
    });
    if (!account) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errors: {
            walletAddress: 'account is not exist',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      ...account.user,
    };
  }
  async refreshToken(
    data: Pick<JwtRefreshPayloadType, 'sessionId'>,
  ): Promise<Omit<LoginResponseType, 'account'>> {
    const session = await this.sessionService.findOne({
      where: {
        id: data.sessionId,
      },
    });

    if (!session) {
      throw new UnauthorizedException();
    }

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: session.account.id,
      phone: session.account.phone,
      sessionId: session.id,
      role: session.account.user.role,
      user: session.account.user,
    });

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }
  async register(registerDto: AuthRegisterDto): Promise<NullableType<Account>> {
    return await this.entityManager.transaction(async (em) => {
      console.log('registerDtoOOOOOOOOOOo', registerDto);
      const user = await this.usersService.findOne({
        phone: registerDto.phone,
      });
      if (user) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            errors: {
              email: 'email is exist',
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const account = await em
        .createQueryBuilder(Account, 'account')
        .where('account.phone = :phone', {
          phone: registerDto.phone,
        })
        .getOne();
      if (account) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            errors: {
              walletAddress: 'Account is exist',
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const newuser = await em.save(
        User,
        em.create(User, {
          email: registerDto.email,
          phone: registerDto.phone,
          roleId: RoleEnum.User,
          name: registerDto.name,
          dob: new Date(registerDto.dob),
        }),
      );
      console.log('newuserrrrrrrrrrrrrrrrr', newuser);
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const newAccount = await em.save(
        Account,
        em.create(Account, {
          userId: newuser.id,
          phone: newuser.phone,
          password: hashedPassword,
        }),
      );
      return newAccount;
    });
  }

  // async softDelete(user: User): Promise<void> {
  //   await this.usersService.softDelete(user.id);
  // }

  async logout(data: Pick<JwtRefreshPayloadType, 'sessionId'>) {
    return this.sessionService.softDelete({
      id: data.sessionId,
    });
  }
  private async getTokensData(data: {
    id: Account['id'];
    phone: Account['phone'];
    sessionId: Session['id'];
    role: User['role'];
    user: User;
  }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
          phone: data.phone,
          sessionId: data.sessionId,
          role: data.role,
          user: data.user,
        },
        {
          secret: this.configService.getOrThrow('auth.secret', { infer: true }),
          expiresIn: tokenExpiresIn,
        },
      ),
      await this.jwtService.signAsync(
        {
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.getOrThrow('auth.refreshSecret', {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
            infer: true,
          }),
        },
      ),
    ]);

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }
}
