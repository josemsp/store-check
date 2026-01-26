
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Camera, Loader2, Save } from "lucide-react";

import { useAuth } from "@/app/providers/AuthProvider";
import { domains } from "@/infra/api/domains";
import { getSupabaseClient } from "@/infra/auth/supabase.client";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Separator } from "@/shared/components/ui/separator";

const profileSchema = z.object({
    firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    email: z.email("Correo electrónico inválido"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function UserProfile() {
    const { user, rememberDevice } = useAuth();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
    });

    useEffect(() => {
        if (user) {
            loadProfile();
        }
    }, [user]);

    const loadProfile = async () => {
        try {
            // Fetch profile data. Adjust according to your actual API response structure.
            // Using 'me' endpoint as defined in types/index.ts
            const response = await domains.users.me.get();

            if (!response.success) {
                throw new Error("Failed to load profile");
            }

            const profile = response;

            reset({
                // @ts-ignore
                firstName: profile.firstName || "",
                // @ts-ignore
                lastName: profile.lastName || "",
                // @ts-ignore
                email: profile.email || "",
            });
            // @ts-ignore
            setAvatarUrl(profile.avatarUrl);
        } catch (error) {
            console.error("Error loading profile:", error);
            toast.error("Error al cargar el perfil");
        }
    };

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            return;
        }

        const file = event.target.files[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        setUploading(true);
        try {
            const supabase = getSupabaseClient(rememberDevice); // Auth provider handles persistence

            // 1. Upload to Supabase Storage
            // Assumes a bucket named 'avatars' exists and is public
            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // 2. Get Public URL
            const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

            setAvatarUrl(data.publicUrl);
            toast.success("Imagen subida correctamente");
        } catch (error: any) {
            console.error("Error uploading image:", error);
            toast.error(error.message || "Error al subir la imagen");
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data: ProfileFormValues) => {
        if (!user) return;

        setLoading(true);
        try {
            // @ts-ignore - UpdateUserInput construction
            await domains.users[user.id].put({
                ...data,
                avatarUrl,
            });

            toast.success("Perfil actualizado correctamente");

            // Force reload or re-fetch logic if needed to update global context
            // window.location.reload(); 
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error al actualizar el perfil");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Perfil de Usuario</h3>
                <p className="text-sm text-muted-foreground">
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
                        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                            <div className="relative group">
                                <Avatar className="h-24 w-24 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                    <AvatarImage src={avatarUrl || ""} alt="Avatar" />
                                    <AvatarFallback className="text-xl">
                                        {user?.email?.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div
                                    className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Camera className="h-6 w-6" />
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    disabled={uploading}
                                />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-medium leading-none">Foto de Perfil</h4>
                                <p className="text-sm text-muted-foreground">
                                    Haz clic en la imagen para cambiarla. Formatos aceptados: JPG, PNG, GIF.
                                </p>
                                {uploading && (
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Loader2 className="h-3 w-3 animate-spin" />
                                        Subiendo...
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Form Section */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">Nombre</Label>
                                    <Input
                                        id="firstName"
                                        placeholder="Tu nombre"
                                        {...register("firstName")}
                                    />
                                    {errors.firstName && (
                                        <p className="text-sm text-red-500">{errors.firstName.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Apellido</Label>
                                    <Input
                                        id="lastName"
                                        placeholder="Tu apellido"
                                        {...register("lastName")}
                                    />
                                    {errors.lastName && (
                                        <p className="text-sm text-red-500">{errors.lastName.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    Cambiar tu correo electrónico puede requerir verificación nuevamente.
                                </p>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button type="submit" disabled={loading || uploading}>
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
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
