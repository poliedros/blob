import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { AZURE_BLOB_SERVICE } from './constants';
import { BlobService as AzureBlobService } from 'azure-storage';
import { BlobService } from './blob.service';

describe('BlobService', () => {
  let service: BlobService;
  const blobServiceMock = mock<AzureBlobService>();

  beforeEach(async () => {
    const blobServiceProvider = {
      provide: AZURE_BLOB_SERVICE,
      useValue: blobServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [blobServiceProvider, BlobService],
    }).compile();

    service = module.get<BlobService>(BlobService);
  });

  it('should upload a file', async () => {
    let uploadImage = false;

    blobServiceMock.createBlockBlobFromText.mockImplementation(
      async () => (uploadImage = true),
    );

    await service.uploadFile('file name', 'data:image/png;base64,iVnBO');

    expect(uploadImage).toBeTruthy();
  });
});
