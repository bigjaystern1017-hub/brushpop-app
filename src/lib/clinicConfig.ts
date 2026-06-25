export type ClinicConfig = {
  name: string;
  phone: string;
  bookingUrl: string;
  description: string;
  logoUrl: string | null;
  showBranding: boolean;
};

export const CLINICS: Record<string, ClinicConfig> = {
  warren: {
    name: "Just for Warren!! 🦷✨",
    phone: "",
    bookingUrl: "",
    description: "This app was made just for you, Warren! Keep popping those bubbles!",
    logoUrl: "/brushpop-logo.png",
    showBranding: true,
  },
  demo: {
    name: "Smith Pediatric Dentistry",
    phone: "(919) 555-0100",
    bookingUrl: "https://smithpediatricdentistry.com/book",
    description: "We're a family-focused pediatric dental practice dedicated to making every visit fun and fear-free.",
    logoUrl: "/brushpop-logo.png",
    showBranding: true,
  },
  sammy: {
    name: "Sammy's Big T-Rex Energy Dental Works of Queens",
    phone: "",
    bookingUrl: "",
    description: "Brushing teeth is RAWR-some! Keep popping those bubbles!",
    logoUrl: "/brushpop-logo.png",
    showBranding: true,
  },
  antek: {
    name: "Antek Dental & Oral Surgery Center of BKLYN",
    phone: "",
    bookingUrl: "",
    description: "Brooklyn's finest brushers! Keep up the great work!",
    logoUrl: "/brushpop-logo.png",
    showBranding: true,
  },
  littlejoe: {
    name: "Little Joe's Doggy Dental Care Taos NM",
    phone: "",
    bookingUrl: "",
    description: "Even pups need clean teeth! Keep brushing!",
    logoUrl: "/brushpop-logo.png",
    showBranding: true,
  },
  cantu: {
    name: "Cantu Family Dental Works & Technologies",
    phone: "",
    bookingUrl: "",
    description: "Keeping the Cantu family smiling bright!",
    logoUrl: "/brushpop-logo.png",
    showBranding: true,
  },
  wesson: {
    name: "Wesson Pediatric Family Dentists of San Antonio",
    phone: "",
    bookingUrl: "",
    description: "San Antonio's smile squad! Keep those bubbles popping!",
    logoUrl: "/brushpop-logo.png",
    showBranding: true,
  },
};

export const DEFAULT_CLINIC: ClinicConfig = {
  name: "Your Pediatric Dentist",
  phone: "(555) 123-4567",
  bookingUrl: "",
  description: "We're a family-focused pediatric dental practice dedicated to making every visit fun and fear-free.",
  logoUrl: "/brushpop-logo.png",
  showBranding: true,
};
