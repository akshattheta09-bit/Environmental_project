import { motion } from "framer-motion"
import { CloudRain, Wind, Flame, Factory, Skull, AlertTriangle } from "lucide-react"

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
      staggerChildren: 0.1
    }
  }
}

const staggerItem = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
}

const pollutants = [
  {
    icon: <Flame className="w-5 h-5 text-orange-600 dark:text-orange-500" />,
    name: "Carbon Dioxide (CO₂)",
    impact: "Primary greenhouse gas; drives global warming and climate change.",
    color: "bg-orange-500/10 border-orange-500/20"
  },
  {
    icon: <Skull className="w-5 h-5 text-red-600 dark:text-red-500" />,
    name: "Carbon Monoxide (CO)",
    impact: "Highly toxic; reduces atmospheric oxygen; directly impacts human cognition.",
    color: "bg-red-500/10 border-red-500/20"
  },
  {
    icon: <Factory className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />,
    name: "Nitrogen Oxides (NOₓ)",
    impact: "Forms smog and acid rain; severely damages lung tissue and aquatic ecosystems.",
    color: "bg-yellow-500/10 border-yellow-500/20"
  },
  {
    icon: <CloudRain className="w-5 h-5 text-cyan-700 dark:text-cyan-500" />,
    name: "Sulfur Dioxide (SO₂)",
    impact: "Primary cause of acid rain; damages vegetation, soils, and aquatic systems worldwide.",
    color: "bg-cyan-500/10 border-cyan-500/20"
  },
  {
    icon: <AlertTriangle className="w-5 h-5 text-purple-700 dark:text-purple-500" />,
    name: "Particulate Matter (PM₂.₅/PM₁₀)",
    impact: "Penetrates deep into lungs; triggers severe respiratory and cardiovascular diseases.",
    color: "bg-purple-500/10 border-purple-500/20"
  },
  {
    icon: <Wind className="w-5 h-5 text-teal-700 dark:text-teal-500" />,
    name: "Hydrocarbons (HC)",
    impact: "Reacts with NOₓ under sunlight to form dangerous ground-level ozone (smog).",
    color: "bg-teal-500/10 border-teal-500/20"
  }
]

export function PollutantGrid() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div {...fadeUp} className="mb-16">
        <h3 className="text-3xl md:text-5xl font-serif text-foreground mb-6">
          The Anatomy of <span className="text-primary italic">Exhaust</span>
        </h3>
        <p className="text-lg md:text-xl text-muted-foreground font-light max-w-3xl leading-relaxed">
          Traffic congestion dramatically increases vehicle idling time. Idling engines emit up to 80% more CO₂ per kilometre compared to vehicles moving at optimal speeds. This creates heavily concentrated pollution zones in urban areas.
        </p>
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        {pollutants.map((item, i) => (
          <motion.div 
            variants={staggerItem}
            key={i} 
            className="flex flex-col p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 -mr-10 -mt-10 rounded-full transition-opacity group-hover:opacity-40 ${item.color.split(' ')[0]}`}></div>
            <div className={`inline-flex w-10 h-10 items-center justify-center rounded-xl mb-4 border ${item.color}`}>
              {item.icon}
            </div>
            <h4 className="text-lg font-bold font-sans tracking-tight text-foreground mb-2">
              {item.name}
            </h4>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              {item.impact}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
