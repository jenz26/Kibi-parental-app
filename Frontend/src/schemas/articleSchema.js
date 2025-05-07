import * as yup from 'yup';

export const articleSchema = yup.object().shape({
  title: yup.string().required('Il titolo è obbligatorio').min(5, 'Il titolo deve essere almeno 5 caratteri'),
  slug: yup.string().matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Lo slug può contenere solo lettere minuscole, numeri e trattini').nullable(), // Opzionale, può essere generato
  summary: yup.string().required('Il riassunto è obbligatorio').min(20, 'Il riassunto deve essere almeno 20 caratteri').max(300, 'Il riassunto non può superare i 300 caratteri'),
  content: yup.string().required('Il contenuto è obbligatorio').min(50, 'Il contenuto deve essere almeno 50 caratteri'),
  imageUrl: yup.string().url('Inserisci un URL valido per l\'immagine').nullable(),
  category: yup.string().required('La categoria è obbligatoria'),
  tags: yup.string().nullable(), // Stringa di tags separati da virgola, può essere vuota
  authorId: yup.string().required(),
  authorName: yup.string().required(),
  publishedAt: yup.date().transform(value => (value ? new Date(value) : null)).required('La data di pubblicazione è obbligatoria').typeError('Inserisci una data valida'),
});