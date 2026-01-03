import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { WelcomeController } from './welcome.controller';
import { AppconfigModule } from './modules/appconfig/appconfig.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    AppconfigModule,
  ],
  controllers: [WelcomeController],
  providers: [],
})
export class AppModule {}
