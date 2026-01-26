import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

const STORAGE_KEY = "supabase-storage-type";

type StorageType = "local" | "session";

function getAuthStorage(): Storage {
    const type = localStorage.getItem(STORAGE_KEY) as StorageType | null;
    return type === "session" ? sessionStorage : localStorage;
}

export function initSupabase(rememberDevice: boolean) {
    if (supabase) return supabase;

    const storageType: StorageType = rememberDevice ? "local" : "session";
    localStorage.setItem(STORAGE_KEY, storageType);

    supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL!,
        import.meta.env.VITE_SUPABASE_ANON_KEY!,
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                storage: rememberDevice ? localStorage : sessionStorage,
            },
        }
    );

    return supabase;
}

export function getSupabaseClient() {
    if (!supabase) {
        supabase = createClient(
            import.meta.env.VITE_SUPABASE_URL!,
            import.meta.env.VITE_SUPABASE_ANON_KEY!,
            {
                auth: {
                    persistSession: true,
                    autoRefreshToken: true,
                    storage: getAuthStorage(),
                },
            }
        );
    }

    return supabase;
}

// import { createClient, SupabaseClient } from "@supabase/supabase-js";

// let supabase: SupabaseClient | null = null;
// let currentStorage: Storage | null = null;

// export function getSupabaseClient(rememberDevice: boolean) {
//     const storage = rememberDevice ? localStorage : sessionStorage;

//     if (!supabase || currentStorage !== storage) {
//         currentStorage = storage;

//         supabase = createClient(
//             import.meta.env.VITE_SUPABASE_URL!,
//             import.meta.env.VITE_SUPABASE_ANON_KEY!,
//             {
//                 auth: {
//                     persistSession: true,
//                     autoRefreshToken: true,
//                     storage,
//                 },
//             }
//         );
//     }

//     return supabase;
// }
