import { useState } from "react";
import styles from "./WardrobeListItemComponent.module.scss";

interface WardrobeListItemComponentProps {
  wardrobe: WardrobeItem;
}

const WardrobeListItemComponent: React.FC<WardrobeListItemComponentProps> = ({
  wardrobe,
}) => {
  const [isOpen, setISOpen] = useState<boolean>(false);

  return (
    <div className={styles.wardrobe_item} onClick={() => setISOpen(!isOpen)}>
      <div className={styles.wardrobe_item__main}>
        <div className={styles.wardrobe_item__main__image}>
          <img
            src={
              "https://images.unsplash.com/photo-1711861413115-797ee0655214?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={wardrobe.type}
          />
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
    </div>
  );
};

export default WardrobeListItemComponent;
