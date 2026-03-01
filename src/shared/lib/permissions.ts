// import { PermissionKey } from '@/api/generated/schemas';

// export function can(
//   userPermissions: PermissionKey[],
//   permission: PermissionKey
// ) {
//   return userPermissions.includes(permission);
// }

// create policy "users can read if permission"
// on companies
// for select
// using (
//   exists (
//     select 1
//     from core.user_permissions up
//     where up.user_id = auth.uid()
//       and up.permission = 'company.read'
//   )
// );
