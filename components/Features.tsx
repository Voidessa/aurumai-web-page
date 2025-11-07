import React from 'react';

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ emoji, title, description }) => (
  <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-6 text-center transform hover:-translate-y-2 transition-transform duration-300">
    <div className="inline-block text-5xl mb-4">
      {emoji}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const Features: React.FC = () => {
  const features = [
    {
      emoji: '👀',
      title: 'Первая волна = личное внимание и обратная связь',
      description: 'Пока поток небольшой, кураторы реально видят каждого. Ты получаешь обратную связь, как на персональном менторстве — без "автоматических проверок".'
    },
    {
      emoji: '🧠',
      title: 'Обучение от практиков, а не теоретиков',
      description: 'Курс создали ребята, которые уже зарабатывают на генеративных AI-проектах. Ты учишься у тех, кто сам делает контент для брендов, блогеров и агентств.'
    },
    {
      emoji: '⚡',
      title: 'Только то, что работает сейчас',
      description: 'Никакой воды. Только актуальные инструменты — Midjourney, Veo 3.1 Pro, ChatGPT Atlas — и только те, что приносят результат. Всё с инструкциями и реальными примерами.'
    },
    {
      emoji: '🎨',
      title: 'Соберёшь портфолио уже на курсе',
      description: 'Каждый модуль — это практический проект. К концу программы у тебя будет 3–5 сильных работ, которые можно показать клиентам или использовать в профиле.'
    },
    {
      emoji: '🔥',
      title: 'Комьюнити первой волны',
      description: 'Мы строим ядро сообщества AURUM AI — самых первых студентов. После курса именно вы получите приоритетный доступ ко всем будущим обновлениям, материалам и партнёрствам.'
    },
    {
      emoji: '🧩',
      title: 'Возможность повлиять на курс',
      description: 'Это пилотный поток, и твои идеи реально будут влиять на программу. Мы вместе создаём продукт будущего — и твоё имя войдёт в историю AURUM AI.'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Видео фон */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-10"
        >
          <source src="/videos/features-bg.mov" type="video/quicktime" />
        </video>
        {/* Градиентный оверлей для лучшей читаемости */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
      </div>

      {/* Контент поверх видео */}
      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">🔥 Почему стоит попасть в первую волну AURUM AI</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
      
      {/* Финальный абзац */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 backdrop-blur-lg border border-white/10 rounded-xl p-8">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Этот запуск — не просто курс, а старт чего-то большего.
            Здесь рождаются первые AI-креаторы, которые будут формировать рынок визуального контента в 2025-2026 году.
            <span className="block mt-4 text-white font-semibold">
              Если хочешь быть среди них — место в первой волне ждёт тебя.
            </span>
          </p>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Features;