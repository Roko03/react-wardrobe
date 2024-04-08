import { useEffect, useRef } from "react";
import styles from "./DialogComponent.module.scss";

interface DialogComponentProps {
  closeDialog: () => void;
  children: React.ReactNode;
}

const DialogComponent: React.FC<DialogComponentProps> = ({
  closeDialog,
  children,
}) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideDialog = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        closeDialog();
      }
    };

    document.addEventListener("mousedown", handleOutsideDialog);

    return () => {
      document.addEventListener("mousedown", handleOutsideDialog);
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div ref={mainRef} className={styles.dialog}>
      <div ref={dialogRef} className={styles.dialog__box}>
        {children}
      </div>
    </div>
  );
};

export default DialogComponent;
