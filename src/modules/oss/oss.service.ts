import { Injectable, Scope, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { BucketsApi, ObjectsApi, PostBucketsPayload } from 'forge-apis';
import { ConfigService } from '@nestjs/config';
import { OauthService } from '../oauth/oauth.service';
import {
  ICredentials,
  IGetBucketsPayload,
  IScopes,
} from '../../common/common.types';
import { ICreateBucketAndUploadFile } from './oss.types';

@Injectable({ scope: Scope.REQUEST })
export class OssService {
  private logger = new Logger(OssService.name);
  private scopes = this.configService.get<IScopes>('scopes');
  private credentials = this.configService.get<ICredentials>('credentials');
  constructor(
    private configService: ConfigService,
    private oauthService: OauthService,
  ) {}

  async getBuckets({ id, oauth_client, oauth_token }: IGetBucketsPayload) {
    try {
      const bucket_name = id;
      const { client_id, client_secret } = this.credentials;
      if (!id || id === '#') {
        const buckets = await new BucketsApi().getBuckets(
          { limit: 64 },
          oauth_client,
          oauth_token,
        );
        return buckets.body.items.map((bucket) => ({
          id: bucket.bucketKey,
          text: bucket.bucketKey.replace(client_id.toLowerCase() + '-', ''),
          type: 'bucket',
          children: true,
        }));
      } else {
        const objects = await new ObjectsApi().getObjects(
          bucket_name,
          {},
          oauth_client,
          oauth_token,
        );

        return objects.body.items.map((object) => ({
          id: Buffer.from(object.objectId).toString('base64'),
          text: object.objectKey,
          type: 'object',
          children: false,
        }));
      }
    } catch (e) {
      console.log({ tryCatchError: e });
    }
  }

  async createBucket({
    bucketKey,
    oauth_client,
    oauth_token,
  }: ICreateBucketAndUploadFile) {
    const { client_id, client_secret } = this.credentials;
    const payload = new PostBucketsPayload();
    payload.bucketKey = `${client_id.toLowerCase()}-${bucketKey}`;
    payload.policyKey = 'transient';
    try {
      const createBucketResponse = await new BucketsApi().createBucket(
        payload,
        {},
        oauth_client,
        oauth_token,
      );
      console.log({ createBucketResponse });
      return createBucketResponse;
    } catch (e) {
      console.log({ tryCatchError: e });
    }
  }

  async uploadObjectToBucket(file, { bucketKey, oauth_client, oauth_token }) {
    try {
      fs.readFile(file.path, async (err, data) => {
        if (err) {
          this.logger.error('FS READFILE ERROR ====>', err.message);
        }
        const res = await new ObjectsApi().uploadObject(
          bucketKey,
          file.originalname,
          data.length,
          data,
          {},
          oauth_client,
          oauth_token,
        );
        console.log({ uploadObjectToBucketResponse: res });
      });
    } catch (e) {
      console.log({ tryCatchError: e });
    }
  }
}
