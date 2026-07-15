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
            justifyContent: "center",
            backgroundColor: "#0A1628",
            padding: "32px",
          }}
        >
          {/* BrushPop Logo */}
          <motion.img
            src="/brushpop-logo.png"
            alt="BrushPop"
            style={{ width: "300px", height: "auto" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Tagline */}
          <motion.p
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: "20px",
              color: "#FF6B7A",
              fontWeight: 500,
              marginTop: "12px",
              textAlign: "center",
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Pop the plaque. Reveal the prize.
          </motion.p>

          {/* Clinic branding block */}
          {clinic.showBranding && (
            <motion.div
              style={{
                marginTop: "40px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {/* Presented by label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                <div style={{
                  flex: 1,
                  height: "1px",
                  backgroundColor: "rgba(255,255,255,0.2)"
                }} />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.4)",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  Presented by
                </span>
                <div style={{
                  flex: 1,
                  height: "1px",
                  backgroundColor: "rgba(255,255,255,0.2)"
                }} />
              </div>

              {/* Clinic logo — only shown when a real logo exists */}
              {clinic.logoUrl && clinic.logoUrl !== "/brushpop-logo.png" && (
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "16px 24px",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={clinic.logoUrl}
                    alt={clinic.name}
                    style={{
                      width: "200px",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </div>
              )}

              {/* Clinic name */}
              <p
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: "26px",
                  fontWeight: 600,
                  color: "#ffffff",
                  textAlign: "center",
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {clinic.name}
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
