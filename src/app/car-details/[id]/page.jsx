"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaCarAlt } from "react-icons/fa";
import { FaRegCalendarTimes } from "react-icons/fa";
import { IoIosColorFill } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { VscSymbolProperty } from "react-icons/vsc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/carros/Loader";
import { useCarContext } from "@/context/CarContext";
import { carService } from "@/lib/supabase/services";

const INFO_ICON_CLASSES = "text-primary text-xl";

export default function CarDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { cars, car, setCar } = useCarContext();
  const [images, setImages] = useState([]);
  const { getImagesByCarId, getCarById } = carService;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const numericId = Number(id);
      const carId = Number.isNaN(numericId) ? id : numericId;

      let found = cars.find((current) => current.id === carId);
      if (!found) {
        found = cars.find((current) => String(current.id) === String(id));
      }

      let carData = found;
      if (!found) {
        carData = await getCarById(carId);
      }
      if (carData) {
        setCar(carData);
      }

      const carImages = await getImagesByCarId(carId);
      let imageUrls = Array.isArray(carImages)
        ? carImages.map((image) => image.image_url)
        : [];

      if (carData?.image && !imageUrls.includes(carData.image)) {
        imageUrls = [carData.image, ...imageUrls];
      } else if (carData?.image) {
        imageUrls = [carData.image, ...imageUrls.filter((url) => url !== carData.image)];
      }

      setImages(imageUrls);
    };

    fetchData();
  }, [cars, getCarById, getImagesByCarId, id, setCar]);

  const highlights = useMemo(() => {
    if (!car) return [];

    return [
      {
        icon: <TbCategoryFilled className={INFO_ICON_CLASSES} />,
        label: "Categoría",
        value: car.category,
      },
      {
        icon: <FaRegCalendarTimes className={INFO_ICON_CLASSES} />,
        label: "Año Modelo",
        value: car.year,
      },
      {
        icon: <IoIosColorFill className={INFO_ICON_CLASSES} />,
        label: "Color",
        value: car.color,
      },
      {
        icon: <BsFillFuelPumpFill className={INFO_ICON_CLASSES} />,
        label: "Combustible",
        value: car.fuel_type,
      },
      {
        icon: <FaCarAlt className={INFO_ICON_CLASSES} />,
        label: "Transmisión",
        value: car.transmission,
      },
      {
        icon: <MdLocationPin className={INFO_ICON_CLASSES} />,
        label: "Ubicación",
        value: car.location,
      },
      {
        icon: <FaCarAlt className={INFO_ICON_CLASSES} />,
        label: "Kilometraje",
        value: car.mileage?.toLocaleString("es-PE") ? `${car.mileage.toLocaleString("es-PE")} km` : "N/D",
      },
      {
        icon: <VscSymbolProperty className={INFO_ICON_CLASSES} />,
        label: "Tracción",
        value: car.drive_type,
      },
    ];
  }, [car]);

  if (!car) {
    return <Loader />;
  }

  return (
    <div className="bg-background px-6 pb-12 pt-8 md:px-16 lg:px-24 xl:px-32">
      <Button
        variant="ghost"
        size="sm"
        className="mb-8 w-fit gap-2 text-muted-foreground"
        onClick={() => router.back()}
      >
        <FaArrowLeft /> Volver a todos los autos
      </Button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
        <section className="space-y-8 lg:col-span-2">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Carousel className="w-full">
                <CarouselContent>
                  {images.length > 0 ? (
                    images.map((imageUrl, index) => (
                      <CarouselItem key={imageUrl ?? index}>
                        <Image
                          src={imageUrl}
                          alt={`auto-img-${index}`}
                          className="h-auto w-full object-cover"
                          width={1024}
                          height={512}
                          priority={index === 0}
                        />
                      </CarouselItem>
                    ))
                  ) : (
                    <CarouselItem>
                      <div className="flex h-72 items-center justify-center bg-muted text-muted-foreground">
                        Sin imágenes disponibles
                      </div>
                    </CarouselItem>
                  )}
                </CarouselContent>
                {images.length > 1 ? (
                  <>
                    <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2" />
                    <CarouselNext className="right-4 top-1/2 -translate-y-1/2" />
                  </>
                ) : null}
              </Carousel>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl font-bold">
                {car.brand} {car.model}
              </CardTitle>
              <p className="text-sm text-muted-foreground">Detalles del vehículo</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Separator className="my-4" />
                <h2 className="text-lg font-semibold">Información del vehículo</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {highlights.map((item) => (
                  <Card key={`${item.label}-${item.value ?? "unknown"}`} className="shadow-none">
                    <CardContent className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
                      <span>{item.icon}</span>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {item.value || "N/D"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {car.description ? (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Información adicional</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{car.description}</p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </section>

        <aside className="lg:col-span-1 lg:pl-2">
          <Card className="sticky top-28">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Precio: {car.price.toLocaleString("es-PE")}{" "}
                {car.currency === "USD" ? "Dólares" : "Soles"}
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-4 pt-6">
              <Button asChild className="w-full" size="lg">
                <Link
                  href={`https://wa.me/${car.contact_phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contactar por WhatsApp
                </Link>
              </Button>
              <Button
                className="w-full"
                size="lg"
                variant="secondary"
                onClick={() => router.push(`/manage/${car.id}`)}
              >
                Soy el dueño, cambiar estado del carro
              </Button>
            </CardContent>
            <CardFooter className="justify-center text-xs text-muted-foreground">
              Nos pondremos en contacto contigo lo antes posible.
            </CardFooter>
          </Card>
        </aside>
      </div>
    </div>
  );
}