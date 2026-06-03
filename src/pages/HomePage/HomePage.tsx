import { useState } from 'react';
import Modal from '../../ui/Modal/Modal.tsx';
import UncontrolledForm from '../../forms/UncontrolledForm/UncontrolledForm.tsx';
import ReactHookForm from '../../forms/ReactHookForm/ReactHookForm.tsx';
import './HomePage.css';

const HomePage = () => {
  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(false);
  const [isRHFOpen, setIsRHFOpen] = useState(false);

  const openUncontrolled = () => {
    setIsUncontrolledOpen(true);
  };
  const openRHF = () => {
    setIsRHFOpen(true);
  };
  const closeUncontrolled = () => {
    setIsUncontrolledOpen(false);
  };
  const closeRHF = () => {
    setIsRHFOpen(false);
  };

  return (
    <div className="page">
      <h1 className="page__title">React Forms</h1>
      <div className="page__buttons-row">
        <button
          type="button"
          onClick={openUncontrolled}
          className="btn--secondary"
        >
          Uncontrolled Form
        </button>
        <button type="button" onClick={openRHF} className="btn--secondary">
          React Hook Form
        </button>
      </div>

      <Modal isOpen={isUncontrolledOpen} onClose={closeUncontrolled}>
        <UncontrolledForm onSuccess={closeUncontrolled} />
      </Modal>

      <Modal isOpen={isRHFOpen} onClose={closeRHF}>
        <ReactHookForm onSuccess={closeRHF} />
      </Modal>
    </div>
  );
};

export default HomePage;
