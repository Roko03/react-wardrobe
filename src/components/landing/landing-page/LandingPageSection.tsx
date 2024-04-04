import { useEffect, useState } from "react";
import WardrobeListComponent from "../wardrobe-list/WardrobeListComponent";
import styles from "./LandingPageSection.module.scss";
import getWardrobes from "../../../lib/getWardrobes";

const LandingPageSection = () => {
  const [wardrobes, setWardrobes] = useState<WardrobeItem[]>([]);

  const fetchWardrobeItems = async () => {
    const response = await getWardrobes();

    setWardrobes(response);
  };

  useEffect(() => {
    fetchWardrobeItems();
  }, []);

  return (
    <section className={styles.landing_section}>
      <h1>Moja garderoba</h1>
      <WardrobeListComponent wardrobes={wardrobes} />
    </section>
  );
};

export default LandingPageSection;
