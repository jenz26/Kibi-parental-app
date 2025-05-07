import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom'; // Per distinguere dal 'Link'

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  isLoading = false,
  className = '',
  fullWidth = false,
  iconLeft,
  iconRight,
  as, // Prop 'as' per specificare il componente
  to, // Prop 'to' se 'as' è un Link
  ...props
}) => {
  const baseStyles = 'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-all duration-150 ease-in-out inline-flex items-center justify-center';

  const variantStyles = {
    primary: 'bg-primary hover:bg-primary-dark text-white focus:ring-primary-dark disabled:bg-primary/50',
    secondary: 'bg-secondary hover:bg-secondary-dark text-white focus:ring-secondary-dark disabled:bg-secondary/50',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-700 disabled:bg-red-600/50',
    outline: 'border border-primary text-primary hover:bg-primary/10 dark:border-primary-light dark:text-primary-light dark:hover:bg-primary-light/10 focus:ring-primary disabled:border-neutral/50 disabled:text-neutral/50',
    ghost: 'bg-transparent hover:bg-neutral-light dark:hover:bg-neutral-dark/50 text-neutral-dark dark:text-neutral-light focus:ring-primary disabled:text-neutral/50',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const commonProps = {
    onClick,
    disabled: disabled || isLoading,
    className: clsx(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && 'w-full',
      (disabled || isLoading) && 'cursor-not-allowed',
      className
    ),
    ...props,
  };

  const content = (
    <>
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          {iconLeft && <span className="mr-2">{iconLeft}</span>}
          {children}
          {iconRight && <span className="ml-2">{iconRight}</span>}
        </>
      )}
    </>
  );

  // Se 'as' è Link, usiamo RouterLink e passiamo 'to'
  if (as === RouterLink) {
    return (
      <RouterLink to={to || '#'} {...commonProps}>
        {content}
      </RouterLink>
    );
  }

  // Se 'as' è un altro componente specificato (es. 'div')
  if (typeof as === 'string' && as !== 'button') {
    const CustomComponent = as;
    return (
        <CustomComponent {...commonProps}>
            {content}
        </CustomComponent>
    );
  }


  // Altrimenti, usiamo motion.button di default
  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.95 }}
      {...commonProps}
    >
      {content}
    </motion.button>
  );
};

export default Button;