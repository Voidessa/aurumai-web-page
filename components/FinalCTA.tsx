import React, { useState } from 'react';
// To make this form fully functional in a real project, you would install axios:
// npm install axios
// import axios from 'axios';

const FinalCTA: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    telegram: '',
    experience: '',
    goal: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setForm(prevForm => ({ ...prevForm, [name]: checked }));
    } else {
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.consent) {
        setError("Необходимо согласиться с обработкой персональных данных.");
        return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      // 1. Get UTM data from localStorage
      const utmString = localStorage.getItem('utm');
      const utm = utmString ? JSON.parse(utmString) : {};

      const payload = { ...form, utm };

      // 2. Simulate API call
      console.log('Submitting to /api/lead:', payload);
      
      // --- UNCOMMENT THIS BLOCK WHEN YOU HAVE THE BACKEND API ---
      // await axios.post('/api/lead', payload);
      // --------------------------------------------------------

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSent(true);
    } catch (err) {
      console.error("Submission error:", err);
      setError('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSent) {
    return (
      <section id="preorder-form" className="py-20 md:py-28 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="relative glass p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">✅ Заявка отправлена!</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Спасибо за ваш интерес! Мы свяжемся с вами в ближайшее время и вышлем приглашение в Telegram.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="preorder-form" className="py-20 md:py-28 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="relative glass p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Забронируйте свое место</h2>
            <p className="text-muted max-w-2xl mx-auto mt-2">
              Заполните форму, чтобы попасть в список предзаписи и получить лучшие условия.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="sr-only">Имя</label>
                <input id="name" name="name" type="text" placeholder="Имя" required value={form.name} onChange={handleInputChange} className="w-full bg-bg-elev border border-glass-border rounded-lg px-4 py-3 text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input id="email" name="email" type="email" placeholder="Email" required value={form.email} onChange={handleInputChange} className="w-full bg-bg-elev border border-glass-border rounded-lg px-4 py-3 text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
            </div>
             <div>
                <label htmlFor="telegram" className="sr-only">@Telegram (необязательно)</label>
                <input id="telegram" name="telegram" type="text" placeholder="@Telegram (необязательно)" value={form.telegram} onChange={handleInputChange} className="w-full bg-bg-elev border border-glass-border rounded-lg px-4 py-3 text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
            <div>
              <label htmlFor="experience" className="sr-only">Ваш опыт</label>
              <select id="experience" name="experience" required value={form.experience} onChange={handleInputChange} className="w-full bg-bg-elev border border-glass-border rounded-lg px-4 py-3 text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent appearance-none">
                <option value="" disabled>Ваш опыт в AI...</option>
                <option value="новичок">Новичок</option>
                <option value="средний">Средний</option>
                <option value="про">Профессионал</option>
              </select>
            </div>
            <div>
              <label htmlFor="goal" className="sr-only">Ваша цель обучения</label>
              <textarea id="goal" name="goal" placeholder="Ваша главная цель на курсе?" rows={3} value={form.goal} onChange={handleInputChange} className="w-full bg-bg-elev border border-glass-border rounded-lg px-4 py-3 text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
            </div>

            <div className="flex items-start space-x-3">
              <input type="checkbox" id="consent" name="consent" checked={form.consent} onChange={handleInputChange} className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <label htmlFor="consent" className="text-sm text-muted">
                Я согласен с <a href="/privacy" target="_blank" className="underline hover:text-fg">политикой конфиденциальности</a> и <a href="/terms" target="_blank" className="underline hover:text-fg">условиями использования</a>.
              </label>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-fg text-bg font-bold py-3 px-8 rounded-lg hover:bg-accent transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Отправка...' : 'Предзаписаться'}
            </button>

            {error && <p className="text-red-400 text-center text-sm mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
