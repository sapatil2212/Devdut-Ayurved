export const SITE = {
  name: "Devdut Ayurved Clinic",
  short: "Devdut Ayurved",
  tagline: "Healing that begins in nature.",
  description:
    "Devdut Ayurved Clinic offers authentic Panchakarma, personalised herbal treatments and modern Ayurvedic care rooted in 5,000-year-old wisdom.",
  /** Clinic / calling number (Dr. Ganeshkumar) */
  phone: "+91 84219 03259",
  phoneDisplay: "8421903259",
  whatsapp: "8421903259",
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

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/treatments/$slug", params: { slug: "panchakarma" }, label: "Panchakarma" },
  { to: "/treatments", label: "Treatments", dropdown: true },
  { to: "/nadipariksha", label: "Nadipariksha" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;
