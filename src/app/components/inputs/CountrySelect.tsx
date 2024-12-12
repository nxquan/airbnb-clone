"use client";
import useCountries from "@/app/hooks/useCountries";
import Select from "react-select";

export type CountrySelectValue = {
  value: string;
  label: string;
  flag: string;
  latlng: number[];
  region: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect = ({ onChange, value }: CountrySelectProps) => {
  const { getAll, getByValue } = useCountries();

  return (
    <div className="mt-2">
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        className="z-50"
        value={value}
        onChange={(value) => {
          onChange(value as CountrySelectValue);
        }}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensure it overlays everything
        }}
        menuPortalTarget={document.body}
        formatOptionLabel={(option: any) => {
          return (
            <div className="flex flex-row items-center gap-3 cursor-pointer">
              {/* <div>{option.flag}</div> */}
              <div>
                {option.label},
                <span className="text-neutral-800 ml-1">{option.region}</span>
              </div>
            </div>
          );
        }}
        classNames={{
          control: () => "p-1 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
