import React, { useState, useRef } from "react";
import { LiquidButton } from "./ui/liquid-button";
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
  spotsLeft?: number;
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
  const [hasDiscount, setHasDiscount] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const discountButtonRef = useRef<HTMLButtonElement>(null);

  const triggerConfetti = async (ref: React.RefObject<HTMLElement>) => {
    if (ref.current && typeof window !== 'undefined') {
      const rect = ref.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const confetti = (await import('canvas-confetti')).default;
      
      // Большой взрыв конфетти
      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ["#f6f7f8", "#d1d5db", "#a9adb4", "#ffffff", "#e5e7eb"],
        ticks: 300,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 40,
        shapes: ["circle", "square"],
      });

      // Дополнительные взрывы для большего эффекта
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: {
            x: x / window.innerWidth,
            y: y / window.innerHeight,
          },
          colors: ["#f6f7f8", "#d1d5db"],
          ticks: 200,
          gravity: 1.0,
          startVelocity: 30,
        });
      }, 150);
    }
  };

  const handleDiscountClick = async () => {
    if (!hasDiscount) {
      setHasDiscount(true);
      await triggerConfetti(discountButtonRef);
    }
  };

  // Функция расчета цены со скидкой
  const calculatePrice = (basePrice: string) => {
    const price = parseFloat(basePrice);
    if (hasDiscount) {
      return Math.round(price * 0.5);
    }
    return price;
  };

  // Функция получения оригинальной цены
  const getOriginalPrice = (plan: PricingPlan) => {
    return plan.price;
  };


  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-muted text-lg whitespace-pre-line max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-10 gap-4"
        >
          {!hasDiscount && (
            <motion.div
              ref={discountButtonRef}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <LiquidButton
                onClick={handleDiscountClick}
                variant="default"
                size="lg"
                className="text-sm md:text-base"
              >
                🎉 Получить скидку -50%
              </LiquidButton>
            </motion.div>
          )}
          
          {hasDiscount && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-fg/10 border-2 border-fg px-6 py-3 rounded-full"
            >
              <span className="text-fg font-bold text-sm md:text-base">
                ✨ Скидка -50% активирована!
              </span>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={`${plan.name}-${index}`}
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              whileInView={
                isDesktop
                  ? {
                      y: plan.isPopular ? -20 : 0,
                      opacity: 1,
                      x: index === 2 ? -30 : index === 0 ? 30 : 0,
                      scale: index === 0 || index === 2 ? 0.94 : 1.0,
                    }
                  : { y: 0, opacity: 1, scale: 1 }
              }
              whileHover={{
                scale: plan.isPopular ? 1.02 : 1.05,
                y: plan.isPopular ? -25 : -5,
                transition: { duration: 0.3 }
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.1,
              }}
              className={cn(
                `rounded-2xl border-[1px] p-5 bg-black/[0.96] text-center lg:flex lg:flex-col lg:justify-center relative glass cursor-pointer transition-all`,
                plan.isPopular ? "border-fg border-2 shadow-lg shadow-fg/20 scale-105" : "border-glass-border",
                "flex flex-col",
                !plan.isPopular && "mt-5",
                index === 0 || index === 2
                  ? "z-0 transform"
                  : "z-10",
                "hover:shadow-xl hover:shadow-fg/10"
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-fg to-accent py-1.5 px-4 rounded-full flex items-center gap-1.5 shadow-lg">
                  <StarIcon className="text-bg h-3.5 w-3.5 fill-current" />
                  <span className="text-bg font-sans font-bold text-xs uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="flex-1 flex flex-col">
                <p className="text-base font-semibold text-muted uppercase tracking-wide">
                  {plan.name}
                </p>
                <div className="mt-4 flex flex-col items-center justify-center gap-1">
                  {hasDiscount && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-2xl font-bold text-muted line-through"
                    >
                      ${getOriginalPrice(plan)}
                    </motion.span>
                  )}
                  <div className="flex items-center justify-center gap-x-2">
                    <motion.span 
                      key={`${plan.price}-${hasDiscount}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "text-5xl font-bold tracking-tight",
                        hasDiscount ? "text-accent" : "text-fg"
                      )}
                    >
                      ${calculatePrice(getOriginalPrice(plan))}
                    </motion.span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-muted">
                      / {plan.period}
                    </span>
                  </div>
                  {hasDiscount && (
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs font-bold text-accent mt-1"
                    >
                      Экономия 50%
                    </motion.span>
                  )}
                </div>

                <p className="text-xs leading-5 text-muted mt-0.5">
                  оплата помесячно
                </p>

                {plan.spotsLeft && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-3 px-4 py-2 bg-accent/20 border border-accent/40 rounded-lg"
                  >
                    <span className="text-accent font-bold text-sm">
                      ⚠️ Осталось {plan.spotsLeft} мест
                    </span>
                  </motion.div>
                )}

                <ul className="mt-4 gap-2 flex flex-col">
                  {plan.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + idx * 0.1, duration: 0.3 }}
                      className="flex items-start gap-2"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + idx * 0.1, type: "spring" }}
                      >
                        <CheckIcon className="h-5 w-5 text-fg mt-0.5 flex-shrink-0" />
                      </motion.div>
                      <span className="text-left text-sm text-muted">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <hr className="w-full my-4 border-glass-border" />

                <LiquidButton
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const target = document.getElementById("preorder-form");
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  variant="default"
                  size="lg"
                  className="w-full text-base font-semibold"
                >
                  {plan.buttonText}
                </LiquidButton>
                <p className="mt-3 text-xs leading-5 text-muted">
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

