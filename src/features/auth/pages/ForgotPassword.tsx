import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "@/app/providers/AuthProvider";
import StoreCheckLogo from "@/app/assets/images/store-check-logo.png";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft, Mail, Loader2 } from "lucide-react";
import { notify } from "@/shared/notifications/toast";
import { ModeThemeToggle } from "@/shared/layout/ModeThemeToggle";

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { resetPassword } = useAuth();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleResetPassword = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            await resetPassword(email);
            setIsSubmitted(true);
            notify.success('Correo de recuperación enviado');
        } catch (error) {
            notify.error('Error al enviar el correo');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 px-4 relative">
            <div className="absolute top-4 right-4">
                <ModeThemeToggle />
            </div>

            <div className="flex justify-center mb-4">
                <img src={StoreCheckLogo} alt="StoreCheck Logo" className="w-32 h-32 object-contain" />
            </div>

            <Card className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">Recuperar Contraseña</CardTitle>
                    <CardDescription>
                        Ingresa tu correo para recibir un enlace de recuperación.
                    </CardDescription>
                </CardHeader>

                {!isSubmitted ? (
                    <form onSubmit={handleResetPassword}>
                        <CardContent className="grid gap-4 pb-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo electrónico</Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="nombre@ejemplo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <Mail className="absolute right-2 top-1.5 text-muted-foreground" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Enviando...
                                    </span>
                                ) : (
                                    'Enviar enlace'
                                )}
                            </Button>
                            <div className="text-center text-sm">
                                <Link to="/login" className="flex items-center justify-center text-primary hover:underline underline-offset-4 gap-2">
                                    <ArrowLeft className="h-4 w-4" />
                                    Volver al inicio de sesión
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                ) : (
                    <CardContent className="space-y-4 pt-4">
                        <div className="text-center space-y-2">
                            <div className="flex justify-center">
                                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                    <Mail className="h-6 w-6" />
                                </div>
                            </div>
                            <h3 className="font-semibold text-lg">¡Correo enviado!</h3>
                            <p className="text-muted-foreground text-sm">
                                Hemos enviado un enlace de recuperación a <strong>{email}</strong>.
                                Por favor revisa tu bandeja de entrada.
                            </p>
                        </div>
                        <Button variant="outline" className="w-full" onClick={() => setIsSubmitted(false)}>
                            Intentar con otro correo
                        </Button>
                        <div className="text-center text-sm">
                            <Link to="/login" className="flex items-center justify-center text-primary hover:underline underline-offset-4 gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Volver al inicio de sesión
                            </Link>
                        </div>
                    </CardContent>
                )}
            </Card>
        </div>
    );
};

export default ForgotPassword;
