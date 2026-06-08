import { type InputHTMLAttributes } from 'react';
import './Radio.css';

const Radio = (
  props: Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'>
) => (
  <span className="radio__wrapper">
    <input type="radio" className="radio__input" {...props} />
    <span className="radio__circle" />
  </span>
);

export default Radio;
