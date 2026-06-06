import { type InputHTMLAttributes } from 'react';
import './Checkbox.css';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const Checkbox = ({ name, ...props }: CheckboxProps) => (
  <label className="checkbox__label" aria-label={name}>
    <input name={name} type="checkbox" className="checkbox__input" {...props} />
    <svg className="checkbox__icon" role="presentation" aria-hidden="true">
      <use href="/icons.svg#check" />
    </svg>
  </label>
);

export default Checkbox;
