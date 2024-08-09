import { Module } from '@nestjs/common';
import { HistoryCarService } from './history-car.service';
import { HistoryCarController } from './history-car.controller';

@Module({
  controllers: [HistoryCarController],
  providers: [HistoryCarService],
})
export class HistoryCarModule {}
