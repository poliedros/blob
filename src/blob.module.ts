import { DynamicModule, Global, Module } from '@nestjs/common';
import { BlobService } from './blob.service';
import { createBlobService } from 'azure-storage';
import { BlobService as AzureBlobService } from 'azure-storage';
import { BlobConfigOptions } from './interfaces/blob-config-options.interface';
import { AZURE_BLOB_SERVICE } from './constants';

@Global()
@Module({})
export class BlobModule {
  public static forRoot(blobConfigOptions: BlobConfigOptions): DynamicModule {
    const blobService: AzureBlobService = createBlobService(
      blobConfigOptions.connectionString,
    );

    return {
      module: BlobModule,
      providers: [
        {
          provide: AZURE_BLOB_SERVICE,
          useValue: blobService,
        },
        BlobService,
      ],
      exports: [BlobService],
      global: true,
    };
  }
}
