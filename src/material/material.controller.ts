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
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { QueryMaterialDto } from './dto/query-material.dto';
import { infinityAndCountPagination } from '../utils/infinity-pagination';

@ApiTags('Material')
@Controller({
  path: 'material',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
@Roles(RoleEnum.Admin)
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  async create(@Body() createMaterialDto: CreateMaterialDto) {
    return await this.materialService.create(createMaterialDto);
  }

  @Get()
  async findAll(@Query() query: QueryMaterialDto) {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    return infinityAndCountPagination(
      await this.materialService.findAll({
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
    return this.materialService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialService.update(id, updateMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialService.remove(+id);
  }
}
