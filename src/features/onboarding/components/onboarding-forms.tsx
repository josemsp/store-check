import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  useUpdateCompany,
  useUpdatePreferences,
  useUpdateProfile,
} from '@/infra/api/endpoints/onboarding';
import type {
  UpdateCompanyBody,
  UpdatePreferencesBody,
  UpdateProfileBody,
  UpdateProfileBodyRole,
} from '@/infra/api/model';
import { Card } from '@/shared/components/ui/card';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

interface FormFieldErrorProps {
  message?: string;
  id?: string;
}

const FormFieldError = ({ message, id }: FormFieldErrorProps) => {
  if (!message) return null;
  return (
    <p id={id} className="text-red-500 text-sm mt-2 flex items-center gap-1">
      <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
      {message}
    </p>
  );
};

interface CompanyInfoFormProps {
  initialData?: UpdateCompanyBody;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function CompanyInfoForm({
  initialData,
  onSuccess,
  onError,
}: CompanyInfoFormProps) {
  const { mutate, isPending } = useUpdateCompany({
    mutation: { onSuccess, onError },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCompanyBody>({
    mode: 'onBlur',
    defaultValues: {
      company_name: '',
      logo_url: '',
      ...initialData,
    },
  });

  const onSubmit = useCallback(
    (data: UpdateCompanyBody) => {
      mutate({ data });
    },
    [mutate],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="company_name" className="font-medium text-slate-700">
            Nombre de la Empresa <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="company_name"
            control={control}
            rules={{
              required: 'El nombre es obligatorio',
              minLength: { value: 3, message: 'Minimo 3 caracteres' },
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="company_name"
                placeholder="Acme Inc."
                disabled={isPending}
                className={errors.company_name ? 'border-red-500' : ''}
                aria-invalid={Boolean(errors.company_name)}
                aria-describedby={errors.company_name ? 'company_name-error' : undefined}
              />
            )}
          />
          {errors.company_name && (
            <FormFieldError
              message={errors.company_name.message}
              id="company_name-error"
            />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo_url" className="font-medium text-slate-700">
            Logo URL
          </Label>
          <Controller
            name="logo_url"
            control={control}
            rules={{
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: 'URL invalida',
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="logo_url"
                placeholder="https://ejemplo.com/logo.png"
                type="url"
                disabled={isPending}
                className={errors.logo_url ? 'border-red-500' : ''}
              />
            )}
          />
          {errors.logo_url && <FormFieldError message={errors.logo_url.message} />}
        </div>
      </div>
    </form>
  );
}

interface ProfileInfoFormProps {
  initialData?: UpdateProfileBody;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

const ROLES: { value: UpdateProfileBodyRole; label: string }[] = [
  { value: 'manager', label: 'Manager' },
  { value: 'warehouse', label: 'Almacen' },
  { value: 'branch_staff', label: 'Personal de Sucursal' },
];

export function ProfileInfoForm({
  initialData,
  onSuccess,
  onError,
}: ProfileInfoFormProps) {
  const { mutate, isPending } = useUpdateProfile({
    mutation: { onSuccess, onError },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileBody>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      role: '' as UpdateProfileBodyRole,
      branch_id: '',
      ...initialData,
    },
  });

  const onSubmit = useCallback(
    (data: UpdateProfileBody) => {
      mutate({ data });
    },
    [mutate],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="font-medium text-slate-700">
            Nombre Completo <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Requerido' }}
            render={({ field }) => (
              <Input
                {...field}
                id="name"
                placeholder="Juan Perez"
                disabled={isPending}
                className={errors.name ? 'border-red-500' : ''}
              />
            )}
          />
          {errors.name && <FormFieldError message={errors.name.message} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="font-medium text-slate-700">
            Rol <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="role"
            control={control}
            rules={{ required: 'Selecciona un rol' }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="role"
                  disabled={isPending}
                  className={errors.role ? 'border-red-500' : ''}
                >
                  <SelectValue placeholder="Selecciona rol" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.role && <FormFieldError message={errors.role.message} />}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="branch_id" className="font-medium text-slate-700">
            ID de Sucursal
          </Label>
          <Controller
            name="branch_id"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="branch_id"
                placeholder="UUID de la sucursal"
                disabled={isPending}
                value={field.value ?? ''}
              />
            )}
          />
        </div>
      </div>
    </form>
  );
}

interface PreferencesFormProps {
  initialData?: UpdatePreferencesBody;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function PreferencesForm({
  initialData,
  onSuccess,
  onError,
}: PreferencesFormProps) {
  const { mutate, isPending } = useUpdatePreferences({
    mutation: { onSuccess, onError },
  });

  const { control, handleSubmit } = useForm<UpdatePreferencesBody>({
    defaultValues: {
      email_notifications: true,
      product_updates: false,
      weekly_report: false,
      theme: 'light',
      ...initialData,
    },
  });

  const onSubmit = useCallback(
    (data: UpdatePreferencesBody) => {
      mutate({ data });
    },
    [mutate],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Notificaciones</h3>

        <div className="space-y-3">
          {[
            {
              name: 'email_notifications' as const,
              label: 'Notificaciones por Email',
              desc: 'Recibe actualizaciones importantes sobre tu cuenta',
            },
            {
              name: 'product_updates' as const,
              label: 'Actualizaciones de Producto',
              desc: 'Enterate de nuevas caracteristicas y mejoras',
            },
            {
              name: 'weekly_report' as const,
              label: 'Reporte Semanal',
              desc: 'Recibe un resumen semanal de tu actividad',
            },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <Controller
                name={item.name}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id={item.name}
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                    disabled={isPending}
                    className="mt-1"
                  />
                )}
              />
              <label htmlFor={item.name} className="flex-1 cursor-pointer">
                <span className="font-medium text-slate-900">{item.label}</span>
                <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="font-medium text-slate-700">Tema</Label>
        <Controller
          name="theme"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              disabled={isPending}
            >
              {[
                { value: 'light' as const, label: 'Claro' },
                { value: 'dark' as const, label: 'Oscuro' },
                { value: 'auto' as const, label: 'Automatico' },
              ].map((option) => (
                <div key={option.value} className="flex items-center gap-3">
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    disabled={isPending}
                  />
                  <label htmlFor={option.value} className="cursor-pointer text-slate-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          )}
        />
      </div>
    </form>
  );
}

export function WelcomeStep() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Bienvenido a bordo!</h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          Estamos emocionados de tenerte aqui. En los proximos pasos, configuraremos tu
          cuenta para que puedas empezar inmediatamente con acceso a todas las
          funcionalidades.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          { title: 'Empresa', desc: 'Informacion de tu organizacion' },
          { title: 'Perfil', desc: 'Detalles personales' },
          { title: 'Preferencias', desc: 'Personalizacion' },
        ].map((item, idx) => (
          <Card
            key={idx}
            className="p-6 border border-slate-200 text-center hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
            <p className="text-sm text-slate-600">{item.desc}</p>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-2">Tiempo estimado</h3>
        <p className="text-slate-700 leading-relaxed">
          Este proceso tomara aproximadamente 5-10 minutos. Puedes regresar y editar tu
          informacion en cualquier momento. Tu privacidad es nuestra prioridad.
        </p>
      </Card>
    </div>
  );
}

export function CompletionStep() {
  return (
    <div className="space-y-6 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 mb-4">
        <span className="text-5xl text-emerald-600">&check;</span>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
          Configuracion completada!
        </h2>
        <p className="text-lg text-slate-600">
          Tu cuenta esta lista. Te enviaremos un email de confirmacion pronto.
        </p>
      </div>

      <Card className="bg-slate-50 border border-slate-200 p-6 text-left max-w-md mx-auto">
        <h3 className="font-semibold text-slate-900 mb-4">Proximos pasos:</h3>
        <ol className="space-y-3 text-slate-700">
          {[
            'Explora el dashboard y familiarizate con la interfaz',
            'Invita a tu equipo para colaborar juntos',
            'Personaliza tu workspace segun tus necesidades',
          ].map((step, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="text-blue-600 font-bold flex-shrink-0">{idx + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
