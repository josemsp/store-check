import { createBrowserRouter } from "react-router";
import Signin from "./routes/signin";
import Dashboard from "./routes/dashboard";

export const router = createBrowserRouter([
    {
        element: <h1>Layout</h1>,
        children: [
            {
                path: "/login",
                element: <Signin />,
            },
        ],
    },
    {
        element: <h1>other</h1>,
        loader: () => {
            return <h1>Loader</h1>;
        },
        children: [
            { index: true, element: <Dashboard /> },
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
                element: <h1>Profile</h1>,
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
        ],
    }
]);