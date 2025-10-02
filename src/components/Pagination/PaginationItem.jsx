export default function PaginationItem({
  children,
  onClick,
  isActive,
  isDisable,
}) {
  return (
    <li>
      <button
        className={`flex items-center justify-center w-8 h-8 border-[#f1f1f1] hover:border-transparent rounded-full cursor-pointer transition ${
          isActive
            ? "text-white bg-primary pointer-events-none"
            : "bg-white hover:bg-gray-200 border"
        } ${isDisable ? "pointer-events-none opacity-30" : "cursor-pointer"}`}
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
}
