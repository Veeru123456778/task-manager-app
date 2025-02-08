
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { HomeIcon, CheckCircleIcon, ClockIcon, Cog6ToothIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Semicircle Button */}
      <button
        className="fixed left-0 sm:hidden top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-3 rounded-r-full shadow-lg z-50"
        onClick={() => setIsOpen(true)}
      >
        <Bars3Icon className="w-8 h-8" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 p-4 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:h-[95vh] md:w-72 md:rounded-xl md:m-4`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold ml-5 text-purple-900">Taskify</h2>
          <button className="p-2 font-bold text-2xl sm:hidden" onClick={() => setIsOpen(false)}>
            {/* <Bars3Icon className="w-8 h-8 text-gray-600" /> */}
            &times;
          </button>
        </div>
        <hr className="mb-4" />

        {/* Navigation */}
        <nav className="space-y-4">
          <NavItem href="/" icon={HomeIcon} text="All Tasks" pathname={pathname} />
          <NavItem href="/completed" icon={CheckCircleIcon} text="Completed Tasks" pathname={pathname} />
          <NavItem href="/pending" icon={ClockIcon} text="Pending Tasks" pathname={pathname} />
          <NavItem href="/settings" icon={Cog6ToothIcon} text="Settings" pathname={pathname} />
        </nav>
      </div>
    </>
  );
}

function NavItem({ href, icon: Icon, text, pathname }: { href: string; icon: any; text: string; pathname: string }) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center p-2 rounded-full space-x-2 transition ${
        isActive ? "bg-purple-200 text-purple-900 font-bold" : "text-gray-700 hover:text-black"
      }`}
    >
      <Icon className={`w-6 h-6 ${isActive ? "fill-purple-900" : "fill-gray-300"}`} />
      <span>{text}</span>
    </Link>
  );
}
