import { ApiProperty } from '@nestjs/swagger';

export class ISubmitTranslationDto {
  @ApiProperty()
  objectName: string;
  oauth_token: string;
  oauth_client: string;
}
