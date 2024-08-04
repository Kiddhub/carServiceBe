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
import { GroupServiceService } from './group-service.service';
import { CreateGroupServiceDto } from './dto/create-group-service.dto';
import { UpdateGroupServiceDto } from './dto/update-group-service.dto';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { QueryGroupServiceDto } from './dto/query-group-service.dto';
import { infinityAndCountPagination } from '../utils/infinity-pagination';

@ApiTags('Group Service')
@Controller({
  path: 'group-service',
  version: '1',
})
@Roles(RoleEnum.Admin)
@UseGuards(AuthGuard('jwt'))
export class GroupServiceController {
  constructor(private readonly groupServiceService: GroupServiceService) {}

  @Post()
  async create(@Body() createGroupServiceDto: CreateGroupServiceDto) {
    return await this.groupServiceService.create(createGroupServiceDto);
  }

  @Get()
  async findAll(@Query() query: QueryGroupServiceDto) {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    return infinityAndCountPagination(
      await this.groupServiceService.findGroupServiceWithPagination({
        filterOptions: query.filters,
        sortOptions: query.sort,
        paginationOptions: { page, limit },
        searchText: query.searchText,
      }),
      { page, limit },
    );
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateGroupServiceDto: UpdateGroupServiceDto,
  ) {
    return this.groupServiceService.update(id, updateGroupServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupServiceService.remove(+id);
  }
}
