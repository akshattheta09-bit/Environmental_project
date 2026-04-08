import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { type: "spring", stiffness: 60, damping: 20, mass: 1 } as const
}

export function LiteratureProblem() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-4xl mx-auto border-t border-border/30">
      <motion.div {...fadeUp} className="mb-12">
        <div className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-primary mb-4 flex items-center gap-4">
          Literature Context
          <div className="w-12 h-px bg-primary/30"></div>
        </div>
        <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-8">
          The Unseen Cost of <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent italic">Gridlock</span>
        </h3>
        
        <div className="prose prose-lg dark:prose-invert prose-p:font-light prose-p:leading-relaxed prose-p:text-muted-foreground prose-strong:text-foreground prose-strong:font-semibold">
          <p>
            Urban traffic management is fundamentally an environmental scaling problem. Vehicular congestion directly exacerbates air pollution, greenhouse gas emissions, noise pollution, and urban heat island effects. In 2022 alone, the global transport sector emitted roughly <strong>8.4 gigatons of CO₂</strong>, representing nearly 23% of total energy-related emissions worldwide.
          </p>
          <p>
            Traffic congestion dramatically increases vehicle idling time — the period when an engine runs without the vehicle moving. When cars idle in stop-and-go traffic, their engines operate inefficiently, emitting up to <strong>80% more CO₂ per kilometre</strong> equivalent than vehicles moving at optimal, uninterrupted speeds.
          </p>
          <p>
            The global cost of this congestion extends beyond the environment, exceeding <strong>$1 trillion annually</strong> in productivity loss and fuel waste. Traditional, fixed-timer traffic light systems are rigid; they operate on pre-programmed schedules, lack real-time integration with street-level data, and cannot predict non-recurrent congestion events — the unexpected breakdowns or accidents that account for roughly <strong>60% of all urban delays</strong>.
          </p>
          <p>
            When cities rely heavily on centralized human operators to manually re-route networks or adjust signals during catastrophic, multi-node incidents, it inevitably leads to cognitive overload and delayed response times.
          </p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 mt-12 overflow-hidden"
      >
        <Quote className="absolute top-6 left-6 w-24 h-24 text-primary opacity-10 rotate-180" />
        <p className="relative z-10 text-xl md:text-2xl font-serif text-foreground leading-relaxed italic text-center">
          "Shift to AI-based systems represents the first paradigm in which environmental outcomes — emissions reduction, air quality improvement, noise reduction — are explicitly built into traffic system design objectives."
        </p>
      </motion.div>
    </section>
  )
}
