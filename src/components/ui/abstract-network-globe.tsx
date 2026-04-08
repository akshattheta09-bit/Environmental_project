import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const AbstractNetworkGlobe: React.FC = () => {
  // Generate static nodes for the network orb
  const nodes = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      // Golden ratio spiraling for pseudorandom uniform sphere distribution
      const phi = Math.acos(-1 + (2 * i) / 40);
      const theta = Math.sqrt(40 * Math.PI) * phi;
      
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);
      
      return { id: i, x, y, z };
    });
  }, []);

  const links = useMemo(() => {
    const lines = [];
    for (let i = 0; i < nodes.length; i++) {
      // Connect each node to 2-3 closest nodes
      for (let j = i + 1; j < Math.min(i + 3, nodes.length); j++) {
        lines.push({ source: nodes[i], target: nodes[j], id: `${i}-${j}` });
      }
    }
    return lines;
  }, [nodes]);

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden perspective-1000">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-teal-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />
      
      {/* The rotating container */}
      <motion.div 
        className="relative w-[400px] h-[400px] preserve-3d"
        animate={{ rotateY: 360, rotateX: [10, -10, 10] }}
        transition={{ 
          rotateY: { duration: 25, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 15, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Core sphere gradient */}
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-teal-500/5 to-teal-900/30 border border-teal-500/20 shadow-[0_0_80px_rgba(20,184,166,0.15)] backdrop-blur-sm" />

        {/* Orbit Rings */}
        <div className="absolute inset-[-10%] rounded-full border border-teal-500/10" style={{ transform: 'rotateX(70deg)' }} />
        <div className="absolute inset-[-20%] rounded-full border border-teal-500/5" style={{ transform: 'rotateX(70deg) rotateY(20deg)' }} />

        {/* Links */}
        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
          {links.map((link, i) => {
            const sx = (link.source.x * 200) + 200;
            const sy = (link.source.y * 200) + 200;
            const tx = (link.target.x * 200) + 200;
            const ty = (link.target.y * 200) + 200;
            
            // Only render front-facing links (rough z-depth check)
            const isFront = link.source.z > -0.2 || link.target.z > -0.2;
            if (!isFront) return null;

            return (
              <motion.line
                key={link.id}
                x1={sx}
                y1={sy}
                x2={tx}
                y2={ty}
                stroke="currentColor"
                strokeWidth={1}
                className="text-teal-500/30"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: i * 0.05, ease: "easeInOut" }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const x = (node.x * 200) + 200;
          const y = (node.y * 200) + 200;
          const isFront = node.z > 0;
          
          return (
            <motion.div
              key={node.id}
              className={`absolute w-2 h-2 -ml-1 -mt-1 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]`}
              style={{
                left: x,
                top: y,
                opacity: isFront ? 1 : 0.2,
                scale: isFront ? 1 : 0.5,
              }}
              animate={{ 
                boxShadow: ['0 0 10px rgba(52,211,153,0.5)', '0 0 20px rgba(52,211,153,1)', '0 0 10px rgba(52,211,153,0.5)']
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          );
        })}
      </motion.div>
      
      {/* Floating UI Elements */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-10 left-10 md:left-24 bg-card/80 backdrop-blur-md border border-border p-4 rounded-2xl shadow-xl flex items-center gap-3"
      >
         <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
         <p className="font-mono text-sm text-foreground font-semibold">AI_SYNERGY_ACTIVE</p>
      </motion.div>
    </div>
  );
};
