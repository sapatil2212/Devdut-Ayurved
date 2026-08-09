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
    slug: "nadipariksha",
    name: "Nadipariksha",
    sanskrit: "नाडी परीक्षा",
    category: "Signature",
    short:
      "Classical pulse diagnosis — our clinic USP. Precise reading of doshas, tissues and vital channels to design truly personalised care.",
    duration: "45 – 60 mins",
    benefits: ["Accurate Prakriti mapping", "Root-cause clarity", "Personalised protocol", "Early imbalance detection"],
    approach: [
      "Classical three-finger Nadi reading",
      "Dosha, Dhatu and Mala assessment",
      "Prakriti and Vikriti correlation",
      "Written findings and treatment roadmap",
      "Follow-up pulse review on 1st & 15th promo days",
    ],
  },
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
    slug: "agnikshar",
    name: "Agnikshar Chikitsa",
    sanskrit: "अग्निक्षार चिकित्सा",
    category: "Signature",
    short:
      "Classical para-surgical therapy using controlled heat and alkali for chronic lesions, warts, corns and selected anorectal conditions.",
    duration: "Session-based",
    benefits: ["Minimal invasive option", "Targets chronic lesions", "Faster local healing", "Reduced recurrence risk"],
    approach: [
      "Clinical assessment and suitability check",
      "Local preparation and sterile protocol",
      "Controlled Agnikarma / Kshara application",
      "Post-procedure wound care and herbs",
      "Diet and lifestyle to prevent recurrence",
    ],
  },
  {
    slug: "skin",
    name: "Skin & Complexion",
    sanskrit: "त्वचा चिकित्सा",
    category: "Wellness",
    short:
      "Chronic acne, eczema, psoriasis, pigmentation and cracked heels treated from the root — blood, digestion and dosha.",
    duration: "6 – 12 weeks",
    benefits: ["Clear, calm skin", "Reduced flare-ups", "Even tone", "Healed cracked heels", "No suppressive steroids"],
    approach: [
      "Raktashodhana — blood purification protocols",
      "Custom lepa (herbal pastes) and medicated ghee",
      "Local care for cracked heels and calluses",
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
    name: "Bone, Joint & Neurological Care",
    sanskrit: "अस्थि-सन्धि-स्नायु चिकित्सा",
    category: "Chronic",
    short: "Comprehensive Ayurvedic management of arthritis, joint pain, sciatica, migraine, headaches, and neurological concerns.",
    duration: "3 – 8 weeks",
    benefits: ["Natural pain relief", "Improved joint flexibility", "Reduced inflammation", "Better mobility & strength", "Enhanced nervous system function"],
    approach: ["Nadi Pariksha and postural analysis", "Abhyanga & Pinda Sweda", "Kati / Janu / Greeva Basti", "Nasya & specialized therapies", "Rehabilitation & yoga guidance"],
  },
  {
    slug: "paralysis",
    name: "Paralysis Treatment",
    sanskrit: "पक्षाघात चिकित्सा",
    category: "Chronic",
    short:
      "Supportive Ayurvedic care for hemiplegia, paraplegia and post-stroke weakness — nerve nourishment, mobility and recovery.",
    duration: "8 – 24 weeks",
    benefits: ["Improved muscle tone", "Better mobility", "Nerve nourishment", "Speech & coordination support"],
    approach: [
      "Detailed neurological and Prakriti assessment",
      "Abhyanga, Swedana and Pinda Sweda",
      "Basti and Nasya where indicated",
      "Medhya and Vata-pacifying Rasayana",
      "Physiotherapy-aligned lifestyle guidance",
    ],
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
    name: "Digestive Care",
    category: "Wellness",
    short:
      "IBS, acidity, bloating, constipation, piles, fissure and fistula — rebuild Agni and heal the gut naturally.",
    duration: "6 – 12 weeks",
    benefits: ["Regular digestion", "Reduced bloating", "Anorectal relief", "Better nutrient absorption"],
    approach: ["Deepana & Pachana", "Basti therapy", "Anorectal care for piles, fissure & fistula", "Meal timing & combinations", "Gut-mind axis work"],
  },
  {
    slug: "kidney",
    name: "Kidney Diseases",
    sanskrit: "वृक्क चिकित्सा",
    category: "Chronic",
    short:
      "Ayurvedic care for renal calculi (kidney stones), renal failure supportive treatment, and urinary disorders — personalised herbal protocols with diet and lifestyle guidance.",
    duration: "8 – 24 weeks",
    benefits: ["Stone management support", "Urinary comfort", "Renal supportive care", "Diet for kidney health"],
    approach: [
      "Prakriti and urinary system assessment",
      "Herbal protocols for Mutrashmari (calculi)",
      "Supportive care in renal insufficiency",
      "Fluid, diet and lifestyle guidance",
      "Monitoring with modern reports as needed",
    ],
  },
  {
    slug: "mental-health",
    name: "Mental Health Care",
    sanskrit: "मानसिक स्वास्थ्य",
    category: "Lifestyle",
    short:
      "Anxiety, burnout, insomnia, nightmares and emotional imbalance — Shirodhara, Medhya Rasayana and daily rhythm design.",
    duration: "4 – 12 weeks",
    benefits: ["Deeper sleep", "Fewer nightmares", "Calmer mind", "Emotional resilience"],
    approach: ["Shirodhara series", "Ashwagandha & Brahmi Rasayana", "Nightmare and sleep protocol", "Dinacharya redesign", "Pranayama coaching"],
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
  {
    slug: "child",
    name: "Child Health & Immunity",
    sanskrit: "बाल चिकित्सा",
    category: "Wellness",
    short: "Nurturing healthy growth, memory, brain development, and natural immunity using gentle Ayurvedic care.",
    duration: "4 – 12 weeks",
    benefits: ["Boosts natural immunity", "Improves memory & focus", "Supports physical growth", "Safe & chemical-free"],
    approach: [
      "Suvarnaprashan traditional immunization",
      "Prakriti and growth assessment",
      "Gentle herbal immunity elixirs",
      "Child-friendly diet & lifestyle guidance",
    ],
  },
  {
    slug: "womens-health",
    name: "Women's & Men's Health",
    sanskrit: "स्त्री-पुरुष स्वास्थ्य",
    category: "Women",
    short:
      "Comprehensive Ayurvedic care for reproductive & hormonal health — menstrual disorders, fertility, pregnancy, women's wellness, men's vitality, sexual weakness, and nightmares.",
    duration: "6 – 16 weeks",
    benefits: ["Hormonal balance", "Reproductive wellness", "Fewer nightmares", "Natural fertility support", "Confidential & personalized care"],
    approach: [
      "Prakriti & Dosha assessment",
      "Personalized herbal medicines",
      "Panchakarma where indicated",
      "Diet, lifestyle & fertility counseling",
      "Care for nightmares linked to vitality & hormonal imbalance",
    ],
  },
  {
    slug: "lifestyle-chronic",
    name: "Lifestyle & Chronic Disease Care",
    sanskrit: "जीवनशैली चिकित्सा",
    category: "Chronic",
    short:
      "Root-cause Ayurvedic management of diabetes, thyroid, obesity, allergies, insomnia, acidity, jaundice and infective hepatitis through personalized herbal and Panchakarma protocols.",
    duration: "8 – 24 weeks",
    benefits: ["Blood sugar & metabolic control", "Healthy weight management", "Liver & jaundice support", "Long-term chronic disease relief"],
    approach: [
      "Prakriti & Dosha assessment",
      "Classical Ayurvedic herbal medicines",
      "Jaundice & infective hepatitis protocols",
      "Panchakarma detox therapies",
      "Personalized diet & lifestyle guidance",
    ],
  },
  {
    slug: "preventive-care",
    name: "General Wellness & Preventive Care",
    sanskrit: "स्वस्थवृत्त एवं रोगप्रतिरोध चिकित्सा",
    category: "Wellness",
    short: "Maintain lifelong health, boost natural immunity, support heart wellness, and prevent lifestyle-related illness through seasonal detox, custom nutrition, and daily routines.",
    duration: "Ongoing / Seasonal",
    benefits: ["Strengthens natural immunity", "Promotes healthy ageing", "Improves digestion & metabolism", "Supports cardiovascular health", "Enhances physical & mental well-being"],
    approach: ["Comprehensive Prakriti & Agni evaluation", "Seasonal Shodhana (Panchakarma detox)", "Custom Ayurvedic diet planning", "Dinacharya (daily rhythm) & lifestyle coaching", "Immunity and Rasayana therapies"],
  },
];

export const CATEGORIES = ["Signature", "Wellness", "Chronic", "Women", "Lifestyle"] as const;
