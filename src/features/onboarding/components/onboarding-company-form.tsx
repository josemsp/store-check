import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, Check } from 'lucide-react';

import { useForm } from 'react-hook-form';

import InputField from '@/shared/components/form/input-field';
import { LoadingButton } from '@/shared/components/form/loading-button';
import { Button } from '@/shared/components/ui/button';
import {
  type CompanyFormValues,
  companySchema,
} from '@/shared/schemas/onboarding/company';

interface OnboardingCompanyFormProps {
  onComplete: (companyName: string) => void;
  onBack: () => void;
  isLoading?: boolean;
  companyName?: string;
}

export function OnboardingCompanyForm({
  onComplete,
  onBack,
  isLoading,
  companyName,
}: OnboardingCompanyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: companyName || '',
    },
  });

  const onSubmit = (data: CompanyFormValues) => {
    onComplete(data.name);
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
        <InputField
          id="name"
          label="Nombre de la Empresa"
          className="space-y-2"
          error={errors.name}
          inputProps={{
            ...register('name'),
            placeholder: 'Ej. Mi Tienda S.A.',
            required: true,
          }}
        />

        <div className="pt-4 flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="w-1/3 h-12"
            onClick={onBack}
            disabled={isLoading}
          >
            Atrás
          </Button>
          <LoadingButton
            type="submit"
            className="flex-1 h-12 text-lg [&_svg]:size-5"
            isLoading={isLoading}
            loadingText="Configurando..."
            icon={<Check />}
          >
            Finalizar Configuración
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}
