import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { useInviteUser } from '@/infra/api/endpoints/invitations';
import type { InviteUserBody } from '@/infra/api/model';
import type { ListOwners200DataItem } from '@/infra/api/model/listOwners200DataItem';
import InputField from '@/shared/components/form/input-field';
import { SelectField } from '@/shared/components/form/select-field';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { EMPLOYEE_ROLES, type EmployeeRole } from '@/shared/constants/roles';
import { notify } from '@/shared/notifications/toast';
import {
  InviteEmployeeSchema,
  type InviteEmployeeValues,
} from '@/shared/schemas/invitations/invite-employee';

interface InviteEmployeeFormProps {
  showCompanySelect?: boolean;
  owners?: ListOwners200DataItem[];
}

const InviteEmployeeForm = ({
  showCompanySelect = false,
  owners = [],
}: InviteEmployeeFormProps) => {
  const { mutate: createInvitation, isPending } = useInviteUser();

  const form = useForm<InviteEmployeeValues>({
    resolver: zodResolver(InviteEmployeeSchema),

    defaultValues: {
      email: '',
      role: 'branch_staff',
      owner_id: '',
    },
  });

  const onSubmit = (values: InviteEmployeeValues) => {
    const data: InviteUserBody = {
      email: values.email,
      role: values.role,
    };

    createInvitation(
      { data },
      {
        onSuccess: () => {
          notify.success('Invitación de empleado creada exitosamente');

          form.reset();
        },

        onError: (error: any) => {
          notify.error(error?.message || 'Error al crear invitación');
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invitar Empleado</CardTitle>

        <CardDescription>
          Envía una invitación para crear un nuevo empleado en la empresa.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-lg space-y-4">
          {showCompanySelect ? (
            <div className="grid gap-2">
              <Label>Empresa</Label>

              <SelectField
                items={owners.map((owner) => ({
                  value: owner.id,
                  label: owner.business_name,
                }))}
                placeholder="Seleccione una empresa"
                value={form.watch('owner_id')}
                onValueChange={(value) => {
                  form.setValue('owner_id', value ?? '');
                }}
              />
            </div>
          ) : null}

          <InputField
            id="employee-email"
            label="Correo Electrónico"
            error={form.formState.errors.email}
            inputProps={{
              type: 'email',
              placeholder: 'empleado@ejemplo.com',
              ...form.register('email'),
            }}
          />

          <div className="grid gap-2">
            <Label>Rol</Label>

            <SelectField<EmployeeRole>
              items={EMPLOYEE_ROLES}
              placeholder="Seleccione un rol"
              value={form.watch('role')}
              onValueChange={(value) => {
                if (!value) return;

                form.setValue('role', value);
              }}
            />
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? 'Enviando...' : 'Enviar Invitación'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InviteEmployeeForm;
