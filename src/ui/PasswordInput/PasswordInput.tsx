import { useState, type InputHTMLAttributes, type Ref } from 'react';
import './PasswordInput.css';

interface PasswordInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  ref?: Ref<HTMLInputElement>;
}

const PasswordInput = ({ className, ref, ...props }: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={`password-input ${className ?? ''}`}>
      <input
        ref={ref}
        type={visible ? 'text' : 'password'}
        className="password-input__field"
        {...props}
      />
      <button
        type="button"
        className="password-input__toggle"
        aria-label={visible ? 'Hide password' : 'Show password'}
        onClick={() => {
          setVisible((v) => !v);
        }}
      >
        <svg
          className="password-input__icon"
          fill="currentColor"
          aria-hidden="true"
        >
          <use href={visible ? '/icons.svg#eye-off' : '/icons.svg#eye'} />
        </svg>
      </button>
    </div>
  );
};

export default PasswordInput;
