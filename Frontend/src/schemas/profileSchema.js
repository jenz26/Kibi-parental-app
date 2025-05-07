import * as yup from 'yup';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const profileStep1Schema = yup.object().shape({
  parentName: yup.string().required("Il nome del genitore è obbligatorio.").min(3, "Il nome deve contenere almeno 3 caratteri."),
  preferredLanguage: yup.string().required("La lingua è obbligatoria."),
});

export const profileStep2Schema = yup.object().shape({
  childName: yup.string().nullable().max(50, "Il nome del bambino non può superare i 50 caratteri."),
  childBirthDate: yup.date()
    .nullable()
    .transform(value => (value && !isNaN(new Date(value)) ? new Date(value) : null))
    .max(today, "La data di nascita non può essere futura.")
    .typeError("Inserisci una data di nascita valida."),
  dueDate: yup.date()
    .nullable()
    .transform(value => (value && !isNaN(new Date(value)) ? new Date(value) : null))
    .typeError("Inserisci una data presunta del parto valida.")
    .when('childBirthDate', ([childBirthDateValue], schema) => { // Accedi al valore effettivo
        return !childBirthDateValue
          ? schema.min(today, "La data presunta del parto non può essere nel passato.")
          : schema; // Nessuna validazione min se childBirthDate è presente
      }),
}).test(
  'at-least-one-date-if-relevant',
  'Se rilevante, inserisci una data (nascita o presunta).',
  function (value) {
    const { childName, childBirthDate, dueDate } = value;
    // Se non c'è nome bambino e nessuna data, è ok.
    // Se c'è nome bambino, almeno una data deve esserci.
    // Se c'è una data, il nome bambino è opzionale.
    if (childName && !childBirthDate && !dueDate) {
      return this.createError({
        path: 'childBirthDate', // O un messaggio generico o su entrambi i campi data
        message: 'Se inserisci il nome del bambino, fornisci la data di nascita o la data presunta del parto.',
      });
    }
    // Se non c'è data di nascita e la data presunta è nel passato, è un errore (già gestito da .min)
    // Questa validazione complessa può essere semplificata o gestita diversamente se necessario.
    return true;
  }
);


export const profileStep3Schema = yup.object().shape({
  interests: yup.array()
    .of(yup.string())
    .min(1, "Seleziona almeno un interesse.")
    .required("La selezione degli interessi è obbligatoria."),
});