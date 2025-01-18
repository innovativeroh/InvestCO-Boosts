"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { BsDiscord } from "react-icons/bs";
import { LuArrowLeftRight, LuMenu } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import Image from 'next/image';
import Icon from "@/../public/Logo.png";
interface MenuItem {
  text: string;
  shortcut: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { text: "Features", shortcut: "F", href: "/soon" },
  { text: "Feedbacks", shortcut: "F", href: "/vouches" },
  { text: "Pricing", shortcut: "P", href: "/soon" },
  { text: "About Us", shortcut: "A", href: "/about" },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = (): void => {
    setIsOpen(false);
  };

  const NavLink: React.FC<{ item: MenuItem }> = ({ item }) => (
    <Link 
      href={item.href}
      className="flex gap-2"
      onClick={handleLinkClick}
    >
      {item.text}{" "}
      <span className="text-xs bg-zinc-800 border-[1px] gap-1 border-zinc-950 border-b-[4px] hover:border-b-[1px] rounded-lg py-1 px-2 flex flex-wrap items-center">
        <LuArrowLeftRight size={8} /> {item.shortcut}
      </span>
    </Link>
  );

  return (
    <>
    <br />
      <header className="m-auto max-w-[1280px] p-4 md:p-4 mt-4">
        <div className="flex flex-wrap justify-between gap-4 md:gap-[60px]">
          {/* Logo */}
          <Link href="/" className="p-4 bg-zinc-950 rounded-2xl border-[1px] border-zinc-900 flex items-center bg-opacity-20 blur-50">
            <Image src={Icon} alt='Icon' width={40} height={40} />
            <span className="font-thin text-white outfit-font text-xl px-2">
            Dukaan<span className="text-xs pl-1">©</span>
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden p-4 bg-zinc-950 flex justify-center items-center rounded-2xl border-[1px] border-zinc-900 bg-opacity-20 blur-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-1"
              aria-label="Toggle menu"
            >
              <LuMenu size={24} />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex p-4 bg-zinc-950 rounded-2xl border-[1px] border-zinc-900 flex-[9] justify-center items-center bg-opacity-40 blur-100 outfit-font font-light text-white gap-10">
            {menuItems.map((item) => (
              <NavLink key={item.text} item={item} />
            ))}
          </nav>

          {/* Discord Button - Desktop */}
          <div className="hidden md:flex p-4 bg-zinc-950 rounded-2xl border-[1px] bg-opacity-40 blur-100 border-zinc-900 justify-center items-center">
            <Link
              href="https://discord.gg/dukaan2"
              target='_blank'
              className="bg-gradient-to-r from-fuchsia-300 font-semibold to-violet-500 flex items-center justify-center gap-2  py-3 px-6 text-white rounded-xl text-sm outfit-font hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200"
            >
              Discord <BsDiscord />
            </Link>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } z-40`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-zinc-950 to-zinc-900 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50 shadow-xl backdrop-blur-lg bg-opacity-95`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="font-thin text-white outfit-font text-xl">
              Menu
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white p-2 hover:bg-zinc-800 rounded-lg transition-colors duration-200"
              aria-label="Close menu"
            >
              <IoMdClose size={24} />
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {menuItems.map((item, index) => (
              <Link
                href={item.href}
                key={item.text}
                className="text-white outfit-font font-light flex items-center gap-2 transition-transform duration-200 hover:translate-x-2"
                onClick={handleLinkClick}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.text}
                <span className="text-xs bg-zinc-800 border-[1px] gap-1 border-zinc-950 border-b-[4px] hover:border-b-[1px] rounded-lg py-1 px-2 flex flex-wrap items-center transition-all duration-200">
                  <LuArrowLeftRight size={8} /> {item.shortcut}
                </span>
              </Link>
            ))}
            <div className="mt-8 pt-8 border-t border-zinc-800">
              <Link
              href="https://discord.gg/dukaan2"
              target='_blank'
                className="bg-gradient-to-r from-fuchsia-300 font-semibold to-violet-500 flex items-center justify-center gap-2  py-3 px-6 text-white rounded-xl text-sm outfit-font hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200"
                onClick={handleLinkClick}
              >
                Join our Discord <BsDiscord size={20} />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;