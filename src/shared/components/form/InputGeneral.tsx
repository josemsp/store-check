import type { FieldError } from 'react-hook-form';

import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface InputGeneralProps {
  id: string;
  label?: string;
  error?: FieldError;
  className?: string;
  inputProps?: React.ComponentProps<typeof Input>;
  children?: React.ReactNode;
}

const InputGeneral = ({
  id,
  label,
  error,
  className,
  inputProps,
  children,
}: InputGeneralProps) => {
  return (
    <div className={className}>
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        <Input id={id} aria-invalid={!!error} {...inputProps} />

        {children && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">{children}</div>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
};

export default InputGeneral;
