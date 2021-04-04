import { Controller, Post, Req, Body } from '@nestjs/common';
import { ModelDerivativeService } from './model-derivative.service';
import { IOauthPayload } from '../../common/common.types';
import { ISubmitTranslationDto } from './model-derivative.types';

@Controller('modelderivative')
export class ModelDerivativeController {
  constructor(private modelDerivativeService: ModelDerivativeService) {}

  @Post('/jobs')
  async translate(
    @Req() { oauth_token, oauth_client }: IOauthPayload,
    @Body() { objectName }: ISubmitTranslationDto,
  ) {
    const payload = { oauth_token, oauth_client, objectName };
    return this.modelDerivativeService.submitTranslation(payload);
  }
}
