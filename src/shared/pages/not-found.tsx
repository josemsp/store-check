import { Ghost, Home } from 'lucide-react';

import { useNavigate } from 'react-router';

import { Button } from '@/shared/components/ui/button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon & Title */}
        <div className="space-y-2">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Ghost className="h-12 w-12 text-slate-400 dark:text-slate-500" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">404</h1>
          <h2 className="text-2xl font-semibold tracking-tight">Página no encontrada</h2>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-lg">
          Lo sentimos, no pudimos encontrar la página que estás buscando. Puede que haya
          sido movida o eliminada.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="lg" onClick={() => navigate('/')} className="gap-2">
            <Home className="h-4 w-4" />
            Ir al Inicio
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate(-1)}>
            Regresar
          </Button>
        </div>
      </div>
    </div>
  );
}
