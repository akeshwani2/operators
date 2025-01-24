"use client";
import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };
  const isActive = (path: string) => {
    return pathname === path ? "text-white" : "";
  };

  return (
    <header className="py-4 border-b border-white/15 md:border-none sticky top-0 z-10 backdrop-blur md:backdrop-blur-none w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto md:backdrop-blur">
          <div>
            <div className="border h-10 w-10 rounded-lg inline-flex items-center justify-center border-white/15 tracking-tighter">
              <Link href="/">EVO</Link>
            </div>
          </div>
          <div className="hidden md:block">
            <nav className="gap-8 text-sm text-white flex">
              <button
                onClick={() => handleNavigation("/chat")}
                className={`hover:text-white transition ${isActive("/tasks")}`}
              >
                Chat
              </button>
              <button
                onClick={() => handleNavigation("/docs")}
                className={`hover:text-white transition ${isActive("/tasks")}`}
              >
                Docs
              </button>
              <button
                onClick={() => handleNavigation("/changelog")}
                className={`hover:text-white transition ${isActive("/tasks")}`}
              >
                Changelog
              </button>
              <button
                onClick={() => handleNavigation("/contact")}
                className={`hover:text-white transition ${isActive("/tasks")}`}
              >
                Contact
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
