import { useState } from "react";
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
  const [isListItemOpen, setIsListItemOpen] = useState<string>("");

  return (
    <div className={styles.wardrobe_list}>
      {wardrobes.map((wardrobe) => {
        return (
          <WardrobeListItemComponent
            wardrobe={wardrobe}
            key={wardrobe.id}
            deleteFunction={(id: string) => deleteFunction(id)}
            editFunction={(id: string) => editFunction(id)}
            isListItemOpen={isListItemOpen}
            setIsListItemOpen={(data: string) => setIsListItemOpen(data)}
          />
        );
      })}
    </div>
  );
};

export default WardrobeListComponent;
