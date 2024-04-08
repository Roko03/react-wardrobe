import { useEffect, useMemo, useState } from "react";
import WardrobeListComponent from "../wardrobe-list/WardrobeListComponent";
import styles from "./LandingPageSection.module.scss";
import getWardrobes from "../../../lib/getWardrobes";
import ModalComponent from "../../modal/ModalComponent";
import getWardrobesType from "../../../lib/getWardrobesType";
import AddItemForm from "../add-item-form/AddItemForm";
import SnackBarComponent from "../../snack-bar/SnackBarComponent";
import DeleteItemForm from "../delete-item-form/DeleteItemForm";
import deleteWardrobeItem from "../../../lib/deleteWardrobeItem";
import EditItemForm from "../edit-item-form/EditItemForm";
import editWardrobeItem from "../../../lib/editWardrobeItem";
import getWardrobeItemById from "../../../lib/getWardrobeItemById";
import WardrobeFilterListComponents from "../wardrobe-filter/WardrobeFilterListComponents";
import CircularProgressbComponent from "../../circular-progress/CircularProgressbComponent";

const LandingPageSection = () => {
  const [wardrobes, setWardrobes] = useState<WardrobeItem[]>([]);
  const [wardrobesType, setWardrobesType] = useState<WardrobeType[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"add" | "delete" | "edit">("add");

  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string | null>(null);
  const [snackBarVariant, setSnackBarVariant] = useState<
    "success" | "error" | null
  >(null);

  const [itemId, setItemId] = useState<string>("");
  const [itemIdData, setItemIdData] = useState<Item | null>(null);

  const [clickedFilterElement, setClickedFilterElement] =
    useState<string>("all");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchWardrobeItems = async () => {
    setIsLoading(true);
    const response = await getWardrobes();

    setClickedFilterElement("all");
    setWardrobes(response);
    setIsLoading(false);
  };

  const fetchWardrobesType = async () => {
    const response = await getWardrobesType();

    setWardrobesType(response);
  };

  const fetchWardrobeItemById = async () => {
    const response = await getWardrobeItemById(itemId);

    setItemIdData(response.data);
  };

  const deleteItemFunction = async () => {
    const response = await deleteWardrobeItem(itemId);

    setSnackBarMessage(response.message);

    if (response.success) {
      fetchWardrobeItems();
      setClickedFilterElement("all");
      setIsModalOpen(false);
      setIsSnackBarOpen(true);
      setSnackBarVariant("success");
      return;
    }

    setIsSnackBarOpen(true);
    setSnackBarVariant("error");
  };

  const editItemFunction = async (data: Item) => {
    const response = await editWardrobeItem(data, itemId);

    setSnackBarMessage(response.message);

    if (response.success) {
      fetchWardrobeItems();
      setClickedFilterElement("all");
      setIsModalOpen(false);
      setIsSnackBarOpen(true);
      setSnackBarVariant("success");
      return;
    }

    setIsSnackBarOpen(true);
    setSnackBarVariant("error");
  };

  const filterWardrobesItems = async (type: string) => {
    setClickedFilterElement(type);
    setIsLoading(true);

    const fetchedData: WardrobeItem[] = await getWardrobes();

    if (type != "all") {
      const arr = fetchedData.filter((item) => {
        return item.type == type;
      });
      setWardrobes(arr);
    } else {
      setWardrobes(fetchedData);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchWardrobeItems();
    fetchWardrobesType();
  }, []);

  useEffect(() => {
    if (itemId) fetchWardrobeItemById();
  }, [itemId]);

  const formVariant = useMemo(() => {
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
        return <DeleteItemForm deleteItem={() => deleteItemFunction()} />;
      case "edit":
        return itemIdData != null ? (
          <EditItemForm
            itemIdData={itemIdData}
            wardrobesType={wardrobesType}
            editItem={(data: Item) => editItemFunction(data)}
          />
        ) : (
          <div></div>
        );
      default:
        return <></>;
    }
  }, [wardrobesType, modalType, itemIdData]);

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

      <WardrobeFilterListComponents
        wardrobesType={wardrobesType}
        clickedFilterElement={clickedFilterElement}
        filterWardrobesItems={(data: string) => filterWardrobesItems(data)}
      />
      {isLoading ? (
        <CircularProgressbComponent />
      ) : (
        <WardrobeListComponent
          wardrobes={wardrobes}
          deleteFunction={(id: string) => {
            setModalType("delete");
            setIsModalOpen(!isModalOpen);
            setItemId(id);
          }}
          editFunction={(id: string) => {
            setModalType("edit");
            setIsModalOpen(!isModalOpen);
            setItemId(id);
          }}
        />
      )}
      <ModalComponent
        isModalOpen={isModalOpen}
        closeDialog={() => setIsModalOpen(false)}
      >
        {formVariant}
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
