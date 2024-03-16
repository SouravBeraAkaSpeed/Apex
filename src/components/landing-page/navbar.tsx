import React from "react";
import Section from "../section";
import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  return (
    <header className=" md:px-10 lg:px-16 w-full flex px-10 items-center h-24 backdrop-blur-lg border-b">
      <div className="mr-10">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="176"
            height="40"
            fill="none"
            viewBox="0 0 176 40"
          >
            <path
              fill="#fad85d"
              fillRule="evenodd"
              d="M15 28a5 5 0 0 1-5-5V0H0v23c0 8.284 6.716 15 15 15h11V28H15ZM45 10a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-19 9C26 8.507 34.507 0 45 0s19 8.507 19 19-8.507 19-19 19-19-8.507-19-19ZM153 10a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9Zm-19 9c0-10.493 8.507-19 19-19s19 8.507 19 19-8.507 19-19 19-19-8.507-19-19ZM85 0C74.507 0 66 8.507 66 19s8.507 19 19 19h28c1.969 0 3.868-.3 5.654-.856L124 40l5.768-10.804A19.007 19.007 0 0 0 132 20.261V19c0-10.493-8.507-19-19-19H85Zm37 19a9 9 0 0 0-9-9H85a9 9 0 1 0 0 18h28a9 9 0 0 0 9-8.93V19Z"
              clipRule="evenodd"
            ></path>
            <path
              fill="#fad85d"
              d="M176 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
            ></path>
          </svg>
        </Link>
      </div>

      <div className="hidden lg:block">
        <ul className="flex gap-10">
          {NAV_LINKS.map((item) => (
            <li key={item.label} className="hover:text-brand/yellow">
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-1 items-end justify-end  ">
        <ModeToggle />
        <Link
          href={"/login"}
          className="mx-4 right-0 cursor-pointer relative shadow-2xl shadow-zinc-900 dark:shadow-white rounded-full p-px text-xs font-semibold leading-6  text-black inline-block"
        >
          <div className="relative flex space-x-2 items-center z-10 rounded-xl bg-yellow-200 px-8  py-2">
            <span>Login</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
