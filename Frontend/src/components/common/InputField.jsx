import clsx from 'clsx';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

const InputField = ({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  register,
  error,
  className = '',
  inputClassName = '',
  labelClassName = '',

  ...props
}) => {
  const commonInputClasses = `block w-full rounded-md border-0 py-2.5 px-3 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-neutral-dark/30 dark:text-neutral-light dark:placeholder-neutral-default/70 dark:focus:ring-primary-light`;

  const errorClasses = `text-red-600 ring-red-500 placeholder:text-red-400 focus:ring-red-500 dark:ring-red-500 dark:focus:ring-red-500`;
  const normalClasses = `text-neutral-dark ring-neutral-default/50 focus:ring-primary dark:ring-neutral-dark/70 dark:focus:ring-primary-light`;


  return (
    <div className={clsx('mb-4', className)}>
      {label && (
        <label htmlFor={id || name} className={clsx("block text-sm font-medium leading-6 text-neutral-dark dark:text-neutral-light mb-1", labelClassName)}>
          {label}
        </label>
      )}
      <div className="relative">
        { type === 'textarea' ? (
            <textarea
                id={id || name}
                name={name}
                placeholder={placeholder}
                rows={4}
                {...(register && register(name))}
                className={clsx(commonInputClasses, error ? errorClasses : normalClasses, inputClassName)}
                aria-invalid={!!error}
                {...props}
            />
        ) : (
            <input
                type={type}
                id={id || name}
                name={name}
                placeholder={placeholder}
                {...(register && register(name))}
                className={clsx(commonInputClasses, error ? errorClasses : normalClasses, inputClassName)}
                aria-invalid={!!error}
                {...props}
            />
        )}
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{error.message}</p>}
    </div>
  );
};

export default InputField;