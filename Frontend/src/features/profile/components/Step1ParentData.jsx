// --- START OF FILE src/features/profile/components/Step1ParentData.jsx ---
import InputField from '../../../components/common/InputField';
import { useFormContext } from 'react-hook-form';
import { ChevronDownIcon } from '@heroicons/react/20/solid'; // Per l'icona del select

const Step1ParentData = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-neutral-dark dark:text-neutral-light">
          Informazioni Genitore
        </h3>
        <p className="mt-1 text-sm text-text-muted-light dark:text-gray-300">
          Queste informazioni ci aiutano a personalizzare la tua esperienza.
        </p>
      </div>

      <InputField
        label="Nome del Genitore (come vuoi essere chiamato/a)"
        name="parentName"
        register={register}
        error={errors.parentName}
        placeholder="Es. Mario Rossi"
      />

      <div>
        <label htmlFor="preferredLanguage" className="block text-sm font-medium leading-6 text-neutral-dark dark:text-neutral-light mb-1">
          Lingua Preferita
        </label>
        <div className="relative">
          <select
            id="preferredLanguage"
            {...register("preferredLanguage")}
            className={`block w-full rounded-md border-0 py-2.5 pl-3 pr-10 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 
                        bg-white dark:bg-neutral-dark/50 text-neutral-dark dark:text-neutral-light 
                        placeholder-neutral-default dark:placeholder-neutral-default/70 
                        focus:ring-primary dark:focus:ring-primary-light 
                        ${errors.preferredLanguage 
                            ? 'ring-red-500 dark:ring-red-500 focus:ring-red-500 dark:focus:ring-red-500' 
                            : 'ring-neutral-default/50 dark:ring-neutral-dark/70'
                        } 
                        appearance-none`}
          >
            <option value="it">Italiano</option>
            {/* <option value="en">Inglese</option> */}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-default dark:text-gray-400">
            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
        {errors.preferredLanguage && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.preferredLanguage.message}</p>}
        {/* Commentato come da report:
        <p className="mt-2 text-xs text-text-muted-light dark:text-gray-300">
          L'opzione di cambio lingua è temporaneamente disabilitata in questa demo.
        </p> 
        */}
      </div>
    </div>
  );
};

export default Step1ParentData;
// --- END OF FILE src/features/profile/components/Step1ParentData.jsx ---