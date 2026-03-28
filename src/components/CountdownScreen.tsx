import { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

interface Props {
  category: string;
  initialTime: number;
}

export default function CountdownScreen({ category, initialTime }: Props) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="max-w-5xl w-full flex flex-col items-center justify-center animate-fade-in text-center">
      <Timer className="w-20 h-20 text-indigo-500 mb-8 animate-pulse" />
      
      <h2 className="text-4xl md:text-5xl font-bold text-zinc-300 mb-4 tracking-tight">
        Trivia for <span className="text-indigo-400 font-black">{category}</span> is about to start!
      </h2>
      <p className="text-xl text-zinc-500 mb-12 uppercase tracking-widest font-semibold">
        Grab your phones and look at the screen
      </p>
      
      {/* MASSIVE NUMBER */}
      <div className="text-[12rem] leading-none font-black text-white tabular-nums tracking-tighter drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">
        {timeLeft}
      </div>
    </div>
  );
}