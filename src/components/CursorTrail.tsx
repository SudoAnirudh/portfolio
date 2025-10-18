import { useEffect, useState } from 'react';

const CursorTrail = () => {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        id: trailId++,
      };
      
      setTrail(prev => [...prev.slice(-10), newTrail]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-50 rounded-full"
          style={{
            left: point.x,
            top: point.y,
            width: '10px',
            height: '10px',
            background: `rgba(0, 212, 255, ${0.6 - index * 0.05})`,
            boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.1s ease-out',
          }}
        />
      ))}
    </>
  );
};

export default CursorTrail;