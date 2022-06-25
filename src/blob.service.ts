import { Inject, Injectable } from '@nestjs/common';
import azurestorage from 'azure-storage';
import { BLOB_SERVICE } from './constants';

interface IBlobService {
  uploadFile(filename: string, file: string);
}

@Injectable()
export class BlobService implements IBlobService {
  constructor(
    @Inject(BLOB_SERVICE)
    private readonly blobService: azurestorage.services.blob.blobservice.BlobService,
  ) {}

  async uploadFile(filename: string, file: string): Promise<string> {
    const matches = file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const buffer = new Buffer(matches![2], 'base64');

    await this.blobService.createBlockBlobFromText(
      process.env.IMAGE_CONTAINER_NAME,
      filename,
      buffer,
      (error: any, result: any, response: any) => {
        if (error) filename = 'default.jpg';
      },
    );

    return filename;
  }
}
