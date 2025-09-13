import { FaLocationDot } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

function MobileNavbar({
  location,
  setLocation,
  showLocationMenu,
  setShowLocationMenu,
  setSelectedBrands,
}) {
  return (
    <nav className="bg-[#1b1b1b] shadow-xl ring-gray-900/5 px-4 py-2 left-0 w-full z-50 animate-fade-in">
      <div className="flex flex-col">
        {/* Location Section */}
        <div>
          <div className="text-gray-400 text-sm mb-1">Location</div>
          <div className="relative">
            <button
              className="text-white flex items-center gap-2 text-lg"
              onClick={() => {
                setShowLocationMenu(!showLocationMenu);
                setSelectedBrands(["All Brand"]);
              }}
            >
              <span>{location}, Peru</span>
              <IoIosArrowDown />
            </button>
            {showLocationMenu && (
              <div className="absolute left-0 mt-2 bg-black w-full rounded shadow-lg z-10">
                {["Lima", "Arequipa", "Cusco", "Chiclayo"].map((loc) => (
                  <button
                    key={loc}
                    className="flex items-center w-full px-4 py-2 text-white hover:bg-gray-100"
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
        </div>

        {/* Search Bar */}
      </div>
    </nav>
  );
}
export default MobileNavbar;
