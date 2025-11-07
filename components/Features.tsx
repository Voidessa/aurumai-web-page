import React from 'react';
import { MessageCircle, Brain, Zap, Palette, Flame, Puzzle } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="glass p-6 rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer hover:border-fg/30">
    <div className="mb-4 text-cyan-400">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-muted leading-relaxed">{description}</p>
  </div>
);

const Features: React.FC = () => {
  const features = [
    {
      icon: <MessageCircle className="text-cyan-400" size={40} />,
      title: 'Первая волна = личное внимание и обратная связь',
      description: 'Пока поток небольшой, кураторы реально видят каждого. Ты получаешь обратную связь, как на персональном менторстве — без "автоматических проверок".'
    },
    {
      icon: <Brain className="text-cyan-400" size={40} />,
      title: 'Обучение от практиков, а не теоретиков',
      description: 'Курс создали ребята, которые уже зарабатывают на генеративных AI-проектах. Ты учишься у тех, кто сам делает контент для брендов, блогеров и агентств.'
    },
    {
      icon: <Zap className="text-cyan-400" size={40} />,
      title: 'Только то, что работает сейчас',
      description: 'Никакой воды. Только актуальные инструменты — Midjourney, Veo 3.1 Pro, ChatGPT Atlas — и только те, что приносят результат. Всё с инструкциями и реальными примерами.'
    },
    {
      icon: <Palette className="text-cyan-400" size={40} />,
      title: 'Соберёшь портфолио уже на курсе',
      description: 'Каждый модуль — это практический проект. К концу программы у тебя будет 3–5 сильных работ, которые можно показать клиентам или использовать в профиле.'
    },
    {
      icon: <Flame className="text-cyan-400" size={40} />,
      title: 'Комьюнити первой волны',
      description: 'Мы строим ядро сообщества AURUM AI — самых первых студентов. После курса именно вы получите приоритетный доступ ко всем будущим обновлениям, материалам и партнёрствам.'
    },
    {
      icon: <Puzzle className="text-cyan-400" size={40} />,
      title: 'Возможность повлиять на курс',
      description: 'Это пилотный поток, и твои идеи реально будут влиять на программу. Мы вместе создаём продукт будущего — и твоё имя войдёт в историю AURUM AI.'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Контент */}
      <div className="relative z-10 px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className="text-cyan-400" size={36} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">Почему стоит попасть в первую волну AURUM AI</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 md:mb-12">
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