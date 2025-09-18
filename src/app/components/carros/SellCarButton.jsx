import Link from "next/link";
import { IoIosAdd } from "react-icons/io";

const SellCarButton = () => (
  <div className="p-4 bg-[#1b1b1b] flex justify-center z-20">
    <Link
      href="/sell-car"
      className="w-full inline-flex items-center justify-center rounded-lg bg-[#4375f7] px-6 py-4 text-lg font-medium text-white shadow-sm hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <IoIosAdd className="font-bold mr-2 text-xl" />
      Vender Carro
    </Link>
  </div>
);

export default SellCarButton;
