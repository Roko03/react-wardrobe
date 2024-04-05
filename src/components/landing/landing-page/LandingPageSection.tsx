import { useEffect, useState } from "react";
import WardrobeListComponent from "../wardrobe-list/WardrobeListComponent";
import styles from "./LandingPageSection.module.scss";
import getWardrobes from "../../../lib/getWardrobes";
import ModalComponent from "../../modal/ModalComponent";

const LandingPageSection = () => {
  const [wardrobes, setWardrobes] = useState<WardrobeItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [modalType, setModalType] = useState<"add" | "delete" | "edit">("add");

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
      <button
        onClick={() => {
          setModalType("add");
          setIsModalOpen(true);
        }}
      >
        Dodaj
      </button>
      <button
        onClick={() => {
          setModalType("delete");
          setIsModalOpen(true);
        }}
      >
        Izbrisi
      </button>
      <WardrobeListComponent wardrobes={wardrobes} />
      <ModalComponent
        isModalOpen={isModalOpen}
        variant={modalType}
        closeDialog={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default LandingPageSection;
