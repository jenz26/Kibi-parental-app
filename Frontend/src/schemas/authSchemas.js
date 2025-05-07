import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Formato email non valido').required('L\'email è obbligatoria'),
  password: yup.string().required('La password è obbligatoria'),
});

export const registrationSchema = yup.object().shape({
  name: yup.string().required('Il nome è obbligatorio').min(3, 'Il nome deve contenere almeno 3 caratteri'),
  email: yup.string().email('Formato email non valido').required('L\'email è obbligatoria'),
  password: yup.string().required('La password è obbligatoria').min(6, 'La password deve essere di almeno 6 caratteri'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Le password devono coincidere')
    .required('La conferma password è obbligatoria'),
  consent: yup.boolean().oneOf([true], 'Devi accettare i termini e le condizioni per registrarti').required(),
});