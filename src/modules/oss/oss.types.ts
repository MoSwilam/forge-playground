import { ApiParam, ApiProperty } from '@nestjs/swagger';

export class ICreateBucketAndUploadFile {
  @ApiProperty()
  bucketKey: string;
  oauth_token?: string;
  oauth_client?: string;
}
