import { useEffect, useRef } from 'react';

// Characters embedded in the matrix — includes name and cybersec skills
const CUSTOM_WORDS = ['SNEHA', 'CYBER', 'RECON', 'FLASK', 'PYTHON', 'KALI', 'SEC+', 'LPU', 'RECON'];
const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const LATIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMS = '0123456789';
const ALL_CHARS = KATAKANA + LATIN + NUMS;

export const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const FONT_SIZE = 14;
    let cols: number;
    let drops: number[];
    let wordTimers: (number | null)[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / FONT_SIZE);
      drops = Array(cols).fill(1);
      wordTimers = Array(cols).fill(null);
    };

    resize();
    window.addEventListener('resize', resize);

    // Occasionally inject a word into a random column
    const wordInjectionInterval = setInterval(() => {
      const word = CUSTOM_WORDS[Math.floor(Math.random() * CUSTOM_WORDS.length)];
      const col = Math.floor(Math.random() * cols);
      wordTimers[col] = word.length; // countdown remaining chars in word
    }, 800);

    const draw = () => {
      // Semi-transparent black overlay for trail effect
      ctx.fillStyle = 'rgba(2, 6, 14, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        let char: string;

        if (wordTimers[i] !== null && wordTimers[i]! > 0) {
          // We're mid-word — pick the right char from the word
          const word = CUSTOM_WORDS.find(w => wordTimers[i]! <= w.length) ?? '';
          const remaining = wordTimers[i] as number;
          const charIdx = word.length - remaining;
          char = word[charIdx] ?? ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)];
          wordTimers[i] = remaining - 1;
          if (wordTimers[i] === 0) wordTimers[i] = null;
          // Highlight word chars in bright cyan
          ctx.fillStyle = '#a5f3fc';
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 10;
        } else {
          char = ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)];
          // Lead character (brightest)
          const isLead = drops[i] * FONT_SIZE > canvas.height * 0.7;
          ctx.fillStyle = isLead ? '#e0f2fe' : '#38bdf8';
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 4;
        }

        ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);
        ctx.shadowBlur = 0;

        // Reset drop to top randomly
        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(wordInjectionInterval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.07 }}
    />
  );
};
