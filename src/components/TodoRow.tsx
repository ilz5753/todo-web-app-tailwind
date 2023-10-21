import { FaCheck } from "react-icons/fa6";
import { ITodo } from "../contexts/todo/type";
import { Category } from "./Categories";
import useResponsive from "../hooks/useResponsive";

export default function TodoRow({
  text,
  isCompleted,
  category,
  toggleCompleted,
}: ITodo & { toggleCompleted?: any }) {
  let { isSm } = useResponsive();
  return (
    <div
      className={`flex items-center flex-row sm:px-5 pl-5 py-6 cursor-pointer text-5 ${
        isSm ? "h-[70px]" : "justify-between"
      } overflow-y-hidden`}
      onClick={toggleCompleted}
    >
      <div className="flex-1">
        <div className="flex items-center flex-row">
          <div
            className={`sm:w-[30px] sm:h-[30px] w-[25px] h-[25px] sm:mr-3 mr-[15px] rounded-[15px] flex items-center justify-center border ${
              isCompleted ? "bg-16 border-[transparent]" : "border-5"
            }`}
          >
            {isCompleted && <FaCheck />}
          </div>
          <p className="sm:text-[20px] text-[16px] font-sans flex-1 line-clamp-2 text-ellipsis">
            {text}
          </p>
        </div>
      </div>
      <div
        className={`${
          isSm ? "min-w-[150px]" : "overflow-y-hidden w-full"
        } -rotate-90 sm:rotate-0`}
      >
        <Category {...{ category, needRound: isSm }} />
      </div>
    </div>
  );
}
