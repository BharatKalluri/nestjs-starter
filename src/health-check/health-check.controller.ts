import { Controller, Get, UseGuards } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { IHealthCheck } from './health-check.interface';
import { PinoLogger } from 'nestjs-pino';
import { FirebaseAuthGuard } from 'src/shared/guards/firebase-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { firebaseToken } from '../shared/constants/bearer-auth-token-names';
import { FirebaseAuthUserInfo } from '../shared/decorators/firebaseAuthUserInfo.decorator';
import { auth } from 'firebase-admin/lib/auth';

@Controller('health-check')
export class HealthCheckController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(HealthCheckController.name);
  }

  @Get()
  getHealthCheck(): IHealthCheck {
    return this.healthCheckService.getHealthCheck();
  }

  @Get('/s3')
  getS3HealthCheck(): Promise<IHealthCheck> {
    return this.healthCheckService.getS3HealthCheck();
  }

  @Get('/mongo')
  getMongoHealthCheck(): Promise<IHealthCheck> {
    return this.healthCheckService.getMongoDBHealthCheck();
  }

  @Get('/auth')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth(firebaseToken)
  getAuthHealthCheck(
    @FirebaseAuthUserInfo() firebaseAuthUserInfo: auth.DecodedIdToken,
  ) {
    return { success: true, authUser: firebaseAuthUserInfo };
  }
}
