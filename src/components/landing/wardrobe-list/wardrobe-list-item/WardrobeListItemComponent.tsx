import { useState } from "react";
import styles from "./WardrobeListItemComponent.module.scss";

interface WardrobeListItemComponentProps {
  wardrobe: WardrobeItem;
  deleteFunction: (id: string) => void;
}

const WardrobeListItemComponent: React.FC<WardrobeListItemComponentProps> = ({
  wardrobe,
  deleteFunction,
}) => {
  const [isOpen, setISOpen] = useState<boolean>(false);

  return (
    <div className={styles.wardrobe_item}>
      <div
        className={styles.wardrobe_item__main}
        onClick={() => setISOpen(!isOpen)}
      >
        <div className={styles.wardrobe_item__main__image}>
          <img src={`/${wardrobe.type}.png`} alt={wardrobe.type} />
        </div>
        <div className={styles.wardrobe_item__main__text}>
          <p>
            <span>Vrsta:</span>
            {wardrobe.type}
          </p>
          <p>
            {" "}
            <span>Veličina:</span>
            {wardrobe.size}
          </p>
        </div>
      </div>
      <div
        className={`${styles.wardrobe_item__info} ${
          isOpen
            ? styles.wardrobe_item__info_open
            : styles.wardrobe_item__info_close
        }`}
      >
        <div className={styles.wardrobe_item__info__text}>
          <p>
            <span>Boja:</span>
            {wardrobe.color}
          </p>
          <p>
            <span>Opis:</span>
            {wardrobe.description}
          </p>
        </div>
      </div>
      <div className={styles.wardrobe_item__buttons}>
        <button
          className={`${styles.wardrobe_item__buttons__button} ${styles.trash}`}
          onClick={() => deleteFunction(wardrobe.id)}
        >
          <img src={"/trash.svg"} alt="trash" width={18} height={18} />
          <span>Izbriši</span>
        </button>
        <button
          className={`${styles.wardrobe_item__buttons__button} ${styles.pencil}`}
          onClick={() => console.log("Ej")}
        >
          <img src={"/pencil.svg"} alt="pencil" width={18} height={18} />
          <span>Uredi</span>
        </button>
      </div>
    </div>
  );
};

export default WardrobeListItemComponent;
