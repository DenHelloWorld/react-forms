import { useState } from 'react';
import Modal from '../../ui/Modal/Modal.tsx';
import './HomePage.css';

const HomePage = () => {
  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(false);
  const [isRHFOpen, setIsRHFOpen] = useState(false);

  return (
    <div className="page">
      <h1 className="page__title">React Forms</h1>
      <div className="buttons-row">
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

      <Modal
        isOpen={isUncontrolledOpen}
        onClose={() => {
          setIsUncontrolledOpen(false);
        }}
      >
        <p className="text-body">Uncontrolled Form — тестовое содержимое</p>
        <button
          type="button"
          onClick={() => {
            setIsUncontrolledOpen(false);
          }}
          className="btn"
        >
          Закрыть
        </button>
      </Modal>

      <Modal
        isOpen={isRHFOpen}
        onClose={() => {
          setIsRHFOpen(false);
        }}
      >
        <p className="text-body">React Hook Form — тестовое содержимое</p>
        <button
          type="button"
          onClick={() => {
            setIsRHFOpen(false);
          }}
          className="btn"
        >
          Закрыть
        </button>
      </Modal>
    </div>
  );
};

export default HomePage;
