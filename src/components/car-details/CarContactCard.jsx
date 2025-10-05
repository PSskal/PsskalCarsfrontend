import React from "react";
import { useRouter } from "next/navigation";

const CarContactCard = ({ car }) => {
  const router = useRouter();

  const formatPrice = (price, currency) => {
    const formattedPrice = price?.toLocaleString("es-PE") || "0";
    const currencyText = currency === "USD" ? "Dólares" : "Soles";
    return `${formattedPrice} ${currencyText}`;
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = car.contact_phone;
    const message = `Hola! Me interesa el ${car.brand} ${car.model} ${car.year} que tienes publicado.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleOwnerClick = () => {
    router.push(`/manage/${car.id}`);
  };

  return (
    <div className="shadow-lg h-max sticky top-30 rounded-xl p-6 space-y-6 text-gray-500">
      <p className="text-2xl text-black font-bold text-center">
        Precio: {formatPrice(car.price, car.currency)}
      </p>

      <hr className="border-zinc-400" />

      <button
        onClick={handleWhatsAppClick}
        className="block w-full bg-blue-600 hover:bg-blue-800 transition-all duration-300 py-3 font-medium text-white rounded-xl cursor-pointer text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={`Contactar por WhatsApp sobre ${car.brand} ${car.model}`}
      >
        Contactar por WhatsApp
      </button>

      <button
        onClick={handleOwnerClick}
        className="block w-full bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 py-3 font-medium text-white rounded-xl cursor-pointer text-center focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
        aria-label="Administrar este vehículo"
      >
        Soy el dueño, cambiar estado del carro
      </button>
    </div>
  );
};

export default CarContactCard;
