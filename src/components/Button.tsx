export default function Button({
  text,
  onClick,
  isJustText = false,
  isOutline = false,
  active = false,
}: {
  text: string;
  onClick?: any;
  isOutline?: boolean;
  isJustText?: boolean;
  active?: boolean;
}) {
  return (
    <div
      className={`${
        active
          ? "text-5"
          : isOutline
          ? "text-6 border border-6"
          : isJustText
          ? "text-6"
          : "bg-6 text-7"
      } p-1 cursor-pointer rounded-lg font-extrabold text-lg`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}
