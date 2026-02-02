import { getSupabaseClient } from '@/infra/auth/supabase.client';

import { imageToWebp } from '../lib/image-utils';

export function useUploadAvatar() {
  const uploadAvatar = async (userId: string, file: File) => {
    if (file.size > 2_000_000) {
      throw new Error('Imagen demasiado pesada');
    }

    const supabase = getSupabaseClient();
    const webpFile = await imageToWebp(file);

    const path = `${userId}/profile.webp`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, webpFile, {
        upsert: true,
        contentType: 'image/webp',
        cacheControl: '3600',
      });

    if (uploadError) throw uploadError;
    // {
    //     "path": "398d2e21-bb70-4109-b626-65f610dbbe32/profile.webp",
    //     "id": "8816c0a8-65ca-4b77-a23a-9e1cba3dda6e",
    //     "fullPath": "avatars/398d2e21-bb70-4109-b626-65f610dbbe32/profile.webp"
    // }

    return path;
  };

  return { uploadAvatar };
}
