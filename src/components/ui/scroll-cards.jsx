"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Card = ({
  title,
  description,
  color,
  textColor,
  i,
  src,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-0">
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-10vh + ${i * 25}px)`
        }}
        className="relative flex flex-col h-[60vh] md:h-[70vh] w-full max-w-[1000px] p-8 md:p-16 
        items-center justify-center mx-auto shadow-2xl overflow-hidden rounded-3xl md:rounded-[2.5rem] origin-top"
      >
        <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl md:rounded-[2.5rem]">
          <motion.div
            style={{ scale: imageScale }}
            className="w-full h-full"
          >
            <img
              className="w-full h-full object-cover mix-blend-overlay"
              src={src}
              alt={title}
              loading="lazy"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent mix-blend-multiply" />
        </div>

        <div className="relative z-10 w-full flex flex-col justify-end h-full text-center md:text-left">
          <span className="font-bold relative text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4">
            <span
              className="relative z-10 font-['Cormorant_Garamond'] font-black tracking-tight drop-shadow-xl"
              style={{ color: textColor }}
            >
              {title}
            </span>
          </span>
          <div
            className="font-['Inter'] text-sm sm:text-base md:text-xl font-medium mb-0 z-10 tracking-wide drop-shadow-md max-w-xl text-white/90"
            style={{ lineHeight: 1.6 }}
          >
            {description}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CardsParallax = ({ items }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="relative pb-[10vh]">
      {items.map((project, i) => {
        const targetScale = 1 - (items.length - i) * 0.05;
        return (
          <Card
            key={`p_${i}`}
            {...project}
            i={i}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
};

export { CardsParallax };
