import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthClientTwoLegged } from 'forge-apis';

interface Credentials {
  client_id: string;
  client_secret: string;
}

interface Scopes {
  internal: string[];
  public: string[];
}

@Injectable()
export class OauthService {
  private logger = new Logger(OauthService.name);
  constructor(private configService: ConfigService) {}
  private scopes = this.configService.get<Scopes>('scopes');
  private credentials = this.configService.get<Credentials>('credentials');
  private cache = {};

  getClient(scopes) {
    const { client_id, client_secret } = this.credentials;
    const { internal } = this.scopes;
    return new AuthClientTwoLegged(
      client_id,
      client_secret,
      scopes || internal,
    );
  }

  /**
   * Initializes a Forge client for 2-legged authentication.
   * @param {string[]} scopes List of resource access scopes.
   * @returns {AuthClientTwoLegged} 2-legged authentication client.
   */
  async getToken(scopes) {
    const cache = this.cache;
    const key = scopes.join('+');
    if (cache[key]) return cache[key];
    const client = this.getClient(scopes);
    const credentials = await client.authenticate();
    cache[key] = credentials;
    setTimeout(() => {
      delete cache[key];
    }, credentials.exires_in * 1000);
    return credentials;
  }

  /**
   * Retrieves a 2-legged authentication token for preconfigured public scopes.
   * @returns Token object: { "access_token": "...", "expires_at": "...", "expires_in": "...", "token_type": "..." }.
   */
  getPublicToken() {
    return this.getToken(this.scopes.public);
  }

  /**
   * Retrieves a 2-legged authentication token for preconfigured internal scopes.
   * @returns Token object: { "access_token": "...", "expires_at": "...", "expires_in": "...", "token_type": "..." }.
   */
  getInternalToken() {
    return this.getToken(this.scopes.internal);
  }
}
