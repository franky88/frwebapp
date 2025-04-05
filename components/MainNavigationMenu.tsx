import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { navigationItems } from "@/data/navigationItems";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";

const MainNavigationMenu = () => {
  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList>
        {/* <Link href={"/"} legacyBehavior passHref></Link> */}
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <Link href={item.link} legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-transparent`}
              >
                {item.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
        <SignedIn>
          <NavigationMenuItem className="flex items-center gap-1">
            <Link href="/dashboard" legacyBehavior passHref>
              <NavigationMenuLink className="flex flex-col items-center">
                <Image
                  src={"/images/icons/layout-dashboard.svg"}
                  alt="dashboard"
                  width={20}
                  height={20}
                />
              </NavigationMenuLink>
            </Link>
            <NavigationMenuLink>
              <UserButton />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </SignedIn>
        <SignedOut>
          <NavigationMenuItem>
            <NavigationMenuLink>
              <SignInButton />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </SignedOut>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigationMenu;
