"use client";
import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center">
      <PuffLoader
        size={100}
        color="#f43f5e"
        loading={true}
        speedMultiplier={1.5}
      />
    </div>
  );
};

export default Loader;
