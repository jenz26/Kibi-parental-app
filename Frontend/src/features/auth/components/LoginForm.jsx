// --- START OF FILE src/features/auth/components/LoginForm.jsx (con occhio custom e link password dimenticata) ---
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../../schemas/authSchemas';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../authSlice';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // <<<<<< Assicurati che Link sia importato
import InputField from '../../../components/common/InputField';
import Button from '../../../components/common/Button';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading } = useSelector((state) => state.auth);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      toast.success('Login effettuato con successo!');
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      // Errore gestito da AuthPage
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
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
        autoFocus
      />
      <div> {/* Contenitore per Password e Link Password Dimenticata */}
        <InputField
          label="Password"
          name="password"
          type="password" // Il tipo base è password
          register={register}
          error={errors.password}
          placeholder="••••••••"
          autoComplete="current-password"
          isPassword={true} 
          showPassword={isPasswordVisible} 
          onTogglePasswordVisibility={togglePasswordVisibility}
          className="!mb-2" // Riduci il margine inferiore se il link è subito sotto
        />
        <div className="text-right mt-1"> {/* <<<<<<<<<< LINK PASSWORD DIMENTICATA AGGIUNTO QUI */}
          <Link
            to="/forgot-password" 
            className="text-xs font-medium text-primary hover:underline dark:text-primary-light focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
          >
            Password dimenticata?
          </Link>
        </div>
      </div>
      
      <div>
        <Button type="submit" variant="primary" fullWidth isLoading={isLoading} disabled={isLoading}>
          Accedi
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
// --- END OF FILE src/features/auth/components/LoginForm.jsx ---