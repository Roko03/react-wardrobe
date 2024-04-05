import { useEffect, useState } from "react";
import WardrobeListComponent from "../wardrobe-list/WardrobeListComponent";
import styles from "./LandingPageSection.module.scss";
import getWardrobes from "../../../lib/getWardrobes";
import ModalComponent from "../../modal/ModalComponent";
import getWardrobesType from "../../../lib/getWardrobesType";
import AddItemForm from "../add-item-form/AddItemForm";
import SnackBarComponent from "../../snack-bar/SnackBarComponent";

const LandingPageSection = () => {
  const [wardrobes, setWardrobes] = useState<WardrobeItem[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"add" | "delete" | "edit">("add");

  const [wardrobesType, setWardrobesType] = useState<WardrobeType[]>([]);

  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string | null>(null);
  const [snackBarVariant, setSnackBarVariant] = useState<
    "success" | "error" | null
  >(null);

  const fetchWardrobeItems = async () => {
    const response = await getWardrobes();

    setWardrobes(response);
  };

  const fetchWardrobesType = async () => {
    const response = await getWardrobesType();

    setWardrobesType(response);
  };

  const formVariant = () => {
    switch (modalType) {
      case "add":
        return (
          <AddItemForm
            fetchWardrobeItems={() => fetchWardrobeItems()}
            wardrobesType={wardrobesType}
            openSuccessSnackBar={() => {
              setIsSnackBarOpen(true);
              setSnackBarVariant("success");
            }}
            openErrorSnackBar={() => {
              setIsSnackBarOpen(true);
              setSnackBarVariant("error");
            }}
            setSnackBarMessage={(message: string) =>
              setSnackBarMessage(message)
            }
            closeModal={() => setIsModalOpen(false)}
          />
        );
      case "delete":
        return <h1>Delete</h1>;
      case "edit":
        return <h1>Edit</h1>;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    fetchWardrobeItems();
    fetchWardrobesType();
  }, []);

  return (
    <section className={styles.landing_section}>
      <h1>Moja garderoba</h1>
      <button
        onClick={() => {
          setModalType("add");
          setIsModalOpen(true);
        }}
        className={styles.landing_section__add}
      >
        <img src={"/plus.svg"} alt="plus" height={18} width={18} />
        <p>Dodaj proizvod u garderobu</p>
      </button>
      <WardrobeListComponent wardrobes={wardrobes} />
      <ModalComponent
        isModalOpen={isModalOpen}
        closeDialog={() => setIsModalOpen(false)}
      >
        {formVariant()}
      </ModalComponent>
      <SnackBarComponent
        variant={snackBarVariant}
        isSnackBarOpen={isSnackBarOpen}
        closeSnackBar={() => {
          setIsSnackBarOpen(false);
          setSnackBarMessage(null);
          setSnackBarVariant(null);
        }}
        message={snackBarMessage}
      />
    </section>
  );
};

export default LandingPageSection;
