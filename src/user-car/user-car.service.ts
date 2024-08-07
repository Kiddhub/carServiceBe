import { Injectable } from '@nestjs/common';
import { CreateUserCarDto } from './dto/create-user-car.dto';
import { UpdateUserCarDto } from './dto/update-user-car.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { UserCar } from './entities/user-car.entity';
import { EntityManager, Repository } from 'typeorm';
import { throwCustomException } from '../utils/throw-exception-helper';
import { FilterUserCarDto, SortUserCarDto } from './dto/query-user-car.dto';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { User } from '../users/entities/user.entity';

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

  async findAll({
    currentUser,
    filterOptions,
    sortOptions,
    paginationOptions,
    searchText,
  }: {
    currentUser: any;
    filterOptions?: FilterUserCarDto | null;
    sortOptions?: SortUserCarDto[] | null;
    paginationOptions: IPaginationOptions;
    searchText?: string;
  }): Promise<[UserCar[], number]> {
    const user = await this.entityManager.findOne(User, currentUser.id);
    if (!user) {
      throwCustomException('User not found', 404);
    } else if (user.roleId !== 1) {
      throwCustomException('User is not admin', 403);
    }
    const queryBuilder = this.entityManager.createQueryBuilder(
      UserCar,
      'user_car',
    );
    if (filterOptions?.mode) {
      queryBuilder.andWhere('user_car.mode = :mode', {
        mode: filterOptions.mode,
      });
    } else if (filterOptions?.plateNumber) {
      queryBuilder.andWhere('user_car.plateNumber = :plateNumber', {
        plateNumber: filterOptions.plateNumber,
      });
    }
    // Search text
    if (searchText) {
      queryBuilder.andWhere(
        'user_car.plateNumber LIKE :searchText OR user_car.mode LIKE :searchText',
        {
          searchText: `%${searchText}%`,
        },
      );
    }
    // Sort
    if (sortOptions && sortOptions.length > 0) {
      sortOptions.forEach((sort: any) => {
        if (sort.orderBy && sort.order) {
          queryBuilder.orderBy(
            `user_car.${sort.orderBy}`,
            sort.order.toUpperCase() as 'ASC' | 'DESC',
          );
        }
      });
    }
    // Pagination
    const [userCars, total] = await queryBuilder
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit)
      .getManyAndCount();
    return [userCars, total];
  }

  async findCarByUser({
    currentUser,
    filterOptions,
    sortOptions,
    paginationOptions,
    searchText,
  }: {
    currentUser: any;
    filterOptions?: FilterUserCarDto | null;
    sortOptions?: SortUserCarDto[] | null;
    paginationOptions: IPaginationOptions;
    searchText?: string;
  }): Promise<[UserCar[], number]> {
    const queryBuilder = this.entityManager.createQueryBuilder(
      UserCar,
      'user_car',
    );
    queryBuilder.where('user_car.userId = :userId', {
      userId: currentUser.id,
    });
    if (filterOptions?.mode) {
      queryBuilder.andWhere('user_car.mode = :mode', {
        mode: filterOptions.mode,
      });
    } else if (filterOptions?.plateNumber) {
      queryBuilder.andWhere('user_car.plateNumber = :plateNumber', {
        plateNumber: filterOptions.plateNumber,
      });
    }

    // Search text
    if (searchText) {
      queryBuilder.andWhere(
        'user_car.plateNumber LIKE :searchText OR user_car.mode LIKE :searchText',
        {
          searchText: `%${searchText}%`,
        },
      );
    }

    // Sort
    if (sortOptions && sortOptions.length > 0) {
      sortOptions.forEach((sort: any) => {
        if (sort.orderBy && sort.order) {
          queryBuilder.orderBy(
            `user_car.${sort.orderBy}`,
            sort.order.toUpperCase() as 'ASC' | 'DESC',
          );
        }
      });
    }

    // Pagination
    const [userCars, total] = await queryBuilder
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit)
      .getManyAndCount();
    return [userCars, total];
  }

  findOne(currentUser: any, id: number) {
    const car = this.userCarRepository.findOne({
      where: {
        id,
        userId: currentUser.id,
      },
    });
    if (!car) {
      throwCustomException('Car not found', 404);
    }
    return car;
  }

  async update(id: number, updateUserCarDto: UpdateUserCarDto) {
    return await this.entityManager.transaction(async (manager) => {
      try {
        const userCar = await manager.findOne(UserCar, {
          where: { id: id },
        });
        if (!userCar) {
          throwCustomException('User car not found');
        } else if (updateUserCarDto.plateNumber) {
          const userCarByPlateNumber = await manager.findOne(UserCar, {
            where: { plateNumber: updateUserCarDto.plateNumber },
          });
          if (userCarByPlateNumber) {
            throwCustomException('Plate number is already exist');
          } else {
            manager.merge(UserCar, userCar, updateUserCarDto);
            return this.userCarRepository.update(id, updateUserCarDto);
          }
        }
        // return this.userCarRepository.save(userCar);
      } catch (error) {
        throwCustomException(
          'An error occurred while updating user car: ' +
            error.response?.errors,
        );
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} userCar`;
  }
}
