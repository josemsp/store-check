import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar"
import { Outlet } from "react-router"
import { AppSidebar } from "@/shared/layout/app-sidebar/AppSidebar"
import { Separator } from "@/shared/components/ui/separator"
import { ModeThemeToggle } from "@/shared/layout/ModeThemeToggle"
import { NavUser } from "@/features/users/components/NavUser"

const AppLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="overflow-hidden">
                <header className="flex h-16 shrink-0 items-center gap-2 bg-gray-700">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <ModeThemeToggle />
                    </div>
                    <NavUser className="max-w-2xs" />
                </header>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}

export default AppLayout
