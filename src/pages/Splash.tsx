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
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: "6dvh",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingBottom: "24px",
            backgroundImage: "url('/app-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >

          {/* BrushPop Logo — large and proud */}
          <motion.img
            src="/brushpop-logo.png"
            alt="BrushPop"
            style={{ width: "88%", maxWidth: "360px", height: "auto" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Hero tagline — graphic treatment */}
          <motion.img
            src="/tagline-treatment.png"
            alt="Pop the plaque. Reveal the prize."
            style={{ width: "92%", maxWidth: "360px", height: "auto", marginTop: "8px" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          />

          {/* Clinic branding card */}
          {clinic.showBranding && (
            <motion.div
              style={{
                marginTop: "16px",
                width: "100%",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {/* BROUGHT TO YOU BY badge */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#0EA5E9",
                    borderRadius: "20px",
                    padding: "4px 16px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      color: "#ffffff",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Brought to you by
                  </span>
                </div>
              </div>

              {/* White clinic card */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "20px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 20px rgba(10,22,40,0.12)",
                  minHeight: "140px",
                }}
              >
                {/* Clinic logo if available */}
                {clinic.logoUrl && clinic.logoUrl !== "/brushpop-logo.png" ? (
                  <img
                    src={clinic.logoUrl}
                    alt={clinic.name}
                    style={{
                      width: "100%",
                      maxWidth: "240px",
                      height: "auto",
                      display: "block",
                    }}
                  />
                ) : (
                  /* Fallback: just the practice name, large */
                  <p
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: "28px",
                      fontWeight: 600,
                      color: "#0A1628",
                      textAlign: "center",
                      lineHeight: 1.2,
                      margin: 0,
                    }}
                  >
                    {clinic.name}
                  </p>
                )}
              </div>
            </motion.div>
          )}

        </motion.div>
      )}
    </AnimatePresence>
  );
}
