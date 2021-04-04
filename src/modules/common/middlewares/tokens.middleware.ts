import { Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Response } from 'express';
import { IOauthPayload } from '../../../common/common.types';
import { OauthService } from '../../oauth/oauth.service';

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
