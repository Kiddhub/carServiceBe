import { Test, TestingModule } from '@nestjs/testing';
import { HistoryCarService } from './history-car.service';

describe('HistoryCarService', () => {
  let service: HistoryCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryCarService],
    }).compile();

    service = module.get<HistoryCarService>(HistoryCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
