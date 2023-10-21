import { noop } from "lodash";

export default function SubmitBtn({
  disabled = false,
  submit,
  text,
}: {
  disabled?: boolean;
  submit?: any;
  text: string;
}) {
  return (
    <div
      className={`border-[2px] border-6 bg-5 rounded-[10px] flex items-center select-none justify-center py-1 px-2 cursor-${
        disabled ? "not-allowed" : "pointer"
      } pointer-events-${disabled ? "none" : "auto"} ${
        disabled ? "opacity-60" : ""
      }`}
      onClick={disabled ? noop : submit}
      aria-disabled={disabled}
    >
      <p className="text-6 font-extrabold font-sans text-[20px]">{text}</p>
    </div>
  );
}
