"use client";
import { useParams, useRouter } from "next/navigation";
import { useCarContext } from "@/context/CarContext";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { BsPeopleFill, BsFillFuelPumpFill } from "react-icons/bs";
import { FaCarAlt } from "react-icons/fa";
import { FaRegCalendarTimes } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import Loader from "@/app/components/carros/Loader";
import { IoIosColorFill } from "react-icons/io";
import { VscSymbolProperty } from "react-icons/vsc";
import { TbCategoryFilled } from "react-icons/tb";
import { carService } from "@/lib/supabase/services";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export default function CarDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { cars } = useCarContext();
  const [car, setCar] = useState(null);
  const [images, setImages] = useState([]);
  const { getImagesByCarId, getCarById } = carService;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const numericId = Number(id);
      const carId = Number.isNaN(numericId) ? id : numericId;

      let found = cars.find((c) => c.id === carId);
      // Si no se encuentra por coincidencia estricta, intentar con conversión a cadena
      if (!found) {
        found = cars.find((c) => String(c.id) === String(id));
      }

      let carData = found;
      if (!found) {
        carData = await getCarById(carId);
      }
      setCar(carData);

      const carImages = await getImagesByCarId(carId);
      let imageUrls = Array.isArray(carImages)
        ? carImages.map((img) => img.image_url)
        : [];

      if (carData?.image && !imageUrls.includes(carData.image)) {
        imageUrls = [carData.image, ...imageUrls];
      } else if (carData?.image) {
        imageUrls = [
          carData.image,
          ...imageUrls.filter((url) => url !== carData.image),
        ];
      }

      setImages(imageUrls);
    };

    fetchData();
  }, [id, cars]);

  return car ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-white">
      <Button
        className="mt-8 mb-8 bg-white hover:bg-white flex items-center gap-2 text-gray-500 cursor-pointer"
        onClick={() => router.back()}
      >
        <FaArrowLeft /> Volver a todos los autos
      </Button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Imagen del auto */}
        <div className="lg:col-span-2">
          {/* Carrusel */}
          <div className="relative overflow-hidden lg:h-[38rem] rounded-lg">
            <Carousel className="overflow-hidden relative w-full  rounded-lg mb-8 bg-gray-100">
              <CarouselContent>
                {images.map((img, idx) => (
                  <CarouselItem key={idx}>
                    <Image
                      src={img}
                      alt={`auto-img-${idx}`}
                      className="w-full h-auto object-cover"
                      width={400}
                      height={192}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="cursor-pointer absolute top-1/2 left-4 -translate-y-1/2 z-30 bg-white/30 rounded-full p-2 hover:bg-orange-400 hover:text-white transition-colors" />
              <CarouselNext className="cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 z-30 bg-white/30 rounded-full p-2 hover:bg-orange-400 hover:text-white transition-colors" />
            </Carousel>
          </div>

          {/* Datos del auto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold lg:mt-8">
                {car.brand} {car.model}
              </h1>
            </div>
            {/* título */}

            {/* subtítulo */}
            <h2 className="text-xl font-semibold mt-8">
              Información del vehículo
            </h2>

            <hr className="border-borderColor my-6" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: <TbCategoryFilled />,
                  text: `${car.category}`,
                  info: "Categoría",
                },
                {
                  icon: <FaRegCalendarTimes />,
                  text: `${car.year}`,
                  info: "Año Modelo",
                },
                {
                  icon: <IoIosColorFill />,
                  text: `${car.color}`,
                  info: "Color",
                },
                {
                  icon: <BsFillFuelPumpFill />,
                  text: `${car.fuel_type}`,
                  info: "Combustible",
                },
                {
                  icon: <FaCarAlt />,
                  text: `${car.transmission}`,
                  info: "Transmisión",
                },
                {
                  icon: <MdLocationPin />,
                  text: `${car.location}`,
                  info: "Ubicación",
                },
                {
                  icon: <FaCarAlt />,
                  text: `${car.mileage.toLocaleString("es-PE")} km`,
                  info: "Kilometraje",
                },
                {
                  icon: <VscSymbolProperty />,
                  text: `${car.drive_type}`,
                  info: "Tracción",
                },
              ].map(({ icon, text, info }) => (
                <div
                  key={info}
                  className="flex flex-col items-center bg-white rounded-lg p-4 text-gray-500 shadow-lg"
                >
                  <div className="p-4 flex flex-col items-center justify-center h-full">
                    <span className="w-6 h-6 text-gray-900 mb-2 font-bold">
                      {icon}
                    </span>
                    <p className="text-xs text-gray-500 mb-1">{info}</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* descripción */}
            <div className="lg:mb-16">
              <h1 className="text-xl font-medium mb-3">
                Información adicional
              </h1>
              <p className="text-gray-500">{car.description}</p>
            </div>
          </div>
        </div>
        {/* lado derecho contacto */}
        <div className="shadow-lg h-max sticky top-30 rounded-xl p-6 space-y-6 text-gray-500">
          <p className="text-2xl text-black font-bold text-center ">
            Precio: {car.price.toLocaleString("es-PE")}{" "}
            {car.currency === "USD" ? "Dolares" : "Soles"}
          </p>
          <hr className="border-zinc-400" />

          <a
            href={`https://wa.me/${car.contact_phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-blue-600 hover:bg-blue-800 transition-all py-3 font-medium text-white rounded-xl cursor-pointer text-center"
          >
            Contactar por WhatsApp
          </a>
          <button className="block w-full bg-zinc-800 hover:bg-zinc-700 transition-all py-3 font-medium text-white rounded-xl cursor-pointer text-center">
            Soy el dueño, cambiar estado del carro
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}
