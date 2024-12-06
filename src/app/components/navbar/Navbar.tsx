import { User } from "@prisma/client";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

interface NavbarProps {
  user?: Partial<User> | null;
}

const Navbar = ({ user }: NavbarProps) => {

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm h-[80px]">
      <div className="py-4 h-full">
        <Container>
          <div className="flex items-center justify-between md:gap-0">
            <div className="flex-1">
              <Logo />
            </div>
            <Search />
            <UserMenu user={user} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
