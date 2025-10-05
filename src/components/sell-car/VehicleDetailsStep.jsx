import React, { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OTHER_OPTION = "Otro";

const CAR_MAKES = [
  "Toyota",
  "Hyundai",
  "Kia",
  "Chevrolet",
  "Nissan",
  "Suzuki",
  "Volkswagen",
  "Honda",
  "Mazda",
  "Renault",
  "Mitsubishi",
  "Ford",
  "Chery",
  "Great Wall",
  "JAC",
  "BYD",
  "Geely",
  "Subaru",
  "Peugeot",
  "Fiat",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Jeep",
  "Dodge",
  "Chrysler",
  OTHER_OPTION,
];

const VEHICLE_CATEGORIES = [
  "Sedán",
  "SUV",
  "Hatchback",
  "Pickup",
  "Convertible",
  "Van",
  "Wagon",
  OTHER_OPTION,
];

const VEHICLE_COLORS = [
  "Negro",
  "Blanco",
  "Gris",
  "Plata",
  "Rojo",
  "Azul",
  OTHER_OPTION,
];

const FUEL_TYPES = ["Gasolina", "Diésel", "Híbrido", "Eléctrico", "GLP", "GNV"];

const TRANSMISSIONS = ["Automática", "Mecánica"];

const TRACTIONS = ["Delantera", "Trasera", "4x4", "AWD"];

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from(
  { length: 30 },
  (_, index) => CURRENT_YEAR - index
);

const FieldGroup = ({
  children,
  className,
  helperText,
  id,
  label,
  required,
}) => (
  <div className={`space-y-2${className ? ` ${className}` : ""}`}>
    <Label htmlFor={id} className="text-sm font-semibold text-slate-700">
      {label}
      {required ? " *" : ""}
    </Label>
    {children(id)}
    {helperText ? <p className="text-xs text-slate-500">{helperText}</p> : null}
  </div>
);

const VehicleDetailsStep = ({ data = {}, onUpdate }) => {
  const handleFieldChange = useCallback(
    (field, value) => {
      onUpdate({ [field]: value });
    },
    [onUpdate]
  );

  const handleSelectWithOther = useCallback(
    (field, otherField) => (value) => {
      handleFieldChange(field, value);
      if (value !== OTHER_OPTION) {
        handleFieldChange(otherField, "");
      }
    },
    [handleFieldChange]
  );

  return (
    <div className="space-y-8 p-8">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900">
          Detalles del Vehículo
        </h2>
        <p className="text-slate-600">
          Proporciona información básica sobre tu vehículo para ayudar a los
          compradores.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <FieldGroup id="vehicle-make" label="Marca" required>
          {(controlId) => (
            <Select
              value={data.make ?? ""}
              onValueChange={handleSelectWithOther("make", "customMake")}
            >
              <SelectTrigger id={controlId} className="w-full">
                <SelectValue placeholder="Seleccionar marca" />
              </SelectTrigger>
              <SelectContent>
                {CAR_MAKES.map((make) => (
                  <SelectItem key={make} value={make}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FieldGroup>

        <FieldGroup id="vehicle-model" label="Modelo" required>
          {(controlId) => (
            <Input
              id={controlId}
              value={data.model ?? ""}
              onChange={(event) =>
                handleFieldChange("model", event.target.value)
              }
              placeholder="Ej: Tucson, Hilux, Captiva, etc."
              autoComplete="off"
            />
          )}
        </FieldGroup>

        <FieldGroup id="vehicle-year" label="Año" required>
          {(controlId) => (
            <Select
              value={data.year ? String(data.year) : ""}
              onValueChange={(value) => handleFieldChange("year", value)}
            >
              <SelectTrigger id={controlId} className="w-full">
                <SelectValue placeholder="Seleccionar año" />
              </SelectTrigger>
              <SelectContent>
                {YEAR_OPTIONS.map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FieldGroup>

        <FieldGroup id="vehicle-category" label="Tipo de vehículo" required>
          {(controlId) => (
            <Select
              value={data.category ?? ""}
              onValueChange={(value) => handleFieldChange("category", value)}
            >
              <SelectTrigger id={controlId} className="w-full">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {VEHICLE_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FieldGroup>

        <FieldGroup id="vehicle-version" label="Versión / Línea" required>
          {(controlId) => (
            <Input
              id={controlId}
              value={data.version ?? ""}
              onChange={(event) =>
                handleFieldChange("version", event.target.value)
              }
              placeholder="Ej: Limited, Sport, GLS, etc."
              autoComplete="off"
            />
          )}
        </FieldGroup>

        <FieldGroup id="vehicle-body" label="Carrocería" required>
          {(controlId) => (
            <Input
              id={controlId}
              value={data.body_type ?? ""}
              onChange={(event) =>
                handleFieldChange("body_type", event.target.value)
              }
              placeholder="Ej: 5 puertas, doble cabina, coupé, etc."
              autoComplete="off"
            />
          )}
        </FieldGroup>

        <FieldGroup
          id="vehicle-mileage"
          label="Kilometraje"
          required
          helperText="Indica el kilometraje actual del vehículo."
        >
          {(controlId) => (
            <Input
              id={controlId}
              type="number"
              min="0"
              step="1"
              value={data.mileage ?? ""}
              onChange={(event) =>
                handleFieldChange("mileage", event.target.value)
              }
              placeholder="Ej: 45 000"
              inputMode="numeric"
            />
          )}
        </FieldGroup>

        <FieldGroup
          id="vehicle-engine"
          label="Motor"
          required
          helperText="Ej: 2.0L Turbo, 1.6L, 3.5L V6, etc."
        >
          {(controlId) => (
            <Input
              id={controlId}
              value={data.engine ?? ""}
              onChange={(event) =>
                handleFieldChange("engine", event.target.value)
              }
              placeholder="Describe la cilindrada o referencia del motor"
              autoComplete="off"
            />
          )}
        </FieldGroup>

        <FieldGroup id="vehicle-color" label="Color" required>
          {(controlId) => (
            <Select
              value={data.color ?? ""}
              onValueChange={handleSelectWithOther("color", "customColor")}
            >
              <SelectTrigger id={controlId} className="w-full">
                <SelectValue placeholder="Seleccionar color" />
              </SelectTrigger>
              <SelectContent>
                {VEHICLE_COLORS.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FieldGroup>

        <FieldGroup id="vehicle-fuel" label="Tipo de combustible" required>
          {(controlId) => (
            <Select
              value={data.fuel_type ?? ""}
              onValueChange={(value) => handleFieldChange("fuel_type", value)}
            >
              <SelectTrigger id={controlId} className="w-full">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {FUEL_TYPES.map((fuel) => (
                  <SelectItem key={fuel} value={fuel}>
                    {fuel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FieldGroup>

        <FieldGroup id="vehicle-transmission" label="Transmisión" required>
          {(controlId) => (
            <Select
              value={data.transmission ?? ""}
              onValueChange={(value) =>
                handleFieldChange("transmission", value)
              }
            >
              <SelectTrigger id={controlId} className="w-full">
                <SelectValue placeholder="Seleccionar transmisión" />
              </SelectTrigger>
              <SelectContent>
                {TRANSMISSIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FieldGroup>

        <FieldGroup id="vehicle-traction" label="Tipo de tracción" required>
          {(controlId) => (
            <Select
              value={data.traction ?? ""}
              onValueChange={(value) => handleFieldChange("traction", value)}
            >
              <SelectTrigger id={controlId} className="w-full">
                <SelectValue placeholder="Seleccionar tracción" />
              </SelectTrigger>
              <SelectContent>
                {TRACTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FieldGroup>

        {data.make === OTHER_OPTION ? (
          <FieldGroup
            id="vehicle-custom-make"
            label="Especifica la marca"
            required
            helperText="Escribe el nombre exacto de la marca de tu vehículo."
            className="md:col-span-2"
          >
            {(controlId) => (
              <Input
                id={controlId}
                value={data.customMake ?? ""}
                onChange={(event) =>
                  handleFieldChange("customMake", event.target.value)
                }
                placeholder="Ej: Geely, BYD, MG, etc."
                autoComplete="off"
              />
            )}
          </FieldGroup>
        ) : null}

        {data.color === OTHER_OPTION ? (
          <FieldGroup
            id="vehicle-custom-color"
            label="Especifica el color"
            required
            helperText="Describe el color principal del vehículo."
            className="md:col-span-2"
          >
            {(controlId) => (
              <Input
                id={controlId}
                value={data.customColor ?? ""}
                onChange={(event) =>
                  handleFieldChange("customColor", event.target.value)
                }
                placeholder="Ej: Verde metalizado, Dorado, Multicolor, etc."
                autoComplete="off"
              />
            )}
          </FieldGroup>
        ) : null}
      </section>

      <aside className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-900">
        <p className="text-sm">
          <strong>Consejo:</strong> Proporciona información precisa y completa
          para atraer a más compradores interesados.
        </p>
      </aside>
    </div>
  );
};

export default VehicleDetailsStep;
