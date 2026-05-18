import { useListOwners } from '@/infra/api/endpoints/owners';
import { Separator } from '@/shared/components/ui/separator';

import InviteEmployeeForm from '../components/invite-employee-form';
import InviteOwnerForm from '../components/invite-owner-form';

const RootInvitationsPage = () => {
  const { data: ownersResponse } = useListOwners(
    { page_size: 100 },
    { query: { select: (response) => response.data } },
  );
  const owners = ownersResponse ?? [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Invitaciones</h1>

      <InviteOwnerForm />

      <Separator className="my-2" />

      <InviteEmployeeForm showCompanySelect owners={owners} />
    </div>
  );
};

export default RootInvitationsPage;
