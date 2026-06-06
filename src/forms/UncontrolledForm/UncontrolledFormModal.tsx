import Modal from '../../ui/Modal/Modal.tsx';
import UncontrolledForm from './UncontrolledForm.tsx';
import {
  type FormSubmissionPayload,
  useFormStore,
} from '../../store/useFormStore.ts';

interface UncontrolledFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UncontrolledFormModal = ({
  isOpen,
  onClose,
}: UncontrolledFormModalProps) => {
  const addSubmission = useFormStore((state) => state.addSubmission);

  const handleSubmit = (data: FormSubmissionPayload) => {
    addSubmission(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Uncontrolled Form">
      <UncontrolledForm onSubmit={handleSubmit} />
    </Modal>
  );
};

export default UncontrolledFormModal;
