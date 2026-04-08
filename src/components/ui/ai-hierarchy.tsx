import { motion } from "framer-motion"

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { type: "spring", stiffness: 60, damping: 20, mass: 1 } as const
}

const levels = [
  {
    level: "Level 1",
    title: "Rigid Logic Systems",
    desc: "Basic programmed responses with fixed signal timers. No learning capabilities, minimal environmental efficiency."
  },
  {
    level: "Level 2",
    title: "Rule Learning AI",
    desc: "Algorithms extract historical traffic patterns to classify congestion states and dynamically adjust signal pre-sets."
  },
  {
    level: "Level 3",
    title: "Deep Learning (MARL)",
    desc: "Multi-Agent Reinforcement Learning treats each intersection as an independent AI agent communicating in real-time."
  },
  {
    level: "Level 4",
    title: "Generative and Agentic AI",
    desc: "The frontier: autonomous intersection management via LLM integration, parsing maintenance logs and incident reports without human intervention."
  }
]

export function AiHierarchy() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
      <motion.div {...fadeUp} className="text-center mb-16">
        <h3 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
          The <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent italic">AI Hierarchy</span>
        </h3>
        <p className="text-muted-foreground font-light text-lg">
          Deployment layers graded by environmental impact and autonomy.
        </p>
      </motion.div>

      <div className="flex flex-col gap-6 relative">
        {/* Connecting line */}
        <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10 md:-translate-x-1/2"></div>
        
        {levels.map((item, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            key={i}
            className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 w-full ${
              i % 2 === 0 ? 'md:flex-row-reverse text-left md:text-right' : 'text-left'
            }`}
          >
            {/* Center Node */}
            <div className="absolute left-8 md:left-1/2 w-3 h-3 rounded-full bg-background border-2 border-primary -translate-x-[5px] md:-translate-x-1.5 mt-6 md:mt-0 z-10 shadow-[0_0_10px_rgba(20,184,166,0.5)]"></div>
            
            <div className="flex-1 w-full pl-16 md:pl-0 pt-4 md:pt-0">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-sans text-xs tracking-widest uppercase font-bold rounded-full mb-3">
                {item.level}
              </div>
              <h4 className="text-xl md:text-2xl font-serif font-semibold text-foreground mb-3">{item.title}</h4>
              <p className="text-muted-foreground font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
            <div className="flex-1 hidden md:block"></div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
