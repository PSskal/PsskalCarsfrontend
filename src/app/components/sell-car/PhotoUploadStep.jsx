import React, { useState, useCallback } from "react";
import { Upload, X, Camera, Image as ImageIcon, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PhotoUploadStep = ({ data, onUpdate }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);

    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  }, []);

  const handleFiles = async (files) => {
    setUploading(true);
    const newPhotos = [];

    for (let i = 0; i < files?.length; i++) {
      const file = files?.[i];
      if (file?.type?.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPhotos?.push({
            id: Date.now() + i,
            url: e?.target?.result,
            file: file,
            name: file?.name,
            size: file?.size,
            is360: false,
          });

          if (
            newPhotos?.length === files?.length ||
            newPhotos?.length + (data?.length || 0) >= 20
          ) {
            onUpdate([...(data || []), ...newPhotos]);
            setUploading(false);
          }
        };
        reader?.readAsDataURL(file);
      }
    }
  };

  const removePhoto = (photoId) => {
    const updatedPhotos = (data || [])?.filter(
      (photo) => photo?.id !== photoId
    );
    onUpdate(updatedPhotos);
  };

  const reorderPhotos = (fromIndex, toIndex) => {
    const updatedPhotos = [...(data || [])];
    const [removed] = updatedPhotos?.splice(fromIndex, 1);
    updatedPhotos?.splice(toIndex, 0, removed);
    onUpdate(updatedPhotos);
  };

  const photos = data || [];
  const maxPhotos = 5;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Fotos del Vehículo
        </h2>
        <p className="text-gray-600">
          Sube hasta {maxPhotos} fotos de alta calidad. La primera foto será la
          imagen principal.
        </p>
      </div>
      {/* Upload Area */}
      {photos?.length < maxPhotos && (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            dragActive
              ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 scale-105 shadow-lg"
              : "border-gray-300 hover:border-blue-400 hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50 hover:shadow-md"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-4">
            <div
              className={`p-4 rounded-full transition-all duration-300 ${
                uploading
                  ? "bg-blue-100 animate-pulse"
                  : dragActive
                  ? "bg-blue-200"
                  : "bg-gray-100"
              }`}
            >
              <Upload
                className={`w-8 h-8 transition-colors duration-300 ${
                  uploading
                    ? "text-blue-600 animate-bounce"
                    : dragActive
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              />
            </div>
            <div>
              <p
                className={`text-lg font-medium transition-colors duration-300 ${
                  uploading
                    ? "text-blue-600"
                    : dragActive
                    ? "text-blue-700"
                    : "text-gray-900"
                }`}
              >
                {uploading
                  ? "📷 Subiendo tus fotos..."
                  : dragActive
                  ? "¡Suelta las fotos aquí!"
                  : "Arrastra y suelta tus fotos aquí"}
              </p>
              <p
                className={`transition-colors duration-300 ${
                  uploading
                    ? "text-blue-500"
                    : dragActive
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {uploading
                  ? "Procesando imágenes, por favor espera..."
                  : "o haz clic en los botones de abajo"}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => document.getElementById("file-input")?.click()}
                disabled={uploading}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ImageIcon className="w-5 h-5" />
                <span className="font-medium">Seleccionar Fotos</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById("camera-input")?.click()}
                disabled={uploading}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0 hover:from-purple-700 hover:to-purple-800 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Camera className="w-5 h-5" />
                <span className="font-medium">Tomar Foto</span>
              </Button>
            </div>
          </div>

          <Input
            id="file-input"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e?.target?.files)}
          />

          <Input
            id="camera-input"
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => handleFiles(e?.target?.files)}
          />
        </div>
      )}
      {/* Photo Grid */}
      {photos?.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Fotos Subidas ({photos?.length}/{maxPhotos})
            </h3>
            <p className="text-sm text-gray-500">
              Arrastra las fotos para reordenar
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos?.map((photo, index) => (
              <div
                key={photo?.id}
                className="relative group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden aspect-square shadow-sm hover:shadow-xl transition-all duration-300 cursor-move border-2 border-transparent hover:border-blue-200"
                draggable
                onDragStart={(e) =>
                  e?.dataTransfer?.setData("text/plain", index)
                }
                onDragOver={(e) => e?.preventDefault()}
                onDrop={(e) => {
                  e?.preventDefault();
                  const fromIndex = parseInt(
                    e?.dataTransfer?.getData("text/plain")
                  );
                  reorderPhotos(fromIndex, index);
                }}
              >
                <img
                  src={photo?.url}
                  alt={`Vehículo ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Main Photo Badge */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs px-3 py-1 rounded-full shadow-lg font-medium">
                    Principal
                  </div>
                )}

                {/* Floating Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-8 h-8 p-0 bg-white/90 backdrop-blur-sm border-0 shadow-lg text-gray-700 hover:bg-red-50 hover:text-red-600 hover:shadow-xl transition-all duration-200"
                    onClick={() => removePhoto(photo?.id)}
                    title="Eliminar foto"
                  >
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </div>

                {/* Subtle overlay for better button visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Tips */}
      <div className="mt-8 space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">
            Consejos para Mejores Fotos:
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Toma fotos en exteriores con buena iluminación</li>
            <li>• Incluye fotos del exterior desde todos los ángulos</li>
            <li>• Muestra el interior, motor y maletero</li>
            <li>• Enfoca cualquier daño o desgaste visible</li>
          </ul>
        </div>

        {photos?.length > 0 && (
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>¡Excelente!</strong> Los anuncios con {photos?.length}+
              fotos reciben un 40% más de consultas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUploadStep;
