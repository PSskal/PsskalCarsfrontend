"use client";
import { useParams } from "next/navigation";
import { useCarContext } from "@/context/CarContext";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { BsPeopleFill, BsFillFuelPumpFill } from "react-icons/bs";
import { FaCarAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import Loader from "@/app/components/carros/Loader";
import { carService } from "@/lib/supabase/services";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarDetailsPage() {
  const { id } = useParams();
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
    <div data-scroll-section className="px-6 md:px-16 lg:px-24 xl:px-32 mt-4">
      <button
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer hover:text-gray-700"
        onClick={() => window.history.back()}
      >
        <FaArrowLeft /> Back to all Cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* left car image */}
        <div className="lg:col-span-2">
          {/* Carrusel */}
          <div className="relative w-full aspect-[16/9] rounded-lg mb-8 bg-gray-100">
            <Carousel className="overflow-hidden relative w-full  rounded-lg mb-8 bg-gray-100">
              <CarouselContent className="h-full">
                {images.map((img, idx) => (
                  <CarouselItem key={idx} className="flex h-full">
                    <Image
                      src={img}
                      alt={`car-img-${idx}`}
                      className="w-full h-full object-cover flex-shrink-0"
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
          <div className="space-y-6 mt-6">
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">
                {car.category} ● {car.year}
              </p>
            </div>
            <hr className="border-borderColor my-6" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: <BsPeopleFill />,
                  text: `${car.color}`,
                },
                { icon: <BsFillFuelPumpFill />, text: car.fuel_type },
                { icon: <FaCarAlt />, text: car.transmission },
                { icon: <MdLocationPin />, text: car.location },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center bg-gray-100 p-4 rounded-lg text-gray-500"
                >
                  <span className="h-5 mb-2">{icon}</span>
                  <span className="">{text}</span>
                </div>
              ))}
            </div>

            {/* description  */}
            <div>
              <h1 className="text-xl font-medium mb-3">Description</h1>
              <p className="text-gray-500">{car.description}</p>
            </div>
          </div>
        </div>
        {/* right side booking */}
        <form className="shadow-lg h-max sticky top-30 rounded-xl p-6 space-y-6 text-gray-500">
          <p className="text-2xl text-black font-bold ">$ {car.price}</p>
          <hr className="border-zinc-400" />
          <button className="w-full bg-orange-300 hover:bg-orange-400 trasnition-all py-3 font-medium text-white rounded-xl cursor-pointer">
            Contactar
          </button>
        </form>
      </div>
    </div>
  ) : (
    <Loader />
  );
}
