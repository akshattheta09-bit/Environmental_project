"use client";
import * as React from "react";

import {
	motion,
	useMotionTemplate,
	useScroll,
	useTransform,
    AnimatePresence,
    useInView
} from "framer-motion";

const desktopImages = [
    "/hero-1.jpg", 
    "/hero-2.jpg", 
    "/hero-3.jpg", 
    "/hero-4.jpg"  
];

interface iISmoothScrollHeroProps {
	scrollHeight?: number;
	desktopImage?: string;
	mobileImage?: string;
	initialClipPercentage?: number;
	finalClipPercentage?: number;
}

interface iISmoothScrollHeroBackgroundProps extends iISmoothScrollHeroProps {
    scrollHeight: number;
}

const SmoothScrollHeroBackground: React.FC<iISmoothScrollHeroBackgroundProps> = ({
	scrollHeight,
}) => {
	const {scrollY} = useScroll();

	const insetVal = useTransform(scrollY, [0, scrollHeight], [8, 0]); // Starts with 8% inset, expands to 0%
	const radiusVal = useTransform(scrollY, [0, scrollHeight], [40, 0]); // Starts with 40px radius, expands to 0px
	const clipPath = useMotionTemplate`inset(${insetVal}% round ${radiusVal}px)`;
	
	const backgroundScale = useTransform(scrollY, [0, scrollHeight], [1.15, 1]);
	const opacity = useTransform(scrollY, [0, scrollHeight], [0.35, 0.75]);

    const [bgIndex, setBgIndex] = React.useState(0);
    const containerRef = React.useRef(null);
    const isInView = useInView(containerRef);

    React.useEffect(() => {
        if (!isInView) return;
        const interval = setInterval(() => {
            setBgIndex(prev => (prev + 1) % desktopImages.length);
        }, 5000); 
        return () => clearInterval(interval);
    }, [isInView]);

	return (
		<motion.div
            ref={containerRef}
			className="sticky top-0 h-screen w-full bg-teal-950 dark:bg-black overflow-hidden"
			style={{
				clipPath,
				willChange: "transform, opacity",
			}}
		>
            <motion.div className="absolute inset-0 w-full h-full" style={{ scale: backgroundScale }}>
                <AnimatePresence>
                    <motion.div
                        key={bgIndex}
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        style={{
                            backgroundImage: `url(${desktopImages[bgIndex]})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    />
                </AnimatePresence>
            </motion.div>
            <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10 pointer-events-none" 
                style={{ opacity }}
            />
		</motion.div>
	);
};

// Billion Dollar Text Reveal Component
const AnimatedTitle = ({ text1, text2 }: { text1: string, text2: string }) => {
    const textVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.04, delayChildren: 0.2 },
        },
    }
    
    const letterVariants = {
        hidden: { y: "150%", opacity: 0, rotate: 10, scale: 0.9 },
        visible: { 
            y: 0, 
            opacity: 1, 
            rotate: 0, 
            scale: 1, 
            transition: { type: "spring" as const, damping: 16, stiffness: 150 } 
        }
    }

    const renderText = (str: string, className: string) => (
        <div className={`flex justify-center flex-wrap overflow-hidden ${className}`}>
            {str.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="inline-flex whitespace-nowrap overflow-hidden mr-[0.25em] pb-2">
                    {word.split("").map((char, charIndex) => (
                        <motion.span key={charIndex} variants={letterVariants} className="inline-block origin-bottom-left">
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </div>
    )

    return (
        <motion.div variants={textVariants} initial="hidden" animate="visible" className="w-full relative z-20 drop-shadow-[0_5px_15px_rgba(0,0,0,0.6)]">
            {renderText(text1, "text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] font-sans font-extrabold tracking-tight leading-[0.9] text-zinc-900 dark:text-white")}
            {renderText(text2, "text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] font-serif font-medium italic tracking-tighter leading-[0.9] text-emerald-700 dark:text-emerald-400 mt-2")}
        </motion.div>
    )
}

export const SmoothScrollHero: React.FC<iISmoothScrollHeroProps> = ({
	scrollHeight = 1000,
	desktopImage = "/hero-1.jpg",
	mobileImage = "/hero-1.jpg",
	initialClipPercentage = 25,
	finalClipPercentage = 75,
}) => {
	return (
		<div
			style={{height: `calc(${scrollHeight}px + 100vh)`}}
			className="relative w-full"
		>
			<SmoothScrollHeroBackground
				scrollHeight={scrollHeight}
				desktopImage={desktopImage}
				mobileImage={mobileImage}
				initialClipPercentage={initialClipPercentage}
				finalClipPercentage={finalClipPercentage}
			/>
            
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center pointer-events-none px-4 md:px-8">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8 relative z-20 mt-[-5vh]"
                >
                    <div className="px-6 py-2 rounded-full border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/10 backdrop-blur-md shadow-2xl">
                        <span className="text-zinc-900 dark:text-white/90 text-xs font-sans tracking-[0.3em] uppercase font-semibold">
                            Global Impact Report
                        </span>
                    </div>
                </motion.div>

                <AnimatedTitle text1="AI IN SMART" text2="TRAFFIC MANAGEMENT" />

                <motion.p 
                  initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                  className="mx-auto max-w-[55ch] text-zinc-700 dark:text-emerald-50/90 text-center text-lg md:text-2xl mt-10 font-sans font-light leading-relaxed hidden sm:block relative z-20"
                >
                  Artificial Intelligence is reshaping how cities move — but the unprecedented environmental consequences demand an urgent redesign to save our planet.
                </motion.p>
            </div>

            <motion.div 
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 text-white/50 pointer-events-none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            >
                <div className="w-[1px] h-24 bg-gradient-to-b from-zinc-500 dark:from-white to-transparent origin-top scale-y-100"></div>
                <span className="text-[9px] uppercase tracking-[0.4em] font-sans font-bold text-zinc-600 dark:text-white/50">Discover</span>
            </motion.div>
		</div>
	);
};
export default SmoothScrollHero;
