import React from "react";
import {
  Edit,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Star,
  Shield,
  Eye,
} from "lucide-react";
import CarCard from "../carros/CarCard";

const ListingPreview = ({ data }) => {
  const formatCurrency = (amount) => {
    if (!amount) return "No especificado";
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const getConditionLabel = (condition) => {
    const conditions = {
      excellent: "Excelente",
      good: "Bueno",
      fair: "Regular",
      poor: "Necesita reparaciones",
    };
    return conditions?.[condition] || condition;
  };

  const getContactMethodIcon = (method) => {
    switch (method) {
      case "phone":
        return Phone;
      case "email":
        return Mail;
      case "messages":
        return MessageSquare;
      default:
        return Phone;
    }
  };

  const getContactMethodLabel = (method) => {
    const methods = {
      phone: "Teléfono",
      email: "Email",
      messages: "Mensajes de la App",
    };
    return methods?.[method] || method;
  };

  const getFeatureLabel = (featureId) => {
    const features = {
      air_conditioning: "Aire Acondicionado",
      power_steering: "Dirección Asistida",
      power_windows: "Ventanas Eléctricas",
      central_locking: "Seguros Centralizados",
      abs: "Frenos ABS",
      airbags: "Airbags",
      cruise_control: "Control de Crucero",
      bluetooth: "Bluetooth",
      navigation: "Sistema de Navegación",
      sunroof: "Techo Solar",
      leather_seats: "Asientos de Cuero",
      heated_seats: "Asientos Calefaccionados",
    };
    return features?.[featureId] || featureId;
  };

  const vehicleDetails = data?.vehicleDetails || {};
  const photos = data?.photos || [];
  const pricing = data?.pricing || {};
  const contact = data?.contact || {};

  const ContactIcon = getContactMethodIcon(contact?.method);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Vista Previa del Anuncio
        </h2>
        <p className="text-gray-600">
          Revisa cómo verán tu anuncio los compradores potenciales.
        </p>
      </div>
      {/* Listing Preview Card */}
      {/* Preview del carro */}
      <div className="max-w-md mx-auto mb-8">
        <CarCard
          car={{
            id: "preview",
            image: photos[0]?.url || photos[0] || "/placeholder.svg",
            brand: vehicleDetails.make,
            model: vehicleDetails.model,
            year: vehicleDetails.year,
            category: vehicleDetails.category,
            price: Number(data?.contact?.askingPrice) || 0,
            currency: data?.contact?.currency || "USD",
            is_available: true,
            color: vehicleDetails.color,
            fuel_type: vehicleDetails.fuel_type,
            transmission: vehicleDetails.transmission,
            location: data?.contact?.location,
            posted_at: new Date().toISOString(),
          }}
          disableNavigation
        />
      </div>
      {/* Action Buttons */}
      {/* <div className="flex justify-between mt-8">
        <button variant="outline" className="flex items-center space-x-2">
          <Edit className="w-4 h-4" />
          <span>Editar Anuncio</span>
        </button>
      </div> */}
      {/* Publishing Tips */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <h4 className="font-semibold text-green-900 mb-2">
          ¡Listo para Publicar!
        </h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Tu anuncio aparecerá en las búsquedas inmediatamente</li>
          <li>• Recibirás notificaciones de consultas por</li>

          <li>• Los anuncios completos reciben 5x más consultas</li>
        </ul>
      </div>
    </div>
  );
};

export default ListingPreview;
