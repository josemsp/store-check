import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Loader2, RotateCcw, Save } from 'lucide-react';
import { toast } from 'sonner';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useProfileContext } from '@/app/providers/ProfileProvider';
import { useUpdateUser } from '@/infra/api/endpoints/users';
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
import { Spinner } from '@/shared/components/ui/spinner';
import { useUploadAvatar } from '@/shared/hooks/useUploadAvatar';

import { profileSchema } from '../schemas';
import type { ProfileFormValues } from '../types';

export default function UserProfile() {
  const { data: profile, refetch: refetchProfile } = useProfileContext();
  const { mutateAsync } = useUpdateUser();
  const { uploadAvatar } = useUploadAvatar();
  console.log('profile', profile);

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
    if (!profile) return;
    reset({
      firstName: profile.firstName ?? '',
      lastName: profile.lastName ?? '',
      email: profile.email ?? '',
    });
    setAvatarUrl(profile.avatarUrl ?? null);
  }, [profile, reset]);

  // Detect if avatar has changed
  const avatarChanged = useMemo(
    () => avatarUrl !== (profile?.avatarUrl ?? null),
    [avatarUrl, profile],
  );
  const hasChanges = isDirty || avatarChanged;

  const initials = useMemo(() => {
    if (profile?.firstName && profile?.lastName) {
      return profile.firstName[0] + profile.lastName[0];
    }
    return profile?.email?.slice(0, 2).toUpperCase() ?? 'U';
  }, [profile]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      const url = await uploadAvatar(profile?.id ?? '', file);
      setAvatarUrl(url);

      // Guardado automático rápido para actualizar inmediatamente la DB
      await mutateAsync({
        id: profile?.id ?? '',
        data: { avatarUrl: url },
      });
      await refetchProfile();

      toast.success('Foto actualizada con éxito');
    } catch (error) {
      console.error(error);
      toast.error('Error al subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (formData: ProfileFormValues) => {
    if (!profile) return;

    try {
      setLoading(true);
      await mutateAsync({
        id: profile.id,
        data: {
          ...(formData.firstName !== (profile.firstName ?? '') && {
            firstName: formData.firstName,
          }),
          ...(formData.lastName !== (profile.lastName ?? '') && {
            lastName: formData.lastName,
          }),
          ...(formData.email !== (profile.email ?? '') && { email: formData.email }),
          ...(avatarUrl !== (profile.avatarUrl ?? null) && { avatarUrl }),
        },
      });

      await refetchProfile();
      toast.success('Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (!profile) return;

    reset({
      firstName: profile.firstName ?? '',
      lastName: profile.lastName ?? '',
      email: profile.email ?? '',
    });
    setAvatarUrl(profile.avatarUrl ?? null);

    toast.info('Cambios descartados');
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
                    <AvatarImage
                      src={avatarUrl || ''}
                      alt="Avatar"
                      className="object-cover"
                    />
                    <AvatarFallback className="text-2xl font-semibold">
                      {initials}
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
                  <p className="text-sm text-muted-foreground">{profile?.email}</p>
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
                          <Spinner data-icon="inline-start" />
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
