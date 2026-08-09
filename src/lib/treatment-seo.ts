export type TreatmentSeo = {
  metaDescription: string;
  overviewTitle: string;
  overview: string[];
  conditionsTitle: string;
  conditions: { name: string; desc: string }[];
  whyTitle: string;
  why: string[];
  faqs: { q: string; a: string }[];
};

/** Rich SEO copy for treatment detail pages (especially generic layouts). */
export const TREATMENT_SEO: Record<string, TreatmentSeo> = {
  kidney: {
    metaDescription:
      "Ayurvedic kidney disease treatment in Pune for renal calculi (kidney stones), renal failure supportive care and urinary disorders at Devdut Ayurved Clinic.",
    overviewTitle: "Ayurvedic Kidney Disease Treatment in Pune",
    overview: [
      "Kidney health is central to fluid balance, toxin clearance and overall vitality. At Devdut Ayurved Clinic, Ayurvedic kidney treatment focuses on Mutravaha Srotas (urinary channels), Dosha balance and digestive strength (Agni) — the foundation for long-term renal wellness.",
      "Our protocols support renal calculi (kidney stones / Mutrashmari), urinary discomfort and carefully monitored supportive care in renal insufficiency. Each plan begins with Prakriti assessment and, where needed, modern lab correlation so herbal care complements your existing medical advice.",
      "Patients seeking Ayurvedic treatment for kidney stones, urinary disorders or kidney-supportive care in Pune receive personalised herbal medicines, diet guidance and lifestyle routines designed for sustainable results.",
    ],
    conditionsTitle: "Kidney & Urinary Conditions We Support",
    conditions: [
      { name: "Renal Calculi (Kidney Stones)", desc: "Ayurvedic support for Mutrashmari with herbal protocols, hydration guidance and diet to ease discomfort and reduce recurrence risk." },
      { name: "Renal Failure Supportive Care", desc: "Adjunctive Ayurvedic care focused on digestion, fluid balance, strength and quality of life alongside specialist medical management." },
      { name: "Urinary Disorders", desc: "Support for burning micturition, frequency, incomplete voiding and related urinary complaints through Dosha-specific care." },
      { name: "Recurrent Stone Tendency", desc: "Preventive diet, lifestyle and Rasayana support for patients with repeated stone formation history." },
      { name: "Edema & Fluid Imbalance", desc: "Gentle Ayurvedic measures to support fluid balance and reduce heaviness when clinically appropriate." },
      { name: "Post-Procedure Recovery Support", desc: "Diet and herbal guidance after lithotripsy or related procedures to aid recovery and channel cleansing." },
    ],
    whyTitle: "Why Choose Ayurveda for Kidney Care",
    why: [
      "Root-cause focus on Agni, Ama and Mutravaha Srotas rather than symptom suppression alone",
      "Personalised herbal formulations matched to Prakriti and current imbalance",
      "Diet and fluid guidance tailored for stones and renal supportive needs",
      "Safe co-management approach that respects modern nephrology advice",
      "Nadipariksha-led assessment for precise protocol design",
    ],
    faqs: [
      { q: "Can Ayurveda dissolve kidney stones?", a: "Ayurveda offers classical protocols for Mutrashmari that may support stone management depending on size, type and patient constitution. Suitable candidates are assessed clinically; large or obstructing stones need urgent modern care." },
      { q: "Is Ayurvedic care safe in renal failure?", a: "Supportive care is individualised and coordinated with your nephrologist. We avoid self-medication and adjust formulations carefully based on reports and symptoms." },
      { q: "What diet helps kidney stone patients?", a: "Diet depends on stone type and Dosha. Common guidance includes adequate hydration, reduced excess salt/processed food, and Prakriti-based meal planning at the clinic." },
    ],
  },
  agnikshar: {
    metaDescription:
      "Agnikshar Chikitsa in Pune — classical Agnikarma and Kshara Karma for warts, corns, chronic lesions and selected anorectal conditions at Devdut Ayurved.",
    overviewTitle: "Agnikshar Chikitsa — Classical Para-Surgical Ayurveda",
    overview: [
      "Agnikshar Chikitsa combines Agnikarma (therapeutic heat) and Kshara Karma (alkali therapy) — classical Ayurvedic para-surgical methods used for chronic local lesions when indicated.",
      "At Devdut Ayurved Clinic, these therapies are considered after careful assessment for warts, corns, selected chronic lesions and certain anorectal conditions, with sterile technique and aftercare.",
      "Patients looking for Agnikarma or Kshara treatment in Pune receive clear counselling on suitability, expected healing and post-procedure diet and wound care.",
    ],
    conditionsTitle: "Conditions Considered for Agnikshar",
    conditions: [
      { name: "Warts", desc: "Local Ayurvedic para-surgical options for selected wart presentations after clinical review." },
      { name: "Corns & Calluses", desc: "Targeted care for painful corns with local therapy and pressure-relief guidance." },
      { name: "Chronic Local Lesions", desc: "Selected chronic lesions where controlled Agnikarma or Kshara is clinically appropriate." },
      { name: "Selected Anorectal Conditions", desc: "Guided Kshara/Agnikshar approaches for suitable piles, fissure or fistula cases as indicated." },
      { name: "Recurrent Skin Growths", desc: "Assessment-based care to reduce recurrence risk with diet and local aftercare." },
      { name: "Post-Procedure Healing Support", desc: "Herbal wound care and lifestyle advice after Agnikshar sessions." },
    ],
    whyTitle: "Why Agnikshar at Devdut Ayurved",
    why: [
      "Classical indication-based approach — not every lesion needs Agnikshar",
      "Sterile protocol and clear post-care instructions",
      "Integration with herbal medicines and diet to support healing",
      "Experienced Ayurvedic clinical supervision",
      "Focus on reducing recurrence through root-cause lifestyle correction",
    ],
    faqs: [
      { q: "Is Agnikarma painful?", a: "Sensation varies by site and technique. We explain the procedure, prepare the area and provide aftercare to keep discomfort manageable." },
      { q: "How many sessions are needed?", a: "Session count depends on the condition, size and healing response. Your physician outlines a plan after assessment." },
      { q: "Who should avoid Agnikshar?", a: "Certain systemic illnesses, uncontrolled conditions or unsuitable lesion types may be contraindications. Suitability is decided clinically." },
    ],
  },
  paralysis: {
    metaDescription:
      "Ayurvedic paralysis treatment in Pune for hemiplegia, paraplegia and post-stroke weakness with Abhyanga, Basti, nerve nourishment and rehabilitation support.",
    overviewTitle: "Ayurvedic Paralysis & Post-Stroke Supportive Care",
    overview: [
      "Paralysis and post-stroke weakness need patient, multi-modal care. Ayurveda approaches Pakshaghata and related Vata disorders with nerve nourishment, oleation, specialised Basti protocols and Rasayana support.",
      "At Devdut Ayurved Clinic, treatment plans for hemiplegia, paraplegia and post-stroke recovery are designed around Prakriti, residual strength and medical history — working alongside physiotherapy where appropriate.",
      "Our goal is improved muscle tone, mobility, coordination and daily function through authentic Ayurvedic therapies in Pune.",
    ],
    conditionsTitle: "Paralysis-Related Concerns We Support",
    conditions: [
      { name: "Hemiplegia", desc: "Supportive care for one-sided weakness with Abhyanga, Swedana and Vata-pacifying protocols." },
      { name: "Paraplegia", desc: "Focused therapies to support lower-limb tone, circulation and rehabilitation goals." },
      { name: "Post-Stroke Weakness", desc: "Gradual recovery support with Medhya Rasayana, Basti where indicated and lifestyle pacing." },
      { name: "Speech & Coordination Support", desc: "Adjunctive Ayurvedic care that complements speech and neuro-rehab programmes." },
      { name: "Muscle Spasticity & Stiffness", desc: "Oleation and Swedana approaches to ease stiffness and improve comfort." },
      { name: "Long-Term Neuro Rehabilitation Support", desc: "Ongoing Rasayana and routine design for sustained recovery momentum." },
    ],
    whyTitle: "Why Ayurveda for Paralysis Care",
    why: [
      "Classical Vata-pacifying therapies aimed at nerve and muscle nourishment",
      "Personalised pacing based on strength and medical status",
      "Compatible with physiotherapy and modern rehab plans",
      "Focus on digestion, sleep and mood — key recovery foundations",
      "Compassionate, long-horizon care rather than quick fixes",
    ],
    faqs: [
      { q: "When should Ayurvedic paralysis care start?", a: "Timing depends on medical stability. Once cleared by your physician, early supportive care can aid recovery routines." },
      { q: "Can Ayurveda reverse complete paralysis?", a: "Outcomes vary widely. Ayurveda supports function, tone and quality of life; realistic goals are set after assessment." },
      { q: "Do you work with physiotherapists?", a: "Yes. We encourage integrated rehab and design Ayurvedic therapies to align with your physiotherapy plan." },
    ],
  },
  "mental-health": {
    metaDescription:
      "Ayurvedic mental health care in Pune for anxiety, insomnia, nightmares, burnout and emotional imbalance with Shirodhara and Medhya Rasayana.",
    overviewTitle: "Ayurvedic Mental Health & Emotional Wellness",
    overview: [
      "Mental wellbeing in Ayurveda is inseparable from sleep, digestion and Dosha balance. We support anxiety, burnout, insomnia, nightmares and emotional fatigue with Medhya Rasayana, Shirodhara and Dinacharya redesign.",
      "At Devdut Ayurved Clinic in Pune, care is confidential, personalised and rooted in classical principles — helping the mind settle while rebuilding daily rhythm.",
      "Nightmares and sleep disturbance linked to stress or vitality imbalance are addressed with calming protocols and lifestyle coaching.",
    ],
    conditionsTitle: "Mental Health Concerns We Address",
    conditions: [
      { name: "Anxiety & Restlessness", desc: "Calming herbal and lifestyle protocols to settle Vata and support emotional steadiness." },
      { name: "Insomnia", desc: "Shirodhara, sleep hygiene and Medhya support for deeper, more restorative sleep." },
      { name: "Nightmares", desc: "Targeted care for disturbing dreams linked to stress, Pitta/Vata imbalance or vitality concerns." },
      { name: "Burnout & Mental Fatigue", desc: "Rasayana and routine redesign to restore resilience and focus." },
      { name: "Stress-Related Mood Imbalance", desc: "Holistic support for irritability, low motivation and emotional volatility." },
      { name: "Mind-Gut Linked Distress", desc: "Digestive correction when anxiety and gut symptoms travel together." },
    ],
    whyTitle: "Why Ayurveda for Mental Wellness",
    why: [
      "Treats sleep, digestion and mind as one system",
      "Non-habit-forming herbal and therapy options when suitable",
      "Shirodhara and Medhya Rasayana rooted in classical practice",
      "Confidential, judgement-free consultations",
      "Practical Dinacharya you can sustain at home",
    ],
    faqs: [
      { q: "Is Ayurvedic mental care a replacement for psychiatry?", a: "No. We offer supportive Ayurvedic care and may recommend continuing or seeking specialist mental-health care when needed." },
      { q: "How does Shirodhara help?", a: "Shirodhara pours a warm oil stream on the forehead to calm the nervous system and support sleep and stress relief." },
      { q: "Can nightmares improve with Ayurveda?", a: "Many patients improve when sleep, stress and Dosha imbalance are addressed together with herbs, routine and therapies." },
    ],
  },
  respiratory: {
    metaDescription:
      "Ayurvedic respiratory care in Pune for asthma, sinusitis, allergic rhinitis, chronic cold, tonsillitis and cough with Nasya and Kapha-balancing herbs.",
    overviewTitle: "Ayurvedic Respiratory Care & Sinus Wellness",
    overview: [
      "Respiratory health in Ayurveda centres on Pranavaha Srotas and Kapha-Vata balance. We treat asthma, chronic sinusitis, allergic rhinitis, post-viral cough, tonsillitis and recurrent colds with Nasya, herbal steam and immunity Rasayana.",
      "Devdut Ayurved Clinic offers personalised respiratory care in Pune aimed at easier breathing, fewer flare-ups and stronger seasonal resilience.",
      "Protocols are adapted for age, Prakriti and severity, and can complement your existing pulmonology or ENT advice.",
    ],
    conditionsTitle: "Respiratory Conditions We Treat",
    conditions: [
      { name: "Asthma Support", desc: "Kapha-Vata pacifying care to ease breathlessness and reduce flare frequency." },
      { name: "Chronic Sinusitis", desc: "Nasya and channel-clearing therapies for congestion and sinus pressure." },
      { name: "Allergic Rhinitis", desc: "Immunity support and allergy-season routines to lessen sneezing and runny nose." },
      { name: "Chronic Cold & Cough", desc: "Herbal and steam protocols for lingering cough and recurrent colds." },
      { name: "Tonsillitis Support", desc: "Soothing and immunity-focused care for throat inflammation patterns." },
      { name: "Post-Viral Respiratory Fatigue", desc: "Recovery support after viral illness with Rasayana and breath practices." },
    ],
    whyTitle: "Why Ayurveda for Respiratory Health",
    why: [
      "Nasya therapy targets head and sinus channels directly",
      "Focus on immunity and seasonal prevention",
      "Reduced reliance on repeated symptomatic medication when suitable",
      "Diet and daily routine that lower Kapha accumulation",
      "Personalised plans for adults and older patients",
    ],
    faqs: [
      { q: "Can I continue my inhaler?", a: "Yes. Do not stop prescribed inhalers without your doctor’s advice. Ayurveda often works as co-management." },
      { q: "What is Nasya?", a: "Nasya administers medicated oils or drops through the nostrils to clear Kapha and support sinus and neurological pathways." },
      { q: "How soon will breathing feel easier?", a: "Some notice relief in weeks; chronic asthma or sinusitis usually needs a longer structured protocol." },
    ],
  },
  nadipariksha: {
    metaDescription:
      "Nadipariksha (pulse diagnosis) in Pune at Devdut Ayurved — classical dosha assessment and Prakriti mapping. Promo sessions on the 1st & 15th every month.",
    overviewTitle: "Nadipariksha — Classical Pulse Diagnosis",
    overview: [
      "Nadipariksha is the classical Ayurvedic pulse examination used to understand Doshas, tissues and vital channels. It is the USP of Devdut Ayurved Clinic and the starting point of personalised care.",
      "Dr. Ganeshkumar Patil uses three-finger pulse reading to map Prakriti and Vikriti, then designs herbs, diet and therapies around those findings.",
      "Dedicated Nadipariksha sessions are highlighted every month on the 1st and 15th — ideal for first consultations and treatment reviews in Pune.",
    ],
    conditionsTitle: "What Nadipariksha Helps Reveal",
    conditions: [
      { name: "Prakriti (Constitution)", desc: "Your baseline body-mind type that guides lifelong diet and routine." },
      { name: "Vikriti (Current Imbalance)", desc: "Present Dosha disturbance explaining active symptoms." },
      { name: "Digestive Fire (Agni)", desc: "Strength of metabolism linked to energy, gut and immunity." },
      { name: "Tissue & Channel Status", desc: "Clues about Dhatu nourishment and Srotas function." },
      { name: "Stress & Sleep Patterns", desc: "Nervous-system indicators that shape mental wellness plans." },
      { name: "Treatment Roadmap", desc: "Clear next steps for herbs, Panchakarma or lifestyle care." },
    ],
    whyTitle: "Why Nadipariksha Matters",
    why: [
      "Makes treatment truly personal — not one-size-fits-all",
      "Detects imbalance early, before chronic disease sets in",
      "Guides safer, more precise herbal choices",
      "Explains why symptoms recur despite temporary fixes",
      "Clinic USP practised with 26+ years of clinical experience",
    ],
    faqs: [
      { q: "How long does Nadipariksha take?", a: "Pulse reading itself is focused; a full first consultation including history typically lasts around 45–60 minutes." },
      { q: "Do I need to fast?", a: "Light guidance is given when you book. Usually avoid heavy meals immediately before assessment." },
      { q: "When are promo Nadipariksha days?", a: "Every month on the 1st and 15th — kindly call first to check availability." },
    ],
  },
  hair: {
    metaDescription:
      "Ayurvedic hair fall and scalp treatment in Pune for thinning, dandruff and premature greying with Shiro-abhyanga, Nasya and Rasayana care.",
    overviewTitle: "Ayurvedic Hair & Scalp Treatment",
    overview: [
      "Hair fall, thinning, dandruff and premature greying often reflect digestion, stress and Dosha imbalance. Ayurvedic hair care at Devdut focuses on scalp nourishment, Nasya and internal Rasayana.",
      "Personalised oils, diet and sleep correction help strengthen roots and calm the scalp without harsh chemical dependency.",
    ],
    conditionsTitle: "Hair & Scalp Concerns We Treat",
    conditions: [
      { name: "Hair Fall", desc: "Root-strengthening protocols for excess shedding." },
      { name: "Thinning Hair", desc: "Nourishment and circulation support for density concerns." },
      { name: "Dandruff & Itchy Scalp", desc: "Scalp-balancing care for dryness or oily flaking." },
      { name: "Premature Greying", desc: "Rasayana and Pitta-pacifying support for early greying patterns." },
      { name: "Dry Damaged Hair", desc: "Oleation and diet to restore softness and shine." },
      { name: "Stress-Linked Hair Loss", desc: "Mind-body routines that address stress as a trigger." },
    ],
    whyTitle: "Why Ayurveda for Hair Health",
    why: [
      "Treats scalp and digestion together",
      "Custom oils matched to Prakriti",
      "Addresses stress and sleep drivers of hair fall",
      "Long-term root health over temporary coating",
    ],
    faqs: [
      { q: "How long before hair fall reduces?", a: "Many notice change in 6–12 weeks with consistent herbs, oiling and diet." },
      { q: "Do you use minoxidil?", a: "We focus on classical Ayurvedic protocols. Discuss any ongoing treatments during consultation." },
    ],
  },
  diabetes: {
    metaDescription:
      "Ayurvedic diabetes (Madhumeha) co-management in Pune to support blood sugar balance, energy and complication prevention with diet and herbs.",
    overviewTitle: "Ayurvedic Diabetes (Madhumeha) Care",
    overview: [
      "Madhumeha care in Ayurveda emphasises metabolism, Kapha-Medo balance and sustainable diet. We co-manage diabetes alongside your endocrinologist to support glycemic control and vitality.",
      "Plans include herbal formulations, meal timing, yoga guidance and neuropathy-aware foot care education.",
    ],
    conditionsTitle: "Diabetes-Related Support Areas",
    conditions: [
      { name: "Blood Sugar Support", desc: "Lifestyle and herbal care to support healthier glycemic patterns." },
      { name: "Metabolic Fatigue", desc: "Energy and digestion rebuilding for diabetic tiredness." },
      { name: "Weight Co-Management", desc: "Kapha-pacifying routines for weight linked to insulin resistance." },
      { name: "Neuropathy Comfort Support", desc: "Supportive care for tingling and foot discomfort patterns." },
      { name: "Diet Education", desc: "Practical Ayurvedic meal frameworks you can sustain." },
      { name: "Prevention Focus", desc: "Long-term habits to reduce complication risk." },
    ],
    whyTitle: "Why Ayurveda for Diabetes Support",
    why: [
      "Works with your existing medical care",
      "Targets metabolism and digestion, not only numbers",
      "Personalised diet you can actually follow",
      "Focus on energy, sleep and stress",
    ],
    faqs: [
      { q: "Can I stop my diabetes medicines?", a: "Never stop prescribed medicines without your doctor. Ayurveda is co-management." },
      { q: "Will you check my reports?", a: "Yes. Bring recent HbA1c and sugar reports for safer planning." },
    ],
  },
  migraine: {
    metaDescription:
      "Ayurvedic migraine and headache treatment in Pune with Shirodhara, Nasya and Pitta-pacifying care to reduce attack frequency and intensity.",
    overviewTitle: "Ayurvedic Migraine & Headache Treatment",
    overview: [
      "Chronic migraine and tension headaches often stem from Pitta-Vata imbalance, poor sleep and digestive triggers. Our Pune clinic uses Shirodhara, Nasya and trigger mapping for lasting relief.",
      "The aim is fewer attacks, lower intensity and less dependence on rescue medication through root-cause care.",
    ],
    conditionsTitle: "Headache Patterns We Treat",
    conditions: [
      { name: "Migraine", desc: "Protocols to reduce frequency and severity of migraine attacks." },
      { name: "Tension Headaches", desc: "Stress and muscle-tension oriented calming care." },
      { name: "Cluster-Type Patterns", desc: "Assessment-based support for recurrent severe headache cycles." },
      { name: "Pitta Headaches", desc: "Cooling, Pitta-pacifying diet and therapies." },
      { name: "Sleep-Linked Headaches", desc: "Sleep restoration as part of headache control." },
      { name: "Digestive Trigger Headaches", desc: "Agni correction when gut triggers headaches." },
    ],
    whyTitle: "Why Ayurveda for Migraine",
    why: [
      "Addresses triggers, not only pain peaks",
      "Shirodhara and Nasya for nervous-system calming",
      "Diet and routine redesign to prevent relapse",
      "Suitable for long-standing chronic cases",
    ],
    faqs: [
      { q: "Do I need scans before treatment?", a: "Bring any existing reports. Red-flag symptoms are referred for medical evaluation first." },
      { q: "How soon do migraines reduce?", a: "Many patients see fewer attacks over several weeks of consistent care." },
    ],
  },
  "weight-loss": {
    metaDescription:
      "Ayurvedic weight loss and metabolism care in Pune with Ama-pachana, Udwartana and sustainable diet — fat loss without starvation.",
    overviewTitle: "Ayurvedic Weight & Metabolism Care",
    overview: [
      "Sustainable weight care in Ayurveda begins with digesting Ama and rebuilding Agni — not extreme calorie cuts. Udwartana, Medohar herbs and personalised meals support fat loss while protecting strength.",
      "Devdut Ayurved Clinic in Pune designs weight programmes around Prakriti, lifestyle and metabolic health.",
    ],
    conditionsTitle: "Weight & Metabolism Goals We Support",
    conditions: [
      { name: "Stubborn Weight Gain", desc: "Kapha-Medo focused routines for hard-to-shift weight." },
      { name: "Slow Metabolism", desc: "Deepana-Pachana care to revive digestive fire." },
      { name: "Post-Diet Rebound", desc: "Sustainable habits after yo-yo dieting." },
      { name: "Lipid Profile Support", desc: "Diet and herbs oriented to metabolic wellness." },
      { name: "Belly Heaviness", desc: "Targeted movement and meal timing guidance." },
      { name: "Energy with Fat Loss", desc: "Plans that preserve vitality while reducing weight." },
    ],
    whyTitle: "Why Ayurveda for Weight Care",
    why: [
      "No starvation protocols",
      "Corrects digestion that drives weight gain",
      "Personalised — not generic calorie apps",
      "Builds habits that last after the programme",
    ],
    faqs: [
      { q: "Is Udwartana a massage for weight loss?", a: "Udwartana is a dry herbal powder massage traditionally used to support Kapha reduction and circulation." },
      { q: "How fast will I lose weight?", a: "Steady, constitution-safe loss is preferred over rapid drops. Timelines are set after assessment." },
    ],
  },
  pcod: {
    metaDescription:
      "Ayurvedic PCOD and PCOS treatment in Pune for irregular cycles, weight balance, acne and fertility support with personalised herbal care.",
    overviewTitle: "Ayurvedic PCOD & PCOS Care",
    overview: [
      "PCOD/PCOS care in Ayurveda balances hormones through metabolism, stress and reproductive-channel support. We help regularise cycles, manage weight and improve skin and fertility markers naturally.",
      "Plans may include herbs, yoga guidance and cycle-phase nutrition tailored at our Pune clinic.",
    ],
    conditionsTitle: "PCOD/PCOS Concerns We Address",
    conditions: [
      { name: "Irregular Cycles", desc: "Protocols aimed at more predictable menstrual rhythm." },
      { name: "Cystic Pattern Support", desc: "Metabolic and hormonal balancing care." },
      { name: "Weight Linked to PCOS", desc: "Kapha-pacifying diet and movement plans." },
      { name: "Acne & Hirsutism Support", desc: "Skin and hormone-aware Ayurvedic care." },
      { name: "Fertility Preparation", desc: "Pre-conception wellness for PCOS-related fertility goals." },
      { name: "Mood & Energy", desc: "Support for PCOS-related fatigue and mood swings." },
    ],
    whyTitle: "Why Ayurveda for PCOD/PCOS",
    why: [
      "Treats metabolism and hormones together",
      "Cycle-aware nutrition",
      "Reduces reliance on long-term hormone-only approaches when suitable",
      "Confidential women’s health expertise",
    ],
    faqs: [
      { q: "Can Ayurveda replace hormonal pills?", a: "Decisions are individual. Many patients co-manage; never stop medicines without your gynaecologist’s advice." },
      { q: "How long is a typical protocol?", a: "Often 3–6 months of consistent care depending on goals and severity." },
    ],
  },
  infertility: {
    metaDescription:
      "Ayurvedic infertility care in Pune with Garbha Sanskar and Vajikarana for natural conception support, egg/sperm quality and uterine preparation.",
    overviewTitle: "Ayurvedic Infertility & Conception Support",
    overview: [
      "Fertility care in Ayurveda prepares both partners through detoxification, Rasayana and reproductive-channel strength. Garbha Sanskar and Vajikarana traditions guide our conception-support protocols in Pune.",
      "We focus on egg and sperm quality, uterine readiness and emotional preparedness with confidential couple-centred care.",
    ],
    conditionsTitle: "Fertility Support Areas",
    conditions: [
      { name: "Female Fertility Support", desc: "Protocols for reproductive wellness and cycle harmony." },
      { name: "Male Fertility Support", desc: "Vajikarana-oriented care for vitality and sperm health goals." },
      { name: "Uterine Preparation", desc: "Nourishment and cleansing approaches before conception attempts." },
      { name: "Hormonal Balance", desc: "Support where thyroid or PCOS patterns affect fertility." },
      { name: "IVF Adjunct Wellness", desc: "Supportive Ayurveda timed around medical fertility plans when appropriate." },
      { name: "Stress & Couple Counselling", desc: "Emotional readiness as part of conception care." },
    ],
    whyTitle: "Why Ayurveda for Fertility",
    why: [
      "Couple-based Prakriti assessment",
      "Classical Garbha Sanskar wisdom",
      "Focus on tissue nourishment before conception",
      "Works alongside modern fertility care when needed",
    ],
    faqs: [
      { q: "How long before we try to conceive on the plan?", a: "Often a preparation phase of weeks to months is advised based on assessment." },
      { q: "Do both partners need treatment?", a: "Ideally yes — fertility is a shared biological and lifestyle process." },
    ],
  },
  "stress-sleep": {
    metaDescription:
      "Ayurvedic stress and sleep treatment in Pune for burnout, anxiety and insomnia with Shirodhara, Ashwagandha and daily rhythm design.",
    overviewTitle: "Ayurvedic Stress & Sleep Care",
    overview: [
      "Burnout and insomnia recover when the nervous system, digestion and daily rhythm are rebuilt together. Shirodhara, Medhya Rasayana and Dinacharya coaching form the core of our stress-sleep protocols.",
      "Devdut Ayurved Clinic helps Pune patients restore deeper sleep and calmer days without dependency-forming approaches.",
    ],
    conditionsTitle: "Stress & Sleep Concerns We Treat",
    conditions: [
      { name: "Insomnia", desc: "Natural sleep support through therapies and routine." },
      { name: "Burnout", desc: "Recovery plans for mental and physical exhaustion." },
      { name: "Anxiety-Linked Sleep Loss", desc: "Calming protocols for racing thoughts at night." },
      { name: "Poor Sleep Quality", desc: "Care for light, broken or non-restorative sleep." },
      { name: "Work Stress Overload", desc: "Boundaries, breathwork and adaptogenic support." },
      { name: "Weekend Sleep Crash Cycles", desc: "Rhythm redesign for sustainable energy." },
    ],
    whyTitle: "Why Ayurveda for Stress & Sleep",
    why: [
      "Treats cause of sleeplessness, not only sedation",
      "Shirodhara for deep nervous-system calm",
      "Practical routines for busy professionals",
      "Supports focus and emotional resilience",
    ],
    faqs: [
      { q: "Will I get sleeping pills?", a: "We use classical herbs and therapies; any medicines you already take are reviewed carefully." },
      { q: "How many Shirodhara sessions help?", a: "A short series is often recommended; exact count follows assessment." },
    ],
  },
  "lifestyle-chronic": {
    metaDescription:
      "Ayurvedic treatment for jaundice, infective hepatitis, diabetes, thyroid, obesity, allergies, insomnia, and acidity in Pune at Devdut Ayurved Clinic.",
    overviewTitle: "Ayurvedic Lifestyle & Chronic Disease Care in Pune",
    overview: [
      "Modern lifestyles, stress, irregular dietary habits, and environmental factors contribute to chronic health conditions. At Devdut Ayurved Clinic in Pune, we manage lifestyle and chronic diseases by addressing root causes, restoring metabolic fire (Agni), and clearing deep-seated toxins (Ama).",
      "Our protocols support jaundice management, infective hepatitis recovery, diabetes blood sugar control, thyroid balancing, sustainable weight loss, allergies, insomnia, and acidity relief through personalized herbal medicines and Panchakarma therapies.",
      "Every treatment plan is tailored to your Prakriti and current Dosha state following detailed pulse assessment (Nadipariksha) and medical history review.",
    ],
    conditionsTitle: "Lifestyle & Chronic Conditions We Treat",
    conditions: [
      { name: "Jaundice & Infective Hepatitis", desc: "Ayurvedic support for liver health, clearing bile channels, hepato-protective herbal formulas, and digestive restoration." },
      { name: "Diabetes (Madhumeha)", desc: "Metabolic and blood sugar management alongside diet and lifestyle modifications." },
      { name: "Thyroid Disorders", desc: "Hormonal balancing support for hypothyroidism and hyperthyroidism patterns." },
      { name: "Obesity & Weight Management", desc: "Sustainable weight reduction through Udwartana, metabolism boosting, and nutrition." },
      { name: "Allergies & Immunity", desc: "Addressing seasonal, skin, and respiratory allergies by strengthening natural immunity." },
      { name: "Insomnia & Stress", desc: "Calming nervous system therapies, Shirodhara, and sleep hygiene guidance." },
      { name: "Acidity & Hyperacidity", desc: "Cooling Pitta-pacifying formulations, gut health restoration, and heartburn relief." },
    ],
    whyTitle: "Why Choose Ayurveda for Chronic Disease & Liver Care",
    why: [
      "Root cause-based diagnosis and Nadipariksha pulse reading",
      "Specialized protocols for liver health, jaundice, and infective hepatitis recovery",
      "Authentic hepato-protective herbs and classical Panchakarma detox",
      "Personalized nutrition, Dinacharya, and lifestyle coaching",
      "Safe, long-term wellness without suppressive side effects",
    ],
    faqs: [
      { q: "How does Ayurveda support jaundice and infective hepatitis recovery?", a: "Ayurveda uses hepato-protective herbs like Guduchi, Bhumi Amla, and Kalmegh alongside Virechana (when indicated) to purify liver bile channels, protect liver cells, and rebuild digestive fire during recovery." },
      { q: "Is Ayurvedic chronic care compatible with ongoing allopathic medicines?", a: "Yes. Ayurvedic treatments work safely as co-management alongside your existing medical prescriptions under expert supervision." },
      { q: "How long does chronic disease treatment usually take?", a: "Protocols typically range from 8 to 24 weeks depending on the chronicity of the condition, patient Prakriti, and response to therapies." },
    ],
  },
};

export function getTreatmentSeo(slug: string, fallbackName: string, fallbackShort: string): TreatmentSeo {
  const existing = TREATMENT_SEO[slug];
  if (existing) return existing;
  return {
    metaDescription: `${fallbackShort} Authentic Ayurvedic care at Devdut Ayurved Clinic, Pune.`,
    overviewTitle: `${fallbackName} — Ayurvedic Care at Devdut`,
    overview: [
      `${fallbackShort}`,
      `At Devdut Ayurved Clinic in Pune, treatment begins with understanding your Prakriti and current imbalance. Care may include classical herbal medicines, therapies, diet guidance and lifestyle coaching tailored to you.`,
      `Our approach emphasises root-cause healing, Nadipariksha-informed assessment and sustainable wellness rather than short-term symptom suppression.`,
    ],
    conditionsTitle: `How We Approach ${fallbackName}`,
    conditions: [
      { name: "Personalised Assessment", desc: "Prakriti, history and lifestyle review before prescribing." },
      { name: "Herbal Protocols", desc: "Classical formulations matched to your constitution." },
      { name: "Therapies When Needed", desc: "Panchakarma or local therapies as clinically indicated." },
      { name: "Diet Guidance", desc: "Practical food rules you can follow daily." },
      { name: "Lifestyle Coaching", desc: "Sleep, stress and routine corrections." },
      { name: "Follow-up Care", desc: "Adjustments until your results stabilise." },
    ],
    whyTitle: "Why Patients Choose Devdut Ayurved",
    why: [
      "Root-cause Ayurvedic diagnosis",
      "Personalised, not protocol-template care",
      "Classical therapies with modern clinical caution",
      "Clear diet and lifestyle guidance",
      "Compassionate follow-up",
    ],
    faqs: [
      { q: "How do I start treatment?", a: "Book a consultation, preferably after calling to check availability. First visits include history and pulse assessment." },
      { q: "Are medicines classical Ayurvedic herbs?", a: "Yes. We prescribe authentic Ayurvedic formulations suited to your condition and constitution." },
    ],
  };
}
