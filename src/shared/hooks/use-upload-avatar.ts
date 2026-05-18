import { getSupabaseClient } from '@/infra/auth/supabase.client';

export function useUploadAvatar() {
  const uploadAvatar = async (userId: string, file: File) => {
    if (file.size > 2_000_000) {
      throw new Error('Imagen demasiado pesada');
    }

    const supabase = getSupabaseClient();
    const { imageToWebp } = await import('../lib/image-utils');
    const webpFile = await imageToWebp(file);

    // Delete all previous images of the user
    const { data: existingFiles } = await supabase.storage.from('avatars').list(userId);
    if (existingFiles && existingFiles.length > 0) {
      const pathsToRemove = existingFiles.map((f) => `${userId}/${f.name}`);
      await supabase.storage.from('avatars').remove(pathsToRemove);
    }

    // Create a NEW file
    const path = `${userId}/profile_${Date.now()}.webp`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, webpFile, {
        contentType: 'image/webp',
        cacheControl: '3600',
      });

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from('avatars').getPublicUrl(path);

    // Since it's a new name, there will never be a cache in the CDN
    return publicUrl;
  };

  return { uploadAvatar };
}
