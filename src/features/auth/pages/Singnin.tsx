import { Eye, EyeOff, Mail } from 'lucide-react';

import { useState } from 'react';
import { Link } from 'react-router';

import StoreCheckLogo from '@/app/assets/images/store-check-logo.png';
import { useAuth } from '@/app/providers/AuthProvider';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { ModeThemeToggle } from '@/shared/layout/ModeThemeToggle';
import { notify } from '@/shared/notifications/toast';

const Signin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login, rememberDevice, setRememberDevice } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await login(email, password);
    } catch (error) {
      notify.error('Error al iniciar sesión');
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
        <img
          src={StoreCheckLogo}
          alt="StoreCheck Logo"
          className="w-32 h-32 object-contain"
        />
      </div>

      <Card className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
          <CardDescription>Ingresa tus datos para acceder a Store-Check.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
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
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary hover:underline underline-offset-4"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 text-muted-foreground hover:text-foreground transition-colors focus:outline-none hover:bg-transparent!"
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberDevice}
                onCheckedChange={(checked) => setRememberDevice(checked as boolean)}
              />
              <Label
                htmlFor="remember"
                className="text-sm font-normal cursor-pointer select-none"
              >
                Recordar este dispositivo
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Iniciando sesión...
                </span>
              ) : (
                'Iniciar sesión'
              )}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              ¿No tienes una cuenta?{' '}
              <a href="#" className="text-primary hover:underline underline-offset-4">
                Solicitar acceso
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Signin;
