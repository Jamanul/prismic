"use client";
import { useGSAP } from "@gsap/react";
import { RichTextField, asText } from "@prismicio/client";
import clsx from "clsx";
import gsap from "gsap";
import React, { useRef } from "react";

type RevealTextProps = {
  field: RichTextField;
  id: string;
  staggerAmount?: number;
  className?: string;
  as?: React.ElementType;
  duration?: number;
  align?: "center" | "end" | "start";
};

gsap.registerPlugin(useGSAP);

const RevealText = ({
  field,
  id,
  staggerAmount = 0.1,
  className,
  as: Component = "div",
  duration = 0.8,
  align = "start",
}: RevealTextProps) => {
  const words = asText(field).split(" ");
  const componentRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".reveal-text-word", {
        y: 0,
        stagger: staggerAmount,
        duration: duration,
        ease: "power3.out",
      });
    },
    { scope: componentRef },
  );
  return (
    <Component
      className={clsx(
        "reveal-text text-balance",
        className,
        align === "center" && "text-center",
        align === "start" && "text-left",
        align === "end" && "text-right",
      )}
      ref={componentRef}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}-${id}`}
          className={"mb-0 inline-block overflow-hidden pb-4"}
        >
          <span className="reveal-text-word mt-0 inline-block translate-y-[120%] will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};

export default RevealText;
