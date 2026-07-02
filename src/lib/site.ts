export const SITE = {
  name: "Devdut Ayurved Clinic",
  short: "Devdut Ayurved",
  tagline: "Healing that begins in nature.",
  description:
    "Devdut Ayurved Clinic offers authentic Panchakarma, personalised herbal treatments and modern Ayurvedic care rooted in 5,000-year-old wisdom.",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  email: "care@devdutayurved.com",
  address: "12, Sarvodaya Marg, Near Shivaji Nagar, Pune 411005, Maharashtra, India",
  hours: "Mon – Sat · 9:00 AM – 7:30 PM",
  emergency: "+91 90000 00911",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/treatments", label: "Treatments" },
  { to: "/doctor", label: "Doctor" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;
