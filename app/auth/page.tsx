"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { departments } from "@/lib/store";

import SignIn from "./signin";

const scriptures = [
  {
    text: "Trust in the Lord with all your heart, and lean not on your own understanding.",
    ref: "Proverbs 3:5",
  },
  {
    text: "For where two or three gather in my name, there am I with them.",
    ref: "Matthew 18:20",
  },
  {
    text: "I can do all things through Christ who strengthens me.",
    ref: "Philippians 4:13",
  },
];

function GeometricArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-10">
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
        <circle cx="250" cy="250" r="200" stroke="#C9A84C" strokeWidth="0.5" />
        <circle cx="180" cy="220" r="150" stroke="#C9A84C" strokeWidth="0.5" />
        <circle cx="320" cy="280" r="150" stroke="#C9A84C" strokeWidth="0.5" />
        <polygon
          points="250,80 400,380 100,380"
          stroke="#C9A84C"
          strokeWidth="0.5"
          fill="none"
        />
        <polygon
          points="250,420 100,120 400,120"
          stroke="#C9A84C"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>
    </div>
  );
}

function ScriptureCarousel() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const cycle = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % scriptures.length);
      setFade(true);
    }, 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(cycle, 5000);
    return () => clearInterval(interval);
  }, [cycle]);

  return (
    <div
      className={`max-w-md text-center transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
    >
      <blockquote className="font-serif italic text-cream/90 text-xl md:text-2xl leading-relaxed">
        {`"${scriptures[index].text}"`}
      </blockquote>
      <p className="font-mono text-gold/60 text-xs mt-4 tracking-wider">
        {scriptures[index].ref}
      </p>
    </div>
  );
}

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
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
              onClick={() => setMode("login")}
              className={`font-sans text-sm pb-1 transition-all duration-200 ${
                mode === "login"
                  ? "text-cream border-b-2 border-gold"
                  : "text-muted-foreground border-b-2 border-transparent"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("register")}
              className={`font-sans text-sm pb-1 transition-all duration-200 ${
                mode === "register"
                  ? "text-cream border-b-2 border-gold"
                  : "text-muted-foreground border-b-2 border-transparent"
              }`}
            >
              Create Account
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
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={inputClass}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className={inputClass}
              required
            />

            {mode === "login" && (
              <button
                type="button"
                className="font-sans text-xs text-gold self-end hover:text-cream transition-colors"
              >
                Forgot password?
              </button>
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
