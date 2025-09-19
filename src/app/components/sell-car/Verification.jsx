"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

const Verification = ({ data, onUpdate, onVerified }) => {
  const CODE_LENGTH = 5;
  const [verificationCode, setVerificationCode] = useState(
    Array(CODE_LENGTH).fill("")
  );

  const inputsRef = useRef([]);

  const handleCodeChange = (index, rawValue) => {
    const value = (rawValue || "").replace(/\D/g, ""); // keep digits only
    setVerificationCode((prev) => {
      const next = [...prev];
      next[index] = value.slice(0, 1);
      return next;
    });
    if (value && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    const key = e.key;
    if (key === "Backspace" || key === "Delete") {
      // If current empty, move back
      if (!verificationCode[index] && index > 0) {
        e.preventDefault();
        inputsRef.current[index - 1]?.focus();
        setVerificationCode((prev) => {
          const next = [...prev];
          next[index - 1] = "";
          return next;
        });
      }
    } else if (key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
    } else if (key === "ArrowRight" && index < CODE_LENGTH - 1) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = (e.clipboardData.getData("text") || "").replace(/\D/g, "");
    if (!pasted) return;
    e.preventDefault();
    const chars = pasted.slice(0, CODE_LENGTH).split("");
    setVerificationCode((prev) => {
      const next = [...prev];
      for (let i = 0; i < CODE_LENGTH; i += 1) {
        next[i] = chars[i] || "";
      }
      return next;
    });
    const focusIndex = Math.min(chars.length, CODE_LENGTH - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  const verifyCode = () => {
    const code = verificationCode.join("");
    if (code.length !== CODE_LENGTH) {
      alert("Ingresa los 5 dígitos del código");
      return;
    }
    onVerified?.(code);
  };

  const onClose = () => {
    // Allow user to skip and proceed
    onVerified?.();
  };
  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Verificación por WhatsApp
        </h2>
      </div>
      <div className="space-y-8">
        {/* Contact Method */}

        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Ingresa el código de 5 dígitos que te enviamos por WhatsApp.
          </p>

          <div className="mb-2">
            <p className="text-sm text-gray-500 mb-4">Código de 5 dígitos</p>
            <div className="flex justify-center gap-3 mb-6">
              {verificationCode.map((digit, index) => (
                <Input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  className="w-12 h-12 text-center text-lg font-medium border-2 focus:border-purple-600"
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={verifyCode}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={verificationCode.some((digit) => !digit)}
            >
              Verificar código
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="text-sm text-gray-600">
              ¿No tienes el código? Pídelo por WhatsApp:
            </div>
            <a
              href="https://wa.me/51900878539?text=Hola%2C%20necesito%20el%20c%C3%B3digo%20de%20verificaci%C3%B3n%20para%20vender%20mi%20carro."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-md border border-green-500 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Solicitar código por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
