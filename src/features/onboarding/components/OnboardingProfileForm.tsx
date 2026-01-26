import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera, ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import InputPassword from "@/shared/components/form/InputPassword";
import InputGeneral from "@/shared/components/form/InputGeneral";

const profileSchema = z.object({
    firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    passwordConfirmation: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirmation"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface OnboardingProfileFormProps {
    onNext: (data: { firstName: string; lastName: string; password: string; avatarFile?: File }) => void;
    onBack: () => void;
    initialEmail?: string;
    initialData?: {
        firstName: string;
        lastName: string;
        password: string;
        avatarFile?: File;
    } | null;
}

export function OnboardingProfileForm({ onNext, onBack, initialEmail, initialData }: OnboardingProfileFormProps) {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(initialData?.avatarFile || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initialize preview if file exists
    if (initialData?.avatarFile && !avatarPreview) {
        const objectUrl = URL.createObjectURL(initialData.avatarFile);
        setAvatarPreview(objectUrl);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: initialData?.firstName || "",
            lastName: initialData?.lastName || "",
            password: initialData?.password || "",
            passwordConfirmation: initialData?.password || "",
        }
    });

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            return;
        }

        const file = event.target.files[0];
        setAvatarFile(file);

        // Create preview URL
        const objectUrl = URL.createObjectURL(file);
        setAvatarPreview(objectUrl);
    };

    const onSubmit = (data: ProfileFormValues) => {
        onNext({
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            avatarFile: avatarFile || undefined
        });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold tracking-tight">Completa tu Perfil</h2>
                <p className="text-muted-foreground">
                    Cuéntanos un poco más sobre ti para empezar.
                </p>
            </div>

            <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                    <Avatar className="h-24 w-24 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <AvatarImage src={avatarPreview || ""} alt="Avatar" />
                        <AvatarFallback className="text-xl">
                            {initialEmail?.substring(0, 2).toUpperCase() || "YO"}
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
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <InputGeneral
                        id="firstName"
                        label="Nombre"
                        className="space-y-2"
                        error={errors.firstName}
                        inputProps={{
                            ...register("firstName"),
                            placeholder: "Tu nombre",
                            required: true,
                        }}
                    />
                    <InputGeneral
                        id="lastName"
                        label="Apellido"
                        className="space-y-2"
                        error={errors.lastName}
                        inputProps={{
                            ...register("lastName"),
                            placeholder: "Tu apellido",
                            required: true,
                        }}
                    />
                </div>

                <InputGeneral
                    id="email"
                    label="Correo Electrónico"
                    className="space-y-2"
                    inputProps={{
                        value: initialEmail || "",
                        disabled: true,
                    }}
                />
                <InputPassword
                    id="password"
                    label="Contraseña"
                    error={errors.password}
                    className="space-y-2"
                    inputProps={{
                        ...register("password"),
                        placeholder: "Crear contraseña",
                        required: true,
                    }}
                />
                <InputPassword
                    id="passwordConfirmation"
                    label="Confirmar Contraseña"
                    error={errors.passwordConfirmation}
                    className="space-y-2"
                    inputProps={{
                        ...register("passwordConfirmation"),
                        placeholder: "Confirmar contraseña",
                        required: true,
                    }}
                />

                <div className="flex gap-4">
                    <Button type="button" variant="outline" className="w-1/3" onClick={onBack}>
                        Atrás
                    </Button>
                    <Button type="submit" className="flex-1">
                        <div className="flex items-center">
                            Siguiente
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                    </Button>
                </div>
            </form>
        </div>
    );
}
