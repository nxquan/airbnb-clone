"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset="airbnb_clone"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            className="relative cursor-pointer hover:opacity-70 border-2 p-20 border-neutral-300 flex items-center justify-center flex-col gap-4 text-neutral-600"
            onClick={() => open?.()}
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>

            {value && (
              <div className="absolute inset-0 w-full h-full ">
                <Image
                  alt="Upload"
                  fill
                  src={value}
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;