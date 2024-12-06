import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

export interface CategoryBoxProps {
  label: string;
  icon: IconType;
  description?: string;
  selected?: boolean;
}

const CategoryBox = ({
  label,
  icon: Icon,
  selected,
}: CategoryBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label.toLowerCase(),
    };

    if (params?.get("category") === label.toLowerCase()) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      className={`flex flex-col items-center justify-center my-3 py-1 gap-2 border-b-2 ${
        selected
          ? "border-b-black"
          : "border-b-transparent hover:border-b-neutral-300"
      } transition cursor-pointer group`}
      onClick={handleClick}
    >
      <Icon
        size={28}
        className={` group-hover:text-black ${
          selected ? "text-black" : "text-neutral-600"
        }`}
      />
      <div
        className={`font-bold text-sm ${
          selected ? "text-black" : "text-neutral-600 group-hover:text-black"
        } `}
      >
        {label}
      </div>
    </div>
  );
};

export default CategoryBox;
