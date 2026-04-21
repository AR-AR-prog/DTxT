"use client";
import { forwardRef, useRef, useEffect } from "react";

interface VariableProximityProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  radius?: number;
}

export const VariableProximity = forwardRef<HTMLDivElement, VariableProximityProps>(
  ({ text, radius = 100, className, ...props }, ref) => {
    const letters = text.split("");
    const internalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!internalRef.current) return;
        const spans = internalRef.current.querySelectorAll("span");
        spans.forEach((span) => {
          const rect = span.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distance = Math.sqrt(
            Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
          );

          if (distance < radius) {
            const ratio = 1 - distance / radius;
            // Interpolate weight for variable fonts like Playfair
            const weight = 400 + ratio * 500;
            span.style.fontVariationSettings = `"wght" ${weight}`;
            span.style.transform = `scale(${1 + ratio * 0.1})`;
            span.style.color = `rgba(26, 26, 26, ${1})`; // Ink charcoal
          } else {
            span.style.fontVariationSettings = `"wght" 400`;
            span.style.transform = `scale(1)`;
            span.style.color = `rgba(26, 26, 26, 0.8)`;
          }
        });
      };
      
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [radius]);

    return (
      <div 
        ref={(node) => {
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
          internalRef.current = node;
        }} 
        className={className} 
        style={{ display: "inline-block" }}
        {...props}
      >
        {letters.map((letter: string, i: number) => (
          <span
            key={i}
            style={{ 
              transition: "font-variation-settings 0.1s ease-out, transform 0.1s ease-out, color 0.1s ease-out",
              display: "inline-block",
              fontVariationSettings: `"wght" 400`
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    );
  }
);
VariableProximity.displayName = "VariableProximity";
