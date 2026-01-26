import { useAuth } from "@/app/providers/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import { useProfile } from "@/features/users/hooks/useProfile";

// type UserRole = Database["public"]["Enums"]["user_role"];

interface RoleGuardProps {
    // allowedRoles: UserRole[];
    allowedRoles: string[];
    redirectTo?: string;
}

export default function RoleGuard({ allowedRoles, redirectTo = "/" }: RoleGuardProps) {
    console.log(allowedRoles, redirectTo);
    const { isInitialized } = useAuth();
    const { data: profileData, isLoading: isProfileLoading } = useProfile();

    if (!isInitialized) return null;

    if (isProfileLoading) return null;

    // if (!profileData || !allowedRoles.includes(profileData.data.role_id as UserRole)) {
    //     return <Navigate to={redirectTo} replace />;
    // }

    return <Outlet />;
}
