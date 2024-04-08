import styles from "./WardrobeFilterListComponents.module.scss";

interface WardrobeFilterListComponentsProps {
  wardrobesType: WardrobeType[];
  clickedFilterElement: string;
  filterWardrobesItems: (data: string) => void;
}

const WardrobeFilterListComponents: React.FC<
  WardrobeFilterListComponentsProps
> = ({ wardrobesType, clickedFilterElement, filterWardrobesItems }) => {
  return (
    <ul className={styles.filter_list}>
      <h2>Filtriraj:</h2>
      <li
        onClick={() => {
          filterWardrobesItems("all");
        }}
        className={
          clickedFilterElement == "all" || clickedFilterElement == ""
            ? styles.filter_list__active
            : ""
        }
      >
        Sve
      </li>
      {wardrobesType.map((type) => {
        return (
          <li
            onClick={() => {
              filterWardrobesItems(type.name);
            }}
            key={type.id}
            className={
              clickedFilterElement == type.name
                ? styles.filter_list__active
                : ""
            }
          >
            {type.name}
          </li>
        );
      })}
    </ul>
  );
};

export default WardrobeFilterListComponents;
