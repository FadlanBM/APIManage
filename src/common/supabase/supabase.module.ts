// supabase.module.ts
import { Module, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupabaseService } from './supabase.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'SUPABASE_CLIENT',
      scope: Scope.REQUEST, // ← Penting! Biar tiap request punya instance sendiri
      useFactory: (configService: ConfigService) => {
        const supabaseUrl = configService.get<string>('SUPABASE_URL');
        const supabaseKey = configService.get<string>('SUPABASE_KEY'); // anon key atau service_role

        return {
          url: supabaseUrl,
          key: supabaseKey,
        };
      },
      inject: [ConfigService],
    },
    SupabaseService,
  ],
  exports: [SupabaseService],
})
export class SupabaseModule {}
