import { Module } from '@nestjs/common';
import { OauthModule } from './modules/oauth/oauth.module';
import { OssModule } from './modules/oss/oss.module';
import configuration from '../config/configuration';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ModelDerivativeModule } from './modules/model-derivitive/model-derivative.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'static'),
      exclude: ['/api*'],
    }),
    OauthModule,
    OssModule,
    ModelDerivativeModule,
  ],
})
export class AppModule {}
