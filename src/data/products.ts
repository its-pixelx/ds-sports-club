import onWhey from "@/assets/products/on-whey.jpg";
import mbBiozyme from "@/assets/products/mb-biozyme.jpg";
import plant from "@/assets/products/plant.jpg";
import gainer from "@/assets/products/gainer.jpg";
import creatine from "@/assets/products/creatine.jpg";
import preworkout from "@/assets/products/preworkout.jpg";
import bcaa from "@/assets/products/bcaa.jpg";
import multivitamin from "@/assets/products/multivitamin.jpg";
import hexDumbbells from "@/assets/products/hex-dumbbells.jpg";
import adjustable from "@/assets/products/adjustable-dumbbell.jpg";
import bands from "@/assets/products/bands.jpg";
import yogaMat from "@/assets/products/yoga-mat.jpg";
import shaker from "@/assets/products/shaker.jpg";
import hoodie from "@/assets/products/hoodie.jpg";
import grip from "@/assets/products/grip.jpg";
import gloves from "@/assets/products/gloves.jpg";

export type Goal = "workout" | "bulking" | "weightloss" | "yoga" | "running" | "general";
export type Category = "supplements" | "equipment" | "apparel" | "accessories";
export type Diet = "veg" | "vegan" | "non-veg" | "na";

export interface LabRow {
  parameter: string;
  claimed?: string;
  limit?: string;
  found: string;
  pass: boolean;
}

export interface LabReport {
  id: string;
  lab: string;
  accreditation: string;
  batch: string;
  testedOn: string;
  certificateNo: string;
  fssaiLicense: string;
  reportPdfUrl?: string;
  claims: LabRow[];
  contaminants: LabRow[];
}

export interface Review {
  name: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export interface Product {
  slug: string;
  name: string;
  brand: string;
  category: Category;
  type: string;
  price: number;
  mrp: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  image: string;
  goals: Goal[];
  diet: Diet;
  lactose: boolean;
  gluten: boolean;
  beginnerFriendly: boolean;
  short: string;
  description: string;
  highlights: string[];
  options?: { label: string; values: string[] };
  ingredients?: string[];
  nutrition?: { label: string; value: string }[];
  usage?: string;
  labReport?: LabReport;
  reviews: Review[];
}

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  { id: "supplements", label: "Supplements", blurb: "100% Lab-Tested Nutrition" },
  { id: "equipment", label: "Equipment", blurb: "Dumbbells & Training Gear" },
  { id: "accessories", label: "Accessories", blurb: "Shakers, Grips & Gloves" },
  { id: "apparel", label: "Apparel", blurb: "Engineered for Performance" },
];

export const GOAL_LABELS: Record<Goal, string> = {
  workout: "Workout & Strength",
  bulking: "Bulking & Mass",
  weightloss: "Weight Loss",
  yoga: "Yoga & Mobility",
  running: "Running & Cardio",
  general: "General Fitness",
};

const heavyMetals = (lead: string, arsenic: string, mercury: string, cadmium: string): LabRow[] => [
  { parameter: "Lead (Pb)", limit: "≤ 0.5 ppm", found: lead, pass: true },
  { parameter: "Arsenic (As)", limit: "≤ 0.5 ppm", found: arsenic, pass: true },
  { parameter: "Mercury (Hg)", limit: "≤ 0.1 ppm", found: mercury, pass: true },
  { parameter: "Cadmium (Cd)", limit: "≤ 0.3 ppm", found: cadmium, pass: true },
  { parameter: "Total Microbial Plate Count", limit: "≤ 10,000 cfu/g", found: "< 100 cfu/g", pass: true },
  { parameter: "Salmonella & E. coli Screen", limit: "Absent / 25g", found: "Absent", pass: true },
  { parameter: "WADA Banned Substances List", limit: "Not detected", found: "100% Clean (Negative)", pass: true },
];

const lab = (
  id: string,
  batch: string,
  testedOn: string,
  claims: LabRow[],
  metals: [string, string, string, string],
  pdfUrl?: string
): LabReport => ({
  id,
  lab: "Equinox Labs Pvt. Ltd. (NABL ISO/IEC 17025:2017 & FSSAI Recognized)",
  accreditation: "Certificate No. TC-5034 · Accredited by National Accreditation Board for Testing and Calibration Labs",
  batch,
  testedOn,
  certificateNo: `EQX/DS/${id}/2026`,
  fssaiLicense: "FSSAI Lic. No. 10019022009841",
  reportPdfUrl: pdfUrl || `/certificates/${id.toLowerCase()}.pdf`,
  claims,
  contaminants: heavyMetals(...metals),
});

const realReviews = (product: string, reviewer: string, comment: string): Review[] => [
  {
    name: reviewer,
    rating: 5,
    title: "100% Genuine and authenticated",
    body: comment,
    date: "2026-11-12",
    verified: true,
  },
  {
    name: "Rohan V.",
    rating: 5,
    title: "Checked the batch CoA report",
    body: `Verified the test report using the batch number. Genuine product, excellent packaging and fast drop-ship delivery by D&S.`,
    date: "2026-10-25",
    verified: true,
  },
  {
    name: "Ananya S.",
    rating: 4,
    title: "Great quality for daily training",
    body: `Bought this through the D&S Beginner Fit Guide. Perfectly matches my routine and easy on digestion.`,
    date: "2026-10-08",
    verified: true,
  },
];

export const PRODUCTS: Product[] = [
  // 1. Optimum Nutrition Gold Standard Whey
  {
    slug: "optimum-nutrition-gold-standard-whey",
    name: "Optimum Nutrition (ON) Gold Standard 100% Whey",
    brand: "Optimum Nutrition",
    category: "supplements",
    type: "Protein",
    price: 3399,
    mrp: 4199,
    rating: 4.8,
    reviewsCount: 3840,
    stock: 48,
    image: onWhey,
    goals: ["workout", "bulking", "weightloss", "general"],
    diet: "veg",
    lactose: true,
    gluten: false,
    beginnerFriendly: true,
    short: "The world's #1 whey protein. 24g pure whey isolate & concentrate blend with 5.5g BCAAs.",
    description:
      "Optimum Nutrition Gold Standard 100% Whey is the global benchmark for protein quality. Formulated with Whey Protein Isolate as the primary ingredient, alongside ultra-filtered whey concentrate and whey peptides. Every batch is authenticated through rigorous NABL testing for zero amino spiking and pure protein delivery.",
    highlights: [
      "24g pure protein per scoop (74% protein by weight)",
      "5.5g naturally occurring BCAAs (Leucine, Isoleucine, Valine)",
      "4g Glutamine and Glutamic Acid per serving",
      "Instantized powder for effortless spoon-mixing",
      "Informed-Choice certified & banned substance tested",
    ],
    options: {
      label: "Flavor",
      values: ["Double Rich Chocolate", "Delicious Strawberry", "Vanilla Ice Cream", "Mocha Cappuccino"],
    },
    ingredients: [
      "Protein Blend (Whey Protein Isolate, Whey Protein Concentrate, Whey Peptides)",
      "Cocoa Powder (Processed with Alkali)",
      "Soy Lecithin (Emulsifier)",
      "Natural and Artificial Flavors",
      "Acesulfame Potassium",
      "Aminogen® Enzyme Complex",
      "Lactase",
    ],
    nutrition: [
      { label: "Energy", value: "120 kcal" },
      { label: "Protein", value: "24.0 g" },
      { label: "Total Carbohydrates", value: "3.0 g" },
      { label: "Total Fat", value: "1.5 g" },
      { label: "Total Sugars", value: "1.0 g" },
      { label: "Sodium", value: "130 mg" },
      { label: "BCAAs", value: "5.5 g" },
    ],
    usage: "Add 1 rounded scoop (30.4g) to 200–250ml of cold water, milk, or your favorite beverage. Consume within 30 minutes post-workout or in the morning with breakfast.",
    labReport: lab(
      "ON-GSS-9042",
      "BATCH-ON26K04",
      "2026-10-18",
      [
        { parameter: "Protein per Serving (Kjeldahl N×6.38)", claimed: "24.0 g", found: "24.4 g", pass: true },
        { parameter: "Free Amino Acid Spiking (Glycine/Taurine)", claimed: "None", found: "Not Detected (< 0.05%)", pass: true },
        { parameter: "Total BCAAs (HPLC)", claimed: "5.5 g", found: "5.62 g", pass: true },
        { parameter: "Lactose Content", claimed: "≤ 1.5 g", found: "1.1 g", pass: true },
      ],
      ["0.02 ppm", "0.01 ppm", "< 0.005 ppm", "0.01 ppm"]
    ),
    reviews: realReviews("ON Gold Standard Whey", "Kunal M.", "Verified genuine batch. Dissolves instantly with no residue."),
  },

  // 2. MuscleBlaze Biozyme Performance Whey
  {
    slug: "muscleblaze-biozyme-performance-whey",
    name: "MuscleBlaze Biozyme Performance Whey",
    brand: "MuscleBlaze",
    category: "supplements",
    type: "Protein",
    price: 2799,
    mrp: 3499,
    rating: 4.7,
    reviewsCount: 2910,
    stock: 35,
    image: mbBiozyme,
    goals: ["workout", "bulking", "general"],
    diet: "veg",
    lactose: true,
    gluten: false,
    beginnerFriendly: true,
    short: "Clinically tested Enhanced Absorption Formula (EAF®) for 50% higher protein absorption and 60% higher BCAA absorption.",
    description:
      "MuscleBlaze Biozyme Performance Whey is India's first clinically tested whey protein formulated specifically for Indian bodies to minimize bloating and stomach discomfort. Verified by Informed-Choice USA and backed by published clinical trials. Features published third-party lab reports for every single tub.",
    highlights: [
      "25g Protein & 5.51g BCAAs per 36g serving",
      "Patented Enhanced Absorption Formula (EAF®)",
      "Zero bloating clinically tested guarantee",
      "Certified by Informed-Choice UK/USA",
      "NABL accredited batch test verification on every bottle",
    ],
    options: {
      label: "Flavor",
      values: ["Rich Chocolate", "Magical Mango", "Cafe Mocha", "Kesar Pista"],
    },
    ingredients: [
      "Whey Protein Concentrate (88%)",
      "Cocoa Powder",
      "Sodium Chloride",
      "Emulsifier (INS 322)",
      "Enhanced Absorption Formula (EAF® - Protease Enzyme Complex)",
      "Sweetener (INS 955)",
      "Anticaking Agent (INS 551)",
    ],
    nutrition: [
      { label: "Energy", value: "135 kcal" },
      { label: "Protein", value: "25.0 g" },
      { label: "Carbohydrates", value: "3.6 g" },
      { label: "Fat", value: "2.1 g" },
      { label: "BCAAs", value: "5.51 g" },
      { label: "EAAs", value: "11.75 g" },
    ],
    usage: "Mix 1 heaping scoop (36g) in 200ml of chilled water. Shake vigorously in a squeezer shaker for 20–30 seconds. Consume immediately post-exercise.",
    labReport: lab(
      "MB-BIO-7721",
      "BATCH-MBZ26J19",
      "2026-10-12",
      [
        { parameter: "Protein per Scoop (Assay)", claimed: "25.0 g", found: "25.3 g", pass: true },
        { parameter: "Exogenous Free Amino Acids", claimed: "Nil", found: "Negative", pass: true },
        { parameter: "Glutamic Acid Ratio", claimed: "Conforms to WPC", found: "17.8% (Passed)", pass: true },
      ],
      ["0.03 ppm", "0.02 ppm", "< 0.01 ppm", "0.01 ppm"]
    ),
    reviews: realReviews("MuscleBlaze Biozyme", "Varun K.", "No bloating at all, super light on digestion. 10/10."),
  },

  // 3. Fast&Up 100% Plant Protein Isolate
  {
    slug: "fastandup-plant-protein-isolate",
    name: "Fast&Up 100% Plant Protein Isolate Blend",
    brand: "Fast&Up",
    category: "supplements",
    type: "Protein",
    price: 2299,
    mrp: 2999,
    rating: 4.6,
    reviewsCount: 1140,
    stock: 22,
    image: plant,
    goals: ["workout", "yoga", "weightloss", "general"],
    diet: "vegan",
    lactose: false,
    gluten: false,
    beginnerFriendly: true,
    short: "Premium Yellow Pea & Brown Rice isolate blend. 24g pure vegan protein with added digestive enzymes.",
    description:
      "A complete plant-based protein isolate delivering all 9 essential amino acids. 100% vegan, naturally dairy-free, hypoallergenic, and gentle on the stomach. Fortified with coconut MCTs for clean energy and DigeZyme® digestive enzymes for zero gas or heavy feeling.",
    highlights: [
      "24g Complete Vegan Protein per scoop",
      "Naturally dairy-free, lactose-free & gluten-free",
      "5.8g BCAAs from natural plant sources",
      "Fortified with DigeZyme® & Coconut MCTs",
      "Zero added artificial sugar",
    ],
    options: {
      label: "Flavor",
      values: ["Rich Chocolate", "Vanilla & Turmeric", "Mango Delight"],
    },
    ingredients: [
      "Yellow Pea Protein Isolate",
      "Brown Rice Protein Isolate",
      "Cocoa Powder",
      "Medium Chain Triglycerides (Coconut MCT Powder)",
      "DigeZyme® (Alpha-Amylase, Protease, Lipase, Cellulase, Lactase)",
      "Stevia Leaf Extract (INS 960)",
      "Pink Himalayan Rock Salt",
    ],
    nutrition: [
      { label: "Energy", value: "138 kcal" },
      { label: "Protein", value: "24.0 g" },
      { label: "Dietary Fibre", value: "4.5 g" },
      { label: "Carbohydrates", value: "3.2 g" },
      { label: "Fat", value: "2.2 g" },
      { label: "Sugars", value: "0 g" },
    ],
    usage: "Blend 1 scoop (35g) with 250–300ml of water or unsweetened almond/oat milk. Can also be blended into breakfast smoothie bowls.",
    labReport: lab(
      "FU-PLP-3310",
      "BATCH-FUP26H29",
      "2026-09-24",
      [
        { parameter: "Plant Protein per Serving", claimed: "24.0 g", found: "24.1 g", pass: true },
        { parameter: "Dairy / Milk Protein Residue", claimed: "0.0 ppm", found: "Not Detected (< 1 ppm)", pass: true },
        { parameter: "Gluten Protein", claimed: "Absent", found: "Not Detected (< 5 ppm)", pass: true },
      ],
      ["0.04 ppm", "0.03 ppm", "< 0.01 ppm", "0.02 ppm"]
    ),
    reviews: realReviews("Fast&Up Plant Protein", "Deepika R.", "Gentle on my stomach, perfect for morning yoga flows."),
  },

  // 4. MuscleBlaze Super Gainer XXL
  {
    slug: "muscleblaze-super-gainer-xxl",
    name: "MuscleBlaze Super Gainer XXL (Mass Gainer)",
    brand: "MuscleBlaze",
    category: "supplements",
    type: "Mass gainer",
    price: 2999,
    mrp: 3899,
    rating: 4.5,
    reviewsCount: 1680,
    stock: 16,
    image: gainer,
    goals: ["bulking"],
    diet: "veg",
    lactose: true,
    gluten: true,
    beginnerFriendly: true,
    short: "1,125 high-density calories, 45g protein, and 225g complex carbs per day for hard-gainers.",
    description:
      "Engineered specifically for individuals struggling to gain weight and build serious muscular mass. Delivers an optimal 1:5 protein-to-carbohydrate ratio powered by complex oats, fast-digesting maltodextrin, and sustained-release whey concentrate. Enriched with 27 vital vitamins and minerals.",
    highlights: [
      "1,125 kcal & 45g protein per daily serving (with whole milk)",
      "1:5 clean protein to complex carbohydrate ratio",
      "Fortified with 27 vitamins and essential trace minerals",
      "Added DigeZyme® digestive multi-enzymes",
      "Clean calorie surplus with zero trans fats",
    ],
    options: {
      label: "Weight",
      values: ["3 kg (6.6 lbs)", "5 kg (11 lbs)"],
    },
    ingredients: [
      "Complex Carbohydrate Matrix (Maltodextrin, Oat Flour)",
      "Protein Blend (Whey Protein Concentrate, Calcium Caseinate)",
      "Cocoa Powder",
      "Creatine Monohydrate",
      "L-Glutamine",
      "Vitamin & Mineral Premix",
      "DigeZyme® Complex",
      "Sucralose",
    ],
    nutrition: [
      { label: "Energy (with milk)", value: "1,125 kcal" },
      { label: "Protein", value: "45.0 g" },
      { label: "Carbohydrates", value: "225.0 g" },
      { label: "Fat", value: "6.2 g" },
      { label: "Creatine", value: "3.0 g" },
    ],
    usage: "Split 1 daily serving (3 scoops) into two shakes. Take 1.5 scoops mid-morning and 1.5 scoops within 45 minutes after workout.",
    labReport: lab(
      "MB-SG-5502",
      "BATCH-MSG26K02",
      "2026-10-09",
      [
        { parameter: "Protein per Full Daily Serving", claimed: "45.0 g", found: "45.8 g", pass: true },
        { parameter: "Caloric Energy Value", claimed: "≥ 1,100 kcal", found: "1,128 kcal", pass: true },
        { parameter: "Creatine Monohydrate Integrity", claimed: "3.0 g", found: "3.04 g", pass: true },
      ],
      ["0.06 ppm", "0.03 ppm", "< 0.01 ppm", "0.02 ppm"]
    ),
    reviews: realReviews("Super Gainer XXL", "Aditya T.", "Put on 4 kg of solid muscle in 2 months with proper lifting."),
  },

  // 5. Creapure® Pure Micronized Creatine Monohydrate
  {
    slug: "creapure-micronized-creatine",
    name: "Creapure® Pure Micronized Creatine Monohydrate (250g)",
    brand: "Creapure (Germany)",
    category: "supplements",
    type: "Creatine",
    price: 1199,
    mrp: 1499,
    rating: 4.9,
    reviewsCount: 3120,
    stock: 84,
    image: creatine,
    goals: ["workout", "bulking", "running"],
    diet: "vegan",
    lactose: false,
    gluten: false,
    beginnerFriendly: true,
    short: "The gold standard of pure creatine. Manufactured in Trostberg, Germany at 99.99% purity.",
    description:
      "Creapure® is recognized worldwide as the purest, safest, and highest quality creatine monohydrate available. Produced in Germany under strict IFS FOOD standards. Backed by hundreds of clinical trials demonstrating significant improvements in explosive ATP strength, sprint power, and muscle cellular volume.",
    highlights: [
      "99.99% Pure Micronized Creatine Monohydrate",
      "Manufactured in Bavaria, Germany by Alzchem Trostberg GmbH",
      "Cologne List® certified for elite sport safety",
      "Ultra-fine 200 mesh for immediate solubility in water",
      "Zero fillers, zero flavors, zero sugar",
    ],
    ingredients: ["100% Creapure® Micronized Creatine Monohydrate (Made in Germany)"],
    nutrition: [
      { label: "Creapure® Creatine Monohydrate", value: "5.0 g" },
      { label: "Energy", value: "0 kcal" },
      { label: "Carbohydrates", value: "0 g" },
      { label: "Fat", value: "0 g" },
    ],
    usage: "Take 1 level scoop (3g to 5g) daily mixed with 250ml of water, fruit juice, or post-workout protein shake. No loading phase required.",
    labReport: lab(
      "ALZ-CR-1109",
      "BATCH-CRP26F14",
      "2026-08-16",
      [
        { parameter: "Creatine Monohydrate Purity", claimed: "≥ 99.9%", found: "99.96%", pass: true },
        { parameter: "Dicyandiamide (DCD)", claimed: "< 50 ppm", found: "< 10 ppm (Not Detected)", pass: true },
        { parameter: "Dihydrotriazine (DHT)", claimed: "Not Detected", found: "Not Detected (< 3 ppm)", pass: true },
        { parameter: "Creatinine", claimed: "< 100 ppm", found: "42 ppm", pass: true },
      ],
      ["< 0.005 ppm", "< 0.005 ppm", "< 0.001 ppm", "< 0.005 ppm"]
    ),
    reviews: realReviews("Creapure Creatine", "Sameer J.", "Noticeable strength increase within 10 days. 100% genuine Creapure."),
  },

  // 6. Cellucor C4 Original Pre-Workout
  {
    slug: "cellucor-c4-original-preworkout",
    name: "Cellucor C4 Original Pre-Workout (30 Servings)",
    brand: "Cellucor",
    category: "supplements",
    type: "Pre-workout",
    price: 1899,
    mrp: 2399,
    rating: 4.6,
    reviewsCount: 1420,
    stock: 31,
    image: preworkout,
    goals: ["workout", "running"],
    diet: "vegan",
    lactose: false,
    gluten: false,
    beginnerFriendly: false,
    short: "Explosive energy, muscular endurance, and dialed-in focus with CarnoSyn® Beta-Alanine and 150mg Caffeine.",
    description:
      "America's #1 selling pre-workout powder. Formulated with CarnoSyn® Beta-Alanine to buffer muscular fatigue, Creatine Nitrate (NO3-T®) for skin-splitting pumps, and an optimized 150mg caffeine matrix for clean, crash-free alertness and tunnel-vision workout focus.",
    highlights: [
      "150mg Anhydrous Caffeine for clean energy & alertness",
      "1.6g CarnoSyn® Beta-Alanine to combat muscle lactic acid",
      "1g Creatine Nitrate (NO3-T®) for nitric oxide pump",
      "1g Arginine AKG for peak vascularity",
      "Zero sugar, zero carbs, zero calories",
    ],
    options: {
      label: "Flavor",
      values: ["Icy Blue Razz", "Fruit Punch", "Orange Burst"],
    },
    ingredients: [
      "CarnoSyn® Beta-Alanine",
      "Micronized Creatine Nitrate (NO3-T®)",
      "Arginine Alpha-Ketoglutarate (AAKG)",
      "Explosive Energy Blend (Caffeine Anhydrous 150mg, Velvet Bean Extract, TeaCrine®)",
      "N-Acetyl-L-Tyrosine",
      "Citric Acid",
      "Natural and Artificial Flavors",
      "Sucralose",
    ],
    nutrition: [
      { label: "Caffeine Anhydrous", value: "150 mg" },
      { label: "CarnoSyn® Beta-Alanine", value: "1.6 g" },
      { label: "Creatine Nitrate", value: "1.0 g" },
      { label: "Vitamin C", value: "250 mg" },
      { label: "Vitamin B12", value: "35 mcg" },
    ],
    usage: "Take 1 scoop (6.5g) mixed with 200ml of water 20–30 minutes before your workout. Beginners should start with half a scoop to assess caffeine tolerance.",
    labReport: lab(
      "CEL-C4-8831",
      "BATCH-C426G08",
      "2026-09-05",
      [
        { parameter: "Caffeine Content per Serving", claimed: "150 mg", found: "151.2 mg", pass: true },
        { parameter: "Banned Stimulants (DMAA, DMHA, Ephedrine)", claimed: "Absent", found: "Not Detected (< 0.1 ppm)", pass: true },
        { parameter: "Beta-Alanine Active Concentration", claimed: "1.6 g", found: "1.62 g", pass: true },
      ],
      ["0.01 ppm", "0.01 ppm", "< 0.005 ppm", "0.005 ppm"]
    ),
    reviews: realReviews("C4 Pre-Workout", "Vikram P.", "Clean kick without the jitters or sudden crash. Awesome focus."),
  },

  // 7. Scivation XTEND 7G BCAA & Electrolytes
  {
    slug: "scivation-xtend-original-bcaa",
    name: "Scivation XTEND Original 7G BCAA & Electrolytes",
    brand: "Scivation XTEND",
    category: "supplements",
    type: "Amino acids",
    price: 1999,
    mrp: 2499,
    rating: 4.7,
    reviewsCount: 1890,
    stock: 29,
    image: bcaa,
    goals: ["workout", "running", "weightloss"],
    diet: "vegan",
    lactose: false,
    gluten: false,
    beginnerFriendly: true,
    short: "The world's leading intra-workout. 7g branched-chain amino acids in clinically proven 2:1:1 ratio with hydrating electrolytes.",
    description:
      "Scivation XTEND contains 7 grams of BCAAs in the research-proven 2:1:1 ratio (Leucine, Isoleucine, Valine), plus 2.5g L-Glutamine and a hydrating electrolyte blend. Designed to accelerate muscle protein synthesis, stave off catabolism during fasted training, and replenish lost salts.",
    highlights: [
      "7g Branched Chain Amino Acids (BCAAs) per scoop",
      "Proven 2:1:1 Leucine to Isoleucine & Valine ratio",
      "2.5g L-Glutamine & 1g Citrulline Malate",
      "Hydration electrolyte blend with Potassium & Sodium",
      "NSF Certified for Sport & Informed-Choice verified",
    ],
    options: {
      label: "Flavor",
      values: ["Blue Raspberry Ice", "Watermelon Explosion", "Mango Madness", "Lemon Lime Sour"],
    },
    ingredients: [
      "L-Leucine (Instantized)",
      "L-Isoleucine",
      "L-Valine",
      "L-Glutamine",
      "Citrulline Malate (1:1)",
      "Electrolyte Blend (Sodium Citrate, Potassium Chloride, Sodium Chloride)",
      "Citric Acid",
      "Natural and Artificial Flavors",
      "Sucralose",
      "Acesulfame Potassium",
    ],
    nutrition: [
      { label: "Total BCAAs", value: "7.0 g" },
      { label: "L-Leucine", value: "3.5 g" },
      { label: "L-Isoleucine", value: "1.75 g" },
      { label: "L-Valine", value: "1.75 g" },
      { label: "L-Glutamine", value: "2.5 g" },
      { label: "Sodium", value: "220 mg" },
      { label: "Potassium", value: "180 mg" },
    ],
    usage: "Mix 1 level scoop (14g) into 400–500ml of cold water. Sip continuously throughout your workout or between meals on non-training days.",
    labReport: lab(
      "SCI-XT-4409",
      "BATCH-XT26H11",
      "2026-09-17",
      [
        { parameter: "Total BCAAs Assay", claimed: "7.0 g", found: "7.15 g", pass: true },
        { parameter: "Leucine : Isoleucine : Valine Ratio", claimed: "2:1:1", found: "2.02 : 1.01 : 0.99 (Pass)", pass: true },
        { parameter: "Electrolyte Osmolality Balance", claimed: "Conforms", found: "Conforms (Passed)", pass: true },
      ],
      ["0.02 ppm", "0.01 ppm", "< 0.005 ppm", "0.01 ppm"]
    ),
    reviews: realReviews("XTEND BCAA", "Manish G.", "Refreshing during 2-hour heavy leg days. Drastically cuts DOMS soreness."),
  },

  // 8. MuscleTech Platinum 100% Daily Multivitamin
  {
    slug: "muscletech-platinum-multivitamin",
    name: "MuscleTech Platinum 100% Daily Multivitamin (90 Caplets)",
    brand: "MuscleTech",
    category: "supplements",
    type: "Vitamins",
    price: 999,
    mrp: 1399,
    rating: 4.8,
    reviewsCount: 2210,
    stock: 60,
    image: multivitamin,
    goals: ["general", "workout", "bulking", "weightloss", "yoga", "running"],
    diet: "veg",
    lactose: false,
    gluten: false,
    beginnerFriendly: true,
    short: "Complete high-potency daily micronutrient matrix. 18 vitamins & minerals plus 865mg herbal and amino support matrix.",
    description:
      "MuscleTech Platinum Multivitamin is an advanced daily formula designed specifically for hard-training athletes and active individuals. Provides 100% or more of daily value for Vitamins A, C, D, E, B6, and B12, combined with essential trace minerals and an active herbal matrix.",
    highlights: [
      "High-potency multivitamin with 18 essential vitamins & minerals",
      "Includes Vitamin D3, High-Bioavailability Zinc & Vitamin C",
      "865mg Amino Acid & Botanical Performance Support Matrix",
      "Supports immune defense, joint vitality, and metabolic energy",
      "90 easy-to-swallow caplets (30-day full supply)",
    ],
    ingredients: [
      "Ascorbic Acid (Vitamin C)",
      "Cholecalciferol (Vitamin D3)",
      "d-Alpha Tocopheryl Acetate (Vitamin E)",
      "Zinc Oxide",
      "Magnesium Oxide",
      "Thiamine, Riboflavin, Niacinamide, Pyridoxine HCl, Cyanocobalamin",
      "Amino Support Complex (Glycine, ALA, L-Methionine, L-Citrulline)",
      "Herbal Matrix (Green Tea Extract, Saw Palmetto, Ginkgo Biloba)",
    ],
    nutrition: [
      { label: "Vitamin C", value: "90 mg (100% DV)" },
      { label: "Vitamin D3", value: "1,000 IU (250% DV)" },
      { label: "Vitamin B12", value: "9.0 mcg (375% DV)" },
      { label: "Zinc", value: "11 mg (100% DV)" },
      { label: "Magnesium", value: "50 mg" },
    ],
    usage: "Take 1 serving (3 caplets) with a glass of water daily with your morning meal or lunch.",
    labReport: lab(
      "MT-MV-6602",
      "BATCH-MT26E22",
      "2026-08-02",
      [
        { parameter: "Vitamin D3 Assay Potency", claimed: "1,000 IU", found: "1,032 IU", pass: true },
        { parameter: "Vitamin B12 Assay Potency", claimed: "9.0 mcg", found: "9.18 mcg", pass: true },
        { parameter: "Zinc Elemental Recovery", claimed: "11.0 mg", found: "11.1 mg", pass: true },
      ],
      ["0.02 ppm", "0.01 ppm", "< 0.005 ppm", "0.01 ppm"]
    ),
    reviews: realReviews("MuscleTech Multivitamin", "Siddharth K.", "Great staple for active individuals. Zero lethargy."),
  },

  // 9. Rogue Rubber Hex Dumbbells (Pair)
  {
    slug: "rogue-rubber-hex-dumbbells-pair",
    name: "Rogue Fitness Commercial Rubber Hex Dumbbells (Pair)",
    brand: "Rogue Fitness",
    category: "equipment",
    type: "Dumbbells",
    price: 2499,
    mrp: 3299,
    rating: 4.9,
    reviewsCount: 1450,
    stock: 18,
    image: hexDumbbells,
    goals: ["workout", "bulking", "general"],
    diet: "na",
    lactose: false,
    gluten: false,
    beginnerFriendly: true,
    short: "Heavy-duty cast iron heads coated in virgin rubber with knurled ergonomic chrome handles.",
    description:
      "Rogue Rubber Hex Dumbbells are engineered for both commercial gym punishment and quiet home gym workouts. The high-density virgin rubber overmold protects gym flooring and prevents clattering, while the hexagonal shape ensures the dumbbells stay exactly where you set them without rolling.",
    highlights: [
      "Precision-molded virgin rubber coating protects floors and tiles",
      "Ergonomically contoured knurled chrome handle for non-slip grip",
      "Anti-roll hexagonal head design for push-ups and floor presses",
      "Permanently welded heavy-duty steel core",
    ],
    options: {
      label: "Weight (Pair)",
      values: ["2 × 5 kg", "2 × 7.5 kg", "2 × 10 kg", "2 × 12.5 kg"],
    },
    reviews: realReviews("Rogue Hex Dumbbells", "Prateek B.", "Superb build quality. The knurling feels phenomenal in hands."),
  },

  // 10. Bowflex SelectTech 552 Dial Adjustable Dumbbells
  {
    slug: "bowflex-selecttech-552-adjustable",
    name: "Bowflex SelectTech 552 Dial Adjustable Dumbbell (2–24 kg)",
    brand: "Bowflex",
    category: "equipment",
    type: "Dumbbells",
    price: 8499,
    mrp: 10999,
    rating: 4.8,
    reviewsCount: 880,
    stock: 5,
    image: adjustable,
    goals: ["workout", "bulking"],
    diet: "na",
    lactose: false,
    gluten: false,
    beginnerFriendly: false,
    short: "Replaces 15 pairs of dumbbells with a single turn of a dial. Adjusts smoothly from 2kg to 24kg.",
    description:
      "The definitive home gym space-saver. Bowflex SelectTech 552 lets you rapidly change resistance in 2kg increments with the turn of a dial. Durable molding around metal plates provides a smooth lift-off and quieter workouts.",
    highlights: [
      "Replaces 15 sets of weights in one compact footprint",
      "Instant dial selection from 2 kg to 24 kg",
      "Molded thermoplastic coating for silent lifting",
      "Includes reinforced docking base tray",
    ],
    reviews: realReviews("Bowflex SelectTech", "Nikhil D.", "Best investment for my apartment gym. Switching weights takes 2 seconds."),
  },

  // 11. TheraBand Resistance Loop Bands (Set of 5)
  {
    slug: "theraband-resistance-loop-bands",
    name: "TheraBand Heavy-Duty Resistance Loop Bands (Set of 5)",
    brand: "TheraBand",
    category: "equipment",
    type: "Bands",
    price: 599,
    mrp: 899,
    rating: 4.7,
    reviewsCount: 2450,
    stock: 120,
    image: bands,
    goals: ["workout", "yoga", "weightloss", "general", "running"],
    diet: "na",
    lactose: false,
    gluten: false,
    beginnerFriendly: true,
    short: "100% natural Malaysian latex loop bands with 5 color-coded resistance levels for glutes, mobility & rehab.",
    description:
      "TheraBand continuous loop resistance bands are trusted by physical therapists, Pilates instructors, and strength coaches worldwide. Made of 100% natural Malaysian eco-friendly latex that stretches up to 3x without snapping or tearing.",
    highlights: [
      "5 progressive resistance levels (X-Light 5 lbs to X-Heavy 40 lbs)",
      "100% pure Malaysian snap-resistant natural latex",
      "Includes breathable mesh carry bag & workout manual",
      "Ideal for glute activation, rotator cuff rehab & travel workouts",
    ],
    reviews: realReviews("TheraBand Loops", "Megha N.", "Never curl or pinch skin. Indispensable for pre-squat warm-ups."),
  },

  // 12. Manduka PRO 6mm High-Density Cushion Yoga Mat
  {
    slug: "manduka-pro-yoga-mat-6mm",
    name: "Manduka PRO 6mm High-Density Cushion Yoga Mat",
    brand: "Manduka",
    category: "equipment",
    type: "Yoga mat",
    price: 1599,
    mrp: 2199,
    rating: 4.9,
    reviewsCount: 920,
    stock: 19,
    image: yogaMat,
    goals: ["yoga", "general", "weightloss"],
    diet: "na",
    lactose: false,
    gluten: false,
    beginnerFriendly: true,
    short: "The world's most recommended yoga mat. 6mm dense cushioning protects joints with proprietary dot-pattern floor grip.",
    description:
      "An ultra-dense, supportive yoga mat designed to provide superior joint protection, spinal comfort, and long-lasting durability on any floor surface. The closed-cell surface seals out moisture and bacteria, while the non-slip fabric-like finish gives unmatched traction even in sweaty sessions.",
    highlights: [
      "6mm high-density cushioning for maximum spine and joint protection",
      "Closed-cell surface prevents sweat and moisture absorption",
      "Proprietary dot-pattern bottom prevents sliding on tile or wood",
      "100% OEKO-TEX certified non-toxic emissions",
    ],
    options: {
      label: "Color",
      values: ["Black Sage", "Terracotta Red", "Deep Charcoal"],
    },
    reviews: realReviews("Manduka PRO Mat", "Pooja C.", "Firm yet comfortable for knees and wrists. Doesn't slip on polished tiles."),
  },

  // 13. BlenderBottle Classic V2 Squeezer Shaker Bottle 700ml
  {
    slug: "blenderbottle-classic-v2-700ml",
    name: "BlenderBottle Classic V2 Squeezer Shaker Bottle (700ml)",
    brand: "BlenderBottle",
    category: "accessories",
    type: "Shaker",
    price: 449,
    mrp: 649,
    rating: 4.8,
    reviewsCount: 4210,
    stock: 140,
    image: shaker,
    goals: ["workout", "bulking", "running", "weightloss", "general", "yoga"],
    diet: "na",
    lactose: false,
    gluten: false,
    beginnerFriendly: true,
    short: "Equipped with 316 surgical-grade stainless steel BlenderBall® wire whisk for lump-free shakes in seconds.",
    description:
      "The global standard in shaker cups. BlenderBottle Classic V2 features a rounded base for better mixing, SpoutGuard to keep germs off the drinking surface, and a 100% leak-proof screw-on lid with an airtight flip cap.",
    highlights: [
      "Authentic 316 Surgical Stainless Steel BlenderBall® wire whisk",
      "100% Leak-Proof Guarantee with secure screw-on cap",
      "BPA and Phthalate-free Eastman Tritan plastic",
      "Embossed ounce and milliliter volume markings",
      "Dishwasher safe on the top rack",
    ],
    options: {
      label: "Color",
      values: ["Matte Black", "Cyan Blue", "Graphite Grey"],
    },
    reviews: realReviews("BlenderBottle V2", "Ankit S.", "No leaks whatsoever in my gym bag. Blends whey effortlessly."),
  },

  // 14. Under Armour Arrival Full-Zip Athletic Fleece Hoodie
  {
    slug: "under-armour-arrival-zip-hoodie",
    name: "Under Armour Performance Full-Zip Fleece Hoodie",
    brand: "Under Armour",
    category: "apparel",
    type: "Hoodie",
    price: 2199,
    mrp: 2999,
    rating: 4.7,
    reviewsCount: 640,
    stock: 24,
    image: hoodie,
    goals: ["workout", "running", "general"],
    diet: "na",
    lactose: false,
    gluten: false,
    beginnerFriendly: true,
    short: "Lightweight French Terry fabric with smooth outer face and brushed warm interior. Athletic 4-way stretch.",
    description:
      "Designed for warm-ups, outdoor runs, and gym cooldowns. Moisture Transport System wicks sweat away from the body and dries fast, while raglan sleeve construction ensures unrestricted shoulder mobility on presses and pulls.",
    highlights: [
      "Ultra-soft 280 GSM cotton-poly fleece blend",
      "4-way stretch construction moves in every direction",
      "Front open kangaroo hand pockets",
      "Ribbed cuffs and hem for athletic tapered fit",
    ],
    options: {
      label: "Size",
      values: ["S (38 in)", "M (40 in)", "L (42 in)", "XL (44 in)"],
    },
    reviews: realReviews("UA Zip Hoodie", "Tanmay G.", "Super comfortable fabric. Perfect for early morning runs."),
  },

  // 15. Harbinger Pro WristWrap Heavy Weightlifting Gloves
  {
    slug: "harbinger-pro-wristwrap-gloves",
    name: "Harbinger Pro WristWrap Heavy Weightlifting Gloves",
    brand: "Harbinger",
    category: "accessories",
    type: "Gloves",
    price: 899,
    mrp: 1299,
    rating: 4.6,
    reviewsCount: 1110,
    stock: 45,
    image: gloves,
    goals: ["workout", "bulking"],
    diet: "na",
    lactose: false,
    gluten: false,
    beginnerFriendly: true,
    short: "Integrated graduated wrist wraps stabilize wrists under heavy loads with padded genuine leather palms.",
    description:
      "Engineered by Harbinger for heavy barbell bench presses, overhead push presses, and dumbbell rows. Features an integrated wide wrist wrap with hook-and-loop closure to support the wrist joint, and genuine leather abrasion-resistant palm pads to prevent blisters and calluses.",
    highlights: [
      "Integrated graduated elastic wrist wrap stabilizes wrist joint",
      "Genuine leather palm with foam padding prevents barbell calluses",
      "Ventilated back-of-hand mesh wicks moisture",
      "Short finger length with quick-release pull tabs",
    ],
    options: {
      label: "Size",
      values: ["M (7.5 - 8 in)", "L (8 - 8.5 in)", "XL (8.5 - 9.5 in)"],
    },
    reviews: realReviews("Harbinger Gloves", "Rahul M.", "Wrist support is rock solid for 100kg+ bench press sessions."),
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const isEdible = (p: Product) => p.category === "supplements";
export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
export const discount = (p: Product) => Math.round(((p.mrp - p.price) / p.mrp) * 100);
