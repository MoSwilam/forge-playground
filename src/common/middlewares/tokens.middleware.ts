import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { OauthService } from '../../modules/oauth/oauth.service';
import { IOauthPayload } from '../common.types';

@Injectable()
export class TokensMiddleware implements NestMiddleware {
  constructor(private oauthService: OauthService) {}
  async use(req: IOauthPayload, res: Response, next: NextFunction) {
    const token = await this.oauthService.getInternalToken();
    const client = await this.oauthService.getClient();
    req.oauth_token = token;
    req.oauth_client = client;
    next();
  }
}
