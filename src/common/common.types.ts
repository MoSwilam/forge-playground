import { Request } from 'express';

export interface IOauthPayload extends Request {
  oauth_token: string;
  oauth_client: string;
}

export interface IGetBucketsPayload {
  oauth_token?: string;
  oauth_client?: string;
  id?: string;
}

export interface ICredentials {
  client_id: string;
  client_secret: string;
}

export interface IScopes {
  internal: string[];
  public: string[];
}
