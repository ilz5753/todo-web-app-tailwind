import { isEqual, isFunction, isUndefined, map } from "lodash";
import { useState } from "react";
import { useTodos } from "../contexts/todo";
import { ICategory } from "../contexts/todo/type";
import Button from "./Button";
import LinedTitle from "./LinedTitle";
export function Category({
  onClick,
  category,
  active = false,
  needRound = false,
}: {
  onClick?: any;
  category: ICategory;
  active?: boolean;
  needRound?: boolean;
}) {
  let clickable = !isUndefined(onClick);
  return (
    <div
      className={`text-center ${needRound ? "rounded-md" : ""} ${
        clickable ? "cursor-pointer" : ""
      }`}
      style={{
        backgroundColor: active ? "transparent" : category.bg,
        borderWidth: 2,
        borderColor: active ? category.bg : "transparent",
      }}
      onClick={onClick}
    >
      <p
        className="sm:text-xl text-[11px] font-semibold sm:font-normal line-clamp-1 text-ellipsis"
        style={{ color: category[active ? "bg" : "color"] }}
      >
        {category.name}
      </p>
    </div>
  );
}
export default function Categories({
  openCategoryModal,
  setActiveCategoryId,
}: {
  openCategoryModal?: any;
  setActiveCategoryId?: any;
}) {
  let { categories } = useTodos();
  let [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="bg-3 rounded-xl shadow-lg w-[250px] overflow-hidden rnd-border hidden sm:block">
      <div className="pt-8" />
      <LinedTitle title="Categories" />
      <div className="mt-8" />
      <div className="px-6 custom-scroll sm:h-[374px] h-[350px]">
        <div className="mt-4" />
        {map(categories, (category, index) => (
          <div
            key={category.id}
            className={`${isEqual(index, 0) ? "" : "mt-[10px]"}`}
          >
            <Category
              category={category}
              active={isEqual(index, activeIndex)}
              onClick={() => {
                setActiveIndex(index);
                if (isFunction(setActiveCategoryId))
                  setActiveCategoryId(category.id);
              }}
              needRound
            />
          </div>
        ))}
        <div className="pt-[176px]" />
      </div>
      <div className="w-full flex justify-center">
        <Button text="Add Category" onClick={openCategoryModal} />
      </div>
    </div>
  );
}
