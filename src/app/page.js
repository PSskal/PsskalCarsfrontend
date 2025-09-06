"use client";
import { IoIosAdd } from "react-icons/io";
import { useState, useEffect } from "react";
import Banner from "@/app/components/carros/Banner";
import Hero from "@/app/components/carros/Hero";
import FeacturedSections from "@/app/components/carros/FeacturedSections";
import BrandScrollHorizontal from "@/app/components/carros/BrandScrollHorizontal";
import DesktopNavbar from "@/app/components/carros/DesktopNavbar";
import MobileNavbar from "@/app/components/carros/MobileNavbar";
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

const Home = () => {
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
    <div>
      <div className="relative">
        <MobileNavbar
          location={location}
          setLocation={setLocation}
          showLocationMenu={showLocationMenu}
          setShowLocationMenu={setShowLocationMenu}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <BrandScrollHorizontal />
        <FeacturedSections />
      </div>
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
};

export default Home;
