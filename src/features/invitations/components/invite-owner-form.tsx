import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { useInviteUser } from '@/infra/api/endpoints/invitations';
import InputField from '@/shared/components/form/input-field';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { notify } from '@/shared/notifications/toast';
import {
  InviteOwnerSchema,
  type InviteOwnerValues,
} from '@/shared/schemas/invitations/invite-owner';

const InviteOwnerForm = () => {
  const { mutate: createInvitation, isPending } = useInviteUser();

  const form = useForm<InviteOwnerValues>({
    resolver: zodResolver(InviteOwnerSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: InviteOwnerValues) => {
    createInvitation(
      {
        data: values,
      },
      {
        onSuccess: () => {
          notify.success('Invitación de owner creada exitosamente');

          form.reset();
        },

        onError: (error) => {
          notify.error(error?.error.message || 'Error al crear invitación');
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invitar Owner</CardTitle>

        <CardDescription>
          Envía una invitación para crear una nueva empresa.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex max-w-lg items-end gap-4"
        >
          <div className="flex-1">
            <InputField
              id="owner-email"
              label="Correo Electrónico"
              error={form.formState.errors.email}
              inputProps={{
                type: 'email',
                placeholder: 'owner@ejemplo.com',
                ...form.register('email'),
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

export default InviteOwnerForm;
