import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Not, Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { NullableType } from '../utils/types/nullable.type';
import { FindOptions } from '../utils/find-options.type';
import { Account } from '../account/entities/account.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async findOne(options: FindOptions<Session>): Promise<NullableType<Session>> {
    return this.sessionRepository.findOne({
      where: options.where,
    });
  }

  async findMany(options: FindOptions<Session>): Promise<Session[]> {
    return this.sessionRepository.find({
      where: options.where,
    });
  }

  async create(data: DeepPartial<Session>): Promise<Session> {
    return this.sessionRepository.save(this.sessionRepository.create(data));
  }

  async softDelete({
    excludeId,
    ...criteria
  }: {
    id?: Session['id'];
    account?: Pick<Account, 'id'>;
    excludeId?: Session['id'];
  }): Promise<void> {
    await this.sessionRepository.softDelete({
      ...criteria,
      id: criteria.id ? criteria.id : excludeId ? Not(excludeId) : undefined,
    });
  }
}
