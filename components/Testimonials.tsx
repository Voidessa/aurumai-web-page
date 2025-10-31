
import React from 'react';

const testimonialData = [
  {
    quote: "Этот курс — лучшее вложение в мою карьеру за последние годы. Результаты превзошли все ожидания.",
    name: 'Анна В.',
    role: 'Графический дизайнер',
    avatar: 'https://picsum.photos/seed/person1/100/100'
  },
  {
    quote: "Я думал, что AI — это сложно. Но благодаря курсу, я теперь создаю контент, о котором раньше и мечтать не мог.",
    name: 'Иван П.',
    role: 'Маркетолог',
    avatar: 'https://picsum.photos/seed/person2/100/100'
  },
  {
    quote: "Закрытое коммьюнити — это просто золото. Поддержка и обмен опытом бесценны.",
    name: 'Елена С.',
    role: 'SMM-специалист',
    avatar: 'https://picsum.photos/seed/person3/100/100'
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Отзывы студентов</h2>
          <p className="text-lg text-muted mt-2">Что говорят те, кто уже прошел обучение.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonialData.map((testimonial, index) => (
            <div key={index} className="glass p-8 flex flex-col justify-between relative">
              <p className="text-fg mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 border-2 border-glass-border"/>
                <div>
                  <h4 className="font-bold text-fg">{testimonial.name}</h4>
                  <p className="text-sm text-muted">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;