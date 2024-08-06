import { Injectable } from '@nestjs/common';
import { CreateUserCarDto } from './dto/create-user-car.dto';
import { UpdateUserCarDto } from './dto/update-user-car.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { UserCar } from './entities/user-car.entity';
import { EntityManager, Repository } from 'typeorm';
import { throwCustomException } from '../utils/throw-exception-helper';

@Injectable()
export class UserCarService {
  constructor(
    @InjectRepository(UserCar)
    private userCarRepository: Repository<UserCar>,
    @InjectEntityManager('default')
    private readonly entityManager: EntityManager,
  ) {}

  async create(currentUser: any, createUserCarDto: CreateUserCarDto) {
    return await this.entityManager.transaction(async (manager) => {
      try {
        const userCar = await manager.findOne(UserCar, {
          where: {
            plateNumber: createUserCarDto.plateNumber,
          },
        });
        if (userCar) {
          throwCustomException('Plate number is already exist', 400);
        }
        const newUserCar = new UserCar();
        newUserCar.mode = createUserCarDto.mode;
        newUserCar.plateNumber = createUserCarDto.plateNumber;
        newUserCar.color = createUserCarDto.color;
        newUserCar.userId = currentUser.id;
        return this.userCarRepository.save(newUserCar);
      } catch (error) {
        throwCustomException(
          'An error occurred while creating material: ' +
            error.response?.errors,
        );
      }
    });
  }

  findAll() {
    return `This action returns all userCar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userCar`;
  }

  update(id: number, updateUserCarDto: UpdateUserCarDto) {
    return `This action updates a #${id} userCar`;
  }

  remove(id: number) {
    return `This action removes a #${id} userCar`;
  }
}
