import { z } from "zod";
import styles from "./AddItemForm.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import makeWardrobeItem from "../../../lib/makeWardrobeItem";

interface AddItemFormProps {
  wardrobesType: WardrobeType[];
  openSuccessSnackBar: () => void;
  openErrorSnackBar: () => void;
  setSnackBarMessage: (message: string) => void;
  closeModal: () => void;
}

const addSchema = z.object({
  type: z.string().min(1, { message: "Odaberite vrstu" }),
  size: z.enum(["XS", "S", "M", "L", "XL", "XXL"], {
    errorMap: () => ({ message: "Odabreite veličinu" }),
  }),
  color: z.string().min(1, { message: "Unesite boju" }),
  description: z.string().min(10, { message: "Unesite minimalno 10 riječi" }),
});

type TAddSchema = z.infer<typeof addSchema>;

const AddItemForm: React.FC<AddItemFormProps> = ({
  wardrobesType,
  openSuccessSnackBar,
  openErrorSnackBar,
  setSnackBarMessage,
  closeModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TAddSchema>({
    resolver: zodResolver(addSchema),
  });

  const sizes: string[] = ["XS", "S", "M", "L", "XL", "XXL"];

  const onSubmit = async (data: TAddSchema) => {
    reset();

    const response = await makeWardrobeItem(data);
    setSnackBarMessage(response.message);

    if (response.success) {
      closeModal();
      openSuccessSnackBar();
      return;
    }

    openErrorSnackBar();
  };

  return (
    <div className={styles.add_form}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.add_form__form}>
        <label>
          <select {...register("type")} className={styles.add_form__form__type}>
            <option value="">Odaberi vrstu</option>
            {wardrobesType.map((type) => {
              return (
                <option value={type.name} key={type.id}>
                  {type.name}
                </option>
              );
            })}
          </select>
          {errors.type && (
            <p
              className={styles.add_form__form__error}
            >{`${errors.type.message}`}</p>
          )}
        </label>
        <label>
          <select {...register("size")}>
            <option>Odaberi veličinu</option>
            {sizes.map((size, index) => {
              return (
                <option value={size} key={index}>
                  {size}
                </option>
              );
            })}
          </select>
          {errors.size && (
            <p
              className={styles.add_form__form__error}
            >{`${errors.size.message}`}</p>
          )}
        </label>
        <label>
          <input type="text" {...register("color")} placeholder="Upiši boju" />
          {errors.color && (
            <p
              className={styles.add_form__form__error}
            >{`${errors.color.message}`}</p>
          )}
        </label>
        <label>
          <textarea {...register("description")} placeholder="Opis" />
          {errors.description && (
            <p
              className={styles.add_form__form__error}
            >{`${errors.description.message}`}</p>
          )}
        </label>
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className={styles.add_form__form__submit}
        >
          Dodaj
        </button>
      </form>
    </div>
  );
};

export default AddItemForm;
