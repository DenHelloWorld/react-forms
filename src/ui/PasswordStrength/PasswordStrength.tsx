import { type PasswordStrengthResult } from '../../hooks/usePasswordStrength/usePasswordStrength.ts';
import './PasswordStrength.css';

const REQUIREMENTS: { label: string; key: keyof PasswordStrengthResult }[] = [
  { label: 'At least 8 characters', key: 'hasCount' },
  { label: '1 uppercase letter', key: 'hasUpper' },
  { label: '1 lowercase letter', key: 'hasLower' },
  { label: '1 number', key: 'hasNumber' },
  { label: '1 special character', key: 'hasSpecial' },
];

interface PasswordStrengthProps {
  strength: PasswordStrengthResult;
}

const PasswordStrength = ({ strength }: PasswordStrengthProps) => {
  return (
    <div className="password-strength">
      <p className="password-strength__title">Password Strength</p>
      <ul className="password-strength__list">
        {REQUIREMENTS.map((req) => (
          <li key={req.label} className="password-strength__item">
            <svg
              className={`password-strength__icon${strength[req.key] ? ' password-strength__icon--met' : ''}`}
              fill="currentColor"
              aria-hidden="true"
            >
              <use
                href={
                  strength[req.key] ? '/icons.svg#check' : '/icons.svg#close'
                }
              />
            </svg>
            <span
              className={`password-strength__label${strength[req.key] ? ' password-strength__label--met' : ''}`}
            >
              {req.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordStrength;
