"use client";
import { useState, useEffect, use } from "react";
import Banner from "@/app/components/carros/Banner";
import Hero from "@/app/components/carros/Hero";
import FeacturedSections from "@/app/components/carros/FeacturedSections";
import BrandScrollHorizontal from "@/app/components/carros/BrandScrollHorizontal";
import DesktopNavbar from "@/app/components/carros/DesktopNavbar";
import MobileNavbar from "@/app/components/carros/MobileNavbar";
import SearchBar from "./components/carros/SearchBar";
import SellCarButton from "./components/carros/SellCarButton";
import FeacturedSectionsMobile from "./components/carros/FeacturedSectionsMobile";
import { carService } from "@/lib/supabase/services";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { useCarContext } from "@/context/CarContext";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [carType, setCarType] = useState("New Car");
  const [selectedBrands, setSelectedBrands] = useState(["All Brand"]);
  const [priceRange, setPriceRange] = useState([100, 150000]);

  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const {
    cars,
    setCars,
    location,
    setLocation,
    lastFetchedLocation,
    setLastFetchedLocation,
  } = useCarContext();
  const [page, setPage] = useState(1);
  const isMobile = useIsMobile();

  // Función para obtener datos de Supabase
  const { getCarByLocation } = carService;
  async function fetchCars() {
    const cars = await getCarByLocation(location);
    setCars(cars);
    setLastFetchedLocation(location);
    return cars;
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Si no hay autos cacheados o cambió la ubicación desde el último fetch, recargar
    if (!cars || cars.length === 0 || lastFetchedLocation !== location) {
      fetchCars();
      setPage(1);
    }
  }, [location]);
  console.log(location);

  // Luego aplicar los demás filtros sobre ese resultado
  const filteredCars = cars.filter((car) => {
    const matchesSearch = (car.brand + " " + car.model)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesBrand =
      Array.isArray(selectedBrands) &&
      (selectedBrands[0] === "All Brand" ||
        selectedBrands[0].toLowerCase() === car.brand.toLowerCase());

    const matchesTestDrive =
      !isAutomatic || car.transmission?.includes("Automatico");
    const matchesPriceRange =
      car.price >= priceRange[0] && car.price <= priceRange[1];

    return (
      matchesSearch && matchesTestDrive && matchesPriceRange && matchesBrand
    );
  });

  // Función para alternar marcas
  const toggleBrand = (brand) => {
    if (selectedBrands[0] === brand) {
      setSelectedBrands(["All Brand"]);
    } else {
      setSelectedBrands([brand]);
    }
  };

  if (!mounted) return null;

  return isMobile ? (
    <div>
      <MobileNavbar
        location={location}
        setLocation={setLocation}
        showLocationMenu={showLocationMenu}
        setShowLocationMenu={setShowLocationMenu}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSelectedBrands={setSelectedBrands}
      />

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSelectedBrands={setSelectedBrands}
      />
      <SellCarButton />

      <BrandScrollHorizontal
        toggleBrand={toggleBrand}
        setSearchQuery={setSearchQuery}
      />
      <FeacturedSectionsMobile
        filteredCars={filteredCars}
        page={page}
        setPage={setPage}
      />
    </div>
  ) : (
    <>
      <DesktopNavbar
        location={location}
        setLocation={setLocation}
        showLocationMenu={showLocationMenu}
        setShowLocationMenu={setShowLocationMenu}
      />
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSelectedBrands={setSelectedBrands}
      />
      <div className="grid grid-cols-5 grid-rows-5 gap-4">
        <div className="row-span-5">
          <Banner
            isAutomatic={isAutomatic}
            setIsAutomatic={setIsAutomatic}
            carType={carType}
            setCarType={setCarType}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            toggleBrand={toggleBrand}
          />
        </div>
        <div className="col-span-4 row-span-5">
          <FeacturedSections
            filteredCars={filteredCars}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
