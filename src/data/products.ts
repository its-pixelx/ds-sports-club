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
export type AminoAcidType = "BCAA" | "EAA" | "NEAA" | "CEAA";

export interface AminoAcid {
  name: string;
  amount: string;
  type: AminoAcidType;
  description: string;
  pct?: number;
}

export interface DetailedIngredientCategory {
  category: string;
  items: {
    name: string;
    purpose: string;
  }[];
}

export interface UsageProtocol {
  servingSize: string;
  servingsPerContainer?: string;
  liquid: string;
  bestTiming: string[];
  instructions: string[];
  beginnerTip: string;
  precautions?: string[];
}

export interface MaterialCareGuide {
  materials: { name: string; description: string }[];
  careInstructions: string[];
  specs?: { label: string; value: string }[];
}

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
  aminoAcidProfile?: {
    totalBcaa?: string;
    totalEaa?: string;
    totalAminoAcids?: string;
    summary?: string;
    acids: AminoAcid[];
  };
  detailedIngredients?: DetailedIngredientCategory[];
  useProtocol?: UsageProtocol;
  materialCareGuide?: MaterialCareGuide;
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
    short: "The world's #1 whey protein. 24g pure whey isolate & concentrate blend with 5.5g BCAAs and full 18-amino acid spectrum.",
    description:
      "Optimum Nutrition Gold Standard 100% Whey is the global benchmark for protein quality. Formulated with Whey Protein Isolate as the primary ingredient, alongside ultra-filtered whey concentrate and whey peptides. Every batch is authenticated through rigorous NABL testing for zero amino spiking and pure protein delivery.",
    highlights: [
      "24g pure protein per scoop (74% protein by weight)",
      "5.5g naturally occurring BCAAs (Leucine, Isoleucine, Valine)",
      "11.2g Essential Amino Acids (EAAs) to trigger muscle synthesis",
      "4.1g Glutamine & Glutamic Acid per serving for recovery",
      "Instantized powder with Aminogen® and Lactase enzyme complexes",
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
      { label: "EAAs", value: "11.2 g" },
      { label: "Glutamic Acid", value: "4.1 g" },
      { label: "Calcium", value: "140 mg" },
      { label: "Potassium", value: "210 mg" },
    ],
    usage: "Add 1 rounded scoop (30.4g) to 200–250ml of cold water, milk, or your favorite beverage. Consume within 30 minutes post-workout or in the morning with breakfast.",
    aminoAcidProfile: {
      totalBcaa: "5,500 mg",
      totalEaa: "11,195 mg",
      totalAminoAcids: "24,000 mg",
      summary: "Full spectrum of all 18 standard proteinogenic amino acids derived from cold-microfiltered whey isolate and ultra-filtered concentrate.",
      acids: [
        { name: "L-Leucine", amount: "2,750 mg", type: "BCAA", description: "Primary mTOR cellular signaling trigger that turns on muscle protein synthesis (MPS).", pct: 100 },
        { name: "L-Isoleucine", amount: "1,400 mg", type: "BCAA", description: "Promotes glucose uptake into working skeletal muscles during high-rep training.", pct: 51 },
        { name: "L-Valine", amount: "1,350 mg", type: "BCAA", description: "Prevents central nervous fatigue by competing with tryptophan across the blood-brain barrier.", pct: 49 },
        { name: "L-Lysine", amount: "2,230 mg", type: "EAA", description: "Essential building block for muscle repair, collagen synthesis, and immune antibody formation.", pct: 81 },
        { name: "L-Threonine", amount: "1,650 mg", type: "EAA", description: "Structural constituent of intestinal mucin; maintains gut epithelial wall integrity.", pct: 60 },
        { name: "L-Methionine", amount: "490 mg", type: "EAA", description: "Sulfur-containing amino acid essential for natural creatine and cysteine biosyntheses.", pct: 18 },
        { name: "L-Phenylalanine", amount: "750 mg", type: "EAA", description: "Biological precursor to tyrosine and vital neurotransmitters dopamine and norepinephrine.", pct: 27 },
        { name: "L-Tryptophan", amount: "405 mg", type: "EAA", description: "Precursor for serotonin and melatonin; supports restorative deep-phase sleep recovery.", pct: 15 },
        { name: "L-Histidine", amount: "420 mg", type: "EAA", description: "Forms carnosine with beta-alanine to buffer intra-muscular lactic acid and delay burn.", pct: 15 },
        { name: "L-Glutamine & Glutamic Acid", amount: "4,080 mg", type: "CEAA", description: "Most abundant free amino acid in skeletal muscle; speeds nitrogen replenishment.", pct: 95 },
        { name: "L-Aspartic Acid", amount: "2,510 mg", type: "NEAA", description: "Intermediary in the citric acid cycle for sustained cellular energy (ATP) generation.", pct: 62 },
        { name: "L-Proline", amount: "1,510 mg", type: "NEAA", description: "Core structural component of tendon, ligament, and joint cartilage collagen.", pct: 41 },
        { name: "L-Alanine", amount: "1,180 mg", type: "NEAA", description: "Fuels the glucose-alanine cycle, providing working muscles with steady glucose under stress.", pct: 33 },
        { name: "L-Serine", amount: "1,120 mg", type: "NEAA", description: "Crucial for phosphatidylserine synthesis, neuronal membranes, and RNA/DNA cellular code.", pct: 31 },
        { name: "L-Tyrosine", amount: "700 mg", type: "CEAA", description: "Dopaminergic support that keeps cognitive drive and alertness high during grueling sets.", pct: 25 },
        { name: "L-Arginine", amount: "505 mg", type: "CEAA", description: "Precursor to nitric oxide (NO) for endothelial blood dilation and nutrient delivery.", pct: 18 },
        { name: "L-Cysteine", amount: "490 mg", type: "CEAA", description: "Rate-limiting substrate for glutathione, the human body's master intracellular antioxidant.", pct: 18 },
        { name: "L-Glycine", amount: "410 mg", type: "NEAA", description: "Essential for creatine synthesis, cellular bile salts, and tendon tissue elasticity.", pct: 15 },
      ],
    },
    detailedIngredients: [
      {
        category: "Primary Protein Matrix",
        items: [
          { name: "Whey Protein Isolate (WPI)", purpose: "Cross-flow microfiltered primary source; 90%+ pure protein with virtually zero fat and lactose." },
          { name: "Ultra-Filtered Whey Protein Concentrate (WPC)", purpose: "Cold-filtered dairy source preserving bioactive immunoglobulins and lactoferrin peptides." },
          { name: "Hydrolyzed Whey Peptides", purpose: "Pre-digested rapid-action peptide chains for immediate post-workout amino acid delivery." },
        ],
      },
      {
        category: "Digestive & Bio-Availability Complex",
        items: [
          { name: "Aminogen® Patented Protease Complex", purpose: "Clinically proven fungal enzyme complex that breaks protein peptide bonds into bioabsorbable amino acids." },
          { name: "Lactase (Standardized)", purpose: "Enzyme that cleaves residual lactose sugars into glucose and galactose for effortless, bloat-free digestion." },
        ],
      },
      {
        category: "Flavor, Instantizing & Stability",
        items: [
          { name: "Dutch Cocoa Powder (Processed with Alkali)", purpose: "Provides rich gourmet chocolate flavor and natural theobromine antioxidants." },
          { name: "Soy / Sunflower Lecithin (INS 322)", purpose: "Natural phospholipid emulsifier that allows instant spoon-stir mixing without clumping." },
          { name: "Acesulfame Potassium & Sucralose", purpose: "Calorie-free intense sweeteners providing balanced sweetness without sugar spikes." },
        ],
      },
    ],
    useProtocol: {
      servingSize: "1 Rounded Scoop (30.4 g)",
      servingsPerContainer: "74 Servings (in 5 lb Tub) / 30 Servings (in 2 lb Tub)",
      liquid: "180–240 ml (6–8 fl oz) of cold water, skim milk, or unsweetened almond milk",
      bestTiming: [
        "Post-Workout (within 30–45 mins of training for peak anabolic window)",
        "Morning (first thing upon waking to halt overnight catabolism)",
        "Mid-Day Snack (between meals to fulfill daily protein requirements)",
      ],
      instructions: [
        "Pour 180–240 ml of chilled water or your preferred milk into a shaker bottle.",
        "Add 1 rounded scoop of ON Gold Standard 100% Whey.",
        "Secure the shaker lid tightly and shake for 20–30 seconds until completely dissolved.",
      ],
      beginnerTip: "You don't need an electric blender! The instantized powder dissolves completely with a simple shaker bottle or even by stirring with a spoon in a regular glass.",
      precautions: [
        "Contains milk and soy derivatives. Not suitable for individuals with severe milk protein allergy.",
        "Store in a cool, dry place away from direct sunlight. Keep tub tightly sealed.",
      ],
    },
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
      "11.75g Essential Amino Acids (EAAs) for rapid tissue repair",
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
      { label: "Glutamic Acid", value: "4.38 g" },
      { label: "Sodium", value: "155 mg" },
    ],
    usage: "Mix 1 heaping scoop (36g) in 200ml of chilled water. Shake vigorously in a squeezer shaker for 20–30 seconds. Consume immediately post-exercise.",
    aminoAcidProfile: {
      totalBcaa: "5,510 mg",
      totalEaa: "11,750 mg",
      totalAminoAcids: "25,000 mg",
      summary: "Formulated with the patented EAF® multi-enzyme matrix, delivering 5.51g BCAAs and 11.75g EAAs with 50% higher documented bioavailability.",
      acids: [
        { name: "L-Leucine", amount: "2,780 mg", type: "BCAA", description: "Stimulates muscle hypertrophy and suppresses proteolysis post-heavy-lift.", pct: 100 },
        { name: "L-Isoleucine", amount: "1,380 mg", type: "BCAA", description: "Aids muscular repair and assists intracellular glucose delivery.", pct: 50 },
        { name: "L-Valine", amount: "1,350 mg", type: "BCAA", description: "Enhances muscular endurance and mitigates exercise-induced mental fatigue.", pct: 49 },
        { name: "L-Lysine", amount: "2,340 mg", type: "EAA", description: "Essential for protein assimilation, hormone secretion, and bone mineralization.", pct: 84 },
        { name: "L-Threonine", amount: "1,680 mg", type: "EAA", description: "Key component in tooth enamel, elastin, and digestive enzyme pathways.", pct: 60 },
        { name: "L-Phenylalanine", amount: "810 mg", type: "EAA", description: "Precursor to tyrosine, adrenaline, and critical central neurotransmitters.", pct: 29 },
        { name: "L-Methionine", amount: "520 mg", type: "EAA", description: "Supports hepatic sulfur metabolism, tissue detoxification, and zinc uptake.", pct: 19 },
        { name: "L-Histidine", amount: "460 mg", type: "EAA", description: "Essential for myelin sheaths protecting nerve cells and iron absorption.", pct: 17 },
        { name: "L-Tryptophan", amount: "430 mg", type: "EAA", description: "Calms nervous over-excitation and regulates biological circadian cycles.", pct: 15 },
        { name: "L-Glutamic Acid", amount: "4,380 mg", type: "CEAA", description: "Rapid fuel source for gastrointestinal mucosa and muscle cell volumization.", pct: 98 },
        { name: "L-Aspartic Acid", amount: "2,620 mg", type: "NEAA", description: "Aids mitochondrial energy generation and helps clear metabolic ammonia.", pct: 62 },
        { name: "L-Proline", amount: "1,480 mg", type: "NEAA", description: "Maintains ligament flex and joint shock-absorption under heavy squating.", pct: 35 },
        { name: "L-Alanine", amount: "1,220 mg", type: "NEAA", description: "Supplies circulating amino energy during strenuous anaerobic lifting.", pct: 29 },
        { name: "L-Serine", amount: "1,190 mg", type: "NEAA", description: "Participates in lipid metabolism and neuro-muscular contraction signals.", pct: 28 },
        { name: "L-Tyrosine", amount: "780 mg", type: "CEAA", description: "Promotes sustained mental vigilance during high-intensity training.", pct: 20 },
        { name: "L-Arginine", amount: "620 mg", type: "CEAA", description: "Generates nitric oxide, enhancing blood flow and post-set recovery flush.", pct: 16 },
        { name: "L-Cysteine", amount: "540 mg", type: "CEAA", description: "Sulfur donor for cellular defense against oxidative exercise stress.", pct: 14 },
        { name: "L-Glycine", amount: "450 mg", type: "NEAA", description: "Supports structural protein synthesis and collagen regeneration.", pct: 12 },
      ],
    },
    detailedIngredients: [
      {
        category: "Primary Dairy Protein Source",
        items: [
          { name: "Whey Protein Concentrate (88% WPC)", purpose: "Sourced from USA/European certified dairy farms; delivers 25g clean protein per scoop." },
          { name: "Whey Protein Isolate", purpose: "Ultra-filtered fraction providing immediate amino acid surge into circulation." },
        ],
      },
      {
        category: "Patented Enhanced Absorption Formula (EAF®)",
        items: [
          { name: "Biozyme EAF® Protease Enzyme Complex", purpose: "Patented multi-protease complex clinically proven to increase protein bioavailability by 50%." },
          { name: "Targeted Peptidase Enzymes", purpose: "Cleaves whey peptide bonds rapidly to eliminate common gastric bloating and heavy fullness." },
        ],
      },
      {
        category: "Flavors & Clean Formulation",
        items: [
          { name: "Natural Cocoa Powder", purpose: "Gourmet rich chocolate profile with natural dietary polyphenols." },
          { name: "Sodium Chloride (Rock Salt)", purpose: "Replenishes essential sodium electrolytes lost in sweat and elevates taste." },
          { name: "Soy Lecithin (INS 322)", purpose: "Ensures smooth instant dispersion without curdling or chalkiness." },
          { name: "Sucralose (INS 955)", purpose: "Calorie-free sweetness that won't disrupt ketosis or spike blood glucose." },
        ],
      },
    ],
    useProtocol: {
      servingSize: "1 Level Scoop (36 g)",
      servingsPerContainer: "28 Servings (in 1 kg Tub) / 56 Servings (in 2 kg Tub)",
      liquid: "200–220 ml of chilled water",
      bestTiming: [
        "Post-Workout (within 30 minutes of session conclusion)",
        "Mid-Morning (between breakfast and lunch as a high-protein bridge)",
      ],
      instructions: [
        "Add 200 ml of cold water to your shaker cup.",
        "Add 1 level scoop (36g) of Biozyme Performance Whey.",
        "Shake vigorously for 15–20 seconds until frothy and smooth. Drink fresh.",
      ],
      beginnerTip: "Engineered specifically to solve protein bloating. If you've had indigestion with other whey proteins, Biozyme's EAF® enzymes break down the protein before it reaches your lower gut.",
      precautions: [
        "Consult your healthcare professional if you are lactose-sensitive. Contains milk derivatives.",
        "Store in a cool dry place. Keep out of reach of children.",
      ],
    },
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
    short: "Premium Yellow Pea & Brown Rice isolate blend. 24g pure vegan protein with added digestive enzymes and rich arginine.",
    description:
      "A complete plant-based protein isolate delivering all 9 essential amino acids. 100% vegan, naturally dairy-free, hypoallergenic, and gentle on the stomach. Fortified with coconut MCTs for clean energy and DigeZyme® digestive enzymes for zero gas or heavy feeling.",
    highlights: [
      "24g Complete Vegan Protein per scoop",
      "Naturally dairy-free, lactose-free & gluten-free",
      "4.54g BCAAs from non-GMO plant isolates",
      "Naturally high in Arginine (2.12g) for blood flow",
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
      { label: "BCAAs", value: "4.54 g" },
      { label: "EAAs", value: "9.85 g" },
      { label: "Iron", value: "6.8 mg" },
    ],
    usage: "Blend 1 scoop (35g) with 250–300ml of water or unsweetened almond/oat milk. Can also be blended into breakfast smoothie bowls.",
    aminoAcidProfile: {
      totalBcaa: "4,540 mg",
      totalEaa: "9,850 mg",
      totalAminoAcids: "24,000 mg",
      summary: "Balanced synergy of Yellow Pea Isolate (rich in lysine and arginine) and Brown Rice Isolate (rich in methionine) yielding a perfect PDCAAS 1.0 amino acid score.",
      acids: [
        { name: "L-Arginine", amount: "2,120 mg", type: "CEAA", description: "Naturally exceptional in pea protein; powerful nitric oxide precursor for arterial circulation.", pct: 100 },
        { name: "L-Leucine", amount: "2,280 mg", type: "BCAA", description: "Stimulates muscle protein synthesis from pure botanical sources.", pct: 98 },
        { name: "L-Isoleucine", amount: "1,140 mg", type: "BCAA", description: "Spares glycogen in working muscles and prevents catabolism.", pct: 49 },
        { name: "L-Valine", amount: "1,120 mg", type: "BCAA", description: "Supports sustained muscle repair and cognitive resilience during exercise.", pct: 48 },
        { name: "L-Lysine", amount: "1,920 mg", type: "EAA", description: "Vital for tissue healing, collagen production, and calcium bioavailability.", pct: 83 },
        { name: "L-Phenylalanine", amount: "1,320 mg", type: "EAA", description: "Maintains optimal central nervous neurotransmitter synthesis.", pct: 57 },
        { name: "L-Threonine", amount: "1,150 mg", type: "EAA", description: "Reinforces the digestive mucosal barrier and connective protein matrix.", pct: 50 },
        { name: "L-Histidine", amount: "620 mg", type: "EAA", description: "Crucial for red blood cell synthesis and heavy metal cellular chelation.", pct: 27 },
        { name: "L-Methionine", amount: "340 mg", type: "EAA", description: "Brown rice isolate fills the natural plant methionine gap for complete synthesis.", pct: 15 },
        { name: "L-Tryptophan", amount: "290 mg", type: "EAA", description: "Naturally occurring precursor for balanced serotonin and post-workout calmness.", pct: 12 },
        { name: "L-Glutamic Acid", amount: "4,850 mg", type: "CEAA", description: "Accelerates gut wall repair and cellular hydration in active athletes.", pct: 95 },
        { name: "L-Aspartic Acid", amount: "3,210 mg", type: "NEAA", description: "Assists cellular respiration and Krebs cycle ATP generation.", pct: 63 },
        { name: "L-Serine", amount: "1,430 mg", type: "NEAA", description: "Critical for brain phospholipid health and muscle neuromuscular coordination.", pct: 28 },
        { name: "L-Proline", amount: "1,320 mg", type: "NEAA", description: "Maintains flexibility in cartilage, ligaments, and deep muscle fascia.", pct: 26 },
        { name: "L-Alanine", amount: "1,210 mg", type: "NEAA", description: "Auxiliary energy currency for working muscles under physical workload.", pct: 24 },
        { name: "L-Glycine", amount: "1,150 mg", type: "NEAA", description: "Key substrate for collagen regeneration and cellular bile salts.", pct: 22 },
        { name: "L-Tyrosine", amount: "910 mg", type: "CEAA", description: "Supports cognitive focus and natural adrenal recovery after tough workouts.", pct: 18 },
        { name: "L-Cysteine", amount: "310 mg", type: "CEAA", description: "Precursor for intracellular glutathione antioxidant defenses.", pct: 6 },
      ],
    },
    detailedIngredients: [
      {
        category: "Complete Vegan Protein Isolate Complex",
        items: [
          { name: "Yellow Pea Protein Isolate (Pisum sativum)", purpose: "Cold-water extracted non-GMO isolate delivering 85% clean protein, rich in lysine and BCAAs." },
          { name: "Sprouted Brown Rice Protein Isolate (Oryza sativa)", purpose: "Enzymatically sprouted to unlock bioavailable methionine and sulfur amino acids." },
        ],
      },
      {
        category: "Clean Energy & Digestive Enzymes",
        items: [
          { name: "Medium Chain Triglycerides (MCT Oil Powder)", purpose: "Derived from organic coconuts; supplies immediate ketone energy and creamy mouthfeel." },
          { name: "DigeZyme® Multi-Enzyme Complex", purpose: "Comprehensive blend of Alpha-Amylase, Protease, Lipase, Cellulase, and Lactase for instant digestion." },
        ],
      },
      {
        category: "Natural Flavoring & Trace Minerals",
        items: [
          { name: "Organic Cocoa Powder", purpose: "Pure unprocessed cocoa delivering deep chocolate notes and flavanols." },
          { name: "Pink Himalayan Rock Salt", purpose: "Provides 84 natural trace minerals and optimizes electrolyte hydration balance." },
          { name: "Steviol Glycosides (INS 960)", purpose: "100% plant-based zero-calorie sweetening with zero glycemic impact." },
        ],
      },
    ],
    useProtocol: {
      servingSize: "1 Level Scoop (35 g)",
      servingsPerContainer: "28 Servings",
      liquid: "250–300 ml chilled water, unsweetened almond milk, or oat milk",
      bestTiming: [
        "Post-Workout or Yoga session (within 45 mins)",
        "Breakfast smoothie booster (blended with banana, oats, and chia)",
      ],
      instructions: [
        "Add 250 ml of water or plant milk into a shaker or blender cup.",
        "Add 1 scoop (35g) of Fast&Up Plant Protein Isolate.",
        "Shake vigorously for 25–30 seconds. Plant proteins are slightly denser and benefit from firm shaking.",
      ],
      beginnerTip: "100% hypoallergenic and dairy-free! If milk or whey has ever upset your stomach or caused acne, this plant blend is the cleanest alternative available.",
      precautions: [
        "Store in a cool dry place. Keep lid securely fastened after every scoop.",
      ],
    },
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
    short: "1,125 high-density calories, 45g protein, and 225g complex carbs per day for hard-gainers with added creatine and glutamine.",
    description:
      "Engineered specifically for individuals struggling to gain weight and build serious muscular mass. Delivers an optimal 1:5 protein-to-carbohydrate ratio powered by complex oats, fast-digesting maltodextrin, and sustained-release whey concentrate. Enriched with 27 vital vitamins and minerals.",
    highlights: [
      "1,125 kcal & 45g protein per daily serving (with whole milk)",
      "1:5 clean protein to complex carbohydrate ratio",
      "Added 3g Micronized Creatine & 1.5g L-Glutamine per daily serving",
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
      { label: "Creatine Monohydrate", value: "3.0 g" },
      { label: "L-Glutamine", value: "1.5 g" },
      { label: "BCAAs", value: "9.2 g" },
      { label: "EAAs", value: "18.4 g" },
    ],
    usage: "Split 1 daily serving (3 scoops) into two shakes. Take 1.5 scoops mid-morning and 1.5 scoops within 45 minutes after workout.",
    aminoAcidProfile: {
      totalBcaa: "9,240 mg",
      totalEaa: "18,480 mg",
      totalAminoAcids: "45,000 mg",
      summary: "Massive anabolic amino acid supply from dual whey & calcium caseinate proteins, reinforced with free-form micronized creatine and L-glutamine.",
      acids: [
        { name: "L-Leucine", amount: "4,620 mg", type: "BCAA", description: "Drives maximum muscle protein synthesis in hard-gaining athletes.", pct: 100 },
        { name: "L-Isoleucine", amount: "2,310 mg", type: "BCAA", description: "Accelerates glycogen storage replenishing depleted muscles.", pct: 50 },
        { name: "L-Valine", amount: "2,310 mg", type: "BCAA", description: "Protects lean mass from catabolism during intense bulking phases.", pct: 50 },
        { name: "Added Micronized Creatine", amount: "3,000 mg", type: "CEAA", description: "Replenishes intramuscular phosphocreatine for heavy lifting power.", pct: 65 },
        { name: "Added Free L-Glutamine", amount: "1,500 mg", type: "CEAA", description: "Bolsters digestive gut capacity and reduces delayed onset muscle soreness.", pct: 32 },
        { name: "L-Glutamic Acid (Protein Bound)", amount: "7,700 mg", type: "CEAA", description: "Immense nitrogen reservoir fueling continuous muscular recovery.", pct: 90 },
        { name: "L-Lysine", amount: "3,780 mg", type: "EAA", description: "Supports structural bone growth and collagen synthesis under weight strain.", pct: 45 },
        { name: "L-Aspartic Acid", amount: "4,300 mg", type: "NEAA", description: "Supports cellular energy metabolism across long training splits.", pct: 51 },
        { name: "L-Proline", amount: "2,700 mg", type: "NEAA", description: "Essential for ligament and tendon thickening required to handle heavier weights.", pct: 32 },
        { name: "L-Threonine", amount: "2,440 mg", type: "EAA", description: "Aids digestive protein breakdown and immune antibody secretion.", pct: 29 },
        { name: "L-Alanine", amount: "2,100 mg", type: "NEAA", description: "Regulates glucose shuttling to working muscle fibers.", pct: 25 },
        { name: "L-Phenylalanine", amount: "1,620 mg", type: "EAA", description: "Supports cognitive motivation and nervous transmission.", pct: 19 },
        { name: "L-Arginine", amount: "1,560 mg", type: "CEAA", description: "Stimulates nitric oxide and growth hormone release during deep recovery.", pct: 18 },
        { name: "L-Tyrosine", amount: "1,560 mg", type: "CEAA", description: "Precursor for neurotransmitters to overcome training exhaustion.", pct: 18 },
        { name: "L-Serine", amount: "1,480 mg", type: "NEAA", description: "Assists cell proliferation and neuro-muscular signaling.", pct: 17 },
        { name: "L-Methionine", amount: "1,040 mg", type: "EAA", description: "Supports hepatic metabolism and natural cellular methylation.", pct: 12 },
        { name: "L-Histidine", amount: "920 mg", type: "EAA", description: "Aids muscle carnosine production and hemoglobin iron transport.", pct: 11 },
        { name: "L-Tryptophan", amount: "860 mg", type: "EAA", description: "Facilitates deep restorative sleep vital for bodybuilder mass building.", pct: 10 },
      ],
    },
    detailedIngredients: [
      {
        category: "Multi-Phase Carbohydrate Delivery",
        items: [
          { name: "High-Molecular Maltodextrin", purpose: "Fast-absorbing clean carbohydrate that spikes glycogen storage without stomach heaviness." },
          { name: "Finely Ground Oat Flour", purpose: "Low-GI whole grain complex carbohydrate that provides sustained energy and natural dietary fiber." },
        ],
      },
      {
        category: "Dual Sustained-Release Protein",
        items: [
          { name: "Whey Protein Concentrate (WPC)", purpose: "Provides fast-acting essential amino acids immediately post-workout." },
          { name: "Calcium Caseinate", purpose: "Slow-digesting dairy micellar protein that trickles amino acids into muscles for up to 8 hours." },
        ],
      },
      {
        category: "Ergogenic Core & Digestive Multi-Enzymes",
        items: [
          { name: "Micronized Creatine Monohydrate", purpose: "Increases intracellular ATP hydration and maximum lifting torque." },
          { name: "L-Glutamine", purpose: "Preserves muscle nitrogen balance and promotes immune defense." },
          { name: "DigeZyme® Multi-Enzyme Complex", purpose: "Specialized enzymes that help your gut easily digest large carbohydrate and protein calories." },
        ],
      },
      {
        category: "27 Essential Vitamins & Minerals",
        items: [
          { name: "Vitamin & Trace Mineral Complex", purpose: "Full daily requirements of Vitamins A, C, D3, E, B-Complex, Zinc, Iron, and Magnesium to support rapid weight gain." },
        ],
      },
    ],
    useProtocol: {
      servingSize: "1 Scoop (100 g) per shake; 2 Shakes Daily (200 g total)",
      servingsPerContainer: "30 Servings (in 3 kg Tub)",
      liquid: "300–400 ml of whole milk or cold water",
      bestTiming: [
        "Mid-Morning (around 10:30–11:00 AM between breakfast and lunch)",
        "Post-Workout (within 45 minutes after heavy weight training)",
      ],
      instructions: [
        "Pour 350 ml of whole milk or water into a large shaker or blender.",
        "Add 1 level scoop (100g) of Super Gainer XXL.",
        "Shake or blend for 30–45 seconds until thick, velvety, and creamy.",
      ],
      beginnerTip: "Start with 1 scoop per day for your first week. Once your digestive system adapts to the calorie surplus, increase to 2 divided shakes per day to build solid muscular weight.",
      precautions: [
        "Contains dairy and gluten derivatives. Do not use as a sole source of nutrition.",
      ],
    },
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
    short: "The gold standard of pure creatine. Manufactured in Trostberg, Germany at 99.99% HPLC purity with zero fillers.",
    description:
      "Creapure® is recognized worldwide as the purest, safest, and highest quality creatine monohydrate available. Produced in Germany under strict IFS FOOD standards. Backed by hundreds of clinical trials demonstrating significant improvements in explosive ATP strength, sprint power, and muscle cellular volume.",
    highlights: [
      "99.99% Pure Micronized Creatine Monohydrate",
      "Manufactured in Bavaria, Germany by Alzchem Trostberg GmbH",
      "Cologne List® certified for elite sport safety (WADA compliant)",
      "Ultra-fine 200 mesh for immediate solubility in water",
      "Zero fillers, zero flavors, zero calories, zero sugar",
    ],
    ingredients: ["100% Creapure® Micronized Creatine Monohydrate (Made in Germany)"],
    nutrition: [
      { label: "Creapure® Creatine Monohydrate", value: "3,000 mg" },
      { label: "Energy", value: "0 kcal" },
      { label: "Protein Equivalent", value: "0 g" },
      { label: "Carbohydrates", value: "0 g" },
      { label: "Fat", value: "0 g" },
      { label: "HPLC Purity", value: "99.99%" },
    ],
    usage: "Take 1 level scoop (3g) daily mixed with 250ml of water, fruit juice, or post-workout protein shake. No loading phase required.",
    aminoAcidProfile: {
      totalBcaa: "0 mg (Pure Phosphagen)",
      totalEaa: "0 mg",
      totalAminoAcids: "3,000 mg Active Phosphocreatine Precursor",
      summary: "Creapure® is a pure amino acid derivative synthesized from Glycine, L-Arginine, and L-Methionine. It directly recharges cellular ATP (adenosine triphosphate) during maximal muscular contractions.",
      acids: [
        { name: "Pure Creatine Monohydrate (Creapure®)", amount: "3,000 mg", type: "CEAA", description: "99.99% pure HPLC-verified phosphagen replenisher; directly regenerates cellular ATP for explosive power.", pct: 100 },
        { name: "Guanidinoacetate Intermediate Equivalent", amount: "3,000 mg", type: "CEAA", description: "Direct biological cellular shuttle produced from arginine and glycine in kidneys and liver.", pct: 100 },
        { name: "Creatinine Byproduct Assay", amount: "< 67 ppm", type: "NEAA", description: "Minimal breakdown byproduct; industry safety standard is < 100 ppm.", pct: 2 },
        { name: "Dicyandiamide (DCD)", amount: "< 30 ppm", type: "NEAA", description: "Harmful manufacturing residue kept strictly below detection thresholds.", pct: 1 },
        { name: "Dihydrotriazine (DHT)", amount: "0.0 ppm (Not Detected)", type: "NEAA", description: "Toxic derivative found in cheap creatines; completely undetectable in Creapure®.", pct: 0 },
      ],
    },
    detailedIngredients: [
      {
        category: "Active Pharmaceutical Core",
        items: [
          { name: "100% Creapure® Micronized Creatine Monohydrate", purpose: "Synthesized in Alzchem's dedicated Bavarian plant; 200-mesh ultra-fine pharmaceutical grade." },
        ],
      },
      {
        category: "Purity & Non-Active Components",
        items: [
          { name: "Zero Additives", purpose: "Free of artificial sweeteners, artificial flavors, preservatives, silicon dioxide, or dairy fillers." },
        ],
      },
    ],
    useProtocol: {
      servingSize: "1 Level Scoop (3 g)",
      servingsPerContainer: "83 Servings (in 250 g Tub)",
      liquid: "250–300 ml of water, natural grape juice, or post-workout protein shake",
      bestTiming: [
        "Post-Workout (insulin from meals or carbs drives creatine directly into muscle cells)",
        "Consistent daily morning timing on non-training days",
      ],
      instructions: [
        "Add 1 scoop (3g) of Creapure® to 250 ml of water or fruit juice.",
        "Stir with a spoon for 10–15 seconds. The ultra-fine 200 mesh powder dissolves cleanly without grit.",
      ],
      beginnerTip: "You do NOT need a high-dose 'loading phase' (20g/day), which often triggers stomach cramping. Taking 3g every day consistently saturates your muscle creatine stores within 21–28 days with zero side effects. Always drink 3–4 liters of water daily.",
      precautions: [
        "Creatine pulls water into your muscle cells. Stay properly hydrated throughout the day.",
        "Keep the container tightly closed in a dry place to prevent moisture clumping.",
      ],
    },
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
      "N-Acetyl L-Tyrosine for razor-sharp cognitive focus",
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
      { label: "Creatine Nitrate (NO3-T®)", value: "1.0 g" },
      { label: "Arginine AKG", value: "1.0 g" },
      { label: "N-Acetyl L-Tyrosine", value: "200 mg" },
      { label: "Vitamin C", value: "250 mg" },
      { label: "Vitamin B3 (Niacinamide)", value: "30 mg" },
      { label: "Vitamin B6", value: "35 mcg" },
      { label: "Folic Acid", value: "250 mcg" },
      { label: "Vitamin B12", value: "35 mcg" },
    ],
    usage: "Take 1 scoop (6.5g) mixed with 200ml of water 20–30 minutes before your workout. Beginners should start with half a scoop to assess caffeine tolerance.",
    aminoAcidProfile: {
      totalBcaa: "0 mg",
      totalEaa: "0 mg",
      totalAminoAcids: "3,800 mg Ergogenic Amino Matrix",
      summary: "High-octane free-form performance amino acid complex featuring patented CarnoSyn® Beta-Alanine, NO3-T® Creatine Nitrate, AAKG, and N-Acetyl L-Tyrosine.",
      acids: [
        { name: "CarnoSyn® Beta-Alanine", amount: "1,600 mg", type: "NEAA", description: "Binds with histidine inside muscle cells to synthesize carnosine, buffering lactic acid and delaying muscular exhaustion.", pct: 100 },
        { name: "Arginine Alpha-Ketoglutarate (AAKG)", amount: "1,000 mg", type: "CEAA", description: "Direct biological substrate for nitric oxide synthase; relaxes vascular walls for skin-stretching pumps.", pct: 62 },
        { name: "Creatine Nitrate (NO3-T®)", amount: "1,000 mg", type: "CEAA", description: "Bonded creatine and nitrate molecules providing concurrent ATP recharging and sustained vasodilation.", pct: 62 },
        { name: "N-Acetyl L-Tyrosine (NALT)", amount: "200 mg", type: "CEAA", description: "Highly bioavailable acetylated amino acid that crosses blood-brain barrier to produce focus neurotransmitters dopamine and noradrenaline.", pct: 12 },
        { name: "Velvet Bean (Mucuna pruriens) L-DOPA", amount: "25 mg", type: "NEAA", description: "Botanical amino acid neurotransmitter precursor supporting mood elevate and gym drive.", pct: 2 },
      ],
    },
    detailedIngredients: [
      {
        category: "Endurance & Nitric Oxide Pump Actives",
        items: [
          { name: "CarnoSyn® Beta-Alanine (1,600 mg)", purpose: "Patented form of beta-alanine; increases muscle carnosine levels to extend reps before failure." },
          { name: "Creatine Nitrate (NO3-T® 1,000 mg)", purpose: "University-patented compound that uses nitrate pathways to dramatically improve workout pumps." },
          { name: "Arginine AKG (1,000 mg)", purpose: "Assists hepatic ammonia clearance and elevates arterial blood flow." },
        ],
      },
      {
        category: "Neuro-Energy & Focus Blend",
        items: [
          { name: "Caffeine Anhydrous (150 mg)", purpose: "Dehydrated pure caffeine for instant mental alertness and central nervous stimulation." },
          { name: "N-Acetyl-L-Tyrosine (200 mg)", purpose: "Protects against cognitive fatigue and enhances motor unit recruitment during heavy lifts." },
          { name: "TeaCrine® (Theacrine)", purpose: "Nature-identical compound that extends caffeine energy without elevating heart rate." },
        ],
      },
      {
        category: "Active Vitamin Co-factors",
        items: [
          { name: "Ascorbic Acid (Vitamin C 250 mg)", purpose: "Scavenges exercise-induced free radicals and protects nitric oxide from rapid breakdown." },
          { name: "B-Vitamin Complex (B3, B6, Folate, B12)", purpose: "Essential enzymatic co-factors required to convert nutrients into cellular ATP energy." },
        ],
      },
    ],
    useProtocol: {
      servingSize: "1 Level Scoop (6.5 g)",
      servingsPerContainer: "30 Servings",
      liquid: "180–200 ml of chilled water",
      bestTiming: [
        "Pre-Workout: Consume 20–30 minutes before heavy lifting or intense conditioning",
      ],
      instructions: [
        "Mix 1 scoop (6.5g) in 180–200 ml of cold water in a shaker cup.",
        "Shake for 15 seconds. Consume 20 minutes prior to training.",
      ],
      beginnerTip: "Beta-Alanine causes a harmless tingling sensation on your skin called paresthesia—this is completely normal and means the ingredient is working! If you are new to caffeine, start with 1/2 scoop to assess your tolerance.",
      precautions: [
        "Do not consume within 5 hours of bedtime to prevent sleeplessness.",
        "Never exceed 2 scoops within a 24-hour period.",
        "Not intended for individuals under 18 years of age or caffeine-sensitive persons.",
      ],
    },
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
      "2.5g L-Glutamine for rapid intestinal and muscle cellular repair",
      "1g Citrulline Malate (1:1) for endurance and muscular pumps",
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
      { label: "Citrulline Malate (1:1)", value: "1.0 g" },
      { label: "Sodium", value: "220 mg" },
      { label: "Potassium", value: "180 mg" },
      { label: "Vitamin B6", value: "640 mcg" },
    ],
    usage: "Mix 1 level scoop (14g) into 400–500ml of cold water. Sip continuously throughout your workout or between meals on non-training days.",
    aminoAcidProfile: {
      totalBcaa: "7,000 mg",
      totalEaa: "7,000 mg",
      totalAminoAcids: "10,500 mg Free-Form Amino Matrix",
      summary: "Contains the gold-standard 2:1:1 ratio of BCAAs (3.5g Leucine, 1.75g Isoleucine, 1.75g Valine) supplemented with 2.5g L-Glutamine and 1g Citrulline Malate.",
      acids: [
        { name: "Micronized L-Leucine", amount: "3,500 mg", type: "BCAA", description: "Activator of mTOR signaling cascade; preserves muscle tissue during high-calorie deficits.", pct: 100 },
        { name: "Micronized L-Isoleucine", amount: "1,750 mg", type: "BCAA", description: "Enhances glucose uptake and energy utilization across hard working sets.", pct: 50 },
        { name: "Micronized L-Valine", amount: "1,750 mg", type: "BCAA", description: "Inhibits central workout fatigue by blocking tryptophan uptake in the brain.", pct: 50 },
        { name: "L-Glutamine", amount: "2,500 mg", type: "CEAA", description: "Crucial for muscle cell hydration, immune health, and halting catabolic breakdown.", pct: 71 },
        { name: "Citrulline Malate (1:1)", amount: "1,000 mg", type: "CEAA", description: "Boosts intra-workout aerobic energy production and clears lactic byproducts.", pct: 28 },
      ],
    },
    detailedIngredients: [
      {
        category: "Free-Form Amino Acid Complex",
        items: [
          { name: "Instantized 2:1:1 BCAAs (7,000 mg)", purpose: "Pure pharmaceutical free-form Leucine, Isoleucine, and Valine that bypass the liver directly into muscle fibers." },
          { name: "Micronized L-Glutamine (2,500 mg)", purpose: "Restores muscular glutamine pools depleted during strenuous workouts." },
          { name: "Citrulline Malate 1:1 (1,000 mg)", purpose: "Drives nitric oxide synthesis and accelerates phosphocreatine recovery between sets." },
        ],
      },
      {
        category: "Intra-Workout Hydration Electrolytes",
        items: [
          { name: "Trisodium Citrate Dihydrate & Sodium Chloride", purpose: "Delivers 220 mg sodium to maintain intravascular volume and cellular osmolarity." },
          { name: "Potassium Chloride", purpose: "Provides 180 mg potassium to prevent painful muscle cramping during long training sessions." },
        ],
      },
      {
        category: "Metabolic Catalysts & Refreshment",
        items: [
          { name: "Pyridoxine HCl (Vitamin B6 640 mcg)", purpose: "Essential enzymatic cofactor for amino acid transamination and glycogen breakdown." },
          { name: "Citric & Malic Acids", purpose: "Natural fruit acids providing crisp refreshment and supporting the Krebs energy cycle." },
        ],
      },
    ],
    useProtocol: {
      servingSize: "1 Level Scoop (14 g)",
      servingsPerContainer: "30 Servings",
      liquid: "350–500 ml of ice-cold water",
      bestTiming: [
        "Intra-Workout: Sip continuously between sets throughout your exercise session",
        "Non-Training Days: Drink throughout the day to speed recovery and stay hydrated",
      ],
      instructions: [
        "Add 1 scoop (14g) into 400–500 ml of ice-cold water in your shaker or sports bottle.",
        "Shake for 15 seconds. Keep bottle nearby and sip during your workout sets.",
      ],
      beginnerTip: "Zero sugar, zero carbohydrates, zero calories! Perfect if you work out early in the morning while intermittent fasting, as it protects muscle without breaking your fast.",
      precautions: [
        "Keep tub tightly closed in a cool dry place. Do not let water droplets enter the powder.",
      ],
    },
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
      { label: "Vitamin A", value: "1,500 mcg (167% DV)" },
      { label: "Vitamin C", value: "135 mg (150% DV)" },
      { label: "Vitamin D3", value: "10 mcg / 400 IU (50% DV)" },
      { label: "Vitamin E", value: "40 mg (267% DV)" },
      { label: "Vitamin B-Complex (B1, B2, B3, B6, B12)", value: "> 500% DV" },
      { label: "Zinc (as Zinc Oxide)", value: "9.5 mg (86% DV)" },
      { label: "Magnesium", value: "145 mg (35% DV)" },
      { label: "Amino Support Matrix", value: "865 mg" },
      { label: "Herbal Herbal Complex", value: "100 mg" },
    ],
    usage: "Take 1 serving (3 caplets) with a glass of water daily with your morning meal or lunch.",
    aminoAcidProfile: {
      totalBcaa: "0 mg",
      totalEaa: "2.5 mg",
      totalAminoAcids: "865 mg Performance Matrix",
      summary: "Fortified with an athlete-specific 865mg Amino and Botanical Performance Matrix featuring Glycine, ALA, Citrulline, Methionine, and Carnitine.",
      acids: [
        { name: "Glycine", amount: "806 mg", type: "NEAA", description: "Promotes collagen synthesis, tissue repair, and supports endogenous glutathione production.", pct: 100 },
        { name: "Alpha Lipoic Acid (ALA)", amount: "25 mg", type: "NEAA", description: "Universal cellular antioxidant that recycles oxidized vitamins C and E back to active state.", pct: 3 },
        { name: "L-Citrulline Malate", amount: "2.5 mg", type: "CEAA", description: "Amino acid catalyst promoting systemic nitric oxide synthesis and waste clearance.", pct: 1 },
        { name: "L-Methionine", amount: "2.5 mg", type: "EAA", description: "Essential sulfur donor for healthy cartilage, joints, and cellular transmethylation.", pct: 1 },
        { name: "L-Arginine HCl", amount: "2.5 mg", type: "CEAA", description: "Promotes microvascular blood flow throughout organs and skeletal muscle tissue.", pct: 1 },
        { name: "L-Carnitine L-Tartrate", amount: "2.5 mg", type: "CEAA", description: "Assists long-chain fatty acid transport into cellular mitochondria for energy production.", pct: 1 },
      ],
    },
    detailedIngredients: [
      {
        category: "Full-Spectrum Vitamin & Mineral Matrix",
        items: [
          { name: "High-Potency Vitamin Blend", purpose: "Vitamins A, C, D3, E, B1, B2, B3, B6, B12, Biotin, and Pantothenic acid for comprehensive metabolic health." },
          { name: "Essential Trace Minerals", purpose: "Elemental Zinc, Magnesium, Calcium, Copper, Manganese, and Molybdenum for hormone and immune balance." },
        ],
      },
      {
        category: "Amino Acid & Antioxidant Performance Support",
        items: [
          { name: "Glycine & ALA Matrix (865 mg)", purpose: "Provides collagen building blocks and universal antioxidant protection against intense athletic oxidation." },
          { name: "L-Citrulline, L-Arginine & L-Carnitine", purpose: "Micro-dosed amino cofactors supporting endurance, fat transport, and blood vessel health." },
        ],
      },
      {
        category: "Herbal Botanical Extract Blend",
        items: [
          { name: "Green Tea Leaf Extract (Standardized EGCG)", purpose: "Supplies potent green tea catechins for cellular protection and metabolic support." },
          { name: "Saw Palmetto Fruit Extract", purpose: "Botanical lipid extract supporting vitality and endocrine balance in active athletes." },
          { name: "Ginkgo Biloba Leaf Extract", purpose: "Traditional botanical supporting micro-circulation and cognitive stamina." },
        ],
      },
    ],
    useProtocol: {
      servingSize: "3 Caplets Daily",
      servingsPerContainer: "30 Servings (90 Caplets)",
      liquid: "1 full glass of water (250 ml)",
      bestTiming: [
        "Morning Breakfast or Lunch (consume with a whole food meal)",
      ],
      instructions: [
        "Take 3 caplets with a large glass of water once daily.",
        "Always consume with a meal containing dietary fats to optimize absorption of fat-soluble vitamins (A, D, E).",
      ],
      beginnerTip: "Never take high-potency multivitamins on an empty stomach. The high concentrations of B-vitamins and zinc require food in your stomach to prevent temporary nausea.",
      precautions: [
        "Do not exceed 3 caplets per day.",
        "Store in a cool dry place out of reach of children.",
      ],
    },
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
    materialCareGuide: {
      materials: [
        { name: "High-Density Virgin Rubber Overmold", description: "Low-odor natural rubber prevents floor damage and significantly deadens bounce and noise." },
        { name: "Solid ASTM A48 Class 20 Grey Iron Core", description: "Heavy solid cast iron core permanently friction-welded to the steel shaft." },
        { name: "Hard-Chrome Knurled Handle", description: "Precision medium-diamond knurl provides a secure, non-slip grip even with sweaty hands." },
      ],
      careInstructions: [
        "Wipe handles and rubber heads with a dry microfiber cloth after intense sweaty workouts.",
        "Clean periodically with mild soapy water; do not use harsh petroleum solvents on rubber.",
        "Store on a rubber-lined dumbbell rack or flat mat to prevent accidental rolling.",
      ],
      specs: [
        { label: "Handle Diameter", value: "28mm (up to 10kg) / 34mm (above 10kg)" },
        { label: "Shaft Plating", value: "Hard Chrome with corrosion resistance" },
        { label: "Head Geometry", value: "Hexagonal anti-roll 6-sided design" },
      ],
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
    materialCareGuide: {
      materials: [
        { name: "Precision Laser-Cut Steel Weight Plates", description: "High-grade balanced steel weight plates engineered for consistent calibration." },
        { name: "Impact-Resistant Thermoplastic Shell", description: "Scratch-resistant polymer casing provides quiet workouts and prevents clattering." },
        { name: "Reinforced Locking Dial Mechanism", description: "Mechanical safety lock ensures plates are firmly engaged before lifting from cradle." },
      ],
      careInstructions: [
        "Always rotate weight selection dials while the dumbbell is seated flat in its base tray.",
        "Never drop the dumbbell on floors or bang plates together, as it can damage internal gears.",
        "Wipe handles clean with a dry cloth; keep the base tray free of dirt and debris.",
      ],
      specs: [
        { label: "Weight Range", value: "2 kg to 24 kg (5 lbs to 52.5 lbs)" },
        { label: "Weight Settings", value: "15 Distinct settings (2, 3, 4, 5, 7, 8, 9, 11, 14, 16, 18, 20, 23, 24 kg)" },
        { label: "Base Tray", value: "Included high-impact molded docking tray" },
      ],
    },
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
    materialCareGuide: {
      materials: [
        { name: "100% Natural Malaysian Eco-Latex", description: "Pure tree-tapped medical latex offering smooth elasticity and linear stretch tension." },
        { name: "Continuous Multi-Dip Construction", description: "Manufactured using layered dipping for maximum snap-resistance and tear protection." },
      ],
      careInstructions: [
        "Store in the provided breathable pouch away from direct UV sunlight and extreme heat.",
        "Wipe clean with a damp cloth; never use petroleum-based lubricants or solvents.",
        "Dust occasionally with cornstarch or baby powder to prevent sticking.",
      ],
      specs: [
        { label: "Band Circumference", value: "12 inches (30.5 cm) continuous loop" },
        { label: "Width", value: "2 inches (5.1 cm) non-pinch profile" },
        { label: "Resistance Range", value: "Yellow (5 lbs), Red (10 lbs), Green (15 lbs), Blue (25 lbs), Black (40 lbs)" },
      ],
    },
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
    materialCareGuide: {
      materials: [
        { name: "High-Density Closed-Cell PVC", description: "Seals out bacteria and sweat; will never peel, flake, or degrade over time." },
        { name: "OEKO-TEX Standard 100 Certified", description: "Tested free of toxic phthalates, AZO dyes, and harmful industrial solvents." },
      ],
      careInstructions: [
        "Wipe with a damp cloth after each yoga or stretching session.",
        "Break-in Tip: Scrub with sea salt and a damp sponge before first use to accelerate grip break-in.",
        "Roll with the top fabric surface facing outward to keep mat edges laying flat.",
      ],
      specs: [
        { label: "Dimensions", value: "180 cm × 66 cm (71 in × 26 in)" },
        { label: "Thickness", value: "6.0 mm ultra-dense orthopedic cushion" },
        { label: "Weight", value: "3.4 kg (heavy-duty stay-put anchor)" },
      ],
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
    materialCareGuide: {
      materials: [
        { name: "BPA & Phthalate-Free Polypropylene / Tritan", description: "Food-grade non-porous polymer resistant to odor and stains." },
        { name: "316 Surgical-Grade Stainless Steel BlenderBall®", description: "Rust-proof, electro-polished whisk ball designed to bounce freely inside the bottle." },
      ],
      careInstructions: [
        "Rinse with warm water immediately after drinking protein shakes to prevent odor buildup.",
        "Top-rack dishwasher safe; hand washing the BlenderBall keeps it shiny.",
        "Store with the flip cap open to allow fresh airflow.",
      ],
      specs: [
        { label: "Capacity", value: "700 ml (24 oz) volume to the brim" },
        { label: "Cap System", value: "StayOpen™ flip cap with protective SpoutGuard™" },
        { label: "Base Profile", value: "Rounded internal base for 360° fluid circulation" },
      ],
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
    materialCareGuide: {
      materials: [
        { name: "80% Combed Cotton / 20% Performance Polyester", description: "Combines natural cotton breathability with polyester durability and quick-drying tech." },
        { name: "280 GSM Brushed Interior Fleece", description: "Soft brushed fleece traps body warmth without adding bulky weight." },
      ],
      careInstructions: [
        "Machine wash cold with like colors inside out.",
        "Tumble dry on low heat or hang dry to preserve fleece softness.",
        "Do not use fabric softeners or bleach, as they reduce moisture-wicking properties.",
      ],
      specs: [
        { label: "Fabric Weight", value: "280 GSM Midweight athletic fleece" },
        { label: "Closure", value: "Heavy-duty full front zipper with neck garage" },
        { label: "Hood", value: "Drawstring adjustable dual-layer hood" },
      ],
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
    materialCareGuide: {
      materials: [
        { name: "Genuine Abrasion-Resistant Cowhide Leather", description: "High-friction natural leather palm with double-stitched stress points." },
        { name: "High-Density Foam Cushioning", description: "Absorbs knurling pressure across metacarpal bones during heavy deadlifts." },
        { name: "Heavy-Duty Elastic Wristwrap", description: "Graduated compression wrap with industrial hook-and-loop fastening." },
      ],
      careInstructions: [
        "Hand wash with mild soap and cold water if soiled.",
        "Air dry flat away from direct radiators or heaters; never machine wash.",
        "Avoid leaving damp gloves inside closed gym bags for prolonged periods.",
      ],
      specs: [
        { label: "Wrist Wrap Width", value: "50 mm (2 inch) wide integrated elastic" },
        { label: "Finger Cut", value: "1/2 finger length for barbell fingertip tactile feel" },
        { label: "Closure", value: "Industrial Hook-and-Loop quick release" },
      ],
    },
    reviews: realReviews("Harbinger Gloves", "Rahul M.", "Wrist support is rock solid for 100kg+ bench press sessions."),
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const isEdible = (p: Product) => p.category === "supplements";
export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
export const discount = (p: Product) => Math.round(((p.mrp - p.price) / p.mrp) * 100);
