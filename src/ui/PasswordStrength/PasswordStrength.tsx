import { type PasswordRuleResult } from '../../hooks/usePasswordStrength/usePasswordStrength.ts';
import './PasswordStrength.css';

interface PasswordStrengthProps {
  rules: PasswordRuleResult[];
}

const PasswordStrength = ({ rules }: PasswordStrengthProps) => {
  return (
    <div className="password-strength">
      <p className="password-strength__title">Password Strength</p>
      <ul className="password-strength__list">
        {rules.map((rule) => (
          <li key={rule.key} className="password-strength__item">
            <svg
              className={`password-strength__icon${rule.met ? ' password-strength__icon--met' : ''}`}
              fill="currentColor"
              aria-hidden="true"
            >
              <use href={rule.met ? '/icons.svg#check' : '/icons.svg#close'} />
            </svg>
            <span
              className={`password-strength__label${rule.met ? ' password-strength__label--met' : ''}`}
            >
              {rule.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordStrength;
