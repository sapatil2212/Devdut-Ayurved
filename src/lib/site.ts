export const SITE = {
  name: "Devdut Ayurved Clinic",
  short: "Devdut Ayurved",
  tagline: "Healing that begins in nature.",
  description:
    "Devdut Ayurved Clinic offers authentic Panchakarma, personalised herbal treatments and modern Ayurvedic care rooted in 5,000-year-old wisdom.",
  phone: "+91 84219 03259",
  phone2: "+91 90286 99532",
  phoneDisplay: "8421903259 / 9028699532",
  whatsapp: "8421903259",
  email: "devdutayurvedclinic@gmail.com",
  address: "Devdut Ayurved Clinic, Sinhagad Road, Suncity, Anand Nagar, opposite to Hotel Bird Valley, Pune - 411051",
  hours: "Mon – Sun · 9:00 AM – 2:00 PM · 4:00 PM – 9:00 PM",
  emergency: "+91 90286 99532",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/treatments", label: "Treatments", dropdown: true },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;
