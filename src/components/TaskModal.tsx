import { find, isEmpty, isEqual, isFunction, isUndefined } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useTodos } from "../contexts/todo";
import { ITodo } from "../contexts/todo/type";
import { Category } from "./Categories";
import LinedTitle from "./LinedTitle";
import SubmitBtn from "./SubmitBtn";
export default function TaskModal({
  close,
  handleSubmit,
  id,
}: {
  close?: any;
  handleSubmit?: any;
  id?: string;
}) {
  let isAddMode = isUndefined(id);
  let { categories, todos } = useTodos();
  let firstId = categories[0].id;
  let length = todos.length;
  let [activeId, setActiveId] = useState(firstId);
  let [text, setText] = useState("");
  let realText = useMemo(() => text.trim(), [text]);
  let reset = useCallback(() => {
    setActiveId(firstId);
    setText("");
    if (isFunction(close)) close();
  }, [firstId, close]);
  let submit = useCallback(() => {
    let todo: ITodo = {
      id: `${length}`,
      text: realText,
      isCompleted: false,
      category: find(categories, ({ id }) => isEqual(id, activeId))!,
    };
    if (isFunction(handleSubmit)) handleSubmit(todo);
    reset();
  }, [handleSubmit, realText, activeId, reset, length, categories]);
  let disabled = isEmpty(realText);
  return (
    <div className="bg-23 absolute z-10 top-0 left-0 w-screen h-screen backdrop-blur-[7px]">
      <div
        className="absolute z-20 top-[50%] left-[50%] w-[500px] h-[450px] bg-3 rounded-[10px] border-[2px] border-4"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="mt-4" />
        <div className="flex flex-row items-center justify-between px-6">
          <div className="w-8 h-8" />
          <p className="text-5 text-[22px] font-bold font-sans">
            {isAddMode ? "CREATE" : "EDIT"} TASK
          </p>
          <div
            className="w-8 h-8 rounded-[16px] flex justify-center items-center cursor-pointer"
            onClick={reset}
          >
            <AiFillCloseCircle className="text-6 text-2xl" />
          </div>
        </div>
        <div className="px-11 w-full mt-[18px]">
          <input
            type="text"
            className="w-full h-10 rounded-[10px] px-[10px] text-[20px] font-sans placeholder:text-24"
            placeholder="Task description..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
          />
        </div>
        <div className="mt-[35px] w-full">
          <LinedTitle title="Categories" />
          <div className="mt-5" />
          <div className="grid grid-cols-2 gap-5 px-[34px] custom-scroll max-h-[200px]">
            {categories.map((category, index) => {
              let onClick = () => {
                setActiveId(category.id);
              };
              return (
                <div key={category.id}>
                  <Category
                    {...{
                      category,
                      active: isEqual(category.id, activeId),
                      onClick,
                    }}
                    needRound
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-3" />
          <div className="flex justify-center items-center">
            <SubmitBtn text="SUBMIT TASK" disabled={disabled} submit={submit} />
          </div>
        </div>
      </div>
    </div>
  );
}
