import imageCompression from 'browser-image-compression';

export async function imageToWebp(file: File, quality = 0.3): Promise<File> {
  const compressedFile = await imageCompression(file, {
    maxSizeMB: quality,
    maxWidthOrHeight: 512,
    useWebWorker: true,
    fileType: 'image/webp',
  });

  return compressedFile;
}
