import { motion } from "framer-motion"

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { type: "spring", stiffness: 60, damping: 20, mass: 1 } as const
}

const sdgs = [
  {
    goal: "SDG 7",
    title: "Affordable & Clean Energy",
    desc: "Reduces fuel consumption; supports energy-efficient transport systems.",
    color: "bg-yellow-500 text-yellow-950 border-yellow-600"
  },
  {
    goal: "SDG 11",
    title: "Sustainable Cities",
    desc: "Enables smart city infrastructure and eco-friendly urban mobility.",
    color: "bg-orange-500 text-orange-950 border-orange-600"
  },
  {
    goal: "SDG 13",
    title: "Climate Action",
    desc: "Cuts greenhouse gas emissions; reduces urban carbon footprint.",
    color: "bg-green-600 text-green-950 border-green-700"
  },
  {
    goal: "SDG 3",
    title: "Good Health & Well-Being",
    desc: "Improves air quality; significantly reduces respiratory disease risk.",
    color: "bg-green-500 text-green-950 border-green-600"
  },
  {
    goal: "SDG 15",
    title: "Life on Land",
    desc: "Reduces urban noise & heat island effect benefiting urban biodiversity.",
    color: "bg-emerald-500 text-emerald-950 border-emerald-600"
  }
]

export function SdgAlignment() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
      <motion.div {...fadeUp} className="mb-12 text-center">
        <h3 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
          Alignment with <span className="text-primary italic">UN SDGs</span>
        </h3>
        <p className="text-muted-foreground font-light text-lg">
          How intelligent traffic systems map directly to the United Nations Sustainable Development Goals.
        </p>
      </motion.div>

      <div className="flex flex-col gap-4">
        {sdgs.map((item, i) => (
          <motion.div
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            key={i}
            className="flex flex-col md:flex-row items-stretch md:items-center bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`p-6 md:w-64 flex flex-col justify-center ${item.color}`}>
              <h4 className="font-sans font-bold text-2xl mb-1">{item.goal}</h4>
              <p className="font-serif font-medium leading-tight opacity-90">{item.title}</p>
            </div>
            <div className="p-6 md:p-8 flex-1 flex items-center">
              <p className="text-muted-foreground text-lg font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
