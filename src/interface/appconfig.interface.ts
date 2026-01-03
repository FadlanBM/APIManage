export interface Secret {
  id: string;
  project_id: string;
  expires_at: string;
  description: string;
}

export interface Projects {
  id: string;
  name: string;
  description: string;
  status: string;
  app_config_id: string;
}

export interface AppConfig {
  id: string;
  tahun: string;
  name_app: string;
  subname_app: string;
  url: string;
  url_api: string;
  version: string;
  updatemandatory: boolean;
  primary_icon_asset_id: string;
  primary_splash_asset_id: string;
  description: string;
}

export interface Asset {
  id: string;
  storage_path: string;
}

export class AppConfigResponse {
  tahun: string;
  name_app: string;
  subname_app: string;
  url: string;
  url_api: string;
  version: string;
  updatemandatory: boolean;
  primary_icon: Asset;
  primary_splash: Asset;
  description: string;
}
