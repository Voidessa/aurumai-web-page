import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    { number: '01', title: 'Предзапись', description: 'Оставьте заявку, чтобы забронировать место в следующей группе.' },
    { number: '02', title: 'Подтверждение', description: 'Мы свяжемся с вами для подтверждения и вышлем детали оплаты.' },
    { number: '03', title: 'Доступ', description: 'Получите приглашение в закрытую Telegram-группу и доступ к материалам.' },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Как это работает?</h2>
          <p className="text-lg text-muted mt-4">Всего три простых шага до старта.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className="relative glass p-6 text-center"
              style={{ animation: `float 6s ease-in-out infinite`, animationDelay: `${index * 0.2}s` }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-bg-elev px-4 py-1 rounded-full text-sm font-bold border border-glass-border">{step.number}</div>
              <h3 className="text-xl font-bold mt-6 mb-2">{step.title}</h3>
              <p className="text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;