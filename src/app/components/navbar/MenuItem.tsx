export interface MenuItemProps {
  onClick: () => void;
  label: string;
  bold?: boolean;
  separator?: boolean;
}

const MenuItem = ({ label, bold, separator, onClick }: MenuItemProps) => {
  return (
    <>
      <div className="px-4 py-3 hover:bg-neutral-100 transition cursor-pointer" onClick={onClick}>
        <p className={`text-sm ${bold ? "font-semibold" : ""}`}>{label}</p>
      </div>
      {separator ? <div className="w-full h-[1px] bg-neutral-200 my-1.5"></div> : ""}
    </>
  );
};

export default MenuItem;
