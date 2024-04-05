import styles from "./ModalComponent.module.scss";
import DialogComponent from "../dialog/DialogComponent";
import AddItemForm from "../landing/add-item-form/AddItemForm";
import { useEffect } from "react";

interface ModalComponentProps {
  isModalOpen: boolean;
  variant: "add" | "delete" | "edit";
  closeDialog: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  isModalOpen,
  variant,
  closeDialog,
}) => {
  const formVariant = () => {
    switch (variant) {
      case "add":
        return <AddItemForm />;
      case "delete":
        return <h1>Delete</h1>;
      case "edit":
        return <h1>Edit</h1>;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isModalOpen]);

  return (
    <div className={`${styles.modal} ${isModalOpen ? styles.modal_open : ""}`}>
      <DialogComponent closeDialog={closeDialog}>
        {formVariant()}
      </DialogComponent>
    </div>
  );
};

export default ModalComponent;
