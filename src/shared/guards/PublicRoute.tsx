import { useAuth } from "@/app/providers/AuthProvider";
import { useProfile } from "@/features/users/hooks/useProfile";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
    const { isAuthenticated, isInitialized } = useAuth();
    const { data: profile, isLoading: isProfileLoading } = useProfile();

    if (!isInitialized) return null;

    if (isAuthenticated) {
        if (isProfileLoading) return null;

        // if (profile?.role_id === 'root') {
        //     return <Navigate to="/root-dashboard" replace />;
        // }
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
