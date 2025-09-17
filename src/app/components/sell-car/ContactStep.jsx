import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContactStep = ({ data, onUpdate }) => {
  const locations = [
    "Lima",
    "Arequipa",
    "Cusco",
    "Trujillo",
    "Piura",
    "Chiclayo",
    "Iquitos",
    "Tacna",
    "Otra",
  ];
  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Preferencias Generales
        </h2>
      </div>
      <div className="space-y-8">
        {/* Contact Method */}
        <div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Numero de Teléfono *
            </label>
            <Input
              type="number"
              value={data?.phone || ""}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Ej: 987654321"
              required
            />
          </div>
        </div>

        {/* Pricing Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio de Venta *
            </label>
            <div className="relative flex justify-between gap-2">
              <Select
                value={data?.currency || "USD"}
                onValueChange={(value) => handleInputChange("currency", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Moneda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">Dolares</SelectItem>
                  <SelectItem value="PEN">Soles</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="number"
                value={data?.askingPrice || ""}
                onChange={(e) =>
                  handleInputChange("askingPrice", e?.target?.value)
                }
                placeholder="Ej: 200000"
              />
            </div>
          </div>
        </div>

        {/* Ubicación */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ubicación *
          </label>
          <Select
            value={data?.location || ""}
            onValueChange={(value) => handleInputChange("location", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar ubicación" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* información adicional */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Información Adicional
          </label>
          <Textarea
            value={data?.additionalInfo || ""}
            onChange={(e) =>
              handleInputChange("additionalInfo", e.target.value)
            }
            placeholder="Proporciona información adicional sobre el vehículo"
            className="border rounded px-2 py-1 text-gray-700"
          />
        </div>

        {/* Tips */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">
            Consejos para Mejor Comunicación:
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>
              • Responder rápido a las consultas aumenta las probabilidades de
              venta
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactStep;
