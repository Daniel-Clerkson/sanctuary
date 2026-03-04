"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { departments } from "@/lib/store";
import ScriptureCarousel from "@/components/scripture-carousel";
import GeometricArt from "@/components/geometric-art";

export default function AuthPage() {
  const [mode, setMode] = useState("register")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "General",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  const inputClass =
    "w-full h-12 px-4 bg-surface-elevated border border-[rgba(255,255,255,0.06)] rounded-xl text-cream font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold/40 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)] transition-all duration-200";

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel — visual */}
      <div className="hidden lg:flex lg:w-[60%] relative items-center justify-center adire-pattern overflow-hidden">
        <GeometricArt />
        <div className="relative z-10">
          <ScriptureCarousel />
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12">
        <div className="max-w-sm w-full mx-auto lg:mx-0">
          {/* Logo */}
          <h2 className="font-serif text-gold text-xl mb-12">Sanctuary</h2>

          {/* Toggle */}
          <div className="flex gap-6 mb-8">
            <button
              onClick={() => setMode("register")}
              className={`font-sans text-sm pb-1 transition-all duration-200 ${
                mode === "register"
                  ? "text-cream border-b-2 border-gold"
                  : "text-muted-foreground border-b-2 border-transparent"
              }`}
            >
              Complete Onboarding
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "register" && (
              <>
                <input
                  type="text"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={inputClass}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={inputClass}
                />
                <select
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className={inputClass}
                >
                  {departments.map((d) => (
                    <option
                      key={d}
                      value={d}
                      className="bg-surface-elevated text-cream"
                    >
                      {d}
                    </option>
                  ))}
                </select>
              </>
            )}

            <button
              type="submit"
              className="w-full cursor-pointer h-12 bg-gold text-[#0A0A0A] font-sans font-medium text-sm rounded-xl hover:scale-[1.02] transition-all duration-200 mt-2"
            >
              {"Continue \u2192"}
            </button>

            <p className="font-sans text-[11px] text-muted-foreground text-center mt-2">
              By joining you agree to our community guidelines
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
