import styles from "./WardrobeListComponent.module.scss";
import WardrobeListItemComponent from "./wardrobe-list-item/WardrobeListItemComponent";

interface WardrobeListComponentProps {
  wardrobes: WardrobeItem[];
  deleteFunction: (id: string) => void;
  editFunction: (id: string) => void;
}

const WardrobeListComponent: React.FC<WardrobeListComponentProps> = ({
  wardrobes,
  deleteFunction,
  editFunction,
}) => {
  return (
    <div className={styles.wardrobe_list}>
      {wardrobes.map((wardrobe) => {
        return (
          <WardrobeListItemComponent
            wardrobe={wardrobe}
            key={wardrobe.id}
            deleteFunction={(id: string) => deleteFunction(id)}
            editFunction={(id: string) => editFunction(id)}
          />
        );
      })}
    </div>
  );
};

export default WardrobeListComponent;
