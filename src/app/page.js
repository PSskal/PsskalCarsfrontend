"use client";
import { IoIosAdd } from "react-icons/io";
import { useState, useEffect } from "react";
import Banner from "@/app/components/carros/Banner";
import Hero from "@/app/components/carros/Hero";
import FeacturedSections from "@/app/components/carros/FeacturedSections";
import BrandScrollHorizontal from "@/app/components/carros/BrandScrollHorizontal";
import DesktopNavbar from "@/app/components/carros/DesktopNavbar";
import MobileNavbar from "@/app/components/carros/MobileNavbar";
import dummyCarData from "@/app/components/carros/carData";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [freeTestDrive, setFreeTestDrive] = useState(false);
  const [carType, setCarType] = useState("New Car");
  const [selectedBrands, setSelectedBrands] = useState(["All Brand"]);
  const [priceRange, setPriceRange] = useState([100, 300000]);
  const [sortBy, setSortBy] = useState("Recommended");
  const [location, setLocation] = useState("Lima, Peru");
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile(1024);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lógica de filtrado
  const filteredCars = dummyCarData.filter((car) => {
    const matchesSearch = (car.brand + " " + car.model)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTestDrive =
      !freeTestDrive || car.badges?.includes("Free Test Drive");
    const matchesPriceRange =
      car.price >= priceRange[0] && car.price <= priceRange[1];
    const matchesType =
      carType === "All" ||
      (carType === "New Car" && !car.isUsed) ||
      (carType === "Used Car" && car.isUsed);
    const matchesBrand =
      selectedBrands[0] === "All Brand" || selectedBrands.includes(car.brand);
    return (
      matchesSearch &&
      matchesTestDrive &&
      matchesPriceRange &&
      matchesType &&
      matchesBrand
    );
  });

  const activeFilters = [];
  if (freeTestDrive) activeFilters.push("Free Test Drive");
  if (carType !== "New Car") activeFilters.push(carType);
  if (selectedBrands[0] !== "All Brand")
    activeFilters.push(selectedBrands.join(", "));
  if (priceRange[0] !== 80000 || priceRange[1] !== 300000) {
    activeFilters.push(
      `$${priceRange[0].toLocaleString()} - $${priceRange[1].toLocaleString()}`
    );
  }

  // Función para alternar marcas
  const toggleBrand = (brand) => {
    if (brand === "All Brand") {
      setSelectedBrands(["All Brand"]);
    } else {
      const newBrands = selectedBrands.includes("All Brand")
        ? [brand]
        : selectedBrands.includes(brand)
        ? selectedBrands.filter((b) => b !== brand)
        : [...selectedBrands.filter((b) => b !== "All Brand"), brand];
      setSelectedBrands(newBrands.length === 0 ? ["All Brand"] : newBrands);
    }
  };

  console.log(searchQuery);
  console.log(filteredCars);

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
        />
        <BrandScrollHorizontal />
        <FeacturedSections filteredCars={filteredCars} />
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
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="grid grid-cols-5 grid-rows-5 gap-4">
        <div className="row-span-5">
          <Banner
            freeTestDrive={freeTestDrive}
            setFreeTestDrive={setFreeTestDrive}
            carType={carType}
            setCarType={setCarType}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            toggleBrand={toggleBrand}
            activeFilters={activeFilters}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className="col-span-4 row-span-5">
          <FeacturedSections filteredCars={filteredCars} />
        </div>
      </div>
    </>
  );
};

export default Home;
