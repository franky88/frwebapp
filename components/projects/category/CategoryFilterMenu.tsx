import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ArrowDownNarrowWide } from "lucide-react";

interface CategoryFilterMenuProps {
  categories: CategoryType[];
  sendDataToParent: (data: string | boolean | null) => void;
}

const CategoryFilterMenu = ({
  categories,
  sendDataToParent,
}: CategoryFilterMenuProps) => {
  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="flex gap-1 items-center">
            <ArrowDownNarrowWide className="w-4 h-4" /> Filter
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => sendDataToParent(null)}>
              All
            </MenubarItem>
            {categories.map((cat) => (
              <MenubarItem
                key={cat._id}
                onClick={() => sendDataToParent(cat.name)}
              >
                {cat.name}
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};

export default CategoryFilterMenu;
