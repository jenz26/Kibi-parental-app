// --- START OF FILE src/features/profile/components/Step3Interests.jsx ---
import { useFormContext, Controller } from 'react-hook-form';
import { INTEREST_OPTIONS } from '../../../constants'; // Assicurati che questo file e la costante esistano
import clsx from 'clsx';

const Step3Interests = () => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-neutral-dark dark:text-neutral-light">
          I Tuoi Interessi
        </h3>
        <p className="mt-1 text-sm text-text-muted-light dark:text-gray-300">
          Seleziona gli argomenti che ti interessano di più (minimo 1). Questo ci aiuterà a mostrarti contenuti rilevanti.
        </p>
      </div>

      <Controller
        name="interests"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {INTEREST_OPTIONS.map((option) => {
              const isSelected = field.value?.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    const currentValue = field.value || [];
                    const newValue = isSelected
                      ? currentValue.filter(v => v !== option.value)
                      : [...currentValue, option.value];
                    field.onChange(newValue);
                  }}
                  className={clsx(
                    "p-3 rounded-md border text-sm text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-dark focus-visible:ring-primary", // Aggiunto focus style
                    isSelected
                      ? "bg-primary/20 border-primary dark:bg-primary-dark/30 dark:border-primary-light text-primary dark:text-primary-light font-semibold ring-2 ring-primary dark:ring-primary-light"
                      : "bg-neutral-light/50 hover:bg-neutral-light dark:bg-neutral-dark/50 dark:hover:bg-neutral-dark/60 border-neutral-default/50 dark:border-neutral-dark/70 text-neutral-dark dark:text-neutral-light"
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      />
      {errors.interests && <p className="mt-2 text-xs text-red-500 dark:text-red-400">{errors.interests.message}</p>}
    </div>
  );
};

export default Step3Interests;
// --- END OF FILE src/features/profile/components/Step3Interests.jsx ---