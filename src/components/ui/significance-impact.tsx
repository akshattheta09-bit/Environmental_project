import { motion } from "framer-motion"

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { type: "spring", stiffness: 60, damping: 20, mass: 1 } as const
}

export function SignificanceImpact() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
      <motion.div {...fadeUp} className="mb-12">
        <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-8">
          The Deployment <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent italic">Significance</span>
        </h3>
        
        <div className="space-y-10">
          <div>
            <h4 className="text-xl font-bold font-sans text-foreground mb-3 flex items-center gap-3">
               Structural Feasibility
            </h4>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Unlike solutions that require complete infrastructure replacement or dramatic consumer behaviour changes, AI-STMS works within the existing road network and vehicle fleet — it simply makes them operate more efficiently. This makes it a high-leverage, deployable solution in the near term, meaning cities can meet international climate commitments without waiting decades for full EV fleet transitions.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold font-sans text-foreground mb-3 flex items-center gap-3">
              Public Health Urgency
            </h4>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Urban air pollution, heavily driven by vehicular emissions, is responsible for approximately <strong>4.2 million premature deaths annually</strong>. By measurably reducing PM₂.₅ and NOₓ concentrations in dense urban corridors, AI-STMS directly reduces the burden of respiratory and cardiovascular diseases — particularly targeting the most vulnerable demographics to protect public health.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold font-sans text-foreground mb-3 flex items-center gap-3">
              Social Equity & Accessibility
            </h4>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Beyond environmental economics, smart traffic management addresses critical social disparities. It optimizes cross-town routing, reducing the disproportionate pollution burden historically borne by communities located near high-traffic arterial roads. Furthermore, intelligent signal coordination radically reduces emergency vehicle response times in low-income neighbourhoods that are frequently underserved by legacy physical infrastructure.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
