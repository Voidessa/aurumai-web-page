import React, { useState, useEffect } from 'react';
import { LiquidButton } from './ui/liquid-button';
import { Send, Instagram } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          return { ...prev, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { hours, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { hours: hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    closeMenu();
    const targetId = e.currentTarget.getAttribute('href')?.substring(1);
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const navLinks = (
    <>
      <a href="#program" onClick={closeMenu} className="text-muted hover:text-fg transition-colors block py-2 text-lg md:text-base md:p-0">Программа</a>
      <a href="#pricing" onClick={closeMenu} className="text-muted hover:text-fg transition-colors block py-2 text-lg md:text-base md:p-0">Стоимость</a>
      <a href="#faq" onClick={closeMenu} className="text-muted hover:text-fg transition-colors block py-2 text-lg md:text-base md:p-0">FAQ</a>
    </>
  );

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
        <div className="relative glass px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl bg-clip-text text-transparent bg-grad-2">AI Vision Pro</span>
            </div>
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks}
            </nav>
            <div className="flex items-center gap-3 md:gap-4">
              {/* Timer - влитый счетчик без оболочки */}
              <div className="flex items-center gap-1.5 md:gap-2">
                <span className="text-[10px] md:text-xs text-muted/70 uppercase tracking-wider hidden sm:inline">через</span>
                <span className="text-fg font-bold text-base md:text-xl tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
              {/* Desktop CTA - Liquid Glass кнопка */}
              <LiquidButton
                asChild
                variant="default"
                size="lg"
                className="hidden md:flex"
              >
                <a href="#preorder-form" onClick={handleCTAClick} className="text-fg font-semibold">
                  Предзапись
                </a>
              </LiquidButton>
              
              {/* Social Media Icons */}
              <div className="hidden md:flex items-center gap-2">
                {/* Telegram */}
                <a
                  href="https://t.me/+4JZL_d-1otBjZTZi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group"
                  aria-label="Telegram"
                >
                  <Send className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                </a>
                
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/aurummediauz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-500/10 border border-pink-500/30 hover:bg-pink-500/20 hover:border-pink-500/50 transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-pink-400 group-hover:text-pink-300 transition-colors" />
                </a>
              </div>
            </div>
            {/* Mobile Nav Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" className="p-2 -mr-2">
                {isOpen ? (
                    <svg className="w-6 h-6 text-fg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                ) : (
                    <svg className="w-6 h-6 text-fg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMenu}
      >
        <div 
          className="absolute inset-0 bg-black/30" 
        ></div>
        <div 
            className={`absolute top-0 right-0 h-full w-4/5 max-w-xs glass transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            onClick={(e) => e.stopPropagation()}
        >
          <nav className="pt-28 p-8 flex flex-col items-center text-center space-y-6">
            {navLinks}
            <div className="w-full flex flex-col items-center gap-3">
              {/* Timer в мобильном меню */}
              <div className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-fg/10 border border-fg/30 rounded-lg">
                <span className="text-xs text-muted uppercase tracking-wider">Повышение цен через:</span>
                <span className="text-fg font-bold text-base tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
              <LiquidButton
                asChild
                variant="default"
                size="xl"
                className="w-full"
              >
                <a href="#preorder-form" onClick={handleCTAClick} className="text-fg font-semibold">
                  Предзапись
                </a>
              </LiquidButton>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
