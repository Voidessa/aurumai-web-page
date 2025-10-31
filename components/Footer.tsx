
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-glass-border mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg bg-clip-text text-transparent bg-grad-2">AI Vision Pro</span>
          </div>
          <p className="text-muted text-sm text-center">
            &copy; {new Date().getFullYear()} AI Vision Pro. Все права защищены.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-muted hover:text-fg transition-colors">
              <span className="sr-only">Telegram</span>
              {/* Placeholder for Telegram Icon */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.84c.15 0 .28.06.38.16.1.1.16.23.16.38 0 .15-.06.28-.16.38l-7.14 7.14c-.1.1-.23.16-.38.16-.15 0-.28-.06-.38-.16l-3.57-3.57c-.1-.1-.16-.23-.16-.38 0-.15.06-.28.16-.38s.23-.16.38-.16c.15 0 .28.06.38.16l3.19 3.19 6.76-6.76c.1-.1.23-.16.38-.16z" /></svg>
            </a>
            <a href="#" className="text-muted hover:text-fg transition-colors">
              <span className="sr-only">Instagram</span>
              {/* Placeholder for Instagram Icon */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v6h-2zm0 8h2v2h-2z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
