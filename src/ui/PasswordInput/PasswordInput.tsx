import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import './PasswordInput.css';

const PasswordInput = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>
>(({ className, ...props }, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={`password-input form__input ${className ?? ''}`}>
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
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
