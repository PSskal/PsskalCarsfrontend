"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

const Verification = ({ data, onUpdate, onVerified }) => {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const inputsRef = useRef([]);

  const handleCodeChange = (index, rawValue) => {
    const value = (rawValue || "").replace(/\D/g, ""); // keep digits only
    setVerificationCode((prev) => {
      const next = [...prev];
      next[index] = value.slice(0, 1);
      return next;
    });
    if (value && index < 5) {
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
    } else if (key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = (e.clipboardData.getData("text") || "").replace(/\D/g, "");
    if (!pasted) return;
    e.preventDefault();
    const chars = pasted.slice(0, 6).split("");
    setVerificationCode((prev) => {
      const next = [...prev];
      for (let i = 0; i < 6; i += 1) {
        next[i] = chars[i] || "";
      }
      return next;
    });
    const focusIndex = Math.min(chars.length, 5);
    inputsRef.current[focusIndex]?.focus();
  };

  const verifyCode = () => {
    const code = verificationCode.join("");
    console.log(code);

    if (code.length === 6) {
      onVerified?.(code);
    } else {
      // minimal feedback fallback
      alert("Ingresa los 6 dígitos del código");
    }
  };

  const onClose = () => {
    // Allow user to skip and proceed
    onVerified?.();
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

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">
            Verify your phone number
          </h2>
          <p className="text-gray-600 mb-6">Enter the code sent to 987678 </p>

          <div className="mb-2">
            <p className="text-sm text-gray-500 mb-4">6-digit code</p>
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

          <Button
            onClick={verifyCode}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4"
            disabled={verificationCode.some((digit) => !digit)}
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <button
            onClick={onClose}
            className="text-gray-500 text-sm hover:text-gray-700"
          >
            Skip for now, I'll do it later in Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verification;
