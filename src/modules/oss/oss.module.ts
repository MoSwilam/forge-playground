import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { OssService } from './oss.service';
import { OssController } from './oss.controller';
import { OauthModule } from '../oauth/oauth.module';
import { TokensMiddleware } from '../../common/middlewares/tokens.middleware';
// import { TokensMiddleware } from '../common/middlewares/tokens.middleware';

@Module({
  imports: [OauthModule],
  providers: [OssService],
  controllers: [OssController],
})
export class OssModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokensMiddleware).forRoutes(OssController);
  }
}
