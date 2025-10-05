import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CarImageCarousel = ({ images = [], carTitle = "Vehículo" }) => {
  if (!images || images.length === 0) {
    return (
      <div className="relative overflow-hidden lg:h-[38rem] rounded-lg bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Sin imágenes disponibles</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden lg:h-[38rem] rounded-lg">
      <Carousel className="overflow-hidden relative w-full rounded-lg mb-8 bg-gray-100">
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={idx}>
              <Image
                src={img}
                alt={`${carTitle} - imagen ${idx + 1}`}
                className="w-full h-auto object-cover"
                width={400}
                height={192}
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="cursor-pointer absolute top-1/2 left-4 -translate-y-1/2 z-30 bg-white/30 rounded-full p-2 hover:bg-orange-400 hover:text-white transition-colors" />
            <CarouselNext className="cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 z-30 bg-white/30 rounded-full p-2 hover:bg-orange-400 hover:text-white transition-colors" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default CarImageCarousel;
