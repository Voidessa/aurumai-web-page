import React from 'react';
import { Pricing as PricingComponent } from './PricingNew';

const plans = [
  {
    name: "СТАНДАРТ",
    price: "199",
    yearlyPrice: "199",
    period: "месяц",
    features: [
      "12 модулей в записи",
      "Доступ к базе промптов",
      "Общий чат студентов",
      "Базовые шаблоны",
      "Поддержка через сообщества",
    ],
    description: "Идеально для самостоятельного изучения",
    buttonText: "Начать обучение",
    href: "#preorder-form",
    isPopular: false,
  },
  {
    name: "ПРОФИ",
    price: "399",
    yearlyPrice: "399",
    period: "месяц",
    features: [
      "Все из тарифа «Стандарт»",
      "4 живых Q&A сессии",
      "Проверка домашних заданий",
      "Сертификат о прохождении",
      "Приоритетная поддержка",
      "Расширенная база промптов",
      "Дополнительные материалы",
    ],
    description: "Для тех, кто хочет быстрее достичь результатов",
    buttonText: "Выбрать тариф",
    href: "#preorder-form",
    isPopular: true,
    spotsLeft: 5,
  },
];

const Pricing: React.FC = () => {
  return (
    <PricingComponent 
      plans={plans}
      title="Простая и прозрачная стоимость"
      description="Выберите план, который подходит вам. Все планы включают доступ к платформе, инструментам генерации лидов и персональной поддержке."
    />
  );
};

export default Pricing;