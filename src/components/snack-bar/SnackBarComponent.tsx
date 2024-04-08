import { useEffect } from "react";
import styles from "./SnackBarComponent.module.scss";

interface SnackBarComponentProps {
  variant: "error" | "success" | null;
  isSnackBarOpen: boolean;
  closeSnackBar: () => void;
  message: string | null;
}

const SnackBarComponent: React.FC<SnackBarComponentProps> = ({
  variant,
  isSnackBarOpen,
  closeSnackBar,
  message,
}) => {
  let variantStyle;

  switch (variant) {
    case "error":
      variantStyle = styles.snackbar__error;
      break;
    case "success":
      variantStyle = styles.snackbar__success;
      break;
    case null:
      variantStyle = "";
  }

  useEffect(() => {
    if (isSnackBarOpen) {
      setTimeout(() => {
        closeSnackBar();
      }, 3000);
    }
  }, [isSnackBarOpen]);

  return (
    <div
      className={`${styles.snackbar} ${
        isSnackBarOpen ? styles.snackbar__open : ""
      } ${variantStyle}`}
      onClick={() => closeSnackBar()}
    >
      <p>{message}</p>
    </div>
  );
};

export default SnackBarComponent;
