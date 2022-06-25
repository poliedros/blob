import { BLOB_SERVICE } from './constants';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { BlobService } from './blob.service';
import { createBlobService } from 'azure-storage';
import { BlobConfigOptions } from './interfaces/blob-config-options.interface';

@Global()
@Module({})
export class BlobModule {
  public static forRoot(blobConfigOptions: BlobConfigOptions): DynamicModule {
    const blobService = createBlobService(blobConfigOptions.connectionString);

    return {
      module: BlobModule,
      providers: [
        {
          provide: BLOB_SERVICE,
          useValue: blobService,
        },
        BlobService,
      ],
      exports: [BlobService],
      global: true,
    };
  }
}
