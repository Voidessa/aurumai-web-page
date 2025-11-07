import React, { createContext, useContext, useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface MouseContextType {
  mousePosition: MousePosition;
}

const MouseContext = createContext<MouseContextType>({
  mousePosition: { x: 0, y: 0 }
});

export const useMousePosition = () => useContext(MouseContext);

export const MouseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <MouseContext.Provider value={{ mousePosition }}>
      {children}
    </MouseContext.Provider>
  );
};
