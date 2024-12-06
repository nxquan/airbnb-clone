"use client";

import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className="border-[1px] shadow-sm cursor-pointer rounded-full mx-6 hover:shadow w-full sm:w-auto">
      <div className="flex flex-row items-center justify-between h-12">
        <div className="text-sm font-semibold px-6">Anywhere</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px]">Any week</div>
        <div className="hidden sm:block text-sm font-semibold px-6 text-neutral-600">
          Add guests
        </div>
        <div className="flex bg-rose-500 w-8 h-8 rounded-full mr-[7px]  items-center justify-center">
          <BiSearch size={18} color="white" />
        </div>
      </div>
    </div>
  );
};

export default Search;
