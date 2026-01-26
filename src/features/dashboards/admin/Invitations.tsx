import { useState, useEffect } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { getSupabaseClient } from "@/infra/auth/supabase.client";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { notify } from "@/shared/notifications/toast";

export default function Invitations() {

    return (
        <div>
            <h1>Invitations</h1>
        </div>
    )
    // const { rememberDevice } = useAuth();
    // const supabase = getSupabaseClient(rememberDevice);
    // const [invitations, setInvitations] = useState<Invitation[]>([]);
    // const [email, setEmail] = useState("");
    // const [isLoading, setIsLoading] = useState(false);

    // const fetchInvitations = async () => {
    //     const { data, error } = await supabase
    //         .from("invitations")
    //         .select("*")
    //         .order("created_at", { ascending: false });

    //     if (error) {
    //         notify.error("Error al cargar invitaciones");
    //         console.error(error);
    //     } else {
    //         setInvitations(data || []);
    //     }
    // };

    // useEffect(() => {
    //     fetchInvitations();
    // }, []);

    // const handleCreateInvitation = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setIsLoading(true);

    //     // Generate a random token
    //     const token = crypto.randomUUID();

    //     const { error } = await supabase
    //         .from("invitations")
    //         .insert({
    //             email,
    //             token,
    //             status: 'pending'
    //         });

    //     if (error) {
    //         notify.error("Error al crear invitación");
    //         console.error(error);
    //     } else {
    //         notify.success("Invitación creada");
    //         setEmail("");
    //         fetchInvitations();
    //     }
    //     setIsLoading(false);
    // };

    // return (
    //     <div className="space-y-6">
    //         <h2 className="text-2xl font-bold">Gestión de Invitaciones</h2>

    //         <form onSubmit={handleCreateInvitation} className="flex gap-4 items-end max-w-lg">
    //             <div className="grid gap-2 flex-1">
    //                 <label htmlFor="email" className="text-sm font-medium">Correo Electrónico</label>
    //                 <Input
    //                     id="email"
    //                     type="email"
    //                     value={email}
    //                     onChange={(e) => setEmail(e.target.value)}
    //                     placeholder="usuario@ejemplo.com"
    //                     required
    //                 />
    //             </div>
    //             <Button type="submit" disabled={isLoading}>
    //                 {isLoading ? "Creando..." : "Crear Invitación"}
    //             </Button>
    //         </form>

    //         <div className="rounded-md border bg-white dark:bg-slate-800">
    //             <table className="w-full caption-bottom text-sm">
    //                 <thead className="[&_tr]:border-b">
    //                     <tr className="border-b border-slate-200 dark:border-slate-700 transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/50">
    //                         <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Email</th>
    //                         <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Token</th>
    //                         <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Estado</th>
    //                         <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Creado</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody className="[&_tr:last-child]:border-0 text-slate-900 dark:text-slate-50">
    //                     {invitations.map((invitation) => (
    //                         <tr key={invitation.id} className="border-b border-slate-200 dark:border-slate-700 transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/50">
    //                             <td className="p-4 align-middle">{invitation.email}</td>
    //                             <td className="p-4 align-middle font-mono text-xs">{invitation.token}</td>
    //                             <td className="p-4 align-middle">
    //                                 <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${invitation.status === 'pending'
    //                                     ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500'
    //                                     : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500'
    //                                     }`}>
    //                                     {invitation.status}
    //                                 </span>
    //                             </td>
    //                             <td className="p-4 align-middle">{new Date(invitation.created_at || "").toLocaleDateString()}</td>
    //                         </tr>
    //                     ))}
    //                     {invitations.length === 0 && (
    //                         <tr className="border-b border-slate-200 dark:border-slate-700">
    //                             <td colSpan={4} className="p-4 text-center text-slate-500">No hay invitaciones creadas.</td>
    //                         </tr>
    //                     )}
    //                 </tbody>
    //             </table>
    //         </div>
    //     </div>
    // );
}
