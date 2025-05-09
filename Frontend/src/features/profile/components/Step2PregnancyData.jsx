// --- START OF FILE src/features/profile/components/Step2PregnancyData.jsx ---
import { useFormContext } from 'react-hook-form';
import InputField from '../../../components/common/InputField';

const Step2PregnancyData = () => {
  const { register, formState: { errors }, watch } = useFormContext();

  const childBirthDate = watch('childBirthDate');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-neutral-dark dark:text-neutral-light">
          Informazioni Gravidanza o Bambino/a
        </h3>
        <p className="mt-1 text-sm text-text-muted-light dark:text-gray-300">
          Compila i campi rilevanti per la tua situazione attuale. Puoi lasciare vuoti i campi non pertinenti.
        </p>
      </div>

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
      />

      {!childBirthDate && (
        <InputField
          label="Data Presunta del Parto (se in attesa)"
          name="dueDate"
          type="date"
          register={register}
          error={errors.dueDate}
        />
      )}

       <p className="text-xs text-text-muted-light dark:text-gray-300 mt-1">
        Nota: Se inserisci la data di nascita, la data presunta del parto sarà ignorata.
      </p>
    </div>
  );
};

export default Step2PregnancyData;
// --- END OF FILE src/features/profile/components/Step2PregnancyData.jsx ---