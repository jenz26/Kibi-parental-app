import { CheckIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

const Stepper = ({ steps, currentStep, onStepClick }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center justify-center space-x-2 sm:space-x-4">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative flex-1">
            {stepIdx < steps.length -1 && (
              <div
                className={clsx(
                  "absolute inset-0 top-6 left-calc-50-plus-1rem h-0.5 w-full bg-neutral-light dark:bg-neutral-dark/50",
                  { "bg-primary dark:bg-primary-dark": stepIdx < currentStep }
                )}
                aria-hidden="true"
                style={{ left: 'calc(50% + 1rem)', right: 'calc(-50% + 1rem)'}} // Ensures line connects between circles
              />
            )}
            <button
              type="button"
              onClick={() => onStepClick ? onStepClick(stepIdx) : null}
              disabled={!onStepClick || stepIdx > currentStep} // Disable future steps if onStepClick is for navigation
              className={clsx(
                "group flex flex-col items-center w-full text-center focus:outline-none",
                (!onStepClick || stepIdx > currentStep) ? "cursor-default" : "cursor-pointer"
              )}
            >
              <span className="flex items-center">
                <span
                  className={clsx(
                    "relative flex h-10 w-10 items-center justify-center rounded-full border-2",
                    stepIdx <= currentStep ? "border-primary dark:border-primary-light" : "border-neutral-default dark:border-neutral-dark/70 group-hover:border-neutral-dark/50 dark:group-hover:border-neutral-dark",
                    stepIdx < currentStep ? "bg-primary dark:bg-primary-light" : "bg-background-light dark:bg-neutral-dark"
                  )}
                >
                  {stepIdx < currentStep ? (
                    <CheckIcon className="h-6 w-6 text-white dark:text-neutral-dark" aria-hidden="true" />
                  ) : (
                    <span className={clsx(
                      "h-2.5 w-2.5 rounded-full",
                      stepIdx === currentStep ? "bg-primary dark:bg-primary-light" : "bg-transparent group-hover:bg-neutral-default/50 dark:group-hover:bg-neutral-dark/70"
                    )} />
                  )}
                </span>
              </span>
              <span className={clsx(
                "mt-2 text-xs sm:text-sm font-medium",
                stepIdx === currentStep ? "text-primary dark:text-primary-light" : "text-neutral-default dark:text-neutral-light",
                stepIdx < currentStep && "text-neutral-dark dark:text-neutral-light"
              )}>
                {step.name}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Stepper;