import { getSupabaseClient } from '@/infra/auth/supabase.client';

import { imageToWebp } from '../lib/image-utils';

export function useUploadAvatar() {
  const uploadAvatar = async (userId: string, file: File) => {
    if (file.size > 2_000_000) {
      throw new Error('Imagen demasiado pesada');
    }

    const supabase = getSupabaseClient();
    const webpFile = await imageToWebp(file);

    // 1. Borrar todas las imágenes viejas de la carpeta del usuario
    const { data: existingFiles } = await supabase.storage.from('avatars').list(userId);
    if (existingFiles && existingFiles.length > 0) {
      const pathsToRemove = existingFiles.map((f) => `${userId}/${f.name}`);
      await supabase.storage.from('avatars').remove(pathsToRemove);
    }

    // 2. Crear un archivo COMPLETAMENTE NUEVO
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

    // Al ser un nombre nuevo, nunca habrá caché en el CDN
    return publicUrl;
  };

  return { uploadAvatar };
}
