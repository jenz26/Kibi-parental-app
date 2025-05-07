import { useFormContext } from 'react-hook-form';
import InputField from '../../../components/common/InputField';

const Step2PregnancyData = () => {
  const { register, formState: { errors }, watch } = useFormContext();

  const childBirthDate = watch('childBirthDate');

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium leading-6 text-neutral-dark dark:text-neutral-light">
        Informazioni Gravidanza o Bambino/a
      </h3>
      <p className="text-sm text-neutral-default dark:text-gray-400">
        Compila i campi rilevanti per la tua situazione attuale. Puoi lasciare vuoti i campi non pertinenti.
      </p>

      <InputField
        label="Nome del Bambino/a (se già nato/a o scelto)"
        name="childName"
        register={register}
        error={errors.childName}
        placeholder="Es. Sofia, Leo (opzionale)"
      />

      <InputField
        label="Data di Nascita del Bambino/a"
        name="childBirthDate"
        type="date"
        register={register}
        error={errors.childBirthDate}
        // Per il max date, yup si occupa della validazione
      />

      {!childBirthDate && (
        <InputField
          label="Data Presunta del Parto (se in attesa)"
          name="dueDate"
          type="date"
          register={register}
          error={errors.dueDate}
          // Per il min date, yup si occupa della validazione
        />
      )}

       <p className="text-xs text-neutral-default dark:text-gray-400 mt-1">
        Nota: Se inserisci la data di nascita, la data presunta del parto sarà ignorata.
      </p>
    </div>
  );
};

export default Step2PregnancyData;