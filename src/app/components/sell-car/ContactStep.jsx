import { Phone, Mail, MessageSquare, Clock, Calendar } from "lucide-react";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { Input } from "@/components/ui/input";

const ContactStep = ({ data, onUpdate }) => {
  const contactMethods = [
    {
      value: "phone",
      label: "Teléfono",
      icon: Phone,
      description: "Los compradores pueden llamarte directamente",
    },

    {
      value: "messages",
      label: "Mensajes por Wasap",
      icon: MessageSquare,
      description: "Comunicación a través de la plataforma",
    },
  ];

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Preferencias de Contacto
        </h2>
        <p className="text-gray-600">
          Configura cómo prefieres que los compradores potenciales se comuniquen
          contigo.
        </p>
      </div>
      <div className="space-y-8">
        {/* Contact Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Método de Contacto Preferido *
          </label>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Numero de Teléfono *
            </label>
            <Input
              type="number"
              value={data?.phone || ""}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Ej: 50000"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {contactMethods?.map((method) => {
              const Icon = method?.icon;
              const isSelected = data?.method === method?.value;

              return (
                <div
                  key={method?.value}
                  className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                    isSelected
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400 bg-white"
                  }`}
                  onClick={() => handleInputChange("method", method?.value)}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      <FaExpandArrowsAlt
                        className={`w-5 h-5 ${
                          isSelected ? "text-blue-600" : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div
                        className={`font-medium ${
                          isSelected ? "text-blue-900" : "text-gray-900"
                        }`}
                      >
                        {method?.label}
                      </div>
                      <div
                        className={`text-sm ${
                          isSelected ? "text-blue-700" : "text-gray-500"
                        }`}
                      >
                        {method?.description}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">
            Consejos para Mejor Comunicación:
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>
              • Responder rápido a las consultas aumenta las probabilidades de
              venta
            </li>
            <li>• Ser flexible con horarios atrae más compradores serios</li>
            <li>
              • Los mensajes de la app proporcionan un historial de comunicación
              seguro
            </li>
            <li>• Confirma siempre las citas con anticipación</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactStep;
