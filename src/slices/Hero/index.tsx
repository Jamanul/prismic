import React, { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";
import clsx from "clsx";

import { FadeIn } from "@/components/FadeIn";
import RevealText from "@/components/RevealText";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen overflow-hidden bg-neutral-950"
    >
      <FadeIn
        vars={{ scale: 1, opacity: 0.5 }}
        className="bg-image absolute inset-0 top-0 left-0 scale-125 opacity-0"
      >
        <PrismicNextImage
          priority
          fill
          className="object-cover"
          field={slice.primary.image}
          alt=""
        />
      </FadeIn>
      <div className="relative z-1 flex h-screen flex-col justify-center">
        <RevealText
          id="hero-heading"
          field={slice.primary.heading}
          className="display-font max-w-xl text-6xl leading-none text-neutral-50 md:text-7xl lg:text-8xl"
          staggerAmount={0.2}
          duration={1.7}
          as={"h1"}
        />
        <FadeIn
          vars={{ delay: 1, duration: 1.3 }}
          className="mt-6 max-w-md translate-y-4 text-lg text-neutral-100"
        >
          <PrismicRichText field={slice.primary.body} />
        </FadeIn>
        <FadeIn
          vars={{ delay: 1.5, duration: 1.1 }}
          className="mt-8 translate-y-5"
        >
          {slice.primary.button.map((link) => (
            <PrismicNextLink
              key={link.key}
              field={link}
              className={clsx(
                "inline-flex items-center justify-center px-12 py-4 text-center font-extrabold tracking-wider uppercase transition-colors duration-300",
                link.variant === "Secondary"
                  ? "border border-white text-white hover:bg-white/20"
                  : "bg-white text-black hover:bg-white/80",
                "w-fit",
              )}
            />
          ))}
        </FadeIn>
      </div>
    </Bounded>
  );
};

export default Hero;
