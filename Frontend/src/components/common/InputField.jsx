// --- START OF FILE src/components/common/InputField.jsx ---
import clsx from 'clsx';
import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; // <<<< AGGIUNTE EyeIcon, EyeSlashIcon

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
  isPassword = false, // <<<< NUOVA PROP: true se questo è un campo password di base
  showPassword,       // <<<< NUOVA PROP: lo stato di visibilità (da LoginForm)
  onTogglePasswordVisibility, // <<<< NUOVA PROP: la funzione per cambiare lo stato
  ...props
}) => {
  const commonInputClasses = `block w-full rounded-md border-0 py-2.5 px-3 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-neutral-dark/30 dark:text-neutral-light dark:placeholder-neutral-default/70 dark:focus:ring-primary-light`;

  const errorClasses = `text-red-600 ring-red-500 placeholder:text-red-400 focus:ring-red-500 dark:ring-red-500 dark:focus:ring-red-500`;
  const normalClasses = `text-neutral-dark ring-neutral-default/50 focus:ring-primary dark:ring-neutral-dark/70 dark:focus:ring-primary-light`;

  // Determina il tipo di input effettivo
  const actualType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={clsx('mb-4', className)}>
      {label && (
        <label htmlFor={id || name} className={clsx("block text-sm font-medium leading-6 text-neutral-dark dark:text-neutral-light mb-1", labelClassName)}>
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
            type={actualType} // <<<< USA actualType
            id={id || name}
            name={name}
            placeholder={placeholder}
            {...(register && register(name))}
            className={clsx(
              commonInputClasses,
              error ? errorClasses : normalClasses,
              isPassword && "pr-10", // Aggiungi padding a destra se è un campo password per far spazio all'icona
              inputClassName
            )}
            aria-invalid={!!error}
            {...props}
          />
        )}
        {/* Icona di errore */}
        {error && !isPassword && ( // Non mostrare l'icona di errore se c'è già l'icona occhio
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
        {/* Pulsante Mostra/Nascondi Password */}
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