import { createBrowserRouter } from "react-router";
import PublicRoute from "../shared/guards/PublicRoute";
import ProtectedRoute from "../shared/guards/ProtectedRoute";
import AppLayout from "@/app/layouts/AppLayout";
import Signin from "@/features/auth/pages/Singnin";
import ForgotPassword from "@/features/auth/pages/ForgotPassword";
import RoleGuard from "../shared/guards/RoleGuard";
import RootDashboard from "@/features/dashboards/admin/Dashboard";
import Invitations from "@/features/dashboards/admin/Invitations";
import Onboarding from "@/features/onboarding/pages/Onboarding";
import UserProfile from "@/features/users/pages/UserProfile";

import NotFound from "@/shared/pages/NotFound";

export const router = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [
            {
                path: "/login",
                element: <Signin />,
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />,
            },
        ]
    },
    {
        path: "/onboarding",
        element: <Onboarding />,
    },
    {
        element: <ProtectedRoute />,
        loader: () => {
            return <h1>Loader</h1>;
        },
        children: [
            // {
            //     element: <RoleGuard allowedRoles={['root']} />,
            //     children: [
            //         {
            //             path: "root-dashboard",
            //             element: <RootDashboard />,
            //             children: [
            //                 { index: true, element: <div className="p-4">Bienvenido al panel de administración Root</div> },
            //                 { path: "invitations", element: <Invitations /> }
            //             ]
            //         }
            //     ]
            // },
            {
                children: [
                    {
                        element: <AppLayout />,
                        children: [
                            { index: true, element: <h1>Dashboard</h1> },
                            {
                                path: "users",
                                element: <h1>Users</h1>,
                            },
                            {
                                path: "inventory",
                                element: <h1>Inventory</h1>,
                            },
                            {
                                path: "shipments",
                                element: <h1>Shipments</h1>,
                            },
                            {
                                path: "branches",
                                element: <h1>Branches</h1>,
                            },
                            {
                                path: "profile",
                                element: <UserProfile />,
                            },
                            {
                                path: "admin",
                                element: <h1>Admin</h1>,
                                loader: () => {
                                    return <h1>Admin Loader</h1>;
                                },
                                children: [
                                    {
                                        path: "users",
                                        element: <h1>Admin Users</h1>,
                                    },
                                    {
                                        path: "settings",
                                        element: <h1>Admin Settings</h1>,
                                    },
                                ],
                            }
                        ]
                    }
                ]
            }
        ],
    },
    {
        path: "*",
        element: <NotFound />
    }
]);