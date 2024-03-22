import { IoChatbubblesSharp, IoFolderOpenSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { SlBadge } from "react-icons/sl";

export const NAV_LINKS = [
  {
    label: "About",
    href: "#About",
  },
  {
    label: "Events",
    href: "/Events",
  },
  {
    label: "Popular groups",
    href: "/popular",
  },
];

export const SIDEBAR_LINKS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: MdDashboard,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: IoFolderOpenSharp,
  },
  {
    label: "Chat",
    href: "/chat",
    icon: IoChatbubblesSharp,
  },
  {
    label: "Achievements",
    href: "/achievements",
    icon: SlBadge,
  },
];