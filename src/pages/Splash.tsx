import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useClinic } from "@/hooks/useClinic";

interface SplashProps {
  onComplete: () => void;
}

export default function Splash({ onComplete }: SplashProps) {
  const clinic = useClinic();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-start pt-[8dvh]"
          style={{
            backgroundImage: "url('/app-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          {/* Floating bubbles (absolute, unaffected by flex flow) */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 100, opacity: 0, scale: 0.5 }}
              animate={{
                y: -20,
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.8],
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute"
              style={{
                left: `${15 + i * 13}%`,
                bottom: "30%",
                width: `${20 + i * 5}px`,
                height: `${20 + i * 5}px`,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.8), rgba(135,206,250,0.3))",
              }}
            />
          ))}

          {/* Logo + glow wrapper */}
          <div className="relative flex items-center justify-center z-10">
            {/* Soft white radial glow lifts the logo off the background */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "120%",
                height: "120%",
                background:
                  "radial-gradient(ellipse at center, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0) 70%)",
              }}
            />

            {/* Logo — 35% bigger, gentle scale-in */}
            <motion.img
              src="/brushpop-logo.png"
              alt="BrushPop"
              className="drop-shadow-2xl relative"
              style={{ width: "260px", height: "auto" }}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          {/* Tagline — directly below BrushPop logo */}
          <motion.p
            className="relative z-10"
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: "18px",
              color: "#ffffff",
              fontWeight: 500,
              marginTop: "16px",
              textAlign: "center",
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            Pop the plaque. Reveal the prize.
          </motion.p>

          {/* Clinic sponsor block */}
          {clinic.showBranding && (
            <motion.div
              className="relative z-10 flex flex-col items-center w-full"
              style={{ marginTop: "20px", paddingLeft: "32px", paddingRight: "32px" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {/* ——— Presented by ——— */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                  marginBottom: "12px",
                }}
              >
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.35)" }} />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  Presented by
                </span>
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.35)" }} />
              </div>

              {/* Clinic logo — raw image, only when a real logo is set */}
              {clinic.logoUrl && clinic.logoUrl !== "/brushpop-logo.png" && (
                <img
                  src={clinic.logoUrl}
                  alt={clinic.name}
                  style={{
                    width: "160px",
                    height: "auto",
                    display: "block",
                    marginBottom: "8px",
                  }}
                />
              )}

              {/* Clinic name */}
              <p
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "#ffffff",
                  textAlign: "center",
                  lineHeight: 1.25,
                  margin: 0,
                }}
              >
                {clinic.name}
              </p>
            </motion.div>
          )}

          {/* Mascot — floating animation, 180px wide, no background */}
          <motion.img
            src="/brushpop_mascot_clean_transparent.png"
            alt="BrushPop mascot"
            className="relative z-10"
            style={{ width: "180px", height: "auto", marginTop: "24px" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { delay: 0.65, duration: 0.4 },
              y: { delay: 0.65, duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
