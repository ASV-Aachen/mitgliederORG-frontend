import { Modal } from "carbon-components-react";


export const ErrorModal = (Message: string) => {
    return (
      <Modal
        open
        passiveModal
        modalHeading={Message}></Modal>
    );
  };