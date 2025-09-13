import React, { useState, useCallback } from "react";
import { Upload, X, Camera, Image as ImageIcon, RotateCw } from "lucide-react";

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

  const toggle360View = (photoId) => {
    const updatedPhotos = (data || [])?.map((photo) =>
      photo?.id === photoId ? { ...photo, is360: !photo?.is360 } : photo
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
  const maxPhotos = 20;

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
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="p-3 bg-gray-100 rounded-full">
              <Upload className="w-8 h-8 text-gray-500" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                Arrastra y suelta tus fotos aquí
              </p>
              <p className="text-gray-500">
                o haz clic para seleccionar archivos
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                variant="outline"
                onClick={() => document.getElementById("file-input")?.click()}
                disabled={uploading}
                className="flex items-center space-x-2"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Seleccionar Fotos</span>
              </button>
              <button
                variant="outline"
                onClick={() => document.getElementById("camera-input")?.click()}
                disabled={uploading}
                className="flex items-center space-x-2"
              >
                <Camera className="w-4 h-4" />
                <span>Tomar Foto</span>
              </button>
            </div>
          </div>

          <input
            id="file-input"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e?.target?.files)}
          />

          <input
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
                className="relative group bg-gray-100 rounded-lg overflow-hidden aspect-square"
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
                  className="w-full h-full object-cover"
                />

                {/* Main Photo Badge */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    Principal
                  </div>
                )}

                {/* 360 Badge */}
                {photo?.is360 && (
                  <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                    <RotateCw className="w-3 h-3" />
                    <span>360°</span>
                  </div>
                )}

                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center space-x-2">
                  <button
                    size="sm"
                    variant="outline"
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 hover:bg-gray-100"
                    onClick={() => toggle360View(photo?.id)}
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                  <button
                    size="sm"
                    variant="outline"
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-red-600 hover:bg-red-50"
                    onClick={() => removePhoto(photo?.id)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
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
