import styles from "./ModalComponent.module.scss";
import DialogComponent from "../dialog/DialogComponent";

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
  return (
    <div className={`${styles.modal} ${isModalOpen ? styles.modal_open : ""}`}>
      <DialogComponent closeDialog={closeDialog}>
        {variant == "add" ? (
          <h1>Ej kako si</h1>
        ) : variant == "delete" ? (
          <h1>Delete</h1>
        ) : (
          <h1>Uredi</h1>
        )}
      </DialogComponent>
    </div>
  );
};

export default ModalComponent;
