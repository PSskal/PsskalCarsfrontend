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
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Main Photo */}
        <div className="relative h-64 md:h-80 bg-gray-200">
          {photos?.length > 0 ? (
            <img
              src={photos?.[0]?.url}
              alt="Vehículo principal"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-center text-gray-400">
                <Eye className="w-12 h-12 mx-auto mb-2" />
                <p>Sin fotos agregadas</p>
              </div>
            </div>
          )}

          {/* Photo Count Badge */}
          {photos?.length > 0 && (
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
              {photos?.length} foto{photos?.length !== 1 ? "s" : ""}
            </div>
          )}

          {/* Price Badge */}
          {pricing?.askingPrice && (
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
              {formatCurrency(pricing?.askingPrice)}
              {pricing?.negotiable && (
                <span className="text-sm ml-1">negociable</span>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {vehicleDetails?.make} {vehicleDetails?.model}{" "}
              {vehicleDetails?.year}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>
                {vehicleDetails?.mileage
                  ? `${vehicleDetails?.mileage?.toLocaleString()} km`
                  : "Kilometraje no especificado"}
              </span>
              <span>•</span>
              <span>{getConditionLabel(vehicleDetails?.condition)}</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Ciudad de México</span>
              </span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-1 text-green-600">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Vendedor Verificado</span>
            </div>
            <div className="flex items-center space-x-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4" />
              <span className="text-sm text-gray-600 ml-1">(4.2)</span>
            </div>
          </div>

          {/* Features */}
          {vehicleDetails?.features && vehicleDetails?.features?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Características Principales
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {vehicleDetails?.features?.slice(0, 6)?.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center space-x-2 text-sm text-gray-600"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <span>{getFeatureLabel(feature)}</span>
                  </div>
                ))}
              </div>
              {vehicleDetails?.features?.length > 6 && (
                <p className="text-sm text-blue-600 mt-2">
                  +{vehicleDetails?.features?.length - 6} características más
                </p>
              )}
            </div>
          )}

          {/* Contact Information */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Información de Contacto
                </h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <ContactIcon className="w-4 h-4" />
                    <span>{getContactMethodLabel(contact?.method)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {contact?.responseTime === "2hours" &&
                        "Respuesta en 2 horas"}
                      {contact?.responseTime === "24hours" &&
                        "Respuesta en 24 horas"}
                      {contact?.responseTime === "48hours" &&
                        "Respuesta en 2 días"}
                      {contact?.responseTime === "flexible" &&
                        "Horario flexible"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button variant="outline" size="sm">
                  Contactar
                </button>
                <button size="sm">Ver Detalles</button>
              </div>
            </div>
          </div>

          {/* Financing Options */}
          {pricing?.financeOptions && pricing?.askingPrice && (
            <div className="border-t pt-4 mt-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Opciones de Financiamiento
              </h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="font-semibold text-gray-900">
                    {formatCurrency(
                      (parseFloat(pricing?.askingPrice) / 12) * 0.08
                    )}
                  </div>
                  <div className="text-xs text-gray-500">12 meses</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="font-semibold text-gray-900">
                    {formatCurrency(
                      (parseFloat(pricing?.askingPrice) / 24) * 0.06
                    )}
                  </div>
                  <div className="text-xs text-gray-500">24 meses</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="font-semibold text-gray-900">
                    {formatCurrency(
                      (parseFloat(pricing?.askingPrice) / 36) * 0.04
                    )}
                  </div>
                  <div className="text-xs text-gray-500">36 meses</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between mt-8">
        <button variant="outline" className="flex items-center space-x-2">
          <Edit className="w-4 h-4" />
          <span>Editar Anuncio</span>
        </button>

        <div className="flex space-x-3">
          <button variant="outline">Guardar Borrador</button>
          <button className="bg-green-600 hover:bg-green-700">
            Publicar Ahora
          </button>
        </div>
      </div>
      {/* Publishing Tips */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <h4 className="font-semibold text-green-900 mb-2">
          ¡Listo para Publicar!
        </h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Tu anuncio aparecerá en las búsquedas inmediatamente</li>
          <li>
            • Recibirás notificaciones de consultas por{" "}
            {getContactMethodLabel(contact?.method)?.toLowerCase()}
          </li>
          <li>• Puedes editar o pausar tu anuncio en cualquier momento</li>
          <li>• Los anuncios completos reciben 5x más consultas</li>
        </ul>
      </div>
    </div>
  );
};

export default ListingPreview;
