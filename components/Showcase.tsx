import React, { useState, useEffect } from 'react';

const Showcase: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const showcaseImages = [
    'https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/16245254/pexels-photo-16245254/free-photo-of-chatgpt-a-chatbot-for-your-website.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1910236/pexels-photo-1910236.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2333293/pexels-photo-2333293.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://picsum.photos/seed/ai-1/800/600',
    'https://picsum.photos/seed/ai-2/800/600',
    'https://picsum.photos/seed/ai-3/800/600',
  ];

  // Дублируем для бесконечной прокрутки
  const row1Images = [...showcaseImages, ...showcaseImages];
  const row2Images = [...showcaseImages.reverse(), ...showcaseImages];

  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold">Примеры того, что вы сможете создавать</h2>
        </div>
      </div>

      {/* Первый ряд - прокрутка вправо */}
      <div className="relative mb-8">
        <div className="flex gap-6 animate-scroll-right">
          {row1Images.map((img, idx) => (
            <div
              key={`row1-${idx}`}
              className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden cursor-pointer group perspective-1000"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img}
                alt={`AI showcase ${idx + 1}`}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-y-6"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-semibold">Нажмите для просмотра</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Второй ряд - прокрутка влево */}
      <div className="relative">
        <div className="flex gap-6 animate-scroll-left">
          {row2Images.map((img, idx) => (
            <div
              key={`row2-${idx}`}
              className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden cursor-pointer group perspective-1000"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img}
                alt={`AI showcase ${idx + 1}`}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-y-6"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-semibold">Нажмите для просмотра</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно предпросмотра */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh]">
            <button
              className="absolute -top-12 right-0 text-white text-4xl hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

    </section>
  );
};

export default Showcase;