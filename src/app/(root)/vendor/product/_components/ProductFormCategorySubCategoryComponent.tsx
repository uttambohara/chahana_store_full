"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCreateProduct } from "@/providers/create-product-provider";
import { Tables } from "@/types/supabase";
import { ChevronDown } from "lucide-react";

interface ProductFormCategorySubCategoryComponentProps {
  categories: Tables<"category">[] | null;
  subCategories: Tables<"sub_category">[] | null;
}

export default function ProductFormCategorySubCategoryComponent({
  categories,
  subCategories,
}: ProductFormCategorySubCategoryComponentProps) {
  const { state, dispatch } = useCreateProduct();

  function handleUpdateCategorySubCategoryDispatch(
    category: Tables<"category">,
    sub_category: Tables<"sub_category">
  ) {
    dispatch({
      type: "SET_CATEGORY_SUBCATEGORY_IDS",
      payload: {
        category,
        sub_category,
      },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex w-fit min-w-[12rem] items-center justify-between my-8"
        >
          {state.category?.id && state.sub_category?.id ? (
            <span>{`${state.category.name} | ${state.sub_category.name}`}</span>
          ) : (
            <span>Category | sub-category</span>
          )}
          <ChevronDown size={18} />
        </Button>
      </DropdownMenuTrigger>
      {categories?.map((category) => (
        <DropdownMenuContent className="w-[11rem]" key={category.id}>
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>{category.name}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {subCategories?.map((subCategory) => (
                    <DropdownMenuItem
                      key={subCategory.id}
                      onClick={() =>
                        handleUpdateCategorySubCategoryDispatch(
                          category,
                          subCategory
                        )
                      }
                    >
                      <span>{subCategory.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      ))}
    </DropdownMenu>
  );
}
