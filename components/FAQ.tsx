import React, { useState } from 'react';
import type { FAQItem } from '../types';

const faqData: FAQItem[] = [
    {
      question: 'Нужен ли мощный компьютер?',
      answer: 'Большинство AI-сервисов работают в облаке, поэтому для старта подойдет любой современный компьютер или ноутбук. Главное — стабильный интернет.'
    },
    {
      question: 'Сколько времени нужно уделять обучению?',
      answer: 'Мы рекомендуем закладывать 5-7 часов в неделю. Это позволит вам комфортно изучать материалы, выполнять задания и участвовать в разборах.'
    },
    {
      question: 'Будет ли у меня доступ к материалам после курса?',
      answer: 'Да, все видео-лекции и дополнительные материалы останутся у вас в доступе навсегда.'
    },
    {
      question: 'Есть ли возможность возврата средств?',
      answer: 'Да, мы предоставляем полный возврат средств в течение 14 дней после старта курса, если вы поймете, что он вам не подходит.'
    }
];

const FAQAccordionItem: React.FC<{ item: FAQItem, isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-glass-border">
            <button
                className="w-full flex justify-between items-center text-left py-5 px-1"
                onClick={onClick}
            >
                <span className="text-lg font-medium text-fg">{item.question}</span>
                <svg
                    className={`w-6 h-6 text-muted transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <p className="pb-5 pr-4 text-muted">
                        {item.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Частые вопросы</h2>
                <p className="text-lg text-muted mt-2">Нашли ответы на самые популярные вопросы.</p>
            </div>
            <div className="max-w-3xl mx-auto relative glass p-6 md:p-8">
                {faqData.map((item, index) => (
                    <FAQAccordionItem
                        key={index}
                        item={item}
                        isOpen={openIndex === index}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </div>
          </div>
        </section>
    );
};

export default FAQ;