import React from 'react';
import { SplineScene } from './SplineScene';
import { Spotlight } from './Spotlight';

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
        {/* Spotlight эффект */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        
        {/* Контент с двумя колонками */}
        <div className="flex flex-col md:flex-row h-full min-h-[500px] md:min-h-[600px]">
          {/* Левая колонка - текст */}
          <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-fg to-muted leading-tight">
              <span className="bg-clip-text text-transparent bg-grad-1">
                Создавайте AI-контент,
              </span>
              <br />
              который поражает воображение
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted max-w-xl">
              Пройдите путь от новичка до профи в генерации изображений и видео с помощью нейросетей. Откройте новый источник дохода и творческой реализации.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a 
                href="#preorder-form" 
                onClick={handleCTAClick} 
                className="bg-fg text-bg font-bold py-3 px-8 rounded-lg hover:bg-accent transition-all text-lg text-center"
              >
                Записаться на курс
              </a>
            </div>
          </div>

          {/* Правая колонка - Spline 3D */}
          <div className="flex-1 relative min-h-[300px] md:min-h-[500px]">
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
