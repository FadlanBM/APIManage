import { Module } from '@nestjs/common';
import { AppconfigController } from './appconfig.controller';
import { AppconfigService } from './appconfig.service';
import { AppconfigRepository } from './appconfig.repository';

@Module({
  controllers: [AppconfigController],
  providers: [AppconfigService, AppconfigRepository],
})
export class AppconfigModule {}
