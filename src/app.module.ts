import { Module } from '@nestjs/common';
import { OauthModule } from './modules/oauth/oauth.module';

@Module({
  imports: [OauthModule],
})
export class AppModule {}
