import { toast, type ExternalToast } from "sonner";

export const notify = {
    success: (message: string, data?: ExternalToast) => toast.success(message, data),
    error: (message: string, data?: ExternalToast) => toast.error(message, data),
    warning: (message: string, data?: ExternalToast) => toast.warning(message, data),
    info: (message: string, data?: ExternalToast) => toast.info(message, data),
    message: (message: string, data?: ExternalToast) => toast.message(message, data),
    action: (message: string, data?: ExternalToast) => toast(message, data),
    promise: (promise: Promise<unknown>, data?: ExternalToast) => toast.promise(promise, data),
}