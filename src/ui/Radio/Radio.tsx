import { type InputHTMLAttributes } from 'react';
import './Radio.css';

type RadioProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'className'
>;

const Radio = (props: RadioProps) => (
  <span className="radio__wrapper">
    <input type="radio" className="radio__input" {...props} />
    <span className="radio__circle" />
  </span>
);

export default Radio;
