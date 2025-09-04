"use client";
import { FaBars } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { IoIosAdd } from "react-icons/io";
import { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { IoCarSport } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import Banner from "../carros/Banner";
import Hero from "../carros/Hero";
import FeacturedSections from "../carros/FeacturedSections";

// Hook para detectar si es móvil
function useIsMobile(breakpoint = 767) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

function DesktopNavbar({
  location,
  setLocation,
  showLocationMenu,
  setShowLocationMenu,
}) {
  return (
    <nav className="w-full py-4 top-0 transition duration-300 ease-in-out z-40 fixed bg-[#1b1b1b] xs:hidden">
      <div className="">
        <div className="flex items-center justify-between md:px-10">
          {/* Left side - Location selector */}
          <div className="relative">
            <button
              className="text-white bg-[#363636] hover:bg-[#0f0e0e] flex items-center gap-2 px-3 py-2 rounded"
              onClick={() => setShowLocationMenu(!showLocationMenu)}
            >
              <FaLocationDot />
              <span className="hidden sm:inline">{location}</span>
              <IoIosArrowDown />
            </button>
            {showLocationMenu && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded shadow-lg z-10">
                {[
                  "Jakarta, Indonesia",
                  "Surabaya, Indonesia",
                  "Bandung, Indonesia",
                  "Semarang, Indonesia",
                ].map((loc) => (
                  <button
                    key={loc}
                    className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => {
                      setLocation(loc);
                      setShowLocationMenu(false);
                    }}
                  >
                    <FaLocationDot className="mr-2" />
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Center - Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 rounded-full p-2">
              <IoCarSport className="text-white text-3xl" />
            </div>
            <span className="text-white text-xl font-bold">PSskal.Cars</span>
          </div>
          {/* Right: Links y botón vender carro */}
          <div className="flex items-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center rounded-md border border-transparent bg-[#4375f7] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ml-10"
            >
              <IoIosAdd className="font-bold mr-2" />
              Vender Carro
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileNavbar({
  location,
  setLocation,
  showLocationMenu,
  setShowLocationMenu,
  searchQuery,
  setSearchQuery,
  setMobileMenuOpen,
}) {
  return (
    <div className="bg-black shadow-xl ring-1 ring-gray-900/5 px-4 py-6 absolute  left-0 w-full z-50 animate-fade-in">
      <nav className="flex flex-col gap-4">
        {/* Location Section */}
        <div className="mb-4">
          <div className="text-gray-400 text-sm mb-1">Location</div>
          <div className="relative">
            <button
              className="text-white flex items-center gap-2 text-lg"
              onClick={() => setShowLocationMenu(!showLocationMenu)}
            >
              <span>{location}</span>
              <IoIosArrowDown />
            </button>
            {showLocationMenu && (
              <div className="absolute left-0 mt-2 bg-black w-full rounded shadow-lg z-10">
                {[
                  "Jakarta, Indonesia",
                  "Surabaya, Indonesia",
                  "Bandung, Indonesia",
                  "Semarang, Indonesia",
                ].map((loc) => (
                  <button
                    key={loc}
                    className="flex items-center w-full px-4 py-2 text-white hover:bg-gray-100"
                    onClick={() => {
                      setLocation(loc);
                      setShowLocationMenu(false);
                    }}
                  >
                    <FaLocationDot className="mr-2" />
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4 ">
          <div className="flex">
            <input
              type="text"
              placeholder="Find Car Here ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white flex-1 px-4 py-3 rounded-l-lg border-0 focus:outline-none text-gray-700"
            />
            <button className="bg-[#4375f7] px-4 py-3 rounded-r-lg hover:bg-blue-700 transition-colors">
              <FaUser className="text-white text-lg" />
            </button>
          </div>
        </div>
        {/* Sell Car Button */}
        <Link
          href="/contacto"
          className="w-full inline-flex items-center justify-center rounded-lg bg-[#4375f7] px-6 py-4 text-lg font-medium text-white shadow-sm hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          <IoIosAdd className="font-bold mr-2 text-xl" />
          Vender Carro
        </Link>
      </nav>
    </div>
  );
}

function Navbar() {
  const [location, setLocation] = useState("Semarang, Indonesia");
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile(1024);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return isMobile ? (
    <div className="fixed top-0 left-0 w-full z-50">
      <MobileNavbar
        location={location}
        setLocation={setLocation}
        showLocationMenu={showLocationMenu}
        setShowLocationMenu={setShowLocationMenu}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <FeacturedSections className="mt-55" />
    </div>
  ) : (
    <>
      <DesktopNavbar
        location={location}
        setLocation={setLocation}
        showLocationMenu={showLocationMenu}
        setShowLocationMenu={setShowLocationMenu}
      />
      <Hero />
      <div className="grid grid-cols-5 grid-rows-5 gap-4">
        <div className="row-span-5">
          <Banner />
        </div>
        <div className="col-span-4 row-span-5">
          <FeacturedSections />
        </div>
      </div>
    </>
  );
}

export default Navbar;
