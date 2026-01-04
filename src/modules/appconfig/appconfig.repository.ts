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

  async getAppConfigBySecretJoined(secret: string): Promise<any> {
    const client = this.supabaseService.clientInstance;
    const { data, error } = await client.rpc('get_app_config_by_secret', {
      secret_input: secret,
    });

    if (error || !data) {
      console.error(error);
      throw new UnauthorizedException(
        'Invalid secret key or configuration not found',
      );
    }

    // The RPC returns the JSON structure directly
    const result = data as any;

    // Check expiration if it's part of the returned data (or handle inside RPC)
    // Assuming RPC handles basic retrieval, we check expiration here if returned,
    // but based on typical RPC patterns for this use case, we might return everything.

    // Let's assume RPC returns:
    // {
    //   project_id, expires_at, description,
    //   projects: { ... }
    // }
    // Or even better, let the RPC return the flattened structure we need directly?
    // For now, let's keep the structure similar to what we had but fetched via RPC to bypass RLS.

    // If we use RPC, we usually return a JSON object.

    const now = this.helperService.now();
    if (result.expires_at && result.expires_at < now) {
      throw new UnauthorizedException('Secret key has expired');
    }

    return result;
  }
}
