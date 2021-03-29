import { Controller, Get } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { TokenRO } from './oauth.types';

@Controller('oauth')
export class OauthController {
  constructor(private oauthService: OauthService) {}

  @Get('/token/public')
  async getPublicToken(): Promise<TokenRO> {
    return await this.oauthService.getPublicToken();
  }

  @Get('/token/internal')
  async getInternalToken(): Promise<TokenRO> {
    return await this.oauthService.getInternalToken();
  }
}
