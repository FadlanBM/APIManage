import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseService } from '../../common/supabase/supabase.service';
import { HelperService } from '../../common/helper/helper.service';
import {
  Projects,
  Secret,
  AppConfig,
  Asset,
} from 'src/interface/appconfig.interface';

@Injectable()
export class AppconfigRepository {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly helperService: HelperService,
  ) {}

  async getProjectBySecret(secret: string): Promise<{ project_id: string }> {
    const client = this.supabaseService.clientInstance;
    const { data, error } = await client
      .from('secret_keys')
      .select('project_id, expires_at, description')
      .eq('secret_key', secret)
      .single();

    if (error || !data) {
      throw new UnauthorizedException('Invalid secret key');
    }

    const secretData = data as Secret;

    const now = this.helperService.now();
    if (secretData.expires_at && secretData.expires_at < now) {
      throw new UnauthorizedException('Secret key has expired');
    }

    return { project_id: secretData.project_id };
  }

  async getDataProjectByID(id: string): Promise<Projects> {
    const client = this.supabaseService.clientInstance;
    const { data, error } = await client
      .from('projects')
      .select('id, name, description, status, app_config_id')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Supabase Error (getDataProjectByID):', error);
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    if (!data) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return data as Projects;
  }

  async getDataAppConfigByID(id: string): Promise<AppConfig> {
    const client = this.supabaseService.clientInstance;
    const { data, error } = await client
      .from('app_config')
      .select(
        'id, tahun, name_app, subname_app, url, url_api, version, updatemandatory, primary_icon_asset_id, primary_splash_asset_id, description',
      )
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`App config with ID ${id} not found`);
    }

    return data as AppConfig;
  }

  async getAssetsData(id: string, projectId: string): Promise<Asset> {
    const client = this.supabaseService.clientInstance;
    const { data, error } = await client
      .from('assets')
      .select('id, storage_path')
      .eq('id', id)
      .eq('project_id', projectId)
      .maybeSingle();

    if (error) {
      console.error('Supabase Error (getAssetsData):', error);
      throw new NotFoundException(
        `Asset with ID ${id} not found for this project`,
      );
    }

    if (!data) {
      throw new NotFoundException(
        `Asset with ID ${id} not found for this project`,
      );
    }

    return data as Asset;
  }
}
