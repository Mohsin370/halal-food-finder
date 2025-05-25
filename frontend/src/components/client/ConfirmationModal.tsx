import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";

type ConfirmationModalProps = {
  title: string;
  message: string;
  onConfirm: () => Promise<{ success: boolean; message: string } | undefined>;
  openModal: boolean;
  onClose: () => void;
};

export default function ConfirmationModal({ title, message, onConfirm, openModal, onClose }: ConfirmationModalProps) {
  return (
    <Modal backdrop="blur" isDismissable={false} isKeyboardDismissDisabled={true} isOpen={openModal} onOpenChange={onClose}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          <ModalBody>
            <p>{message}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={async () => {
                await onConfirm();
                onClose();
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
