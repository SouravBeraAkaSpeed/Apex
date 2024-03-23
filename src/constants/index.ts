import { IoChatbubblesSharp, IoFolderOpenSharp } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";
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
    label: "Create Course",
    href: "/create-course",
    icon: FaBookOpen,
  },
];