import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm h-[80px]">
      <div className="py-4 h-full">
        <Container>
          <div className="flex items-center justify-between md:gap-0">
            <div className="flex-1">
              <Logo />
            </div>
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
