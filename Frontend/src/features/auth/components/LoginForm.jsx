import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../../schemas/authSchemas';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../../components/common/InputField';
import Button from '../../../components/common/Button';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap(); // unwrap per catturare l'errore dal thunk
      toast.success('Login effettuato con successo!');
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      // L'errore viene già gestito e mostrato da authSlice/AuthPage
      // Non è necessario un toast duplicato qui se AuthPage già mostra `error`
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        placeholder="••••••••"
        autoComplete="current-password"
      />
      {/* L'errore globale è gestito in AuthPage */}
      <div>
        <Button type="submit" variant="primary" fullWidth isLoading={isLoading} disabled={isLoading}>
          Accedi
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;