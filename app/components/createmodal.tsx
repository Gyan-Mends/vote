import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Form, useNavigation} from "@remix-run/react";
import { useEffect } from "react";

const CreateModal = ({
  isOpen,
  onOpenChange,
  onCloseModal,
  title,
  children,
  size,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onCloseModal: () => void;
  title: string;
  actionText: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}) => {

  // state to handle loading
  const navigation = useNavigation();

 

  useEffect(() => {
    if (navigation.state === "idle") {
      onCloseModal();
    }
  }, [navigation, onCloseModal]);

  return (
    <Modal
      size={size}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onCloseModal}
      backdrop="opaque"
      classNames={{
        base: "rounded-3xl",
      }}
      motionProps={{
        variants: {
          enter: {
            scale: [1, 0.9],
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            scale: [0.9, 1],
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent className="">
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 ">{title}</ModalHeader>
            <ModalBody>
              <Form
                method={"POST"}
                id="create-record-form"
                encType="multipart/form-data"
              >
                {children}
              </Form>
            </ModalBody>
            <ModalFooter>
              
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateModal;
