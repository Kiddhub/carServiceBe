import { HttpException, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { GroupService } from '../group-service/entities/group-service.entity';
import { Service } from './entities/service.entity';
import { FilterServiceDto, SortServiceDto } from './dto/query-service.dto';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { throwCustomException } from '../utils/throw-exception-helper';

@Injectable()
export class ServiceService {
  constructor(
    @InjectEntityManager('default')
    private readonly entityManager: EntityManager,

    @InjectRepository(Service)
    private serviceReposity: Repository<Service>,
  ) {}
  async create(createServiceDto: CreateServiceDto) {
    return await this.entityManager.transaction(async (manager) => {
      try {
        const existingService = await manager.findOne(Service, {
          where: { name: createServiceDto.name },
        });
        if (existingService) {
          throw new HttpException(
            {
              errors: {
                name: 'Service name already exists',
              },
            },
            400,
          );
        }

        const groupService = await this.entityManager.findOne(GroupService, {
          where: {
            key: createServiceDto.groupServiceCode,
          },
        });
        if (!groupService) {
          throw new HttpException(
            {
              errors: {
                code: 'Group service code not found',
              },
            },
            400,
          );
        }
        const service = manager.create(Service, createServiceDto);
        return await manager.save(service);
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        }
        throw new HttpException(
          {
            errors: {
              code: 'An error occurred while creating service',
            },
          },
          500,
        );
      }
    });
  }

  async findServiceWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    searchText,
  }: {
    filterOptions?: FilterServiceDto | null;
    sortOptions?: SortServiceDto[] | null;
    paginationOptions: IPaginationOptions;
    searchText?: string;
  }): Promise<[Service[], number]> {
    const queryBuilder = this.serviceReposity.createQueryBuilder('service');
    if (filterOptions?.groupServiceCode) {
      queryBuilder.where('service.groupServiceCode = :groupServiceCode', {
        groupServiceCode: filterOptions.groupServiceCode,
      });
    } else if (filterOptions?.name) {
      queryBuilder.where('service.name = :name', {
        name: filterOptions.name,
      });
    }

    // Search text
    if (searchText) {
      queryBuilder.andWhere(
        '(service.name ILIKE :searchText OR service.description ILIKE :searchText)',
        { searchText: `%${searchText}%` },
      );
    }
    // Sort
    if (sortOptions && sortOptions.length > 0) {
      sortOptions.forEach((sort: any) => {
        if (sort.orderBy && sort.order) {
          queryBuilder.orderBy(
            `service.${sort.orderBy}`,
            sort.order.toUpperCase() as 'ASC' | 'DESC',
          );
        }
      });
    }
    // Pagination
    const [services, total] = await queryBuilder
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit)
      .getManyAndCount();
    return [services, total];
  }
  async findOne(id: number) {
    return await this.entityManager.findOne(Service, {
      where: { id },
    });
  }
  async update(id: number, updateServiceDto: UpdateServiceDto) {
    return await this.entityManager.transaction(async (manager) => {
      try {
        const service = await manager.findOne(Service, {
          where: { id },
        });
        if (!service) {
          throwCustomException('Service not found');
        } else if (updateServiceDto.groupServiceCode) {
          const groupService = await manager.findOne(GroupService, {
            where: { key: updateServiceDto.groupServiceCode },
          });
          if (!groupService) {
            throw new HttpException(
              {
                errors: {
                  key: 'Group service not found',
                },
              },
              400,
            );
          }
        } else {
          manager.merge(Service, service, updateServiceDto);
          return await manager.save(service);
        }
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        } else {
          throw new HttpException(
            {
              errors: {
                message: 'Internal server error',
              },
            },
            500,
          );
        }
      }
    });
  }
  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
