import Modal from '../../ui/Modal/Modal.tsx';
import ReactHookFormAdvanced from './ReactHookFormAdvanced.tsx';
import {
  type FormSubmissionPayload,
  useFormStore,
} from '../../store/useFormStore.ts';

type ReactHookFormAdvancedModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ReactHookFormAdvancedModal = ({
  isOpen,
  onClose,
}: ReactHookFormAdvancedModalProps) => {
  const addSubmission = useFormStore((state) => state.addSubmission);

  const handleSubmit = (data: FormSubmissionPayload) => {
    addSubmission(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="React Hook Form (Advanced)">
      <ReactHookFormAdvanced onSubmit={handleSubmit} />
    </Modal>
  );
};

export default ReactHookFormAdvancedModal;
