import React from 'react';
import type { PricingPlan } from '../types';

const plans: PricingPlan[] = [
  {
    name: 'Стандарт',
    price: '$199',
    description: 'Для самостоятельного изучения',
    features: [
      '12 модулей в записи',
      'Доступ к базе промптов',
      'Общий чат студентов',
    ],
  },
  {
    name: 'Профи',
    price: '$399',
    description: 'С поддержкой и разборами',
    features: [
      'Все из тарифа "Стандарт"',
      '4 живых Q&A сессии',
      'Проверка домашних заданий',
      'Сертификат о прохождении',
    ],
    isPopular: true,
  },
  {
    name: 'Менторство',
    price: '$999',
    description: 'Индивидуальная работа',
    features: [
      'Все из тарифа "Профи"',
      '3 личные консультации',
      'Помощь с портфолио',
      'Личные рекомендации',
    ],
  },
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Стоимость и слоты</h2>
          <p className="text-lg text-muted mt-2">Выберите свой формат участия. Количество мест ограничено.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative glass p-8 transition-all duration-300 ${
                plan.isPopular ? 'mt-0 lg:-mt-6 border-2 border-accent/50' : ''
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-grad-2 text-fg text-xs font-bold px-4 py-1 rounded-full uppercase">
                  Популярный
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-center mb-2">{plan.name}</h3>
              <p className="text-muted text-center mb-6">{plan.description}</p>
              <div className="text-center mb-6">
                <span className="text-4xl md:text-5xl font-extrabold">{plan.price}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full font-bold py-3 px-8 rounded-lg transition-all duration-300 ${
                  plan.isPopular
                    ? 'bg-fg text-bg hover:bg-accent'
                    : 'bg-fg/10 text-fg border border-glass-border hover:bg-fg/20'
                }`}
              >
                Выбрать тариф
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;