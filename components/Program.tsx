import React from 'react';
import type { ProgramModule } from '../types';

const modules: ProgramModule[] = [
  { title: 'Модуль 1: Основы AI-генерации', description: 'Погружение в ключевые концепции и инструменты.' },
  { title: 'Модуль 2: Промпт-инжиниринг', description: 'Научитесь писать промпты, которые дают предсказуемый результат.' },
  { title: 'Модуль 3: Фотореализм', description: 'Секреты создания изображений, неотличимых от фото.' },
  { title: 'Модуль 4: Стилизация и арт', description: 'Управление стилями, светом и композицией.' },
  { title: 'Модуль 5: AI-видео', description: 'Основы анимации и создания коротких видеороликов.' },
  { title: 'Модуль 6: Финальный проект', description: 'Создание и защита собственного портфолио.' },
];

const Program: React.FC = () => {
  return (
    <section id="program" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Программа интенсива</h2>
          <p className="text-lg text-muted mt-4">12 модулей, которые сделают вас профессионалом.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, index) => (
            <div key={index} className="glass p-6 relative transition-transform duration-300 hover:-translate-y-2">
              <h3 className="text-xl font-bold mb-2">{mod.title}</h3>
              <p className="text-muted">{mod.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Program;