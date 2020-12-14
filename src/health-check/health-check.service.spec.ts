import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckService } from './health-check.service';

describe('HealthCheckService', () => {
  let service: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthCheckService],
    }).compile();

    service = module.get<HealthCheckService>(HealthCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return success', () => {
    expect(service.getHealthCheck().success).toBe(true);
  });
});
