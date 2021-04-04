import { Injectable } from '@nestjs/common';
import {
  DerivativesApi,
  JobPayload,
  JobPayloadInput,
  JobPayloadOutput,
  JobSvfOutputPayload,
} from 'forge-apis';
import { ISubmitTranslationDto } from './model-derivative.types';

@Injectable()
export class ModelDerivativeService {
  async submitTranslation(payload: ISubmitTranslationDto) {
    const { oauth_token, oauth_client, objectName } = payload;
    const job = new JobPayload();
    job.input = new JobPayloadInput();
    job.input.urn = objectName;
    job.output = new JobPayloadOutput([new JobSvfOutputPayload()]);
    job.output.formats[0].type = 'svf';
    job.output.formats[0].views = ['2d', '3d'];

    try {
      const res = await new DerivativesApi().translate(
        job,
        {},
        oauth_client,
        oauth_token,
      );
      console.log({ submitTranslationResponse: res });
      return res;
    } catch (e) {
      console.log({ tryCatchError: e });
    }
  }
}
