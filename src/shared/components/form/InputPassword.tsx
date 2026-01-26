import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '../ui/button'
import type { FieldError } from 'react-hook-form'
import type { Input } from '../ui/input'
import InputGeneral from './InputGeneral'

interface InputPasswordProps {
    id: string
    label: string
    error?: FieldError
    className?: string
    inputProps?: React.ComponentProps<typeof Input>
}

const InputPassword = ({
    id,
    label,
    error,
    className,
    inputProps,
}: InputPasswordProps) => {
    const [show, setShow] = useState(false)

    return (
        <InputGeneral
            id={id}
            label={label}
            error={error}
            className={className}
            inputProps={{
                type: show ? 'text' : 'password',
                className: 'pr-10',
                ...inputProps,
            }}
        >
            <Button
                type="button"
                variant="ghost"
                onClick={() => setShow(v => !v)}
                className="h-6 w-6 p-0"
                tabIndex={-1}
            >
                {show ? <Eye size={16} /> : <EyeOff size={16} />}
            </Button>
        </InputGeneral>
    )
}

export default InputPassword
