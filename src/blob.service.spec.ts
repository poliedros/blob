import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { BLOB_SERVICE } from './constants';
import azurestorage from 'azure-storage';
import { BlobService } from './blob.service';

describe('BlobService', () => {
  let service: BlobService;
  const blobServiceMock =
    mock<azurestorage.services.blob.blobservice.BlobService>();

  beforeEach(async () => {
    const blobServiceProvider = {
      provide: BLOB_SERVICE,
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

    await service.uploadFile('file name', 'file64image.png');

    expect(uploadImage).toBeTruthy();
  });
});
