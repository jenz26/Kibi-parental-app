import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { articleSchema } from '../../../schemas/articleSchema';
import InputField from '../../../components/common/InputField';
import Button from '../../../components/common/Button';
import { ARTICLE_CATEGORIES } from '../../../constants';
import { useSelector } from 'react-redux';

const ArticleForm = ({ onSubmit, initialData = null, isLoading = false }) => {
  const { user } = useSelector(state => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(articleSchema),
    defaultValues: initialData || {
      title: '',
      slug: '',
      summary: '',
      content: '',
      imageUrl: '',
      category: '',
      tags: '', // Gestito come stringa separata da virgole
      authorId: user?.id || '',
      authorName: user?.name || 'Team Kibi',
      publishedAt: new Date().toISOString().slice(0,16) // Formato datetime-local
    },
  });

  useEffect(() => {
    if (initialData) {
      const dataToSet = {
        ...initialData,
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : initialData.tags || '',
        publishedAt: initialData.publishedAt ? new Date(initialData.publishedAt).toISOString().slice(0,16) : new Date().toISOString().slice(0,16)
      };
      reset(dataToSet);
    } else {
       // Imposta authorId e authorName se non ci sono initialData (nuovo articolo)
       setValue('authorId', user?.id || '');
       setValue('authorName', user?.name || 'Team Kibi');
       setValue('publishedAt', new Date().toISOString().slice(0,16));
    }
  }, [initialData, reset, user, setValue]);

  const handleFormSubmit = (data) => {
    const processedData = {
      ...data,
      tags: data.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      // Assicurati che publishedAt sia in formato ISO stringa se non già
      publishedAt: new Date(data.publishedAt).toISOString(),
      // Lo slug può essere generato automaticamente lato server se non fornito,
      // o puoi aggiungere una logica qui per generarlo dal titolo
      slug: data.slug || data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
      authorId: user?.id, // Assicura che l'authorId sia quello dell'utente loggato
      authorName: user?.name
    };
    onSubmit(processedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 p-4 bg-white dark:bg-neutral-dark shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">
        {initialData ? 'Modifica Articolo' : 'Crea Nuovo Articolo'}
      </h2>

      <InputField
        label="Titolo"
        name="title"
        register={register}
        error={errors.title}
        placeholder="Titolo dell'articolo"
      />

      <InputField
        label="Slug (URL)"
        name="slug"
        register={register}
        error={errors.slug}
        placeholder="sarà-generato-dal-titolo-se-lasciato-vuoto"
      />

      <InputField
        label="Riassunto"
        name="summary"
        type="textarea"
        register={register}
        error={errors.summary}
        placeholder="Breve riassunto dell'articolo"
      />

      <InputField
        label="Contenuto Completo (Markdown supportato opzionalmente)"
        name="content"
        type="textarea"
        register={register}
        error={errors.content}
        placeholder="Testo completo dell'articolo..."
        inputClassName="min-h-[200px]"
      />

      <InputField
        label="URL Immagine di Copertina"
        name="imageUrl"
        register={register}
        error={errors.imageUrl}
        placeholder="https://esempio.com/immagine.jpg"
      />

      <div>
        <label htmlFor="category" className="block text-sm font-medium leading-6 text-neutral-dark dark:text-neutral-light mb-1">
          Categoria
        </label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              id="category"
              className={`block w-full rounded-md border-0 py-2.5 px-3 shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6 dark:bg-neutral-dark/30 dark:text-neutral-light dark:placeholder-neutral-default/70 dark:focus:ring-primary-light ${
                errors.category ? 'text-red-600 ring-red-500 focus:ring-red-500' : 'text-neutral-dark ring-neutral-default/50 focus:ring-primary dark:ring-neutral-dark/70'
              }`}
            >
              <option value="">Seleziona una categoria</option>
              {ARTICLE_CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          )}
        />
        {errors.category && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.category.message}</p>}
      </div>

      <InputField
        label="Tags (separati da virgola)"
        name="tags"
        register={register}
        error={errors.tags}
        placeholder="es. neonato, sonno, consigli"
      />

      <InputField
        label="Data di Pubblicazione"
        name="publishedAt"
        type="datetime-local"
        register={register}
        error={errors.publishedAt}
      />

       {/* Campi nascosti per autore, gestiti automaticamente */}
       <input type="hidden" {...register("authorId")} />
       <input type="hidden" {...register("authorName")} />


      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={() => reset()} disabled={isLoading}>
          Annulla
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading} disabled={isLoading}>
          {initialData ? 'Salva Modifiche' : 'Crea Articolo'}
        </Button>
      </div>
    </form>
  );
};

export default ArticleForm;