import { Module } from '@nestjs/common';
import { OauthModule } from '../oauth/oauth.module';
import { TokensMiddleware } from './middlewares/tokens.middleware';

@Module({
  imports: [OauthModule],
  providers: [TokensMiddleware],
})
export class CommonModule {}
