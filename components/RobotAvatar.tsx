import React, { useEffect, useRef, useState } from 'react';
import { SplineScene } from './SplineScene';

interface RobotAvatarProps {
  mousePosition: { x: number; y: number };
}

const RobotAvatar: React.FC<RobotAvatarProps> = ({ mousePosition }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Вычисляем угол поворота головы робота к мыши
      const deltaX = mousePosition.x - centerX;
      const deltaY = mousePosition.y - centerY;

      // Ограничиваем углы поворота
      const rotateY = Math.max(-30, Math.min(30, (deltaX / window.innerWidth) * 60));
      const rotateX = Math.max(-20, Math.min(20, (deltaY / window.innerHeight) * 40));

      setRotation({ x: rotateX, y: rotateY });
    }
  }, [mousePosition]);

  return (
    <div 
      ref={containerRef}
      className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20 bg-black/50 backdrop-blur-sm relative group hover:scale-110 transition-transform duration-300"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.15s ease-out'
      }}
    >
      <SplineScene 
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="w-full h-full scale-150"
      />
      
      {/* Tooltip при hover */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        AURUM AI Assistant
      </div>
    </div>
  );
};

export default RobotAvatar;
