import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  Dumbbell,
  Flame,
  FlaskConical,
  Heart,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  User,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LabReportDialog } from "@/components/site/LabReportDialog";
import { formatINR, PRODUCTS, type Goal, type Product } from "@/data/products";
import { recommend, type Need, type Profile, type Recommendation } from "@/lib/recommend";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Personalized Fit Guide & Quiz — D&S Sports Club" },
      { name: "description", content: "Tell us about your fitness goals, experience, diet, and budget. Get a personalized starter kit of lab-tested supplements and gear." },
    ],
  }),
  component: QuizPage,
});

export function QuizPage() {
  const navigate = useNavigate();
  const { saveProfile, add } = useStore();

  const [step, setStep] = useState(1);
  const totalSteps = 9;

  // Answers State
  const [name, setName] = useState("");
  const [source, setSource] = useState("Instagram");
  const [goal, setGoal] = useState<Goal>("workout");
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [needs, setNeeds] = useState<Need[]>(["protein"]);
  const [place, setPlace] = useState<"home" | "gym" | "both">("gym");
  const [diet, setDiet] = useState<"veg" | "vegan" | "non-veg">("veg");
  const [allergies, setAllergies] = useState<("lactose" | "gluten")[]>([]);
  const [days, setDays] = useState("3-4");
  const [budget, setBudget] = useState(3500);

  // Analysis & Modal state
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisText, setAnalysisText] = useState("Processing your fitness profile...");
  const [showModal, setShowModal] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  // Calculate recommendation profile
  const currentProfile: Profile = {
    name: name.trim() || "Athlete",
    source,
    goal,
    level,
    place,
    days,
    diet,
    allergies,
    needs,
    budget,
  };

  const handleNext = () => {
    if (step === 1 && !name.trim()) {
      toast.error("Please enter your name to personalize your recommendations.");
      return;
    }
    if (step < totalSteps) {
      setStep((s) => s + 1);
    } else {
      startAnalysis();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const toggleNeed = (need: Need) => {
    setNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]
    );
  };

  const toggleAllergy = (allergy: "lactose" | "gluten") => {
    setAllergies((prev) =>
      prev.includes(allergy) ? prev.filter((a) => a !== allergy) : [...prev, allergy]
    );
  };

  const startAnalysis = () => {
    setAnalyzing(true);
    setAnalysisProgress(15);
    setAnalysisText(`Auditing ${name.trim() || "your"}'s training profile & goals...`);

    const recs = recommend(PRODUCTS, currentProfile, 6);
    setRecommendations(recs);

    setTimeout(() => {
      setAnalysisProgress(40);
      setAnalysisText("Filtering NABL lab-certified batches and allergen clearances...");
    }, 600);

    setTimeout(() => {
      setAnalysisProgress(75);
      setAnalysisText("Matching real brand gear with drop-ship supplier availability...");
    }, 1200);

    setTimeout(() => {
      setAnalysisProgress(100);
      setAnalysisText("Starter kit personalized successfully!");
    }, 1800);

    setTimeout(() => {
      setAnalyzing(false);
      saveProfile(currentProfile);
      setShowModal(true);
    }, 2200);
  };

  const finishAndGoToShop = () => {
    setShowModal(false);
    void navigate({ to: "/shop" });
  };

  return (
    <div className="min-h-[calc(100svh-4rem)] bg-[#FAF7F2] text-stone-900 flex flex-col justify-between py-6 px-4 sm:px-6">
      {/* Top Header & Progress */}
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-[#D9622B] transition-colors"
          >
            <ArrowLeft className="size-4" /> Home
          </Link>
          <span className="text-xs font-bold uppercase tracking-widest text-[#D9622B]">
            Step {step} of {totalSteps}
          </span>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
          <motion.div
            className="h-full bg-[#D9622B]"
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Main Interactive Questionnaire Container */}
      <div className="mx-auto w-full max-w-2xl my-auto py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {/* STEP 1: Name */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 text-center"
            >
              <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#D9622B]/10 text-[#D9622B] border border-[#D9622B]/20">
                <User className="size-7" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#D9622B]">
                  D&S Sports Club Personalization
                </p>
                <h1 className="mt-2 font-display text-2xl sm:text-4xl md:text-5xl font-black uppercase text-stone-900 tracking-tight">
                  What is your name?
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
                  We customize your beginner guide, match verified lab reports to your diet, and build your starter kit.
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  autoFocus
                  placeholder="Enter your first name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleNext()}
                  className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 sm:py-3.5 text-center text-base sm:text-xl font-bold text-stone-900 placeholder:text-stone-400 focus:border-[#D9622B] focus:outline-none focus:ring-2 focus:ring-[#D9622B]/25 transition-all shadow-sm"
                />
              </div>
            </motion.div>
          )}

          {/* STEP 2: Discovery Source */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#D9622B]">Welcome, {name}!</p>
                <h2 className="mt-1 font-display text-2xl sm:text-4xl font-black uppercase text-stone-900">
                  How did you hear about D&S Sports Club?
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-stone-500">
                  Helps our community team understand where you discovered us.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {[
                  { id: "YouTube", label: "YouTube Fitness", icon: "▶️" },
                  { id: "Instagram", label: "Instagram", icon: "📸" },
                  { id: "Friends", label: "Friends & Gym Buddy", icon: "🤝" },
                  { id: "Google Ads", label: "Google Search", icon: "🔍" },
                  { id: "Reddit", label: "Reddit / Forum", icon: "💬" },
                  { id: "Trainer", label: "Personal Coach", icon: "🏋️" },
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSource(item.id);
                      handleNext();
                    }}
                    className={`flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                      source === item.id
                        ? "border-[#D9622B] bg-[#D9622B]/10 text-stone-900 shadow-lg shadow-[#D9622B]/10 ring-1 ring-[#D9622B]/30"
                        : "border-stone-200 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-100"
                    }`}
                  >
                    <span className="text-xl sm:text-2xl mb-1">{item.icon}</span>
                    <span className="text-xs sm:text-sm font-bold">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Primary Goal */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#D9622B]">Core Objective</p>
                <h2 className="mt-1 font-display text-2xl sm:text-4xl font-black uppercase text-stone-900">
                  Why are you interested in D&S Sports Club?
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-stone-500">
                  Select your primary fitness objective so we can tailor nutrition and gear.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {[
                  { id: "workout", title: "Workout & Strength", desc: "Build strength, lift heavier, tone muscle", icon: Dumbbell },
                  { id: "bulking", title: "Bulking & Muscle Gain", desc: "Gain weight, muscle size & caloric surplus", icon: Flame },
                  { id: "weightloss", title: "Weight Loss & Shred", desc: "Burn fat, maintain lean muscle & energy", icon: Zap },
                  { id: "yoga", title: "Yoga & Flexibility", desc: "Core mobility, balance, joints & recovery", icon: Heart },
                  { id: "running", title: "Running & Endurance", desc: "Stamina, cardio health & hydration", icon: Sparkles },
                  { id: "general", title: "General Fitness", desc: "Stay active, fit habits & daily wellness", icon: ShieldCheck },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = goal === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setGoal(item.id as Goal);
                        handleNext();
                      }}
                      className={`flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#D9622B] bg-[#D9622B]/10 text-stone-900 shadow-lg shadow-[#D9622B]/10 ring-1 ring-[#D9622B]/30"
                          : "border-stone-200 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-100"
                      }`}
                    >
                      <div className={`grid size-9 shrink-0 place-items-center rounded-xl ${isSelected ? "bg-[#D9622B] text-white font-bold" : "bg-stone-200 text-stone-700"}`}>
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <p className="font-bold text-stone-900 text-sm sm:text-base">{item.title}</p>
                        <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">{item.desc}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 4: Beginner vs Experienced */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#D9622B]">Experience Guidance</p>
                <h2 className="mt-1 font-display text-2xl sm:text-4xl font-black uppercase text-stone-900">
                  Are you just starting out?
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-stone-500">
                  Beginners receive gentle, straightforward guidance (no heavy pre-workouts).
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: "beginner",
                    title: "Complete Beginner (Starting Fresh)",
                    desc: "Starting gym or home workouts for the first time. Need clear starter advice on proteins, dumbbells, and essentials.",
                    badge: "Guided Recommendations",
                  },
                  {
                    id: "intermediate",
                    title: "Intermediate (6+ Months Consistent)",
                    desc: "Familiar with lifting, nutrition, and workout consistency. Looking to upgrade gear and optimize supplementation.",
                    badge: "Performance Match",
                  },
                  {
                    id: "advanced",
                    title: "Advanced Athlete / Lifter",
                    desc: "Heavy weightlifting or competitive athletics. Looking for specific supplements, heavy weights, and high-stimulant gear.",
                    badge: "Elite Level",
                  },
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      setLevel(item.id as "beginner" | "intermediate" | "advanced");
                      handleNext();
                    }}
                    className={`w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                      level === item.id
                        ? "border-[#D9622B] bg-[#D9622B]/10 text-stone-900 shadow-lg shadow-[#D9622B]/10 ring-1 ring-[#D9622B]/30"
                        : "border-stone-200 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-100"
                    }`}
                  >
                    <div>
                      <p className="font-bold text-stone-900 text-sm sm:text-base">{item.title}</p>
                      <p className="text-xs text-stone-500 mt-1 max-w-lg leading-relaxed">{item.desc}</p>
                    </div>
                    <span className="hidden sm:inline-block rounded-full bg-stone-200 px-3 py-1 text-[11px] font-semibold text-stone-700">
                      {item.badge}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 5: Dynamic Branching Checklist */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#D9622B]">Targeted Checklist</p>
                <h2 className="mt-1 font-display text-2xl sm:text-4xl font-black uppercase text-stone-900">
                  {goal === "bulking"
                    ? "What kind of items do you need for bulking?"
                    : goal === "workout"
                    ? "What workout essentials are you looking for?"
                    : goal === "yoga"
                    ? "What items do you need for your yoga practice?"
                    : "What items fit your active routine?"}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-stone-500">
                  Select all that apply. Hover or tap to toggle items.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {[
                  { id: "protein", label: "Whey / Plant Protein", icon: "🥛" },
                  { id: "gainer", label: "Mass Gainer (Calories)", icon: "📈" },
                  { id: "creatine", label: "Creatine Monohydrate", icon: "⚡" },
                  { id: "preworkout", label: "Pre-Workout Energy", icon: "🔥" },
                  { id: "weights", label: "Dumbbells / Weights", icon: "🏋️" },
                  { id: "mat", label: "6mm Yoga Mat", icon: "🧘" },
                  { id: "bands", label: "Resistance Bands", icon: "➰" },
                  { id: "accessories", label: "Shakers & Grips", icon: "🥤" },
                  { id: "apparel", label: "Gym Apparel", icon: "👕" },
                ].map((item) => {
                  const isChecked = needs.includes(item.id as Need);
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleNeed(item.id as Need)}
                      className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                        isChecked
                          ? "border-[#D9622B] bg-[#D9622B]/15 text-stone-900 ring-1 ring-[#D9622B]/30"
                          : "border-stone-200 bg-white text-stone-500 hover:border-stone-300 hover:bg-stone-100"
                      }`}
                    >
                      <span className="text-xl sm:text-2xl mb-1">{item.icon}</span>
                      <span className="text-xs sm:text-sm font-bold">{item.label}</span>
                      <span className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-[#D9622B]">
                        {isChecked ? "✓ Selected" : "+ Add"}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 6: Workout Location */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#D9622B]">Environment</p>
                <h2 className="mt-1 font-display text-2xl sm:text-4xl font-black uppercase text-stone-900">
                  Where do you primarily train?
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-stone-500">
                  Helps us recommend space-saving home gear vs gym-specific gear.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {[
                  { id: "gym", title: "Commercial Gym", desc: "Access to machines, barbells & racks", icon: "🏢" },
                  { id: "home", title: "Home Gym", desc: "Need compact dumbbells, bands & mats", icon: "🏠" },
                  { id: "both", title: "Hybrid (Both)", desc: "Mix of home workouts and gym sessions", icon: "🔄" },
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setPlace(item.id as "home" | "gym" | "both");
                      handleNext();
                    }}
                    className={`flex flex-col items-center p-5 rounded-2xl border text-center transition-all cursor-pointer ${
                      place === item.id
                        ? "border-[#D9622B] bg-[#D9622B]/10 text-stone-900 shadow-lg shadow-[#D9622B]/10 ring-1 ring-[#D9622B]/30"
                        : "border-stone-200 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-100"
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl mb-2">{item.icon}</span>
                    <span className="font-bold text-stone-900 text-base sm:text-lg">{item.title}</span>
                    <span className="text-xs text-stone-500 mt-1">{item.desc}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 7: Dietary Restrictions */}
          {step === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#D9622B]">Nutrition & Allergens</p>
                <h2 className="mt-1 font-display text-2xl sm:text-4xl font-black uppercase text-stone-900">
                  Dietary Preferences & Safety
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-stone-500">
                  We check lab reports and ingredient lists so you never get unwanted allergens.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2 block">
                    Diet Type
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: "veg", label: "Vegetarian", icon: "🌱" },
                      { id: "vegan", label: "100% Vegan", icon: "🌿" },
                      { id: "non-veg", label: "Non-Veg", icon: "🍗" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setDiet(item.id as "veg" | "vegan" | "non-veg")}
                        className={`p-3 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all flex flex-col items-center cursor-pointer ${
                          diet === item.id
                            ? "border-[#D9622B] bg-[#D9622B]/15 text-stone-900 ring-1 ring-[#D9622B]/30"
                            : "border-stone-200 bg-white text-stone-500 hover:bg-stone-100"
                        }`}
                      >
                        <span className="text-xl mb-1">{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2 block">
                    Sensitivities (Click to filter)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => toggleAllergy("lactose")}
                      className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        allergies.includes("lactose")
                          ? "border-[#D9622B] bg-[#D9622B]/10 text-stone-900 ring-1 ring-[#D9622B]"
                          : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                      }`}
                    >
                      <p className="text-stone-900 font-bold">🥛 Lactose Sensitive</p>
                      <p className="text-[11px] text-stone-500 font-normal mt-0.5">Filter out dairy whey</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleAllergy("gluten")}
                      className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        allergies.includes("gluten")
                          ? "border-[#D9622B] bg-[#D9622B]/10 text-stone-900 ring-1 ring-[#D9622B]"
                          : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                      }`}
                    >
                      <p className="text-stone-900 font-bold">🌾 Gluten Sensitive</p>
                      <p className="text-[11px] text-stone-500 font-normal mt-0.5">Filter out oat flour grain</p>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 8: Workout Frequency */}
          {step === 8 && (
            <motion.div
              key="step8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#D9622B]">Weekly Pace</p>
                <h2 className="mt-1 font-display text-2xl sm:text-4xl font-black uppercase text-stone-900">
                  How many days a week do you train?
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-stone-500">
                  Calibrates supplement serving sizes and gear durability.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {[
                  { id: "1-2", title: "1–2 Days", desc: "Casual & active lifestyle", tag: "Light" },
                  { id: "3-4", title: "3–4 Days", desc: "Consistent standard routine", tag: "Popular" },
                  { id: "5-6", title: "5–6 Days", desc: "Dedicated high-volume training", tag: "Intense" },
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setDays(item.id);
                      handleNext();
                    }}
                    className={`flex flex-col items-center p-5 rounded-2xl border text-center transition-all cursor-pointer ${
                      days === item.id
                        ? "border-[#D9622B] bg-[#D9622B]/10 text-stone-900 shadow-lg shadow-[#D9622B]/10 ring-1 ring-[#D9622B]/30"
                        : "border-stone-200 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-100"
                    }`}
                  >
                    <span className="font-display text-2xl sm:text-3xl font-black text-stone-900">{item.title}</span>
                    <span className="text-xs text-stone-500 mt-1">{item.desc}</span>
                    <span className="mt-3 rounded-full bg-stone-200 px-3 py-1 text-[10px] font-semibold text-stone-700">
                      {item.tag}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 9: Target Budget */}
          {step === 9 && (
            <motion.div
              key="step9"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#D9622B]">Budget Range</p>
                <h2 className="mt-1 font-display text-2xl sm:text-4xl font-black uppercase text-stone-900">
                  What is your target budget per item?
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-stone-500">
                  We will never recommend items exceeding your selected budget.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {[
                  { limit: 1200, title: "Under ₹1,200", desc: "Budget essentials (Creatine, bands, shaker)" },
                  { limit: 2500, title: "₹1,200 – ₹2,500", desc: "High value (Plant protein, hex dumbbells)" },
                  { limit: 4000, title: "₹2,500 – ₹4,000", desc: "Gold Standard Whey & Mass Gainers" },
                  { limit: 10000, title: "Flexible / Up to ₹10,000", desc: "Best available gear (Adjustable Dumbbells)" },
                ].map((item) => (
                  <motion.button
                    key={item.limit}
                    type="button"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setBudget(item.limit);
                      startAnalysis();
                    }}
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      budget === item.limit
                        ? "border-[#D9622B] bg-[#D9622B]/10 text-stone-900 shadow-lg shadow-[#D9622B]/10 ring-1 ring-[#D9622B]/30"
                        : "border-stone-200 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-100"
                    }`}
                  >
                    <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-stone-200 font-bold text-[#D9622B] text-sm">
                      ₹
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 text-sm sm:text-base">{item.title}</p>
                      <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <div className="mx-auto w-full max-w-2xl pt-3 border-t border-stone-200 flex items-center justify-between">
        {step > 1 ? (
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-stone-500 hover:text-stone-900 text-xs sm:text-sm"
          >
            <ArrowLeft className="size-4 mr-1.5" /> Back
          </Button>
        ) : (
          <div />
        )}

        <Button
          onClick={handleNext}
          className="ml-auto bg-[#D9622B] hover:bg-[#C4531E] text-white font-bold text-xs sm:text-sm rounded-xl px-5"
        >
          {step === totalSteps ? "Generate Starter Kit" : "Next"} <ArrowRight className="size-4 ml-1.5" />
        </Button>
      </div>

      {/* STEP 10: Real-Time Analyzing Screen */}
      <AnimatePresence>
        {analyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF7F2]/90 backdrop-blur-md px-4"
          >
            <div className="max-w-md w-full rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-8 text-center space-y-6 shadow-2xl">
              <div className="relative mx-auto size-20">
                <div className="absolute inset-0 rounded-full border-4 border-stone-100" />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-[#D9622B] border-t-transparent animate-spin"
                  style={{ animationDuration: "0.9s" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="size-6 text-[#D9622B]" />
                </div>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-stone-900 tracking-wide">
                  Building Your Starter Kit
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 min-h-6 transition-all">{analysisText}</p>
              </div>

              <div className="space-y-2">
                <div className="h-2 w-full overflow-hidden rounded-full bg-stone-100">
                  <motion.div
                    className="h-full bg-[#D9622B]"
                    animate={{ width: `${analysisProgress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                  <span>AUDITING BATCHES &amp; COAS</span>
                  <span className="font-bold text-[#D9622B]">{analysisProgress}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STEP 11: Tailored Starter Kit Results Pop-Up Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-h-[88vh] overflow-y-auto overflow-x-hidden w-[calc(100vw-1.5rem)] sm:w-full sm:max-w-2xl bg-white border border-stone-200 text-stone-900 p-4 sm:p-6 rounded-2xl shadow-2xl">
          <DialogHeader className="text-left space-y-2 border-b border-stone-200 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pr-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D9622B]/10 border border-[#D9622B]/30 px-3 py-1 text-xs font-bold text-[#D9622B]">
                <Sparkles className="size-3.5" /> 100% Tailored Recommendation
              </span>
              <span className="text-xs font-bold text-stone-500">
                Budget: {formatINR(budget)} limit
              </span>
            </div>
            <DialogTitle className="font-display text-xl sm:text-3xl font-black uppercase text-stone-900 break-words leading-tight mt-1">
              Here is Your Starter Kit, {name}!
            </DialogTitle>
            <DialogDescription className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Matched for your <strong className="text-stone-900 uppercase">{goal}</strong> focus,{" "}
              <strong className="text-stone-900">{level}</strong> level, and{" "}
              <strong className="text-stone-900">{diet}</strong> diet. Every edible supplement includes verified NABL lab reports.
            </DialogDescription>
          </DialogHeader>

          {/* Recommended Products Grid */}
          <div className="grid gap-3.5 py-4 sm:grid-cols-2">
            {recommendations.length > 0 ? (
              recommendations.map((rec) => {
                const p = rec.product;
                return (
                  <div
                    key={p.slug}
                    className="flex flex-col rounded-2xl border border-stone-200 bg-[#FAF7F2] p-3.5 sm:p-4 transition-all hover:border-stone-300 space-y-3"
                  >
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-stone-100">
                      <img src={p.image} alt={p.name} className="size-full object-cover" />
                      {p.labReport && (
                        <span className="absolute top-2 left-2 rounded-full bg-stone-900/90 border border-stone-300 px-2 py-0.5 text-[10px] font-bold text-[#D9622B] flex items-center gap-1 shadow">
                          <FlaskConical className="size-3" /> Lab Tested
                        </span>
                      )}
                      <span className="absolute top-2 right-2 rounded-full bg-[#D9622B] px-2 py-0.5 text-[10px] font-black text-white shadow">
                        {Math.min(99, Math.round(85 + rec.score * 2))}% Match
                      </span>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#D9622B]">{p.brand}</p>
                      <p className="font-bold text-stone-900 text-sm line-clamp-1">{p.name}</p>
                      <p className="text-xs text-stone-500 line-clamp-2 mt-0.5 leading-relaxed">{p.short}</p>
                    </div>

                    {/* Reasons tags */}
                    <div className="flex flex-wrap gap-1">
                      {rec.reasons.map((r) => (
                        <span
                          key={r}
                          className="rounded-full bg-white border border-stone-200 px-2 py-0.5 text-[10px] font-semibold text-stone-700"
                        >
                          ✓ {r}
                        </span>
                      ))}
                    </div>

                    {/* Price & Actions */}
                    <div className="mt-auto pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-stone-200/80">
                      <div>
                        <span className="text-base font-black text-stone-900">{formatINR(p.price)}</span>
                        <span className="text-xs text-stone-400 line-through ml-1.5">{formatINR(p.mrp)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {p.labReport && (
                          <LabReportDialog report={p.labReport} productName={p.name}>
                            <button className="text-xs font-bold text-[#D9622B] hover:text-[#C4531E] underline flex items-center gap-1 cursor-pointer">
                              <FlaskConical className="size-3" /> Report
                            </button>
                          </LabReportDialog>
                        )}
                        <Button
                          size="sm"
                          onClick={() => {
                            add(p.slug, p.options?.values[0]);
                            toast.success(`Added ${p.name} to cart!`);
                          }}
                          className="bg-[#D9622B] hover:bg-[#C4531E] text-white font-bold text-xs h-8 px-3 rounded-lg"
                        >
                          <ShoppingBag className="size-3 mr-1" /> Add
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-2 py-8 text-center text-stone-500 text-xs">
                No items directly under chosen budget. Browse the full catalog below!
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="border-t border-stone-200 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => {
                setShowModal(false);
                setStep(1);
              }}
              className="text-xs font-medium text-stone-500 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="size-3.5" /> Retake Questionnaire
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={finishAndGoToShop}
                className="w-full sm:w-auto border-stone-300 bg-stone-100 text-stone-800 hover:bg-stone-200 text-xs h-9 rounded-xl"
              >
                Skip & View Full Store
              </Button>
              <Button
                onClick={finishAndGoToShop}
                className="w-full sm:w-auto bg-[#D9622B] hover:bg-[#C4531E] text-white font-bold text-xs h-9 rounded-xl shadow-md shadow-[#D9622B]/20"
              >
                Go to Store with My Kit <ArrowRight className="size-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
