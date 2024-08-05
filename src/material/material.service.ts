import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Material } from './entities/material.entity';
import { GroupService } from '../group-service/entities/group-service.entity';
import { throwCustomException } from '../utils/throw-exception-helper';
import { FilterMaterialDto, SortMaterialDto } from './dto/query-material.dto';
import { IPaginationOptions } from '../utils/types/pagination-options';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
    @InjectEntityManager('default')
    private readonly entityManager: EntityManager,
  ) {}
  async create(createMaterialDto: CreateMaterialDto) {
    return await this.entityManager.transaction(async (manager) => {
      try {
        const groupService = await manager.findOne(GroupService, {
          where: { key: createMaterialDto.groupServiceCode },
        });
        if (!groupService) {
          throwCustomException('Group service not found');
        }
        const material = await manager.findOne(Material, {
          where: { name: createMaterialDto.name },
        });
        if (material) {
          throwCustomException('Material already exists');
        }
        const newMaterial = manager.create(Material, createMaterialDto);
        return await manager.save(newMaterial);
      } catch (error) {
        throwCustomException(
          'An error occurred while creating material: ' +
            error.response?.errors,
        );
      }
    });
  }

  async findAll({
    filterOptions,
    sortOptions,
    paginationOptions,
    searchText,
  }: {
    filterOptions?: FilterMaterialDto | null;
    sortOptions?: SortMaterialDto[] | null;
    paginationOptions: IPaginationOptions;
    searchText?: string;
  }): Promise<[Material[], number]> {
    const queryBuilder = this.materialRepository.createQueryBuilder('material');
    if (filterOptions?.groupServiceCode) {
      queryBuilder.andWhere('material.groupServiceCode = :groupServiceCode', {
        groupServiceCode: filterOptions.groupServiceCode,
      });
    } else if (filterOptions?.name) {
      queryBuilder.andWhere('material.name = :name', {
        name: filterOptions.name,
      });
    }

    // Search text
    if (searchText) {
      queryBuilder.andWhere(
        'material.name ILIKE :searchText OR material.groupServiceCode ILIKE :searchText',
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
            `material.${sort.orderBy}`,
            sort.order.toUpperCase() as 'ASC' | 'DESC',
          );
        }
      });
    }
    // Pagination
    const [materials, total] = await queryBuilder
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit)
      .getManyAndCount();
    return [materials, total];
  }

  async findOne(id: number) {
    return await this.materialRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateMaterialDto: UpdateMaterialDto) {
    return await this.entityManager.transaction(async (manager) => {
      try {
        const material = await manager.findOne(Material, {
          where: { id: id },
        });
        if (!material) {
          throwCustomException('Material not found');
        } else if (updateMaterialDto.groupServiceCode) {
          const groupService = await manager.findOne(GroupService, {
            where: { key: updateMaterialDto.groupServiceCode },
          });
          if (!groupService) {
            throwCustomException('Group service not found');
          }
        } else {
          manager.merge(Material, material, updateMaterialDto);
          return await manager.save(material);
        }
      } catch (error) {
        throwCustomException(
          'An error occurred while updating material: ' +
            error.response?.errors,
        );
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} material`;
  }
}
