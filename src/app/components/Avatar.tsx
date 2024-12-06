import Image from "next/image";

const Avatar = () => {
  return (
    <Image
      className="rounded-full "
      alt="User avatar"
      src="/images/avatar.png"
      width="30"
      height="30"
    />
  );
};

export default Avatar;
