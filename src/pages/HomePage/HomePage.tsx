import { useState } from 'react';
import UncontrolledFormModal from '../../forms/UncontrolledForm/UncontrolledFormModal.tsx';
import ReactHookFormModal from '../../forms/ReactHookForm/ReactHookFormModal.tsx';
import ReactHookFormAdvancedModal from '../../forms/ReactHookFormAdvanced/ReactHookFormAdvancedModal.tsx';
import UncontrolledFormAdvancedModal from '../../forms/UncontrolledFormAdvanced/UncontrolledFormAdvancedModal.tsx';
import SubmissionList from '../../components/SubmissionList/SubmissionList.tsx';
import './HomePage.css';

const HomePage = () => {
  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(false);
  const [isRHFOpen, setIsRHFOpen] = useState(false);
  const [isRHFAdvancedOpen, setIsRHFAdvancedOpen] = useState(false);
  const [isUCAdvancedOpen, setIsUCAdvancedOpen] = useState(false);

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
        <button
          type="button"
          onClick={() => {
            setIsRHFAdvancedOpen(true);
          }}
          className="btn--secondary"
        >
          RHF Advanced
        </button>
        <button
          type="button"
          onClick={() => {
            setIsUCAdvancedOpen(true);
          }}
          className="btn--secondary"
        >
          Uncontrolled Advanced
        </button>
      </div>

      <SubmissionList />

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

      <ReactHookFormAdvancedModal
        isOpen={isRHFAdvancedOpen}
        onClose={() => {
          setIsRHFAdvancedOpen(false);
        }}
      />

      <UncontrolledFormAdvancedModal
        isOpen={isUCAdvancedOpen}
        onClose={() => {
          setIsUCAdvancedOpen(false);
        }}
      />
    </div>
  );
};

export default HomePage;
