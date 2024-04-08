import { z } from "zod";
import styles from "./EditItemForm.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

interface EditItemFormProps {
  itemIdData: Item;
  wardrobesType: WardrobeType[];
  editItem: (data: Item) => void;
}

const editSchema = z.object({
  type: z.string().min(1, { message: "Odaberite vrstu" }),
  size: z.string().min(1, { message: "Odaberite veličinu" }),
  color: z.string().min(1, { message: "Unesite boju" }),
  description: z.string().min(10, { message: "Unesite minimalno 10 riječi" }),
});

type TEditSchema = z.infer<typeof editSchema>;

const EditItemForm: React.FC<EditItemFormProps> = ({
  itemIdData,
  wardrobesType,
  editItem,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TEditSchema>({
    resolver: zodResolver(editSchema),
  });
  const sizes: string[] = ["XS", "S", "M", "L", "XL", "XXL"];

  const onSubmit = async (data: TEditSchema) => {
    reset();

    editItem(data);
  };

  useEffect(() => {
    reset(itemIdData);
  }, [itemIdData]);

  return (
    <div className={styles.edit_form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.edit_form__form}
      >
        <label>
          <select
            {...register("type")}
            className={styles.edit_form__form__type}
          >
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
              className={styles.edit_form__form__error}
            >{`${errors.type.message}`}</p>
          )}
        </label>
        <label>
          <select {...register("size")}>
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
              className={styles.edit_form__form__error}
            >{`${errors.size.message}`}</p>
          )}
        </label>
        <label>
          <input type="text" {...register("color")} placeholder="Upiši boju" />
          {errors.color && (
            <p
              className={styles.edit_form__form__error}
            >{`${errors.color.message}`}</p>
          )}
        </label>
        <label>
          <textarea {...register("description")} placeholder="Opis" />
          {errors.description && (
            <p
              className={styles.edit_form__form__error}
            >{`${errors.description.message}`}</p>
          )}
        </label>
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className={styles.edit_form__form__submit}
        >
          Ažuriraj
        </button>
      </form>
    </div>
  );
};

export default EditItemForm;
