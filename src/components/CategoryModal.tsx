import { isEmpty, isFunction, isUndefined } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import { AiFillCloseCircle } from "react-icons/ai";
import { useTodos } from "../contexts/todo";
import { Category } from "./Categories";
import LinedTitle from "./LinedTitle";
import SubmitBtn from "./SubmitBtn";
export default function CategoryModal({
  close,
  id,
  ic = "",
  ib = "",
}: {
  close?: any;
  id?: string;
  ic?: string;
  ib?: string;
}) {
  let { categories, addCategory } = useTodos();
  let isAddMode = isUndefined(id);
  let length = categories.length;
  const [color, setColor] = useColor(ic);
  const [bg, setBg] = useColor(ib);
  let [name, setName] = useState("");
  let realName = useMemo(() => name.trim(), [name]);
  let disabled = isEmpty(realName);
  let submit = useCallback(() => {
    if (isAddMode) {
      addCategory({
        id: `${length}`,
        name: realName,
        color: color.hex,
        bg: bg.hex,
      });
    }
    if (isFunction(close)) close();
  }, [close, isAddMode, addCategory, length, realName, color, bg]);
  return (
    <div className="bg-23 absolute z-10 top-0 left-0 w-screen h-screen backdrop-blur-[7px]">
      <div
        className="absolute z-20 top-[50%] left-[50%] w-[500px] h-[660px] bg-3 rounded-[10px] border-[2px] border-4"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="mt-4" />
        <div className="flex flex-row items-center justify-between px-6">
          <div className="w-8 h-8" />
          <p className="text-5 text-[22px] font-bold font-sans">
            {isAddMode ? "CREATE" : "EDIT"} CATEGORY
          </p>
          <div
            className="w-8 h-8 rounded-[16px] flex justify-center items-center cursor-pointer"
            onClick={close}
          >
            <AiFillCloseCircle className="text-6 text-2xl" />
          </div>
        </div>
        <div className="px-11 w-full mt-[18px]">
          <input
            type="text"
            className="w-full h-10 rounded-[10px] px-[10px] text-[20px] font-sans placeholder:text-24"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-8 w-full">
          <LinedTitle title="Colors" />
          <div className="mt-5" />
          <div className="grid grid-cols-2 gap-4 p-3 text-5 text-[24px]">
            <div className="flex flex-col gap-4">
              <p>color</p>
              <ColorPicker color={color} onChange={setColor} hideInput />
            </div>
            <div className="flex flex-col gap-4">
              <p>bg</p>
              <ColorPicker color={bg} onChange={setBg} hideInput />
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            <LinedTitle title="Preview" />
            <div className="flex items-center justify-center">
              <div className="py-2 min-h-[54px]">
                <Category
                  {...{
                    category: {
                      id: "hello",
                      name: realName,
                      color: color.hex,
                      bg: bg.hex,
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <SubmitBtn
              text="SUBMIT CATEGORY"
              disabled={disabled}
              submit={submit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
