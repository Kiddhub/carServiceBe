import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { QueryServiceDto } from './dto/query-service.dto';
import { infinityAndCountPagination } from '../utils/infinity-pagination';

@Controller('service')
@ApiTags('Service')
@Controller({
  path: 'service',
  version: '1',
})
@Roles(RoleEnum.Admin)
@UseGuards(AuthGuard('jwt'))
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  async findAll(@Query() query: QueryServiceDto) {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    return infinityAndCountPagination(
      await this.serviceService.findServiceWithPagination({
        filterOptions: query.filters,
        sortOptions: query.sort,
        paginationOptions: { page, limit },
        searchText: query.searchText,
      }),
      { page, limit },
    );
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.serviceService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
