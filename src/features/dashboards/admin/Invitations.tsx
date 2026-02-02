import { useState } from 'react';

import { useInviteUserOwner } from '@/infra/api/endpoints/invitations';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { notify } from '@/shared/notifications/toast';

export default function Invitations() {
  const [email, setEmail] = useState('');
  const { mutate: createInvitation, isPending: isLoading } = useInviteUserOwner();

  const handleCreateInvitation = (e: React.FormEvent) => {
    e.preventDefault();

    createInvitation(
      {
        data: {
          email,
        },
      },
      {
        onSuccess: () => {
          notify.success('Invitación creada exitosamente');
          setEmail('');
        },
        onError: (error: any) => {
          notify.error(error.message || 'Error al crear invitación');
        },
      },
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Invitaciones</h1>

      <Card>
        <CardHeader>
          <CardTitle>Invitar Owner</CardTitle>
          <CardDescription>
            Envía una invitación para crear una nueva empresa.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleCreateInvitation}
            className="flex gap-4 items-end max-w-lg"
          >
            <div className="grid gap-2 flex-1">
              <label htmlFor="email" className="text-sm font-medium">
                Correo Electrónico
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@ejemplo.com"
                required
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Enviar Invitación'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
