import { type ReactNode } from 'react';

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

const FormField = ({
  id,
  label,
  error,
  children,
  className,
}: FormFieldProps) => (
  <div className={`form__field${className ? ` ${className}` : ''}`}>
    <label htmlFor={id} className="form__label">
      {label}
    </label>
    {children}
    <p
      id={`${id}-error`}
      className={`form__error${error ? ' form__error--visible' : ''}`}
      role="alert"
    >
      {error}
    </p>
  </div>
);

export default FormField;
