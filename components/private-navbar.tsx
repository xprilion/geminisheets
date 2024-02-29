"use client"

import * as React from "react"

import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    Collapse,
    MenuItem,
    Avatar,
    Card,
    IconButton,
  } from "@/components";

  import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";


  function NavList() {
    return (
      <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography placeholder={"placeholder"}
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          <Link href="/functions" className="flex items-center hover:text-blue-500 transition-colors">
            Functions
          </Link>
        </Typography>
        <Typography placeholder={"placeholder"}
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          <Link href="/settings" className="flex items-center hover:text-blue-500 transition-colors">
            Account
          </Link>
        </Typography>
        <Typography placeholder={"placeholder"}
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          <Link href="https://github.com/xprilion/gemini-sheets" target="_blank" className="flex items-center hover:text-blue-500 transition-colors">
            Help
          </Link>
        </Typography>
      </ul>
    );
  }
   
  export function PrivateMenu() {
    const [openNav, setOpenNav] = React.useState(false);
   
    const handleWindowResize = () =>
      window.innerWidth >= 960 && setOpenNav(false);
   
    React.useEffect(() => {
      window.addEventListener("resize", handleWindowResize);
   
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, []);
   
    return (
      <Navbar placeholder={"placeholder"} className="mx-auto max-w-screen-xl px-6 py-3">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography placeholder={"placeholder"}
            as="div"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5"
          >
            <Link href="/" className="flex flex-row">
                <img src="/logo.png" className="w-6 h-6 mr-2"></img>
                Gemini Sheets
            </Link>
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <IconButton placeholder={"placeholder"}
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
        </Collapse>
      </Navbar>
    );
  }