// --- START OF FILE src/components/common/InputField.jsx ---
import clsx from 'clsx';
import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

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
  isPassword = false,
  showPassword,
  onTogglePasswordVisibility,
  ...props
}) => {
  const commonInputClasses = `block w-full rounded-md border-0 py-2.5 px-3 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-neutral-dark/50 text-neutral-dark dark:text-neutral-light placeholder-neutral-default dark:placeholder-neutral-default/70 focus:ring-primary dark:focus:ring-primary-light`;
  // NOTA: Aggiunto bg-white a commonInputClasses per light mode esplicito, e text-neutral-dark

  const errorClasses = `ring-red-500 dark:ring-red-500 placeholder:text-red-400 dark:placeholder:text-red-400/70 focus:ring-red-500 dark:focus:ring-red-500`;
  const normalClasses = `ring-neutral-default/50 dark:ring-neutral-dark/70`; // Rimossi colori testo da qui, gestiti da commonInputClasses

  const actualType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={clsx('mb-4', className)}>
      {label && (
        <label 
          htmlFor={id || name} 
          className={clsx(
            "block text-sm font-medium leading-6 mb-1",
            "text-neutral-dark dark:text-neutral-light", // <<<<<< COLORE LABEL AGGIORNATO PER DARK MODE
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {type === 'textarea' ? (
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
            type={actualType}
            id={id || name}
            name={name}
            placeholder={placeholder}
            {...(register && register(name))}
            className={clsx(
              commonInputClasses,
              error ? errorClasses : normalClasses,
              isPassword && "pr-10",
              inputClassName
            )}
            aria-invalid={!!error}
            {...props}
          />
        )}
        {error && !isPassword && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
        {isPassword && (
          <button
            type="button"
            onClick={onTogglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-default dark:text-gray-400 hover:text-neutral-dark dark:hover:text-neutral-light focus:outline-none"
            aria-label={showPassword ? "Nascondi password" : "Mostra password"}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{error.message}</p>}
    </div>
  );
};

export default InputField;
// --- END OF FILE src/components/common/InputField.jsx ---