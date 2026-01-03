import { Global, Module } from '@nestjs/common';
import { SupabaseModule } from './supabase/supabase.module';
import { HelperService } from './helper/helper.service';

@Global()
@Module({
  imports: [SupabaseModule],
  providers: [HelperService],
  exports: [SupabaseModule, HelperService],
})
export class CommonModule {}
