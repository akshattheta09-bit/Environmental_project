import { 
  Cpu, Factory, Car, Leaf, Droplets, ThermometerSun, BatteryWarning, ShieldAlert 
} from "lucide-react"
import { SmoothScrollHero } from "./components/ui/smooth-scroll-hero"
import { ThemeProvider, ThemeToggle } from "./components/theme-provider"
import RotatingEarth from "./components/ui/wireframe-dotted-globe"
import { motion } from "framer-motion"

import { PollutantGrid } from "./components/ui/pollutant-grid"
import { ArchitectureComponents } from "./components/ui/architecture-components"
import { AiHierarchy } from "./components/ui/ai-hierarchy"
import { StepByStep } from "./components/ui/step-by-step"
import { EnvironmentalBenefits } from "./components/ui/environmental-benefits"
import { SdgAlignment } from "./components/ui/sdg-alignment"
import { LiteratureProblem } from "./components/ui/literature-problem"
import { SignificanceImpact } from "./components/ui/significance-impact"

// Reusable animation configuration
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { type: "spring", stiffness: 60, damping: 20, mass: 1 } as const
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="bg-background min-h-screen text-foreground font-sans transition-colors duration-500 overflow-x-hidden selection:bg-primary/20">
        
        {/* NAV */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-5 md:px-12 bg-background/80 dark:bg-background/80 backdrop-blur-xl border-b border-border/40 transition-colors">
          <div className="font-sans font-bold text-lg md:text-xl tracking-tight text-primary flex items-center gap-1.5 uppercase">
            AI <span className="opacity-40 px-1 font-light">IN</span> SMART TRAFFIC MANAGEMENT
          </div>
          <div className="flex items-center gap-8">
            <ul className="hidden md:flex gap-8 list-none m-0 p-0 font-sans text-[11px] tracking-[0.2em] uppercase font-semibold text-muted-foreground">
              <li><a href="#risks" className="hover:text-primary transition-colors">Risk Assessment</a></li>
              <li><a href="#precautions" className="hover:text-primary transition-colors">Precautionary Framework</a></li>
            </ul>
            <ThemeToggle />
          </div>
        </nav>

        {/* HERO SECTION via the Smooth Scroll Nature Hero */}
        <SmoothScrollHero />

        {/* GLASSMORPHIC STAT STRIP (overlapping hero transition) */}
        <div className="relative -mt-24 z-20 px-4 md:px-8 max-w-5xl mx-auto">
          <motion.div 
            {...fadeUp}
            className="flex flex-wrap shadow-2xl shadow-emerald-900/10 dark:shadow-black/50 overflow-hidden rounded-3xl border border-white/20 dark:border-white/5 backdrop-blur-2xl bg-white/70 dark:bg-card/70"
          >
            {[
              { num: "25%", label: "Global CO₂ from transport" },
              { num: "40%", label: "Urban fuel wasted in congestion" },
              { num: "3×", label: "AI data center energy surge by 2030" },
              { num: "17%", label: "Potential emission reduction via AI traffic" }
            ].map((stat, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-center p-6 border-r border-border/30 last:border-0 min-w-[170px]">
                <span className="text-5xl md:text-6xl font-serif text-primary tracking-tighter">{stat.num}</span>
                <span className="font-sans text-[10px] text-muted-foreground tracking-[0.2em] uppercase text-center mt-3 font-semibold">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* SECTION: LITERATURE CONTEXT */}
        <LiteratureProblem />

        {/* SECTION: POLLUTANT EFFECTS */}
        <PollutantGrid />

        {/* SECTION 1: RISKS */}
        <section id="risks" className="py-40 md:py-48 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div {...fadeUp}>
            <div className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-primary mb-6 flex items-center gap-6">
              01 — Environmental Risks
              <div className="flex-1 h-px bg-border"></div>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-foreground leading-[1.1] mb-8">
              What Could <em className="bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent italic">Go Wrong</em>
            </h2>
            <div className="pl-6 md:pl-8 border-l-2 border-primary/30 max-w-3xl mb-20">
              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                Smart traffic AI promises efficiency — yet its deployment introduces a set of serious, often overlooked environmental risks that could worsen the very crisis it claims to solve.
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: <Cpu className="w-6 h-6" />,
                title: "Massive Energy Consumption",
                desc: "Training and operating deep learning traffic models requires vast computing resources. A single large-scale traffic AI deployment across a metro city can draw energy comparable to powering thousands of homes.",
                severity: "High Severity",
                color: "text-rose-600 dark:text-rose-400 border-rose-600/20 bg-rose-50 dark:bg-rose-950/20"
              },
              {
                icon: <Factory className="w-6 h-6" />,
                title: "Electronic Waste from Sensors",
                desc: "Smart traffic systems rely on dense networks of cameras, LiDAR units, and IoT sensors. Rapid hardware cycling creates significant e-waste that contaminates soil and water systems.",
                severity: "High Severity",
                color: "text-rose-600 dark:text-rose-400 border-rose-600/20 bg-rose-50 dark:bg-rose-950/20"
              },
              {
                icon: <Car className="w-6 h-6" />,
                title: "Induced Demand & Traffic Gen",
                desc: "By making roads faster, AI systems paradoxically increase total vehicle usage. More efficient roads attract more cars, canceling out AI's environmental gains entirely.",
                severity: "Med-High Severity",
                color: "text-amber-600 dark:text-amber-500 border-amber-600/20 bg-amber-50 dark:bg-amber-950/20"
              },
              {
                icon: <Leaf className="w-6 h-6" />,
                title: "Carbon Cost of AI Training",
                desc: "Developing and fine-tuning traffic models generates emissions. One major model training run can equal transatlantic flight emissions.",
                severity: "Medium Severity",
                color: "text-amber-600 dark:text-amber-500 border-amber-600/20 bg-amber-50 dark:bg-amber-950/20"
              },
              {
                icon: <Droplets className="w-6 h-6" />,
                title: "Data Center Water Usage",
                desc: "AI inference and training infrastructure requires cooling systems that consume enormous volumes of freshwater, stressing local water supplies.",
                severity: "Medium Severity",
                color: "text-amber-600 dark:text-amber-500 border-amber-600/20 bg-amber-50 dark:bg-amber-950/20"
              },
              {
                icon: <ThermometerSun className="w-6 h-6" />,
                title: "Urban Heat Island Amplification",
                desc: "Optimized traffic flow concentrates vehicle activity into dense corridors, worsening heat island effects and affecting vulnerable populations.",
                severity: "Moderate Severity",
                color: "text-primary border-primary/20 bg-primary/5"
              },
              {
                icon: <BatteryWarning className="w-6 h-6" />,
                title: "Rare Earth Mining for Hardware",
                desc: "Manufacturing sensors demands rare earth elements, extracted through processes that devastate ecosystems and poison watersheds.",
                severity: "High Severity",
                color: "text-rose-600 dark:text-rose-400 border-rose-600/20 bg-rose-50 dark:bg-rose-950/20"
              },
              {
                icon: <ShieldAlert className="w-6 h-6" />,
                title: "Lock-In of Car-Centric Infra",
                desc: "Heavy investment in AI-optimized road networks entrench dependence on private vehicles, crowding out funding for public transit.",
                severity: "High Strategic Risk",
                color: "text-rose-600 dark:text-rose-400 border-rose-600/20 bg-rose-50 dark:bg-rose-950/20"
              }
            ].map((risk, i) => (
              <motion.div 
                variants={staggerItem}
                key={i} 
                className="bg-card hover:-translate-y-2 transition-transform duration-500 p-8 rounded-3xl border border-border shadow-sm hover:shadow-xl dark:shadow-none relative group overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 text-9xl font-serif text-muted/30 group-hover:text-primary/5 transition-colors select-none">
                  {i + 1}
                </div>
                <div className={`inline-flex p-4 rounded-2xl mb-6 ${risk.color}`}>
                  {risk.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-3 leading-snug relative z-10">{risk.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-light relative z-10">{risk.desc}</p>
                <span className={`inline-flex items-center gap-2 font-sans text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border ${risk.color} relative z-10`}>
                  • {risk.severity}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION: PRODUCT ARCHITECTURE & AI */}
        <ArchitectureComponents />
        <AiHierarchy />
        <StepByStep />

        {/* SECTION: ENVIRONMENTAL BENEFITS & IMPACT & SDGs */}
        <EnvironmentalBenefits />
        <SignificanceImpact />
        <SdgAlignment />

        {/* PULL QUOTE */}
        <section className="py-32 px-6 max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="relative">
            <span className="absolute -left-4 md:-left-12 -top-12 text-8xl md:text-[10rem] font-serif text-primary/10 select-none">"</span>
            <blockquote className="text-3xl md:text-5xl font-serif italic text-foreground leading-[1.3] relative z-10 text-center">
              Making roads smarter without making cities less car-dependent is like installing a more efficient pipe into a sinking ship.
            </blockquote>
            <cite className="block mt-12 text-center font-sans text-xs text-primary font-bold tracking-[0.2em] uppercase not-italic">
              — Environmental Transport Research Synthesis, 2024
            </cite>
          </motion.div>
        </section>

        {/* SECTION 2: PRECAUTIONS */}
        <section id="precautions" className="py-40 md:py-48 px-6 md:px-12 max-w-5xl mx-auto">
          <motion.div {...fadeUp}>
            <div className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-primary mb-6 flex items-center gap-6">
              02 — Precautionary Framework
              <div className="flex-1 h-px bg-border"></div>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-foreground leading-[1.1] mb-8">
              Before the <em className="bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent italic">Algorithm</em> Runs
            </h2>
            <div className="pl-6 md:pl-8 border-l-2 border-primary/30 max-w-3xl mb-20">
              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                A responsible approach demands proactive safeguards — not afterthoughts. These must be embedded into project planning, procurement, and governance from day one.
              </p>
            </div>
          </motion.div>

          <div className="relative border-l border-primary/20 pl-8 md:pl-16 ml-4 md:ml-8">
            {[
              {
                tag: "Precaution 01 — Policy Level",
                title: "Mandatory Environmental Impact Assessment",
                desc: "All large-scale AI traffic deployments should undergo an EIA including lifecycle carbon analysis. No AI traffic system should go live without this baseline documentation."
              },
              {
                tag: "Precaution 02 — Energy Procurement",
                title: "Renewable Energy Mandates",
                desc: "Data centers and network infrastructure serving the traffic system must operate on verified renewable energy through Power Purchase Agreements (PPAs)."
              },
              {
                tag: "Precaution 03 — Hardware Design",
                title: "Circular Economy Standards",
                desc: "Procurement policies must mandate vendors meet ISO 14001, offer take-back recycling programs, and use modular designs for repair rather than full replacement."
              },
              {
                tag: "Precaution 04 — Urban Planning",
                title: "Modal Shift Conditionality",
                desc: "AI optimization systems must be explicitly conditional on parallel investments in sustainable transport alternatives like cycling, pedestrian, and rail systems."
              },
              {
                tag: "Precaution 05 — Algorithmic Design",
                title: "Environmental Weighting",
                desc: "Traffic AI algorithms must incorporate real-time emission estimation and air quality index data into the optimization reward signal, not solely travel time."
              }
            ].map((item, i) => (
              <motion.div 
                {...fadeUp}
                key={i} 
                className="relative mb-16 last:mb-0"
              >
                <div className="absolute -left-[45px] md:-left-[77px] top-1.5 w-6 h-6 rounded-full bg-background border-4 border-primary shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>
                <div className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-primary/70 mb-3">{item.tag}</div>
                <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed max-w-2xl text-lg">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ROTATING GLOBE */}
        <section className="py-40 px-6 max-w-7xl mx-auto flex flex-col items-center relative overflow-hidden">
          <motion.div 
            {...fadeUp}
            className="w-full absolute inset-0 -z-10 pointer-events-none flex justify-center items-center"
          >
            <div className="w-[800px] h-[800px] bg-gradient-to-tr from-teal-400 via-cyan-500 to-blue-500 opacity-5 dark:opacity-10 blur-[120px] rounded-full"></div>
          </motion.div>

          <motion.div {...fadeUp} className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-12 flex items-center justify-center gap-6 w-full max-w-3xl">
            <div className="flex-1 h-px bg-border"></div>
            GLOBAL SCALE
            <div className="flex-1 h-px bg-border"></div>
          </motion.div>
          
          <motion.div 
            {...fadeUp}
            className="w-full max-w-4xl aspect-[4/3] relative flex justify-center items-center rounded-[2.5rem] p-4 bg-white/50 dark:bg-card/50 backdrop-blur-sm border border-border shadow-2xl dark:shadow-none"
          >
            <RotatingEarth width={1000} height={700} />
          </motion.div>
          
          <motion.p 
            {...fadeUp}
            className="mt-12 text-center text-muted-foreground max-w-lg mx-auto font-light text-lg"
          >
            Visualizing the interconnected scale of global infrastructural networks and their ecological footprint.
          </motion.p>
        </section>

        {/* FOOTER */}
        <footer className="bg-foreground text-background py-16 px-6 text-center mt-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-2xl md:text-3xl font-sans font-bold tracking-tight mb-6 text-primary-foreground opacity-90 uppercase">AI <span className="font-light opacity-50 px-2 italic">in</span> SMART TRAFFIC MANAGEMENT</div>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase opacity-50 mb-8">Global Assessment Report · 2024–2025</p>
            <div className="h-px bg-background/10 w-full max-w-xs mx-auto mb-8"></div>
            <p className="font-sans text-xs opacity-40 font-light">© 2026 Environmental Transport Synthesis. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App
