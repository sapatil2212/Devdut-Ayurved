export type Treatment = {
  slug: string;
  name: string;
  sanskrit?: string;
  category: "Signature" | "Wellness" | "Chronic" | "Women" | "Lifestyle";
  short: string;
  duration: string;
  benefits: string[];
  approach: string[];
};

export const TREATMENTS: Treatment[] = [
  {
    slug: "panchakarma",
    name: "Panchakarma",
    sanskrit: "पञ्चकर्म",
    category: "Signature",
    short:
      "The five-fold purification. A classical detox that resets the doshas and rebuilds cellular vitality.",
    duration: "14 – 28 days",
    benefits: ["Deep detoxification", "Hormonal balance", "Weight & metabolism reset", "Mental clarity"],
    approach: [
      "Nadi Pariksha and Prakriti assessment",
      "Snehana (internal & external oleation) for 5–7 days",
      "Swedana — herbal steam preparation",
      "One or more of Vamana, Virechana, Basti, Nasya, Raktamokshana",
      "Paschat Karma — diet, herbs and lifestyle to hold the reset",
    ],
  },
  {
    slug: "skin",
    name: "Skin & Complexion",
    sanskrit: "त्वचा चिकित्सा",
    category: "Wellness",
    short:
      "Chronic acne, eczema, psoriasis and pigmentation treated from the root — blood, digestion and dosha.",
    duration: "6 – 12 weeks",
    benefits: ["Clear, calm skin", "Reduced flare-ups", "Even tone", "No suppressive steroids"],
    approach: [
      "Raktashodhana — blood purification protocols",
      "Custom lepa (herbal pastes) and medicated ghee",
      "Diet & digestion correction",
      "Stress and sleep support",
    ],
  },
  {
    slug: "hair",
    name: "Hair & Scalp",
    category: "Wellness",
    short: "Hair fall, thinning, premature greying and dandruff addressed with Shirodhara and scalp therapies.",
    duration: "8 – 16 weeks",
    benefits: ["Reduced hair fall", "Stronger roots", "Calmer scalp", "Better sleep"],
    approach: ["Shiro-abhyanga with medicated oils", "Nasya therapy", "Bhringraj & amla protocols", "Diet & Rasayana"],
  },
  {
    slug: "pcod",
    name: "PCOD & PCOS",
    category: "Women",
    short: "A comprehensive protocol for regularising cycles, reducing cysts and restoring metabolic balance.",
    duration: "3 – 6 months",
    benefits: ["Regular cycles", "Weight balance", "Improved fertility", "Reduced acne & hirsutism"],
    approach: ["Uttar-basti when indicated", "Medhya & hormonal Rasayana", "Yoga & mudra prescription", "Cycle-phase nutrition"],
  },
  {
    slug: "infertility",
    name: "Infertility Care",
    category: "Women",
    short: "Garbha Sanskar and Vajikarana therapies for couples seeking natural conception.",
    duration: "4 – 9 months",
    benefits: ["Improved egg & sperm quality", "Uterine preparation", "Hormonal harmony", "Emotional readiness"],
    approach: ["Couple Prakriti mapping", "Rasayana & Vajikarana", "Uttarbasti / Yoni prakshalana", "Fertility diet"],
  },
  {
    slug: "joint-pain",
    name: "Joint & Spine",
    category: "Chronic",
    short: "Sandhigata Vata, arthritis, slipped disc, sciatica and frozen shoulder — mobility restored.",
    duration: "3 – 8 weeks",
    benefits: ["Pain relief without NSAIDs", "Better mobility", "Reduced stiffness", "Prevents progression"],
    approach: ["Abhyanga & Pinda Sweda", "Kati / Janu / Greeva Basti", "Guggulu-based internal herbs", "Guided rehab"],
  },
  {
    slug: "weight-loss",
    name: "Weight & Metabolism",
    category: "Lifestyle",
    short: "Sustainable fat loss through Ama-pachana, movement and mindful eating — not starvation.",
    duration: "8 – 16 weeks",
    benefits: ["Fat loss, not muscle loss", "Better digestion", "Improved lipid profile", "Sustained energy"],
    approach: ["Udwartana dry powder massage", "Triphala & Medohar formulations", "Personalised meal plan", "Daily movement"],
  },
  {
    slug: "diabetes",
    name: "Diabetes (Madhumeha)",
    category: "Chronic",
    short: "Ayurvedic co-management alongside your endocrinologist — stabilise HbA1c and prevent complications.",
    duration: "Ongoing",
    benefits: ["Better glycemic control", "Reduced medication load", "Improved energy", "Neuropathy relief"],
    approach: ["Kapha-medo pacifying diet", "Nishakathakadi & related formulations", "Yoga therapy", "Foot & eye care"],
  },
  {
    slug: "migraine",
    name: "Migraine & Headache",
    category: "Chronic",
    short: "Root-cause treatment for chronic migraine, cluster and tension headaches.",
    duration: "4 – 10 weeks",
    benefits: ["Fewer attacks", "Reduced intensity", "Better sleep", "Less rescue medication"],
    approach: ["Shirodhara & Nasya", "Trigger mapping", "Pitta-pacifying protocol", "Breath & meditation training"],
  },
  {
    slug: "digestion",
    name: "Digestive Disorders",
    category: "Wellness",
    short: "IBS, acidity, bloating, constipation and fatty liver — rebuild Agni, the digestive fire.",
    duration: "6 – 12 weeks",
    benefits: ["Regular digestion", "Reduced bloating", "Better nutrient absorption", "Weight normalisation"],
    approach: ["Deepana & Pachana", "Basti therapy", "Meal timing & combinations", "Gut-mind axis work"],
  },
  {
    slug: "stress-sleep",
    name: "Stress & Sleep",
    category: "Lifestyle",
    short: "For burnout, anxiety, insomnia — Shirodhara, Medhya Rasayana and daily rhythm design.",
    duration: "4 – 8 weeks",
    benefits: ["Deeper sleep", "Calmer mind", "Improved focus", "Emotional resilience"],
    approach: ["Shirodhara series", "Ashwagandha & Brahmi Rasayana", "Dinacharya redesign", "Pranayama coaching"],
  },
  {
    slug: "respiratory",
    name: "Respiratory Care",
    category: "Chronic",
    short: "Asthma, chronic sinusitis, allergic rhinitis, post-viral cough — cleared with Nasya and Kaphaghna herbs.",
    duration: "6 – 12 weeks",
    benefits: ["Easier breathing", "Fewer flare-ups", "Reduced inhaler use", "Immunity boost"],
    approach: ["Nasya therapy", "Vaman when indicated", "Steam & herbal inhalation", "Immunity Rasayana"],
  },
];

export const CATEGORIES = ["Signature", "Wellness", "Chronic", "Women", "Lifestyle"] as const;
