import styles from "./ModalComponent.module.scss";
import DialogComponent from "../dialog/DialogComponent";
import { useEffect } from "react";

interface ModalComponentProps {
  isModalOpen: boolean;
  closeDialog: () => void;
  children: React.ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  isModalOpen,
  closeDialog,
  children,
}) => {
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isModalOpen]);

  return (
    <div className={`${styles.modal} ${isModalOpen ? styles.modal_open : ""}`}>
      <DialogComponent closeDialog={closeDialog}>{children}</DialogComponent>
    </div>
  );
};

export default ModalComponent;
