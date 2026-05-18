import type { InviteUserBodyRole } from '@/infra/api/model';

export type EmployeeRole = Exclude<InviteUserBodyRole, 'owner'>;

export const EMPLOYEE_ROLES: { value: EmployeeRole; label: string }[] = [
  { value: 'manager', label: 'Manager' },
  { value: 'warehouse', label: 'Almacén' },
  { value: 'branch_staff', label: 'Personal de Sucursal' },
];
