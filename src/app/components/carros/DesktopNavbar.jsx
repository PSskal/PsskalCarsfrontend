import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { IoCarSport } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";

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
              className="cursor-pointer text-white bg-[#363636] hover:bg-[#0f0e0e] flex items-center gap-2 px-3 py-2 rounded"
              onClick={() => setShowLocationMenu(!showLocationMenu)}
            >
              <FaLocationDot />
              <span className="hidden sm:inline">{location}, Peru</span>
              <IoIosArrowDown />
            </button>
            {showLocationMenu && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded shadow-lg z-10">
                {["Lima", "Arequipa", "Cusco", "Trujillo"].map((loc) => (
                  <button
                    key={loc}
                    className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setLocation(loc);
                      setShowLocationMenu(false);
                    }}
                  >
                    <FaLocationDot className="mr-2" />
                    {loc}, Peru
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
              href="/sell-car"
              className="inline-flex items-center rounded-md border border-transparent bg-[#4375f7] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ml-10"
            >
              <IoIosAdd className="font-bold mr-2 text-white text-2xl" />
              Vender Carro
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default DesktopNavbar;
