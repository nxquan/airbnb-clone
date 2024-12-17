"use client";

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return "Anywhere";
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diff = differenceInDays(end, start) + 1;

      return `${diff} days`;
    }

    return "Any week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} guests`;
    }

    return "Add guests";
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="border-[1px] shadow-sm cursor-pointer rounded-full mx-6 hover:shadow w-full sm:w-auto"
    >
      <div className="flex flex-row items-center justify-between h-12">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px]">
          {durationLabel}
        </div>
        <div className="hidden sm:block text-sm font-semibold px-6 text-neutral-600">
          {guestLabel}
        </div>
        <div className="flex bg-rose-500 w-8 h-8 rounded-full mr-[7px]  items-center justify-center">
          <BiSearch size={18} color="white" />
        </div>
      </div>
    </div>
  );
};

export default Search;
