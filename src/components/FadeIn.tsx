"use client";
import { gsap } from "gsap";

type FadeInProps = {
  className?: string;
  vars?: gsap.TweenVars;
  children: React.ReactNode;
};

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { useRef } from "react";

export const FadeIn = ({ className, vars = {}, children }: FadeInProps) => {
  gsap.registerPlugin(useGSAP);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(containerRef.current, {
        duration: 5,
        opacity: 0.5,
        ease: "power3.out",
        y: 0,
        ...vars,
      });
    },
    { scope: containerRef },
  );
  return (
    <div ref={containerRef} className={clsx("opacity-0", className)}>
      {children}
    </div>
  );
};
