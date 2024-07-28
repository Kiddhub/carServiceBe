import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { EntityCondition } from '../utils/entity-condition.type';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private connection: Connection,
  ) {}

  async create(createProfileDto: CreateUserDto): Promise<User> {
    console.log('createProfileDto', createProfileDto);
    return await this.usersRepository.save(
      this.usersRepository.create(createProfileDto),
    );
  }
  async findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {
    try {
      const res = await this.usersRepository.findOne({
        where: fields,
        relations: ['account', 'role'],
      });
      console.log('Result:', res);
      return res;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
