import Link from "next/link";
import Image from "next/image";
import MainNavigationMenu from "./MainNavigationMenu";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-lg shadow-md z-50">
      <div className="flex justify-between items-center container mx-auto py-4">
        <div className="flex gap-4 items-center">
          <Link href={"/"} legacyBehavior passHref>
            <Image
              src={"/images/frlogo.svg"}
              width={50}
              height={50}
              alt="frlogo"
            />
          </Link>
          <div>
            <h2 className="font-bold">
              <Link href={"/"} legacyBehavior passHref>
                Franklin Ramos
              </Link>
            </h2>
            <small className="text-gray-500">
              Multimedia Artist / Web Designer / Web Developer
            </small>
          </div>
        </div>
        <MainNavigationMenu />
      </div>
    </header>
  );
};

export default Header;
