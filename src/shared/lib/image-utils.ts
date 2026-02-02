export async function imageToWebp(file: File, quality = 0.8): Promise<File> {
  const bitmap = await createImageBitmap(file);

  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas error');

  ctx.drawImage(bitmap, 0, 0);

  const blob = await new Promise<Blob>((resolve) =>
    canvas.toBlob((b) => resolve(b!), 'image/webp', quality),
  );

  return new File([blob], 'avatar.webp', { type: 'image/webp' });
}
