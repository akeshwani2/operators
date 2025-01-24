'use client';

import { HomeIcon, SettingsIcon, MessageCirclePlus, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const menuItems = [
      { icon: HomeIcon, label: 'Dashboard', path: '/dashboard' },
      { icon: MessageCircle, label: 'Chat', path: '/chat' },
      { icon: MessageCirclePlus, label: 'Contact', path: '/contact' },
      { icon: SettingsIcon, label: 'Settings', path: '/settings' },
    ];
    const { user } = useUser();

    
    const router = useRouter();
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);

    const isActive = (path: string) => pathname === path;

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
      <div>
      <nav className={`fixed left-0 top-0 h-screen bg-[#0a0a0a] border-r border-gray-800 p-4 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}>
        <div className="flex items-center justify-between mb-6 px-2">
          {isOpen && <a href="/" className="text-gray-200">EVO</a>}
          <div className="flex items-center justify-center ">
            {!isOpen && <a href="/" className="text-gray-200 text-sm">E</a>}
          </div>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-800/50"
          >
            {isOpen ? <ChevronLeft className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-3 h-3 text-gray-400" />}
          </button>
        </div>
        
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button 
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm
                ${pathname === item.path 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                }`}
            >
              <item.icon className="w-5 h-5" />
              {isOpen && <span>{item.label}</span>}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center absolute bottom-5">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox:
                "h-8 w-8 rounded-lg transition-all duration-300 hover:scale-105 ring-2 ring-white/20 hover:ring-white/40",
            },
          }}
        />
        <div className="text-gray-400 text-xl ml-4 mb-1 text-center justify-center">
        {isOpen ? (
                  `${
                    user?.username || user?.firstName
                      ? user?.username || user?.firstName
                      : "User"
                  }`
                ) : (
                  <></>
                )}
                </div>
        </div>

      </nav>
      </div>
    );
}


// Icons components...