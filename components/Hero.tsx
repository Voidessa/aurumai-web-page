import React from 'react';
import { SplineScene } from './SplineScene';
import { Spotlight } from './Spotlight';
import { SparklesCore } from './ui/sparkles';
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
      <div className="w-full max-w-7xl mx-auto px-4 h-full min-h-[500px] md:min-h-[600px] bg-black/[0.96] rounded-2xl border border-glass-border relative overflow-hidden">
        {/* Vortex Background анимация */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
          <Vortex
            backgroundColor="transparent"
            particleCount={300}
            rangeY={800}
            baseSpeed={0.0}
            rangeSpeed={1.5}
            baseRadius={1}
            rangeRadius={2}
            className="w-full h-full"
            containerClassName="w-full h-full"
          />
        </div>
        
        {/* Spotlight эффект */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        
        {/* Контент с двумя колонками */}
        <div className="flex flex-col md:flex-row h-full min-h-[500px] md:min-h-[600px] relative z-10">
          {/* Левая колонка - текст с Sparkles эффектом */}
          <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
            {/* AURUM AI с Sparkles эффектом */}
            <div className="relative flex flex-col items-start mb-6">
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white relative z-20 mb-4 whitespace-nowrap">
                AURUM AI
              </h1>
              {/* Sparkles эффект под текстом - точная копия оригинального компонента */}
              <div className="w-full md:w-[40rem] h-40 relative -mt-4">
                {/* Gradients - горизонтальное свечение как в оригинале */}
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-fg to-transparent h-[2px] w-3/4 blur-sm z-10" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-fg to-transparent h-px w-3/4 z-10" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-accent to-transparent h-[5px] w-1/4 blur-sm z-10" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-accent to-transparent h-px w-1/4 z-10" />

                {/* Sparkles Core компонент */}
                <SparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={1200}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                />

                {/* Radial Gradient для затемнения частиц как в оригинале */}
                <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)] z-10 pointer-events-none"></div>
              </div>
            </div>
            
            <p className="mt-6 text-lg md:text-xl text-muted max-w-xl">
              Пройдите путь от новичка до профи в генерации изображений и видео с помощью нейросетей. Откройте новый источник дохода и творческой реализации.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <LiquidButton
                asChild
                variant="default"
                size="xl"
                className="text-center"
              >
                <a 
                  href="#preorder-form" 
                  onClick={handleCTAClick} 
                  className="text-fg font-bold text-lg"
                >
                  Записаться на курс
                </a>
              </LiquidButton>
            </div>
          </div>

          {/* Правая колонка - Spline 3D (больше на мобильной версии) */}
          <div className="flex-1 relative min-h-[400px] md:min-h-[500px] scale-110 md:scale-100 origin-center">
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
