import React from 'react';
import { SplineScene } from './SplineScene';
import { Vortex } from './ui/vortex';
import { LiquidButton } from './ui/liquid-button';

const Hero: React.FC = () => {

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href')?.substring(1);
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // URL вашей Spline сцены (можно заменить на свою сцену из spline.design)
  const splineSceneUrl = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

  return (
    <section id="hero" className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden py-20 md:py-32">
      {/* Контейнер с Card стилем */}
      <div className="w-full max-w-7xl mx-auto px-4 h-full min-h-[500px] md:min-h-[600px] bg-transparent rounded-2xl border border-glass-border relative overflow-hidden">
        {/* Vortex Background анимация */}
        <div className="absolute inset-0 z-[1] overflow-hidden rounded-2xl pointer-events-none">
          <Vortex
            backgroundColor="transparent"
            particleCount={200}
            rangeY={800}
            baseSpeed={0.0}
            rangeSpeed={1.5}
            baseRadius={1}
            rangeRadius={2}
            className="w-full h-full pointer-events-none"
            containerClassName="w-full h-full pointer-events-none"
          />
        </div>
        
        {/* Контент с двумя колонками */}
        <div className="flex flex-col md:flex-row h-full min-h-[500px] md:min-h-[600px] relative z-10">
          {/* Левая колонка - текст с Sparkles эффектом */}
          <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
            {/* AURUM AI */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-4 md:mb-6 whitespace-nowrap">
              AURUM AI
            </h1>
            
            <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-muted max-w-xl leading-relaxed">
              Научись создавать фотореалистичные AI-изображения и продавай их клиентам из Дубая, Европы и СНГ онлайн
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <div className="relative inline-block w-fit">
                {/* Liquid glass оболочка по размеру кнопки */}
                <div className="absolute inset-0 -m-3 rounded-xl pointer-events-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px) saturate(120%)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.05)'
                  }}
                />
                <LiquidButton
                  asChild
                  variant="default"
                  size="xl"
                  className="text-center relative z-10 whitespace-nowrap"
                >
                  <a 
                    href="#preorder-form" 
                    onClick={handleCTAClick} 
                    className="text-fg font-bold text-base md:text-lg whitespace-nowrap"
                  >
                    Записаться на курс
                  </a>
                </LiquidButton>
              </div>
            </div>
          </div>

          {/* Правая колонка - Spline 3D (максимально большой на мобильных) */}
          <div className="flex-1 relative min-h-[400px] md:min-h-[500px] scale-[1.8] sm:scale-[1.4] md:scale-100 origin-center z-50">
            {splineSceneUrl ? (
              <SplineScene 
                scene={splineSceneUrl}
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-fg/10 via-transparent to-accent/10">
                <span className="loader"></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
