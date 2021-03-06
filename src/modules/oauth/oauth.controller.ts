import { Controller, Get } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { TokenRO } from './oauth.types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Oauth')
@Controller('oauth')
export class OauthController {
  constructor(private oauthService: OauthService) {}

  @Get('/token')
  async getPublicToken(): Promise<TokenRO> {
    return await this.oauthService.getPublicToken();
  }

  @Get('/token/internal')
  async getInternalToken(): Promise<TokenRO> {
    return await this.oauthService.getInternalToken();
  }
}
