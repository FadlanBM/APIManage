import {
  Controller,
  Get,
  HttpStatus,
  HttpException,
  Param,
} from '@nestjs/common';
import { AppconfigService } from './appconfig.service';

@Controller('/api/appconfig')
export class AppconfigController {
  constructor(private readonly appconfigService: AppconfigService) {}

  @Get(':key')
  async getParam(@Param('key') key: string) {
    try {
      const data = await this.appconfigService.getDataAppConfig(key);

      return {
        status: HttpStatus.OK,
        message: 'Success get configuration',
        data,
      };
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }

      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An error occurred while getting configuration',
          errors: [errorMessage],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
