import React from 'react';

const Hero: React.FC = () => {

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href')?.substring(1);
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="text-center py-20 md:py-32">
      <div className="max-w-4xl mx-auto">
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
