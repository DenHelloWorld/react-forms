import { useState } from 'react';
import ReactHookFormAdvancedModal from '../../forms/ReactHookFormAdvanced/ReactHookFormAdvancedModal.tsx';
import UncontrolledFormAdvancedModal from '../../forms/UncontrolledFormAdvanced/UncontrolledFormAdvancedModal.tsx';
import SubmissionList from '../../components/SubmissionList/SubmissionList.tsx';
import './HomePage.css';

const HomePage = () => {
  const [isRHFOpen, setIsRHFOpen] = useState(false);
  const [isUCOpen, setIsUCOpen] = useState(false);

  return (
    <div className="page container">
      <h1 className="page__title">React Forms</h1>
      <div className="page__buttons-row">
        <button
          type="button"
          onClick={() => {
            setIsUCOpen(true);
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

      <SubmissionList />

      <UncontrolledFormAdvancedModal
        isOpen={isUCOpen}
        onClose={() => {
          setIsUCOpen(false);
        }}
      />

      <ReactHookFormAdvancedModal
        isOpen={isRHFOpen}
        onClose={() => {
          setIsRHFOpen(false);
        }}
      />
    </div>
  );
};

export default HomePage;
