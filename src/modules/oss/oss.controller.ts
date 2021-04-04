import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  Req,
  Body,
  Query,
} from '@nestjs/common';
import { OssService } from './oss.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ICreateBucketAndUploadFile } from './oss.types';
import { IGetBucketsPayload } from '../../common/common.types';
import { ApiTags, ApiQuery, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Object-storage-service')
@Controller('oss')
export class OssController {
  constructor(private ossService: OssService) {}

  @Get('/buckets')
  @ApiQuery({
    name: 'id',
    required: false,
    type: String,
  })
  async getBuckets(
    @Query('id') id: string,
    @Req() { oauth_token, oauth_client }: IGetBucketsPayload,
  ) {
    const payload = { id, oauth_client, oauth_token };
    return await this.ossService.getBuckets(payload);
  }

  @Post('/buckets')
  async createBucket(
    @Body() { bucketKey }: ICreateBucketAndUploadFile,
    @Req() { oauth_token, oauth_client }: IGetBucketsPayload,
  ) {
    const payload = { bucketKey, oauth_token, oauth_client };
    return await this.ossService.createBucket(payload);
  }

  @Post('/objects')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fileToUpload: {
          type: 'string',
          format: 'binary',
        },
        bucketKey: {
          type: 'string',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('fileToUpload', { dest: 'uploads/' }))
  async uploadObjectToBucket(
    @Body() { bucketKey }: ICreateBucketAndUploadFile,
    @UploadedFile() file: Express.Multer.File,
    @Req() { oauth_token, oauth_client }: IGetBucketsPayload,
  ) {
    const payload = { bucketKey, oauth_client, oauth_token };
    return await this.ossService.uploadObjectToBucket(file, payload);
  }
}
