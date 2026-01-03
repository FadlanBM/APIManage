// supabase.service.ts
import { Inject, Injectable, Scope } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseService {
  private client: SupabaseClient;

  constructor(
    @Inject('SUPABASE_CLIENT') private config: { url: string; key: string },
    @Inject(REQUEST) private readonly request: Request,
  ) {
    this.client = createClient(this.config.url, this.config.key);

    // Optional: Ambil access_token dari header (kalau frontend kirim bearer token)
    const token = this.request?.headers?.authorization?.split(' ')[1];
    if (token) {
      this.client.auth.setSession({ access_token: token, refresh_token: '' });
    }
  }

  get clientInstance(): SupabaseClient {
    return this.client;
  }
}
