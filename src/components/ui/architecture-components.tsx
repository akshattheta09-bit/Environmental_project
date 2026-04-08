import { motion } from "framer-motion"
import { Camera, Radio, Wind, Headphones, Cpu, Server, TrafficCone } from "lucide-react"

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { type: "spring", stiffness: 60, damping: 20, mass: 1 } as const
}

const components = [
  {
    icon: <Camera className="w-6 h-6" />,
    name: "HD Traffic Cameras",
    func: "Real-time image capture feeding computer vision algorithms (YOLO) for vehicle detection.",
  },
  {
    icon: <Radio className="w-6 h-6" />,
    name: "Inductive / Radar Sensors",
    func: "Measures vehicle count and speed at approach nodes.",
  },
  {
    icon: <Wind className="w-6 h-6" />,
    name: "Air Quality Monitors",
    func: "Real-time PM₂.₅, CO₂, and NOₓ level tracking at targeted intersections.",
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    name: "Noise Level Sensors",
    func: "Decibel tracking to quantify and limit traffic-related acoustic pollution.",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    name: "Edge Computing Units",
    func: "Processes local AI vision models directly at the intersection to guarantee zero latency.",
  },
  {
    icon: <Server className="w-6 h-6" />,
    name: "Central AI Server",
    func: "Cloud-based deep neural networks managing grid-wide systemic optimization.",
  },
  {
    icon: <TrafficCone className="w-6 h-6" />,
    name: "Signal Actuators",
    func: "Mechanical integration adjusting traffic light timings precisely based on the AI output.",
  }
]

export function ArchitectureComponents() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-border/30">
      <motion.div {...fadeUp} className="mb-16">
        <div className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-primary mb-4 flex items-center gap-4">
          Intelligent Infrastructure
          <div className="w-12 h-px bg-primary/30"></div>
        </div>
        <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
          System Architecture <span className="text-muted-foreground font-light">& Components</span>
        </h3>
        <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
          The AI-STMS integrates hardware, neural software, and communication networks into a unified intelligent platform designed to dynamically react to the environment.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {components.map((comp, i) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            key={i}
            className={`p-6 rounded-2xl bg-gradient-to-br from-card to-background border border-border/60 hover:border-primary/40 transition-all duration-300 ${i === 6 ? 'lg:col-span-2' : ''}`}
          >
            <div className="text-primary mb-4">
              {comp.icon}
            </div>
            <h4 className="text-base font-bold font-sans text-foreground mb-2">{comp.name}</h4>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">{comp.func}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
