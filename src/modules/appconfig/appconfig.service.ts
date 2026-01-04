import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppconfigRepository } from './appconfig.repository';

@Injectable()
export class AppconfigService {
  constructor(private readonly appconfigRepository: AppconfigRepository) {}

  async getDataAppConfig(secretID: string) {
    try {
      const appConfig =
        await this.appconfigRepository.getAppConfigBySecretJoined(secretID);

      return appConfig;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }

      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An error occurred while fetching app configuration',
          errors: [errorMessage],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
