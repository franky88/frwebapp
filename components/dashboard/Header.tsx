import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";
import HeaderBreadcrumb from "./HeaderBreadcrumb";
import { UserButton } from "@clerk/nextjs";

const Header = ({ selectedMenu }: { selectedMenu: string }) => {
  return (
    <header className="flex justify-between items-center mr-8 border-b">
      <div className="flex h-16 shrink-0 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <HeaderBreadcrumb selectedMenu={selectedMenu} />
      </div>
      <div>
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
