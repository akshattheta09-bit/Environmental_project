import { motion } from "framer-motion"
import { Wind, VolumeX, ThermometerSun, Zap, ShieldCheck } from "lucide-react"

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { type: "spring", stiffness: 60, damping: 20, mass: 1 } as const
}

const benefits = [
  {
    icon: <Wind className="w-8 h-8 text-teal-700 dark:text-teal-500" />,
    title: "Reduction in Air Pollution",
    desc: "Achieves 15–22% reductions in NO₂ and PM₂.₅ concentrations along major arterial roads during peak hours by minimizing vehicle idling."
  },
  {
    icon: <Zap className="w-8 h-8 text-emerald-700 dark:text-emerald-500" />,
    title: "Fuel Conservation & Energy",
    desc: "Smoother traffic flow translates directly into lower fuel consumption per vehicle-trip, saving millions of litres of petrol and diesel annually."
  },
  {
    icon: <VolumeX className="w-8 h-8 text-indigo-700 dark:text-indigo-500" />,
    title: "Noise Pollution Reduction",
    desc: "Documented 4–8 dB reductions in ambient noise levels at major intersections by eliminating hard braking, horn-honking, and engine revving."
  },
  {
    icon: <ThermometerSun className="w-8 h-8 text-orange-700 dark:text-orange-500" />,
    title: "Urban Heat Island Mitigation",
    desc: "Lowering cumulative waste heat released by idling engines helps keep cities cooler and reduces the secondary energy demand for air conditioning."
  }
]

export function EnvironmentalBenefits() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div {...fadeUp} className="text-center mb-16">
        <div className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-primary mb-4 flex items-center justify-center gap-4">
          <div className="w-12 h-px bg-primary/30"></div>
          Measurable Impact
          <div className="w-12 h-px bg-primary/30"></div>
        </div>
        <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
          Environmental <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent italic">Benefits</span>
        </h3>
        <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
          The direct ecological advantages of deploying Adaptive AI Traffic Management Systems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {benefits.map((item, i) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            key={i}
            className="group relative bg-card p-8 rounded-3xl border border-border overflow-hidden hover:border-primary/30 transition-colors"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 group-hover:rotate-12">
                {item.icon}
            </div>
            <div className="mb-6 inline-flex p-3 rounded-2xl bg-primary/10">
                {item.icon}
            </div>
            <h4 className="text-2xl font-serif font-bold text-foreground mb-4">{item.title}</h4>
            <p className="text-muted-foreground font-light leading-relaxed text-lg">
                {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div {...fadeUp} className="mt-16 bg-primary/10 border border-primary/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="bg-background p-4 rounded-full border border-primary/20 text-primary">
            <ShieldCheck className="w-10 h-10" />
        </div>
        <div>
            <h4 className="text-xl font-bold font-sans text-foreground mb-2">Governance & Risk Management</h4>
            <p className="text-muted-foreground font-light leading-relaxed">
                As AI scales, responsible deployment requires frameworks like the NIST AI Risk Management Framework, Risk Assessment Matrices for bias, and a strict Human-in-the-Loop Mandate to ensure humans retain final legal governance over physical infrastructure.
            </p>
        </div>
      </motion.div>
    </section>
  )
}
