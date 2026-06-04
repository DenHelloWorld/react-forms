import { useState } from 'react';
import UncontrolledFormModal from '../../forms/UncontrolledForm/UncontrolledFormModal.tsx';
import ReactHookFormModal from '../../forms/ReactHookForm/ReactHookFormModal.tsx';
import './HomePage.css';

const HomePage = () => {
  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(false);
  const [isRHFOpen, setIsRHFOpen] = useState(false);

  return (
    <div className="page">
      <h1 className="page__title">React Forms</h1>
      <div className="page__buttons-row">
        <button
          type="button"
          onClick={() => {
            setIsUncontrolledOpen(true);
          }}
          className="btn--secondary"
        >
          Uncontrolled Form
        </button>
        <button
          type="button"
          onClick={() => {
            setIsRHFOpen(true);
          }}
          className="btn--secondary"
        >
          React Hook Form
        </button>
      </div>

      <UncontrolledFormModal
        isOpen={isUncontrolledOpen}
        onClose={() => {
          setIsUncontrolledOpen(false);
        }}
      />

      <ReactHookFormModal
        isOpen={isRHFOpen}
        onClose={() => {
          setIsRHFOpen(false);
        }}
      />
    </div>
  );
};

export default HomePage;
