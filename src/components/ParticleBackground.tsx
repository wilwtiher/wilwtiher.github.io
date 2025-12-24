import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  hue: number;
  opacity: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  active: boolean;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef<Star[]>([]);
  const nebulaeRef = useRef<Nebula[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeElements();
    };

    const initializeElements = () => {
      starsRef.current = [];
      nebulaeRef.current = [];
      shootingStarsRef.current = [];

      // Create stars
      const starCount = 200;
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }

      // Create nebulae (purple/blue cosmic clouds)
      const nebulaCount = 5;
      for (let i = 0; i < nebulaCount; i++) {
        nebulaeRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 300 + 150,
          hue: Math.random() > 0.5 ? 270 : 200, // Purple or cyan
          opacity: Math.random() * 0.15 + 0.05,
        });
      }

      // Initialize shooting stars pool
      for (let i = 0; i < 3; i++) {
        shootingStarsRef.current.push({
          x: 0,
          y: 0,
          length: 100,
          speed: 15,
          opacity: 0,
          active: false,
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      timeRef.current += 0.016;

      // Clear with dark purple background
      ctx.fillStyle = 'hsl(260, 30%, 6%)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebulae
      nebulaeRef.current.forEach((nebula) => {
        const gradient = ctx.createRadialGradient(
          nebula.x,
          nebula.y,
          0,
          nebula.x,
          nebula.y,
          nebula.radius
        );
        gradient.addColorStop(0, `hsla(${nebula.hue}, 70%, 40%, ${nebula.opacity})`);
        gradient.addColorStop(0.5, `hsla(${nebula.hue}, 60%, 30%, ${nebula.opacity * 0.5})`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Draw stars with twinkling effect
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(timeRef.current * star.twinkleSpeed * 60 + star.twinkleOffset);
        const currentOpacity = star.opacity * (0.5 + twinkle * 0.5);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(0, 0%, 100%, ${currentOpacity})`;
        ctx.fill();

        // Add glow to larger stars
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(270, 80%, 70%, ${currentOpacity * 0.3})`;
          ctx.fill();
        }
      });

      // Randomly spawn shooting stars
      if (Math.random() < 0.003) {
        const inactive = shootingStarsRef.current.find(s => !s.active);
        if (inactive) {
          inactive.x = Math.random() * canvas.width;
          inactive.y = Math.random() * canvas.height * 0.5;
          inactive.opacity = 1;
          inactive.active = true;
        }
      }

      // Draw shooting stars
      shootingStarsRef.current.forEach((star) => {
        if (star.active) {
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x - star.length, star.y - star.length * 0.3);
          const gradient = ctx.createLinearGradient(
            star.x, star.y,
            star.x - star.length, star.y - star.length * 0.3
          );
          gradient.addColorStop(0, `hsla(270, 80%, 80%, ${star.opacity})`);
          gradient.addColorStop(1, 'transparent');
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.stroke();

          star.x += star.speed;
          star.y += star.speed * 0.3;
          star.opacity -= 0.02;

          if (star.opacity <= 0 || star.x > canvas.width || star.y > canvas.height) {
            star.active = false;
          }
        }
      });

      // Mouse glow effect (purple)
      const mouseGradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        200
      );
      mouseGradient.addColorStop(0, 'hsla(270, 80%, 60%, 0.15)');
      mouseGradient.addColorStop(0.5, 'hsla(200, 100%, 50%, 0.05)');
      mouseGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = mouseGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleBackground;
