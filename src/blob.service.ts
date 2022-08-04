import { Inject, Injectable } from '@nestjs/common';
import { BlobService as AzureBlobService } from 'azure-storage';
import { AZURE_BLOB_SERVICE } from './constants';

interface IBlobService {
  uploadTextFile(filename: string, file: string): string;
  uploadBufferFile(filename: string, fileFormat: string, file: Buffer): string;
}

@Injectable()
export class BlobService implements IBlobService {
  constructor(
    @Inject(AZURE_BLOB_SERVICE)
    private readonly blobService: AzureBlobService,
  ) {}

  uploadTextFile(filename: string, file: string): string {
    const matches = file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const imageFormat = matches![1];
    const buffer = new Buffer(matches![2], 'base64');

    this.blobService.createBlockBlobFromText(
      'storage-images',
      filename,
      buffer,
      { contentSettings: { contentType: imageFormat } },
      (error: any, result: any, response: any) => {
        if (error) filename = 'default.jpg';
      },
    );

    return filename;
  }

  uploadBufferFile(filename: string, fileFormat: string, file: Buffer): string {
    this.blobService.createBlockBlobFromText(
      'storage-images',
      filename,
      file,
      { contentSettings: { contentType: fileFormat } },
      (error: any, result: any, response: any) => {
        if (error) filename = 'default.jpg';
      },
    );

    return filename;
  }
}
