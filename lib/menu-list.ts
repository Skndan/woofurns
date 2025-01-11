import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Ticket,
  LucideLampDesk,
  ScreenShare,
  Box,
  User
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
}; 

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        },
        {
          href: "/instance",
          label: "Instance",
          active: pathname.includes("/instance"),
          icon: ScreenShare,
          submenus: []
        },
        {
          href: "/ami",
          label: "AMI",
          active: pathname.includes("/ami"),
          icon: Box,
          submenus: []
        },
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: User,
          submenus: []
        }
      ]
    }, 
    {
      groupLabel: "Account Pages",
      menus: [
        {
          href: "/profile",
          label: "Profile",
          active: pathname.includes("/profile"),
          icon: Users,
          submenus: []
        },
        {
          href: "/ticket",
          label: "Raise Ticket",
          active: pathname.includes("/ticket"),
          icon: Ticket,
          submenus: []
        }
      ]
    }
  ];
}
