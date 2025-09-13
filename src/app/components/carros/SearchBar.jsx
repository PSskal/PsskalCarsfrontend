import { useRef } from "react";
import { FaUser } from "react-icons/fa";
import { RiHomeFill } from "react-icons/ri";

const SearchBar = ({ searchQuery, setSearchQuery, setSelectedBrands }) => {
  const inputRef = useRef(null);

  return (
    <div className=" sticky top-0 z-50 bg-[#1b1b1b] p-4">
      <div className="flex">
        <input
          ref={inputRef}
          type="text"
          placeholder="Find Car Here ..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value.length > 0) {
              setSelectedBrands(["All Brand"]);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.target.blur();
            }
          }}
          className="bg-white flex-1 px-4 py-3 rounded-l-lg border-0 focus:outline-none text-gray-700"
        />
        <button
          className="bg-[#4375f7] px-4 py-3 rounded-r-lg hover:bg-blue-700 transition-colors"
          onClick={() => {
            inputRef.current && inputRef.current.blur();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <RiHomeFill className="text-white text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
