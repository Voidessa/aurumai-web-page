import React from 'react';

const Showcase: React.FC = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Работы наших студентов</h2>
          <p className="text-lg text-muted mt-4">Примеры того, что вы сможете создавать.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-bg-elev rounded-2xl overflow-hidden group">
              <img 
                src={`https://picsum.photos/seed/ai-showcase-${i}/600/600`} 
                alt={`AI generated showcase ${i}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;