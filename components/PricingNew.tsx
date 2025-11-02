"use client";

import React, { useState, useRef } from "react";
import { buttonVariants } from "./ui/button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { useMediaQuery } from "../hooks/use-media-query";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

// Simple Check icon component (since we don't have lucide-react as icon library)
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

// Simple Star icon component
const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Простая и прозрачная стоимость",
  description = "Выберите план, который подходит вам\nВсе планы включают доступ к платформе, инструментам генерации лидов и персональной поддержке.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = async (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current && typeof window !== 'undefined') {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Dynamic import for confetti
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ["#f6f7f8", "#d1d5db", "#a9adb4"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };


  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {title}
          </h2>
          <p className="text-muted text-lg whitespace-pre-line max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="flex justify-center items-center mb-10 gap-3">
          <span className={cn("text-sm font-semibold", !isMonthly && "text-muted")}>
            Месячная оплата
          </span>
          <Label>
            <Switch
              ref={switchRef as any}
              checked={!isMonthly}
              onCheckedChange={handleToggle}
              className="relative"
            />
          </Label>
          <span className={cn("text-sm font-semibold", isMonthly && "text-muted")}>
            Годовая оплата <span className="text-fg font-bold">(Экономия 20%)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={
                isDesktop
                  ? {
                      y: plan.isPopular ? -20 : 0,
                      opacity: 1,
                      x: index === 2 ? -30 : index === 0 ? 30 : 0,
                      scale: index === 0 || index === 2 ? 0.94 : 1.0,
                    }
                  : { y: 0, opacity: 1 }
              }
              viewport={{ once: true }}
              transition={{
                duration: 1.6,
                type: "spring",
                stiffness: 100,
                damping: 30,
                delay: 0.4,
                opacity: { duration: 0.5 },
              }}
              className={cn(
                `rounded-2xl border-[1px] p-6 bg-black/[0.96] text-center lg:flex lg:flex-col lg:justify-center relative glass`,
                plan.isPopular ? "border-fg border-2" : "border-glass-border",
                "flex flex-col",
                !plan.isPopular && "mt-5",
                index === 0 || index === 2
                  ? "z-0 transform"
                  : "z-10",
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-fg py-1 px-3 rounded-bl-xl rounded-tr-xl flex items-center">
                  <StarIcon className="text-bg h-4 w-4 fill-current" />
                  <span className="text-bg ml-1 font-sans font-semibold text-xs">
                    Популярный
                  </span>
                </div>
              )}
              <div className="flex-1 flex flex-col">
                <p className="text-base font-semibold text-muted uppercase tracking-wide">
                  {plan.name}
                </p>
                <div className="mt-6 flex items-center justify-center gap-x-2">
                  <motion.span 
                    key={isMonthly ? plan.price : plan.yearlyPrice}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-5xl font-bold tracking-tight text-fg"
                  >
                    ${isMonthly ? plan.price : plan.yearlyPrice}
                  </motion.span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-muted">
                    / {plan.period}
                  </span>
                </div>

                <p className="text-xs leading-5 text-muted mt-1">
                  {isMonthly ? "оплата помесячно" : "оплата за год"}
                </p>

                <ul className="mt-6 gap-3 flex flex-col">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckIcon className="h-5 w-5 text-fg mt-0.5 flex-shrink-0" />
                      <span className="text-left text-sm text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                <hr className="w-full my-6 border-glass-border" />

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = "#preorder-form";
                    document.getElementById("preorder-form")?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={cn(
                    buttonVariants(plan.isPopular ? "default" : "outline"),
                    "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter py-3",
                    "transform-gpu transition-all duration-300 ease-out hover:ring-2 hover:ring-fg hover:ring-offset-2",
                    plan.isPopular
                      ? "bg-fg text-bg hover:bg-accent"
                      : "bg-transparent text-fg"
                  )}
                >
                  {plan.buttonText}
                </button>
                <p className="mt-4 text-xs leading-5 text-muted">
                  {plan.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

