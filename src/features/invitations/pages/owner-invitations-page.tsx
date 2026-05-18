import InviteEmployeeForm from '../components/invite-employee-form';

const OwnerInvitationsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Invitaciones</h1>
      <p className="text-muted-foreground">
        Invita nuevos empleados a tu empresa asignándoles un rol.
      </p>

      <InviteEmployeeForm />
    </div>
  );
};

export default OwnerInvitationsPage;
