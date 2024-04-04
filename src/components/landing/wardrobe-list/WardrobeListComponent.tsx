import styles from "./WardrobeListComponent.module.scss";
import WardrobeListItemComponent from "./wardrobe-list-item/WardrobeListItemComponent";

interface WardrobeListComponentProps {
  wardrobes: WardrobeItem[];
}

const WardrobeListComponent: React.FC<WardrobeListComponentProps> = ({
  wardrobes,
}) => {
  return (
    <div className={styles.wardrobe_list}>
      {wardrobes.map((wardrobe) => {
        return (
          <WardrobeListItemComponent wardrobe={wardrobe} key={wardrobe.id} />
        );
      })}
    </div>
  );
};

export default WardrobeListComponent;
