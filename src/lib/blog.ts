export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "understanding-your-dosha",
    title: "Understanding Your Dosha: The Blueprint of Your Body",
    excerpt:
      "Vata, Pitta and Kapha are not personality types — they are the intelligent forces that shape your digestion, sleep and moods.",
    category: "Fundamentals",
    readTime: "6 min read",
    date: "2026-05-18",
    body: [
      "Ayurveda begins with a simple observation: no two bodies are alike. What heals one person may inflame another. The Prakriti — your innate constitution — is the map by which authentic care is designed.",
      "The three doshas are Vata (air & space), Pitta (fire & water) and Kapha (earth & water). Every person carries all three, in a ratio unique to them. When that ratio is honoured, health follows. When it is disturbed by season, food, stress or age, disease begins.",
      "A one-hour Prakriti consultation, done through pulse (Nadi Pariksha), observation and interview, gives you a lifetime tool. You stop guessing which diet, oil or exercise suits you — you know.",
    ],
  },
  {
    slug: "panchakarma-what-to-expect",
    title: "Panchakarma: What Actually Happens in 21 Days",
    excerpt:
      "A day-by-day look at classical Panchakarma — the preparation, the cleansing therapies and the rebuilding that follows.",
    category: "Treatments",
    readTime: "9 min read",
    date: "2026-04-02",
    body: [
      "Panchakarma is not a spa week. It is a medically-supervised reset that mobilises accumulated toxins (ama) out of deep tissues and eliminates them through the body's natural channels.",
      "Days 1–7 (Purva Karma) are preparation: internal oleation with medicated ghee, external abhyanga and swedana. You feel lighter, sometimes tired — the toxins are moving.",
      "Days 8–14 (Pradhana Karma) contain the main cleansing procedures — chosen from Vamana, Virechana, Basti, Nasya and Raktamokshana based on your dosha imbalance.",
      "Days 15–21 (Paschat Karma) rebuild. The diet slowly returns to normal, Rasayana herbs restore ojas, and the lifestyle plan you leave with holds the reset for years.",
    ],
  },
  {
    slug: "daily-routine-dinacharya",
    title: "Dinacharya: The Ancient Morning Routine That Still Works",
    excerpt:
      "Ten minutes of oil pulling, tongue scraping and self-massage — the small practices that outperform expensive supplements.",
    category: "Lifestyle",
    readTime: "5 min read",
    date: "2026-03-11",
    body: [
      "Modern biohacking rediscovers, every year, what Ayurveda systematised 5,000 years ago: consistency beats intensity.",
      "Wake before sunrise, drink warm water, scrape the tongue, oil-pull for five minutes, self-massage with sesame or coconut oil, then move. This sequence — done daily for a month — will do more for your digestion, skin and mood than any single therapy.",
      "The point isn't tradition. The point is that the body loves rhythm.",
    ],
  },
  {
    slug: "herbs-in-your-kitchen",
    title: "The Five Ayurvedic Herbs Already in Your Kitchen",
    excerpt:
      "Turmeric, ginger, cumin, coriander and fennel — how to use them not as flavour, but as medicine.",
    category: "Herbs",
    readTime: "7 min read",
    date: "2026-02-20",
    body: [
      "Long before pharmacies, kitchens were pharmacies. The five herbs on this list live in almost every Indian kitchen and, used correctly, address most everyday complaints.",
      "CCF tea — one teaspoon each of cumin, coriander and fennel steeped in hot water — is the single most useful thing you can drink after a heavy meal.",
      "Turmeric milk before bed is not a trend; it is an ancient protocol for inflammation and sleep.",
    ],
  },
  {
    slug: "seasonal-eating-ritucharya",
    title: "Ritucharya: Why What You Ate Last Summer May Not Suit This One",
    excerpt: "Ayurveda's seasonal eating framework, translated for modern life.",
    category: "Lifestyle",
    readTime: "6 min read",
    date: "2026-01-14",
    body: [
      "Your digestion is not the same in July as it is in December. Ayurveda encodes this in Ritucharya — the seasonal regimen.",
      "In monsoon, Vata rises: eat warm, oily, well-cooked foods and avoid raw salads. In summer, Pitta rises: favour cooling, sweet, hydrating foods. In winter, digestion is strongest — the one time heavier foods are welcome.",
      "The rules are simple. The results, when followed for a year, are remarkable.",
    ],
  },
  {
    slug: "stress-and-the-vagus",
    title: "Stress, the Vagus Nerve and Why Shirodhara Works",
    excerpt: "Modern neuroscience explains what Ayurveda's forehead-oil therapy has been doing for centuries.",
    category: "Science",
    readTime: "8 min read",
    date: "2025-12-02",
    body: [
      "Shirodhara — the steady stream of warm oil on the forehead — is one of Ayurveda's most researched therapies. fMRI studies show it shifts brain activity toward parasympathetic dominance within minutes.",
      "The mechanism is mechanical, thermal and neurochemical: sustained gentle pressure on the third-eye region activates the trigeminal-vagal pathway, warm sesame oil down-regulates the sympathetic nervous system, and the medicated herbs cross into cerebrospinal fluid.",
      "Patients report deeper sleep the same night. That is not placebo — it is physiology.",
    ],
  },
];
