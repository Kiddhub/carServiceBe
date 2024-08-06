import { Test, TestingModule } from '@nestjs/testing';
import { UserCarService } from './user-car.service';

describe('UserCarService', () => {
  let service: UserCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCarService],
    }).compile();

    service = module.get<UserCarService>(UserCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
