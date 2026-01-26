import { useEffect } from "react"
import { AuthProvider, useAuth } from "./providers/AuthProvider"
import { QueryProvider } from "./providers/QueryProvider"
import { ThemeProvider } from "./providers/ThemeProvider"
import { ToastProvider } from "./providers/ToastProvider"
import { setupInterceptors } from "@/infra/api/interceptors"
import { QueryAuthBridge } from "./providers/QueryAuthBridge"

function AxiosAuthBridge() {
    const { session } = useAuth()

    useEffect(() => {
        setupInterceptors(() => session?.access_token ?? null)
    }, [session])

    return null
}

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <AuthProvider>
                <QueryProvider>
                    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                        <ToastProvider />
                        <AxiosAuthBridge />
                        <QueryAuthBridge />
                        {children}
                    </ThemeProvider>
                </QueryProvider>
            </AuthProvider>
        </>
    )
}