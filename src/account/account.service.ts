import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityCondition } from '../utils/entity-condition.type';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const account = await this.accountRepository.save(
      this.accountRepository.create(createAccountDto),
    );
    return account;
  }

  findAll() {
    return `This action returns all account`;
  }

  findOne(fields: EntityCondition<Account>): Promise<NullableType<Account>> {
    return this.accountRepository.findOne({
      where: fields,
      relations: ['user'],
    });
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
