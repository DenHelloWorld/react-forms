import { type ChangeEvent } from 'react';
import './Checkbox.css';

interface CheckboxProps {
  id?: string;
  name?: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ id, name, checked, onChange }: CheckboxProps) => (
  <label className="checkbox__label" aria-label={name}>
    <input
      id={id}
      name={name}
      type="checkbox"
      className="checkbox__input"
      checked={checked}
      onChange={onChange}
    />
    <svg className="checkbox__icon" role="presentation" aria-hidden="true">
      <use href="/icons.svg#check" />
    </svg>
  </label>
);

export default Checkbox;
