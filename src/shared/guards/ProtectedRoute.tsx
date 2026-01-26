import { useAuth } from "@/app/providers/AuthProvider";
import { useProfile } from "@/features/users/hooks/useProfile";
import { Navigate, Outlet, useLocation } from "react-router-dom";


export default function ProtectedRoute() {
    const { isAuthenticated, isInitialized } = useAuth();
    const { data: profile, isLoading: isProfileLoading } = useProfile();
    const location = useLocation();

    if (!isInitialized) return null;
    if (isProfileLoading) return null;
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    // if (profile?.role_id === "root" && !location.pathname.startsWith("/root-dashboard")) {
    //     return <Navigate to="/root-dashboard" replace />;
    // }

    return <Outlet />;
}
