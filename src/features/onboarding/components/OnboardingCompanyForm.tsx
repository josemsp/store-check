
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Building2, Check } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import InputGeneral from "@/shared/components/form/InputGeneral";

const companySchema = z.object({
    name: z.string().min(3, "El nombre de la empresa debe tener al menos 3 caracteres"),
});

type CompanyFormValues = z.infer<typeof companySchema>;

interface OnboardingCompanyFormProps {
    onComplete: (data: { name: string }) => void;
    onBack: () => void;
    isLoading?: boolean;
    initialData?: { name: string } | null;
}

export function OnboardingCompanyForm({ onComplete, onBack, isLoading, initialData }: OnboardingCompanyFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CompanyFormValues>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            name: initialData?.name || "",
        }
    });

    const onSubmit = (data: CompanyFormValues) => {
        onComplete(data);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Tu Espacio de Trabajo</h2>
                <p className="text-muted-foreground">
                    Dale un nombre a tu organización o empresa.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputGeneral
                    id="name"
                    label="Nombre de la Empresa"
                    className="space-y-2"
                    error={errors.name}
                    inputProps={{
                        ...register("name"),
                        placeholder: "Ej. Mi Tienda S.A.",
                        required: true,
                    }}
                />

                <div className="pt-4 flex gap-4">
                    <Button type="button" variant="outline" className="w-1/3 h-12" onClick={onBack} disabled={isLoading}>
                        Atrás
                    </Button>
                    <Button type="submit" className="flex-1 text-lg h-12" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Configurando...
                            </>
                        ) : (
                            <>
                                <Check className="mr-2 h-5 w-5" />
                                Finalizar Configuración
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
