
"use client";

import { SIDEBAR_LINKS } from "@/constants";
import { USER } from "@/mockdata";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Sidebar = ({ environmentId }: { environmentId: string }) => {
  const session = USER;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="mt-16 lg:mt-0 h-screen w-10 lg:w-[16rem] fixed dark:bg-black/20 rounded-r z-1">
      <div className="lg:p-4 h-full relative">
        <div className="absolute h-20 w-20 rounded-full hidden lg:block bg-yellow-400/10 -z-10 -top-6 left-0 blur-3xl"></div>
        <h1 className="text-4xl font-extrabold text-brand/yellow hidden lg:block text-center">
          APEX
        </h1>

        <div className="mt-10 flex flex-col justify-between h-full">
          <div className="px-2 lg:space-y-12">
            <div className={`hidden lg:block`}>
              <Select
                value={environmentId}
                onValueChange={(value) => {
                  router.push(`/${value}/dashboard`);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {/* {session.environments.map((team, index) => (
                    <SelectItem value={team} key={index}>
                      {team}
                    </SelectItem>
                  ))} */}
                </SelectContent>
              </Select>
            </div>
            <div className=" flex flex-col items-start gap-6">
              {SIDEBAR_LINKS.map((link) => {
                const selected = pathname
                  .split("/")
                  .includes(link.label.toLowerCase());
                return (
                  <Link
                    href={`/${environmentId}${link.href}`}
                    className={clsx(
                      "flex gap-4 items-center  hover:text-brand/yellow",
                      selected ? "text-brand/yellow" : ""
                    )}
                    key={link.label}
                  >
                    <link.icon className="h-5 w-5" />
                    {/* redirect the link later to sections of particular student using their id's */}
                    <span className="hidden lg:block">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-2 mb-20 border border-brand/yellow/20 rounded-full p-2 bg-brand/yellow/10">
            <Popover>
              <PopoverTrigger>
                <Avatar className="h-12 w-12 border-2 border-black">
                  <AvatarImage src="/boardApe.png" />
                  <AvatarFallback>
                    <FaUser />
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-auto flex flex-col items-start gap-3"
              >
                <Link className="flex items-center gap-2" href="/profile">
                  <FaUser className="h-4 w-4" />
                  <span>Profile</span>
                </Link>

                <Link className="flex gap-2 items-center" href="/settings">
                  <IoIosSettings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </PopoverContent>
            </Popover>
            <h2 className="truncate  text-sm">
                {session.email}
                </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
