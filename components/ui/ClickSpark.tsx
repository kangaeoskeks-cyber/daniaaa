import { useRef, useEffect, useCallback } from 'react';

const ClickSpark = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  children
}: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<any[]>([]);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout: any;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    resizeCanvas();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const draw = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current.forEach((spark) => {
        const easeProgress = easing === 'ease-out' ? 1 - Math.pow(1 - progress, 3) : progress;
        const currentRadius = sparkRadius + (sparkRadius * 2 * easeProgress * extraScale);
        const currentSize = sparkSize * (1 - easeProgress);
        
        const x = spark.x + Math.cos(spark.angle) * currentRadius;
        const y = spark.y + Math.sin(spark.angle) * currentRadius;

        ctx.beginPath();
        ctx.arc(x, y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = sparkColor;
        ctx.fill();
      });

      if (progress < 1) {
        requestAnimationFrame(draw);
      } else {
        sparksRef.current = [];
        startTimeRef.current = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    },
    [duration, sparkRadius, sparkSize, sparkColor, easing, extraScale]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newSparks = Array.from({ length: sparkCount }).map((_, i) => ({
        x,
        y,
        angle: (Math.PI * 2 * i) / sparkCount,
      }));

      sparksRef.current = newSparks;
      startTimeRef.current = null;
      requestAnimationFrame(draw);
    },
    [sparkCount, draw]
  );

  return (
    <div onClick={handleClick} style={{ position: 'relative', display: 'inline-block', width: '100%', height: '100%' }}>
      {children}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default ClickSpark;
