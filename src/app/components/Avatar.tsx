import Image from "next/image";

interface AvatarProps {
  src: string | undefined | null;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      className="rounded-full "
      alt="User avatar"
      src={src ?? "/images/avatar.png"}
      width="30"
      height="30"
    />
  );
};

export default Avatar;
