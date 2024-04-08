import styles from "./DeleteItemForm.module.scss";

interface DeleteItemFormProps {
  deleteItem: () => void;
}

const DeleteItemForm: React.FC<DeleteItemFormProps> = ({ deleteItem }) => {
  return (
    <div className={styles.delete_form} onClick={deleteItem}>
      <h5>Jeste li sigurni da želite izbrisati željeni stadion</h5>
      <button className={styles.delete_form__button}>
        <p>Izbriši</p>
      </button>
    </div>
  );
};

export default DeleteItemForm;
