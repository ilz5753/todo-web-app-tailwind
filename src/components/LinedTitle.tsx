export default function LinedTitle({ title }: { title: string }) {
  return (
    <div className="w-full h-[1px] bg-5 flex justify-center items-center">
      <p className="text-center px-3 text-5 font-semibold font-sans bg-3 absolute">
        {title}
      </p>
    </div>
  );
}
