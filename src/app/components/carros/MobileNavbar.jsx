import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";

function MobileNavbar({
  location,
  setLocation,
  showLocationMenu,
  setShowLocationMenu,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <nav className="bg-[#1b1b1b] shadow-xl fixed ring-gray-900/5 px-4 py-6  left-0 w-full z-50 animate-fade-in">
      <div className="flex flex-col gap-4">
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
                  "Lima, Perú",
                  "Arequipa, Perú",
                  "Cusco, Perú",
                  "Chiclayo, Perú",
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
          href="/sell-car "
          className="w-full inline-flex items-center justify-center rounded-lg bg-[#4375f7] px-6 py-4 text-lg font-medium text-white shadow-sm hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <IoIosAdd className="font-bold mr-2 text-xl" />
          Vender Carro
        </Link>
      </div>
    </nav>
  );
}
export default MobileNavbar;
