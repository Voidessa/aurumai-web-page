import React, { Suspense, lazy, useEffect, useRef } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const splineRef = useRef<any>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!splineRef.current) return;

      // Получаем позицию мыши относительно viewport
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      // Преобразуем в координаты для Spline (-1 до 1)
      // Используем большой радиус - следим за мышкой по всей странице
      const x = (mouseX - 0.5) * 2; // от -1 до 1
      const y = (mouseY - 0.5) * 2; // от -1 до 1

      try {
        // Пытаемся найти объект робота и повернуть его к курсору
        const spline = splineRef.current;
        if (spline && spline.findObjectByName) {
          // Попробуем найти объект по имени (обычно это может быть "Character", "Robot", "Humanoid" и т.д.)
          const character = spline.findObjectByName('Character') || 
                           spline.findObjectByName('Robot') || 
                           spline.findObjectByName('humanoid');
          
          if (character) {
            // Поворачиваем к курсору (умножаем на коэффициент для более плавного движения)
            const targetRotation = Math.atan2(x, -y);
            if (character.rotation) {
              character.rotation.y = targetRotation * 0.5; // Умножаем на 0.5 для плавности
            }
          }
        }
      } catch (error) {
        // Игнорируем ошибки если объект не найден
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-bg">
          <span className="loader"></span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={(spline: any) => {
          splineRef.current = spline;
        }}
      />
    </Suspense>
  );
}

