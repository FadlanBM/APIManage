import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppconfigRepository } from './appconfig.repository';

@Injectable()
export class AppconfigService {
  constructor(private readonly appconfigRepository: AppconfigRepository) {}

  async getDataAppConfig(secretID: string) {
    try {
      const project =
        await this.appconfigRepository.getProjectBySecret(secretID);

      const projectData = await this.appconfigRepository.getDataProjectByID(
        project.project_id,
      );

      const appConfig = await this.appconfigRepository.getDataAppConfigByID(
        projectData.app_config_id,
      );

      // Fetch assets (icon and splash)
      const [icon, splash] = await Promise.all([
        this.appconfigRepository.getAssetsData(
          appConfig.primary_icon_asset_id,
          project.project_id,
        ),
        this.appconfigRepository.getAssetsData(
          appConfig.primary_splash_asset_id,
          project.project_id,
        ),
      ]);

      return {
        ...appConfig,
        icon_url: icon.storage_path,
        splash_url: splash.storage_path,
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
          message: 'An error occurred while fetching app configuration',
          errors: [errorMessage],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
