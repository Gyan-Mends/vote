import React, { ReactNode } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Button } from "@nextui-org/react";

interface CreateModalProps {
  children: (onClose: () => void) => ReactNode;
  modalTitle: string;
  name:string;
  className?:string;
}

export default function CreateModal({ children, modalTitle,name,className }: CreateModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary">{name}</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent className={className}>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{modalTitle}</ModalHeader>
              <ModalBody>
                {children(onClose)}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
