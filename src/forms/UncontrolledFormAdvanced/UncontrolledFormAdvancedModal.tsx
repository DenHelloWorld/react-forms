import Modal from '../../ui/Modal/Modal.tsx';
import UncontrolledFormAdvanced from './UncontrolledFormAdvanced.tsx';
import {
  type FormSubmissionPayload,
  useFormStore,
} from '../../store/useFormStore.ts';

type UncontrolledFormAdvancedModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const UncontrolledFormAdvancedModal = ({
  isOpen,
  onClose,
}: UncontrolledFormAdvancedModalProps) => {
  const addSubmission = useFormStore((state) => state.addSubmission);

  const handleSubmit = (data: FormSubmissionPayload) => {
    addSubmission(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Uncontrolled Form (Advanced)"
    >
      <UncontrolledFormAdvanced onSubmit={handleSubmit} />
    </Modal>
  );
};

export default UncontrolledFormAdvancedModal;
