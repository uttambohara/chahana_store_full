import { useCreateProduct } from "@/providers/create-product-provider";
import { Tables } from "@/types/supabase";
import clsx from "clsx";

interface ProductFormColorComponentProps {
  colors: Tables<"color">[] | null;
}

export default function ProductFormColorComponent({
  colors,
}: ProductFormColorComponentProps) {
  const { state, dispatch } = useCreateProduct();

  function handleUpdateColorDispatch(color: Tables<"color">) {
    dispatch({
      type: "SET_COLOR",
      payload: {
        color,
      },
    });
  }

  return (
    <ul className="flex items-center gap-3 flex-wrap p-4">
      {colors?.map((color) => (
        <li
          key={color.id}
          onClick={() => handleUpdateColorDispatch(color)}
          className={clsx("cursor-pointer", {
            "rounded-full ring ring-black ring-offset-2": state.colors?.some(
              (item: { id: number }) => item.id === color.id
            ),
          })}
        >
          <div
            key={color.id}
            className={clsx(`size-6 rounded-full border`)}
            style={{ backgroundColor: color.hex }}
          />
        </li>
      ))}
    </ul>
  );
}
