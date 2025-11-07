import React from 'react';
import { LiquidButton } from './ui/liquid-button';

const FinalCTA: React.FC = () => {
  return (
    <section id="preorder-form" className="py-20 md:py-28 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="relative glass p-8 md:p-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Готовы начать?</h2>
            <p className="text-muted text-lg md:text-xl mb-10">
              Заполните форму предзаписи и забронируйте свое место в первой волне AURUM AI.
            </p>
            
            <LiquidButton
              onClick={() => window.open('https://docs.google.com/forms/d/1Xqzt6txzZIku_3FtMCYYydx4xxX-zlAmw4Y9Hh8f6LA/viewform', '_blank')}
              variant="default"
              size="lg"
              className="text-lg md:text-xl px-8 py-4 mx-auto"
            >
              🚀 Записаться на курс
            </LiquidButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
