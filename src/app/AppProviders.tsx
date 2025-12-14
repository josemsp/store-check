import { ToastProvider } from "./providers/ToastProvider"

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ToastProvider />
            {children}
        </>
    )
}