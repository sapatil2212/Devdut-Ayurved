export const SITE = {
  name: "Devdut Ayurved Clinic",
  short: "Devdut Ayurved",
  tagline: "Healing that begins in nature.",
  description:
    "Devdut Ayurved Clinic offers authentic Panchakarma, personalised herbal treatments and modern Ayurvedic care rooted in 5,000-year-old wisdom.",
  /** Clinic / calling number (Dr. Ganeshkumar) */
  phone: "+91 84219 03259",
  phoneDisplay: "8421903259",
  whatsapp: "+91 85309 11532",
  whatsappDisplay: "8530911532",
  email: "devdutayurvedclinic@gmail.com",
  address: "Devdut Ayurved Clinic, Sinhagad Road, Suncity, Anand Nagar, opposite to Hotel Bird Valley, Pune - 411051",
  hours: "Mon – Sun · 9:00 AM – 2:00 PM · 4:00 PM – 9:00 PM",
  emergency: "+91 84219 03259",
  /** Nadipariksha promo — every month on 1st & 15th */
  nadiparikshaDates: "1st & 15th of every month",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
};

/** Preferred appointment times matching clinic opening hours (30-min slots). */
export const APPOINTMENT_TIME_SLOTS = [
  { value: "09:00", label: "9:00 AM" },
  { value: "09:30", label: "9:30 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "10:30", label: "10:30 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "11:30", label: "11:30 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "12:30", label: "12:30 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "13:30", label: "1:30 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "16:30", label: "4:30 PM" },
  { value: "17:00", label: "5:00 PM" },
  { value: "17:30", label: "5:30 PM" },
  { value: "18:00", label: "6:00 PM" },
  { value: "18:30", label: "6:30 PM" },
  { value: "19:00", label: "7:00 PM" },
  { value: "19:30", label: "7:30 PM" },
  { value: "20:00", label: "8:00 PM" },
  { value: "20:30", label: "8:30 PM" },
  { value: "21:00", label: "9:00 PM" },
] as const;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/treatments/$slug", params: { slug: "panchakarma" }, label: "Panchakarma" },
  { to: "/treatments", label: "Treatments", dropdown: true },
  { to: "/nadipariksha", label: "Nadipariksha" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;
