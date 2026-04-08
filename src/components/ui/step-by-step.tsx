import { motion } from "framer-motion"
import { Play, Navigation, Trees, Brain, Siren, CarFront, Users } from "lucide-react"

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { type: "spring", stiffness: 60, damping: 20, mass: 1 } as const
}

const steps = [
  { icon: <Play className="w-5 h-5 text-primary" />, title: "Data Capture", desc: "Cameras and sensors across the city continuously capture real-time traffic images and density data." },
  { icon: <Brain className="w-5 h-5 text-indigo-700 dark:text-indigo-500" />, title: "Edge Processing", desc: "Computer vision algorithms (YOLO-based CNNs) process video feeds at edge computing units to count vehicles and classify types." },
  { icon: <Trees className="w-5 h-5 text-green-700 dark:text-green-500" />, title: "Environmental Context", desc: "Air quality and noise sensors feed real-time pollution data into the central AI system." },
  { icon: <Navigation className="w-5 h-5 text-blue-700 dark:text-blue-500" />, title: "Predictive Modeling", desc: "Graph Neural Networks analyse road network data to forecast congestion events 30–60 minutes in advance." },
  { icon: <Play className="w-5 h-5 text-primary" />, title: "MARL Optimization", desc: "Multi-Agent Reinforcement Learning agents at each intersection calculate optimal green phase durations." },
  { icon: <Siren className="w-5 h-5 text-red-700 dark:text-red-500" />, title: "Emergency Priority", desc: "Emergency vehicle transponders trigger automatic signal preemption — clearing green corridors without human intervention." },
  { icon: <CarFront className="w-5 h-5 text-teal-700 dark:text-teal-500" />, title: "Smart Routing", desc: "Smart parking data is integrated to route vehicles to vacant spots, eliminating circling traffic emissions." },
  { icon: <Users className="w-5 h-5 text-orange-700 dark:text-orange-500" />, title: "Human Oversight", desc: "Human operators retain final authority through the 'human-in-the-loop' mandate — AI recommends, humans confirm high-impact decisions." }
]

export function StepByStep() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto border-t border-border/30">
      <motion.div {...fadeUp} className="mb-12">
        <h3 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
          How the System Works
        </h3>
        <p className="text-muted-foreground font-light text-lg">
          The step-by-step flow of AI-STMS from physical capture to systemic action.
        </p>
      </motion.div>

      <div className="relative border-l border-primary/20 pl-6 ml-3 md:ml-0 md:pl-10">
        {steps.map((step, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            key={i}
            className="mb-10 last:mb-0 relative"
          >
            <div className="absolute -left-[37px] md:-left-[53px] top-1 bg-card rounded-full p-1 border border-border shadow-sm shadow-primary/10 flex items-center justify-center">
                <div className="w-5 h-5 flex items-center justify-center">
                    {step.icon}
                </div>
            </div>
            
            <h4 className="text-lg md:text-xl font-bold font-sans text-foreground mb-2 flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded-sm">
                0{i + 1}
              </span> 
              {step.title}
            </h4>
            <p className="text-muted-foreground font-light leading-relaxed max-w-2xl">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
