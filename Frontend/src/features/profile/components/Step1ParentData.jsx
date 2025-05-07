import { useFormContext } from 'react-hook-form';
import InputField from '../../../components/common/InputField';

const Step1ParentData = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium leading-6 text-neutral-dark dark:text-neutral-light">
        Informazioni Genitore
      </h3>
      <p className="text-sm text-neutral-default dark:text-gray-400">
        Queste informazioni ci aiutano a personalizzare la tua esperienza.
      </p>

      <InputField
        label="Nome del Genitore (come vuoi essere chiamato/a)"
        name="parentName"
        register={register}
        error={errors.parentName}
        placeholder="Es. Mario Rossi"
      />

      <div>
        <label htmlFor="preferredLanguage" className="block text-sm font-medium text-neutral-dark dark:text-neutral-light mb-1">
          Lingua Preferita
        </label>
        <select
          id="preferredLanguage"
          {...register("preferredLanguage")}
          className={`block w-full rounded-md border-0 py-2.5 px-3 shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6 dark:bg-neutral-dark/30 dark:text-neutral-light ${
            errors.preferredLanguage ? 'text-red-600 ring-red-500 focus:ring-red-500' : 'text-neutral-dark ring-neutral-default/50 focus:ring-primary dark:ring-neutral-dark/70'
          }`}
        >
          <option value="it">Italiano</option>
          <option value="en">Inglese</option>
          {/* Aggiungere altre lingue se necessario */}
        </select>
        {errors.preferredLanguage && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.preferredLanguage.message}</p>}
      </div>
    </div>
  );
};

export default Step1ParentData;