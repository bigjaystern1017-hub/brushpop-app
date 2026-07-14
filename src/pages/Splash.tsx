import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useClinic } from "@/hooks/useClinic";

const INSTALL_DISMISSED_KEY = "brushpop_install_dismissed";

function isStandalone(): boolean {
  return window.matchMedia("(display-mode: standalone)").matches;
}

function isInstallDismissed(): boolean {
  return localStorage.getItem(INSTALL_DISMISSED_KEY) === "true";
}

interface SplashProps {
  onComplete: () => void;
}

export default function Splash({ onComplete }: SplashProps) {
  const clinic = useClinic();
  const [visible, setVisible] = useState(true);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isStandalone() && !isInstallDismissed()) {
      setShowInstall(true);
    }
  }, []);

  function dismissInstall() {
    localStorage.setItem(INSTALL_DISMISSED_KEY, "true");
    setShowInstall(false);
  }

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-start pt-[14dvh]"
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
              className="h-[363px] drop-shadow-2xl relative"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          {/* Clinic logo block — shown when a real (non-default) logo is set */}
          {clinic.showBranding &&
            clinic.logoUrl &&
            clinic.logoUrl !== "/brushpop-logo.png" && (
              <motion.div
                className="relative z-10"
                style={{ marginTop: "24px" }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
              >
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    padding: "8px",
                    display: "inline-block",
                  }}
                >
                  <img
                    src={clinic.logoUrl}
                    alt={clinic.name}
                    style={{ width: "120px", height: "auto", display: "block" }}
                  />
                </div>
              </motion.div>
            )}

          {/* Dentist branding pill — 24px below logo (or 8px below clinic logo block) */}
          {clinic.showBranding && (
            <motion.div
              className="flex items-center bg-white/82 backdrop-blur-sm rounded-full px-4 py-2.5 shadow-md relative z-10"
              style={{
                marginTop:
                  clinic.logoUrl && clinic.logoUrl !== "/brushpop-logo.png"
                    ? "8px"
                    : "24px",
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4, ease: "easeOut" }}
            >
              <div className="text-center">
                <p className="text-[10px] font-semibold text-foreground/50 uppercase tracking-wide leading-none mb-0.5">
                  Presented by
                </p>
                <p className="text-base font-black text-foreground leading-tight">
                  {clinic.name}
                </p>
              </div>
            </motion.div>
          )}

          {/* Tagline — between pill and mascot */}
          <motion.p
            className="relative z-10"
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: "18px",
              color: "#ffffff",
              fontWeight: 500,
              marginTop: "10px",
              textAlign: "center",
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.4 }}
          >
            Pop the plaque. Reveal the prize.
          </motion.p>

          {/* Mascot — floating animation, 220px wide, no background */}
          <motion.img
            src="/brushpop_mascot_clean_transparent.png"
            alt="BrushPop mascot"
            className="relative z-10"
            style={{ width: "220px", height: "auto", marginTop: "32px" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { delay: 0.65, duration: 0.4 },
              y: { delay: 0.65, duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          {/* Install prompt — floating bar pinned to bottom, above disclaimer area */}
          {showInstall && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.35, ease: "easeOut" }}
              style={{
                position: "absolute",
                bottom: "24px",
                left: "5%",
                width: "90%",
                zIndex: 20,
              }}
            >
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 16px rgba(10,22,40,0.18)",
                  padding: "12px 14px 10px",
                  position: "relative",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {/* Dismiss X button */}
                <button
                  onClick={dismissInstall}
                  aria-label="Dismiss install prompt"
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "10px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "2px 4px",
                    color: "#94A3B8",
                    fontSize: "14px",
                    lineHeight: 1,
                  }}
                >
                  ✕
                </button>

                {/* Three steps in a horizontal row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "4px",
                    paddingRight: "18px",
                    marginBottom: "8px",
                  }}
                >
                  {/* Step 1 */}
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ fontSize: "18px", marginBottom: "3px" }}>📲</div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#0A1628",
                        fontWeight: 600,
                        lineHeight: 1.3,
                      }}
                    >
                      Open in Safari
                    </div>
                  </div>

                  {/* Separator arrow */}
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#94A3B8",
                      alignSelf: "center",
                      flexShrink: 0,
                      paddingTop: "2px",
                    }}
                  >
                    →
                  </div>

                  {/* Step 2 */}
                  <div style={{ flex: 2, textAlign: "center" }}>
                    <div style={{ fontSize: "18px", marginBottom: "3px" }}>⬆️</div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#0A1628",
                        fontWeight: 600,
                        lineHeight: 1.3,
                      }}
                    >
                      Tap Share → Add to Home Screen
                    </div>
                  </div>

                  {/* Separator arrow */}
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#94A3B8",
                      alignSelf: "center",
                      flexShrink: 0,
                      paddingTop: "2px",
                    }}
                  >
                    →
                  </div>

                  {/* Step 3 */}
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ fontSize: "18px", marginBottom: "3px" }}>🏠</div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#0A1628",
                        fontWeight: 600,
                        lineHeight: 1.3,
                      }}
                    >
                      Launch from Home Screen
                    </div>
                  </div>
                </div>

                {/* Subtext */}
                <div
                  style={{
                    fontSize: "11px",
                    color: "#94A3B8",
                    textAlign: "center",
                    lineHeight: 1.4,
                  }}
                >
                  For the best experience, add BrushPop to your home screen.
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
