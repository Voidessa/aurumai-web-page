import React from 'react';
import { Pricing as PricingComponent } from './PricingNew';

const plans = [
  {
    name: "СТАНДАРТ",
    price: "199",
    yearlyPrice: "159",
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
    yearlyPrice: "319",
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
  },
  {
    name: "МЕНТОРСТВО",
    price: "999",
    yearlyPrice: "799",
    period: "месяц",
    features: [
      "Все из тарифа «Профи»",
      "3 личные консультации",
      "Помощь с портфолио",
      "Личные рекомендации",
      "Персональная программа",
      "Круглосуточная поддержка",
      "Индивидуальные разборы",
      "Гарантия результата",
    ],
    description: "Для серьезных проектов и максимального результата",
    buttonText: "Связаться с нами",
    href: "#preorder-form",
    isPopular: false,
  },
];

const Pricing: React.FC = () => {
  return (
    <PricingComponent 
      plans={plans}
      title="Простая и прозрачная стоимость"
      description="Выберите план, который подходит вам\nВсе планы включают доступ к платформе, инструментам генерации лидов и персональной поддержке."
    />
  );
};

export default Pricing;