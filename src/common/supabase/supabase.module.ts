import { Module, Scope } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { SupabaseService } from './supabase.service';
import supabaseConfig from './supabase.config';

@Module({
  imports: [ConfigModule.forFeature(supabaseConfig)],
  providers: [
    {
      provide: 'SUPABASE_CLIENT',
      scope: Scope.REQUEST, // ← Penting! Biar tiap request punya instance sendiri
      useFactory: (config: ConfigType<typeof supabaseConfig>) => {
        return {
          url: config.url,
          key: config.key,
        };
      },
      inject: [supabaseConfig.KEY],
    },
    SupabaseService,
  ],
  exports: [SupabaseService],
})
export class SupabaseModule {}
