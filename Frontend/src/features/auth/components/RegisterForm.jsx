import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from '../../../schemas/authSchemas';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../authSlice';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/common/InputField';
import Button from '../../../components/common/Button';
import toast from 'react-hot-toast';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      toast.success('Registrazione completata! Benvenuto/a!');
      navigate('/dashboard'); // O '/profile' per completare il profilo
    } catch (err) {
      // Errore gestito da AuthPage
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <InputField
        label="Nome Completo"
        name="name"
        register={register}
        error={errors.name}
        placeholder="Mario Rossi"
        autoComplete="name"
      />
      <InputField
        label="Email"
        name="email"
        type="email"
        register={register}
        error={errors.email}
        placeholder="tuamail@esempio.com"
        autoComplete="email"
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        register={register}
        error={errors.password}
        placeholder="Min. 6 caratteri"
        autoComplete="new-password"
      />
      <InputField
        label="Conferma Password"
        name="confirmPassword"
        type="password"
        register={register}
        error={errors.confirmPassword}
        placeholder="Ripeti la password"
        autoComplete="new-password"
      />

      <div className="flex items-start">
        <div className="flex h-6 items-center">
          <input
            id="consent"
            aria-describedby="consent-description"
            type="checkbox"
            {...register("consent")}
            className={`h-4 w-4 rounded border-neutral-default/50 text-primary focus:ring-primary dark:bg-neutral-dark/30 dark:border-neutral-dark/70 ${errors.consent ? 'border-red-500' : ''}`}
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label htmlFor="consent" className="font-medium text-neutral-dark dark:text-neutral-light">
            Consenso
          </label>
          <p id="consent-description" className="text-neutral-default dark:text-gray-400 text-xs">
            Dichiaro di aver letto e accettato i <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Termini di Servizio</a> e la <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
          {errors.consent && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.consent.message}</p>}
        </div>
      </div>

      {/* Errore globale gestito in AuthPage */}
      <div>
        <Button type="submit" variant="primary" fullWidth isLoading={isLoading} disabled={isLoading}>
          Registrati
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;