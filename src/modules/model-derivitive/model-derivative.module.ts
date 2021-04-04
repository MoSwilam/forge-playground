import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ModelDerivativeController } from './model-derivative.controller';
import { ModelDerivativeService } from './model-derivative.service';
import { OssController } from '../oss/oss.controller';
import { TokensMiddleware } from '../../common/middlewares/tokens.middleware';
import { OauthModule } from '../oauth/oauth.module';

@Module({
  imports: [OauthModule],
  controllers: [ModelDerivativeController],
  providers: [ModelDerivativeService],
})
export class ModelDerivativeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokensMiddleware).forRoutes(ModelDerivativeController);
  }
}
