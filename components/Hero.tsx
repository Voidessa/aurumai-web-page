import React from 'react';
import { SplineScene } from './SplineScene';

const Hero: React.FC = () => {

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href')?.substring(1);
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // URL вашей Spline сцены (если нет - будет использован градиентный фон)
  // Чтобы добавить свою сцену: создайте на spline.design → Export → скопируйте URL сюда
  const splineSceneUrl = ""; // Замените на ваш URL когда будет готова сцена

  return (
    <section id="hero" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20 md:py-32">
      {/* Градиентный фон (fallback если Spline не настроен) */}
      {!splineSceneUrl && (
        <div className="absolute inset-0 w-full h-full -z-10 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-fg/20 via-transparent to-fg/10"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent/10 to-transparent"></div>
        </div>
      )}
      
      {/* Spline 3D Scene - фон (показывается только если URL указан) */}
      {splineSceneUrl && (
        <div className="absolute inset-0 w-full h-full opacity-50 md:opacity-60 -z-10">
          <SplineScene 
            scene={splineSceneUrl}
            className="w-full h-full"
          />
        </div>
      )}

      {/* Контент поверх Spline */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
          <span className="bg-clip-text text-transparent bg-grad-1">
            Создавайте AI-контент,
          </span>
          <br />
          который поражает воображение
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-muted">
          Пройдите путь от новичка до профи в генерации изображений и видео с помощью нейросетей. Откройте новый источник дохода и творческой реализации.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <a href="#preorder-form" onClick={handleCTAClick} className="bg-fg text-bg font-bold py-3 px-8 rounded-lg hover:bg-accent transition-all text-lg">
            Записаться на курс
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
