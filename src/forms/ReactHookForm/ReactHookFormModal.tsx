import Modal from '../../ui/Modal/Modal.tsx';
import ReactHookForm from './ReactHookForm.tsx';
import {
  type FormSubmissionPayload,
  useFormStore,
} from '../../store/useFormStore.ts';

interface ReactHookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReactHookFormModal = ({ isOpen, onClose }: ReactHookFormModalProps) => {
  const addSubmission = useFormStore((state) => state.addSubmission);

  const handleSubmit = (data: FormSubmissionPayload) => {
    addSubmission(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="React Hook Form">
      <ReactHookForm onSubmit={handleSubmit} />
    </Modal>
  );
};

export default ReactHookFormModal;
