import { Check } from 'lucide-react';

import { type PropsWithChildren, createContext, useContext } from 'react';

import { cn } from '@/shared/lib/utils';

type StepperContextType = {
  currentStep: number;
  completedSteps: number[];
  totalSteps: number;
};

const StepperContext = createContext<StepperContextType | null>(null);

function useStepperContext() {
  const context = useContext(StepperContext);

  if (!context) {
    throw new Error('Stepper components must be used within <Stepper />');
  }

  return context;
}

interface StepperProps extends PropsWithChildren {
  currentStep: number;
  completedSteps?: number[];
  totalSteps: number;
  className?: string;
}

export function Stepper({
  children,
  currentStep,
  completedSteps = [],
  totalSteps,
  className,
}: StepperProps) {
  return (
    <StepperContext.Provider
      value={{
        currentStep,
        completedSteps,
        totalSteps,
      }}
    >
      <nav
        aria-label="Progreso del onboarding"
        className={cn('flex flex-col items-center gap-2 md:gap-4', className)}
      >
        {children}
      </nav>
    </StepperContext.Provider>
  );
}

export function StepperList({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <ol className={cn('flex items-center gap-2 md:gap-4', className)}>{children}</ol>
  );
}

interface StepItemProps {
  index: number;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function StepperItem({ index, label, onClick, disabled }: StepItemProps) {
  const { currentStep, completedSteps, totalSteps } = useStepperContext();

  const isCurrent = currentStep === index;

  const isCompleted = completedSteps.includes(index);

  const isLast = index === totalSteps - 1;

  return (
    <li className="flex w-auto">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-current={isCurrent ? 'step' : undefined}
        className={cn(
          'group flex flex-col items-center gap-2 transition-all',
          disabled && 'pointer-events-none opacity-50',
        )}
      >
        <StepIndicator step={index + 1} isCurrent={isCurrent} isCompleted={isCompleted} />

        <span className="text-muted-foreground text-center text-xs font-medium md:text-sm">
          {label}
        </span>
      </button>

      {!isLast && (
        <div className="flex pt-6 w-full">
          <StepperConnector completed={isCompleted} />
        </div>
      )}
    </li>
  );
}

function StepIndicator({
  step,
  isCurrent,
  isCompleted,
}: {
  step: number;
  isCurrent: boolean;
  isCompleted: boolean;
}) {
  return (
    <div
      className={cn(
        'relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all duration-300 md:h-12 md:w-12',

        isCurrent &&
          'scale-110 bg-linear-to-br from-blue-600 to-blue-700 text-white shadow-lg',

        isCompleted &&
          'bg-linear-to-br from-emerald-500 to-emerald-600 text-white shadow-md',

        !isCurrent &&
          !isCompleted &&
          'bg-slate-200 text-slate-600 group-hover:bg-slate-300',
      )}
    >
      {isCompleted ? (
        <Check size={18} />
      ) : (
        <span className="text-sm font-bold">{step}</span>
      )}
    </div>
  );
}

function StepperConnector({ completed }: { completed: boolean }) {
  return (
    <div
      className={cn(
        'mx-2 h-1 w-20 rounded-full transition-all duration-300',

        completed ? 'bg-linear-to-r from-emerald-500 to-emerald-400' : 'bg-slate-200',
      )}
    />
  );
}

interface ProgressBarProps {
  className?: string;
}

export function StepperProgress({ className }: ProgressBarProps) {
  const { currentStep, totalSteps } = useStepperContext();

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <span className="text-muted-foreground text-sm font-medium">
        Paso {currentStep + 1} de {totalSteps}
      </span>

      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}

// import { Check } from 'lucide-react';

// import { cn } from '@/shared/lib/utils';

// export interface BaseStepProps {
//   children?: React.ReactNode;
//   className?: string;
// }

// export const Stepper = ({ children, className }: BaseStepProps) => {
//   return (
//     <nav aria-label="Progreso del onboarding" className={className}>
//       {children}
//     </nav>
//   );
// };

// export const StepperList = ({ children, className }: BaseStepProps) => {
//   return (
//     <ol className={cn('flex items-center gap-2 md:gap-4', className)}>{children}</ol>
//   );
// };

// export interface StepListItemProps extends BaseStepProps {
//   index: number;
//   ariaLabel?: string;
//   ariaCurrent?: 'step' | undefined;
//   disabled?: boolean;
//   onClick?: () => void;
//   isCompleted: boolean;
//   totalSteps: number;
//   completedSteps: number[];
//   isLastStep: boolean;
// }

// export const StepListItem = ({
//   index,
//   children,
//   ariaLabel,
//   ariaCurrent,
//   className,
//   disabled,
//   onClick,
//   isCompleted,
//   totalSteps,
//   completedSteps,
//   isLastStep,
// }: StepListItemProps) => {
//   console.log('isLastStep', isLastStep);
//   return (
//     <li className="flex items-center flex-1">
//       <button
//         aria-label={ariaLabel}
//         aria-current={ariaCurrent}
//         className={className}
//         onClick={onClick}
//         disabled={disabled}
//       >
//         <StepIndicator
//           label={String((index ?? 0) + 1)}
//           isCurrentStep={ariaCurrent === 'step'}
//           isCompleted={isCompleted}
//         />
//         {children}
//       </button>
//       {!isLastStep && (
//         <StepperConnectorLine
//           isCompleted={isCompleted}
//           totalSteps={totalSteps}
//           completedSteps={completedSteps}
//         />
//       )}
//     </li>
//   );
// };

// const StepIndicator = ({
//   label,
//   isCurrentStep,
//   isCompleted,
// }: {
//   label?: string;
//   isCurrentStep: boolean;
//   isCompleted: boolean;
// }) => {
//   return (
//     <div
//       className={cn(
//         'w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 relative z-10',
//         isCurrentStep
//           ? 'bg-linear-to-br from-blue-600 to-blue-700 text-white shadow-lg scale-110'
//           : isCompleted
//             ? 'bg-linear-to-br from-emerald-500 to-emerald-600 text-white shadow-md'
//             : 'bg-slate-200 text-slate-600 group-hover:bg-slate-300 group-disabled:opacity-50',
//       )}
//     >
//       {isCompleted ? (
//         <Check size={20} className="animate-pulse" />
//       ) : (
//         <span className="text-sm font-bold">{label}</span>
//       )}
//     </div>
//   );
// };

// export const StepListItemLabel = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <span
//       className={cn(
//         'text-xs md:text-sm font-medium text-slate-600 text-center line-clamp-2 group-disabled:opacity-50',
//         className,
//       )}
//     >
//       {children}
//     </span>
//   );
// };

// interface StepperProgressTextBarProps {
//   currentStep: number;
//   totalSteps: number;
// }

// export const StepperProgressTextBar = ({
//   currentStep,
//   totalSteps,
// }: StepperProgressTextBarProps) => {
//   return (
//     <div className="flex justify-between items-center gap-4">
//       <span className="text-sm font-medium text-slate-600">
//         Paso {currentStep + 1} de {totalSteps}
//       </span>
//       <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
//         <div
//           className="h-full bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 transition-all duration-500 ease-out"
//           style={{
//             width: `${((currentStep + 1) / totalSteps) * 100}%`,
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export const StepperConnectorLine = ({
//   isCompleted,
//   totalSteps,
//   completedSteps,
// }: {
//   isCompleted: boolean;
//   totalSteps: number;
//   completedSteps: number[];
// }) => {
//   return (
//     <div
//       className={cn(
//         'flex-1 h-1 rounded-full transition-all duration-300',
//         isCompleted ? 'bg-linear-to-r from-emerald-500 to-emerald-400' : 'bg-slate-200',
//       )}
//       aria-valuenow={completedSteps.length}
//       aria-valuemin={0}
//       aria-valuemax={totalSteps}
//     />
//   );
// };
