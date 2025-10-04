"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { useCarContext } from "@/context/CarContext";
import { carService } from "@/lib/supabase/services";
import { CheckCircle, XCircle, X, Clock } from "lucide-react";

import VehicleEditStep from "@/components/manage/VehicleEditStep";
import VerificationManage from "@/components/manage/VerificationManage";

const ManageCar = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [shouldResetInputs, setShouldResetInputs] = useState(false);
  const [pendingUpdates, setPendingUpdates] = useState({});
  const [updateFeedback, setUpdateFeedback] = useState({
    type: null,
    message: "",
    visible: false,
  });
  const [redirectCountdown, setRedirectCountdown] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { car, setCar } = useCarContext();

  const handleUpdate = (updatedFields = {}) => {
    if (!updatedFields || typeof updatedFields !== "object") return;
    setPendingUpdates((prev) => ({ ...prev, ...updatedFields }));
    setUpdateFeedback({ type: null, message: "", visible: false });
  };

  // Auto-dismiss feedback después de 5 segundos (solo para errores)
  useEffect(() => {
    if (updateFeedback.visible && updateFeedback.type === "error") {
      const timer = setTimeout(() => {
        setUpdateFeedback((prev) => ({ ...prev, visible: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [updateFeedback.visible, updateFeedback.type]);

  // Auto-redirect countdown para actualizaciones exitosas
  useEffect(() => {
    if (redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (redirectCountdown === 0 && isRedirecting) {
      // Redirect al menú principal o página anterior
      router.push("/"); // Cambia esta ruta según tu estructura
    }
  }, [redirectCountdown, isRedirecting, router]);

  const showFeedback = (type, message) => {
    setUpdateFeedback({ type, message, visible: true });
  };

  const hideFeedback = () => {
    setUpdateFeedback((prev) => ({ ...prev, visible: false }));
  };

  const startRedirectCountdown = () => {
    setRedirectCountdown(3); // 3 segundos para redirect
    setIsRedirecting(true);
  };

  const cancelRedirect = () => {
    setRedirectCountdown(0);
    setIsRedirecting(false);
  };

  const handleVerification = (code) => {
    const inputCode = String(code || "").trim();
    const carToken = String(car?.car_token || "").trim();

    if (inputCode === carToken) {
      setIsVerified(true);
      setVerificationError(""); // Limpiar error si es correcto
      setShouldResetInputs(false);
    } else {
      setVerificationError(
        "Token incorrecto. Verifica tu código e inténtalo de nuevo."
      );
      setShouldResetInputs(true);
      // Reset el flag después de un momento para permitir futuras resets
      setTimeout(() => setShouldResetInputs(false), 200);
    }
  };

  const handleSubmitUpdates = async () => {
    if (!car?.id || !Object.keys(pendingUpdates).length) {
      return;
    }

    console.log("🚀 Enviando a Supabase:", {
      carId: car.id,
      updates: pendingUpdates,
    });

    setIsSubmitting(true);
    hideFeedback();

    try {
      const updated = await carService.updateCarById(car.id, pendingUpdates);

      // Actualizar el contexto del carro con los datos actualizados
      const nextCar =
        Array.isArray(updated) && updated[0]
          ? updated[0]
          : { ...car, ...pendingUpdates };
      setCar(nextCar);

      setPendingUpdates({});
      showFeedback("success", "¡Anuncio actualizado correctamente!");

      // Iniciar countdown para redirect automático
      setTimeout(() => {
        startRedirectCountdown();
      }, 1000); // Esperar 1 segundo antes de iniciar countdown
    } catch (error) {
      console.error("Error updating car:", error);
      showFeedback(
        "error",
        "No pudimos actualizar el anuncio. Inténtalo nuevamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasPendingChanges = Object.keys(pendingUpdates).length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button
              className="bg-white hover:bg-gray-100 flex items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() => window.history.back()}
            >
              <FaArrowLeft /> Volver a todos los autos
            </Button>
            <div className="text-sm text-gray-500">Editar vehículo</div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          {!isVerified ? (
            <>
              <VerificationManage
                onVerified={handleVerification}
                shouldReset={shouldResetInputs}
              />
              {verificationError && (
                <div className="mx-8 mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {verificationError}
                </div>
              )}
            </>
          ) : (
            <VehicleEditStep data={car} onUpdate={handleUpdate} />
          )}
        </div>
        {isVerified && (
          <div className="flex justify-end mt-6">
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmitUpdates}
              disabled={isSubmitting || !hasPendingChanges || !car?.id}
            >
              {isSubmitting ? "Actualizando..." : "Actualizar Anuncio"}
            </Button>
          </div>
        )}
      </div>

      {/* Toast Notification Success con Redirect */}
      {updateFeedback.visible && updateFeedback.type === "success" && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <div className="rounded-lg border shadow-lg px-4 py-4 transition-all duration-300 transform translate-y-0 opacity-100 border-green-200 bg-green-50 text-green-800">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{updateFeedback.message}</p>
                {isRedirecting && redirectCountdown > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-green-700">
                      Regresando al menú en {redirectCountdown} segundos...
                    </span>
                  </div>
                )}
                {isRedirecting && (
                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={cancelRedirect}
                      className="h-7 px-2 text-xs border-green-300 text-green-700 hover:bg-green-100"
                    >
                      Quedarse aquí
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => router.push("/")}
                      className="h-7 px-2 text-xs bg-green-600 hover:bg-green-700 text-white"
                    >
                      Ir ahora
                    </Button>
                  </div>
                )}
              </div>
              <button
                onClick={hideFeedback}
                className="flex-shrink-0 rounded-md p-1 hover:bg-white/50 transition-colors text-green-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification Error */}
      {updateFeedback.visible && updateFeedback.type === "error" && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <div className="rounded-lg border shadow-lg px-4 py-3 pr-12 transition-all duration-300 transform translate-y-0 opacity-100 border-red-200 bg-red-50 text-red-800">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{updateFeedback.message}</p>
              </div>
              <button
                onClick={hideFeedback}
                className="flex-shrink-0 rounded-md p-1 hover:bg-white/50 transition-colors text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCar;
