import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Loader2, RotateCcw, Save } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/app/providers/AuthProvider';
import { useProfileContext } from '@/app/providers/ProfileProvider';
import { getSupabaseClient } from '@/infra/auth/supabase.client';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Separator } from '@/shared/components/ui/separator';

const profileSchema = z.object({
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z.email('Correo electrónico inválido'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function UserProfile() {
  const { user } = useAuth();
  const { data: profile } = useProfileContext();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  // Load profile data from context into form
  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
      });
      setAvatarUrl(profile.avatarUrl || null);
    }
  }, [profile, reset]);

  // Detect if avatar has changed
  const avatarChanged = avatarUrl !== (profile?.avatarUrl || null);
  const hasChanges = isDirty || avatarChanged;

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    setUploading(true);
    try {
      const supabase = getSupabaseClient(); // Auth provider handles persistence

      // 1. Upload to Supabase Storage
      // Assumes a bucket named 'avatars' exists and is public
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 2. Get Public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);

      setAvatarUrl(data.publicUrl);
      toast.success('Imagen subida correctamente');
    } catch (error: unknown) {
      console.error('Error uploading image:', error);
      toast.error(error instanceof Error ? error.message : 'Error al subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (formData: ProfileFormValues) => {
    if (!user) return;

    setLoading(true);
    try {
      // TODO: implement update user profile
      console.log('Profile data to update:', formData);

      toast.success('Perfil actualizado correctamente');

      // Force reload or re-fetch logic if needed to update global context
      // window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (profile) {
      reset({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
      });
      setAvatarUrl(profile.avatarUrl || null);
      toast.info('Cambios descartados');
    }
  };

  const Initials = () => {
    if (profile?.firstName && profile?.lastName) {
      return profile.firstName.charAt(0) + profile.lastName.charAt(0);
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'U';
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Perfil de Usuario</h2>
          <p className="text-muted-foreground mt-2">
            Administra tu información personal y configuración de cuenta.
          </p>
        </div>
        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>
              Actualiza tu foto de perfil y detalles personales.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center sm:flex-row sm:items-center gap-6 pb-6 border-b">
                <div className="relative group">
                  <Avatar
                    className="h-32 w-32 cursor-pointer ring-2 ring-offset-2 ring-offset-background ring-primary/10 transition-all group-hover:ring-primary/30"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <AvatarImage src={avatarUrl || ''} alt="Avatar" />
                    <AvatarFallback className="text-2xl font-semibold">
                      {Initials()}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="text-center text-white">
                      <Camera className="h-8 w-8 mx-auto mb-1" />
                      <span className="text-xs font-medium">Cambiar</span>
                    </div>
                  </div>
                  {uploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-full">
                      <Loader2 className="h-8 w-8 text-white animate-spin" />
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                    disabled={uploading}
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <h3 className="text-xl font-semibold">
                    {profile?.fullName || 'Usuario'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {profile?.email || user?.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Haz clic en la imagen para cambiar tu foto de perfil.
                    <br />
                    Formatos aceptados: JPG, PNG, GIF (máx. 5MB)
                  </p>
                  {avatarChanged && (
                    <p className="text-xs text-amber-600 dark:text-amber-500 font-medium">
                      ⚠️ Foto de perfil modificada (sin guardar)
                    </p>
                  )}
                </div>
              </div>

              {/* Form Section */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input
                      id="firstName"
                      placeholder="Tu nombre"
                      {...register('firstName')}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input
                      id="lastName"
                      placeholder="Tu apellido"
                      {...register('lastName')}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Cambiar tu correo electrónico puede requerir verificación nuevamente.
                  </p>
                </div>

                <Separator />

                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
                  <p className="text-sm text-muted-foreground">
                    {hasChanges ? (
                      <span className="text-amber-600 dark:text-amber-500 font-medium">
                        Tienes cambios sin guardar
                      </span>
                    ) : (
                      'No hay cambios pendientes'
                    )}
                  </p>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                      disabled={!hasChanges || loading || uploading}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Deshacer
                    </Button>
                    <Button type="submit" disabled={!hasChanges || loading || uploading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Guardando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Guardar Cambios
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
