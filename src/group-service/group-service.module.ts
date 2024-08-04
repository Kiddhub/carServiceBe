import { Module } from '@nestjs/common';
import { GroupServiceService } from './group-service.service';
import { GroupServiceController } from './group-service.controller';

@Module({
  controllers: [GroupServiceController],
  providers: [GroupServiceService],
})
export class GroupServiceModule {}
