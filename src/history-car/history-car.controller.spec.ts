import { Test, TestingModule } from '@nestjs/testing';
import { HistoryCarController } from './history-car.controller';
import { HistoryCarService } from './history-car.service';

describe('HistoryCarController', () => {
  let controller: HistoryCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryCarController],
      providers: [HistoryCarService],
    }).compile();

    controller = module.get<HistoryCarController>(HistoryCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
