"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import LoadingScreen from "./LoadingScreen";

const NavItem = ({
  href,
  text,
  isActive,
  isScrolled,
}: { href: string; text: string; isActive: boolean; isScrolled: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={`relative block py-2 px-3 transition-colors duration-300 ${
        isActive ? "text-red-600" : isScrolled ? "text-black hover:text-red-600" : "text-blue-600 hover:text-red-600"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
      <span
        className={`absolute inset-0 border-2 border-red-600 opacity-0 transition-opacity duration-300 ${
          isHovered || isActive ? "opacity-100" : ""
        }`}
        style={{
          clipPath: isHovered || isActive ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
          transition: "clip-path 0.3s ease-in-out, opacity 0.3s ease-in-out",
        }}
      />
    </Link>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLoadingComplete = () => {
    setLoadingComplete(true);
  };

  const navbarVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        delay: 0.2,
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.5,
      },
    },
  };

  return (
    <>
      {!loadingComplete && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      {loadingComplete && (
        <motion.nav
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
            isScrolled ? "bg-white shadow-md" : "bg-transparent"
          }`}
          variants={navbarVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <motion.div variants={logoVariants} initial="hidden" animate="visible">
                <Link href="/" className={`text-xl font-bold ${isScrolled ? "text-black" : "text-blue-600"}`}>
                  Achei!
                </Link>
              </motion.div>

              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`${isScrolled ? "text-black" : "text-blue-600"} focus:outline-none`}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              <ul
                className={`md:flex space-x-6 ${isOpen ? "block" : "hidden"} absolute md:relative top-full left-0 right-0 ${
                  isScrolled ? "bg-white" : "bg-transparent"
                } md:bg-transparent p-4 md:p-0`}
              >
                <li>
                  <NavItem href="/" text="Home" isActive={pathname === "/"} isScrolled={isScrolled} />
                </li>
                <li>
                  <NavItem href="/about" text="Sobre" isActive={pathname === "/about"} isScrolled={isScrolled} />
                </li>
                <li>
                  <NavItem href="/services" text="Serviços" isActive={pathname === "/services"} isScrolled={isScrolled} />
                </li>
                <li>
                  <NavItem href="/contact" text="Contato" isActive={pathname === "/contact"} isScrolled={isScrolled} />
                </li>
                <li>
                  <NavItem href="/download" text="Download" isActive={pathname === "/download"} isScrolled={isScrolled} />
                </li>
              </ul>
            </div>
          </div>
        </motion.nav>
      )}
    </>
  );
}

