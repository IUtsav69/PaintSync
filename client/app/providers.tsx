'use client';

import { useEffect, useState, useRef } from 'react';
import { ThemeProvider } from 'next-themes';
import FlickeringGrid from "@/components/ui/flickering-grid";

// TypingCursorEffect Component to handle typing on cursor movement
function TypingCursorEffect() {
  const [typedLetters, setTypedLetters] = useState('');
  const letters = useRef(['u', 't', 's', 'a', 'v']); // Use ref to avoid dependency issues
  const currentLetterIndex = useRef(0);

  useEffect(() => {
    const handleMouseMove = () => {
      if (currentLetterIndex.current < letters.current.length) {
        setTypedLetters((prev) => prev + letters.current[currentLetterIndex.current]);
        currentLetterIndex.current++;
      } else {
        currentLetterIndex.current = 0; // Reset typing
        setTypedLetters('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []); // ✅ No dependency issues since letters is now a ref

  return (
    <div className="absolute top-0 left-0 p-4 z-50 text-4xl font-bold text-white">
      {typedLetters}
    </div>
  );
}

// Main Providers component
export function Providers({ children }: { children: React.ReactNode }) {
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions(); // Initial setup
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <ThemeProvider attribute="class">
      <div className="relative w-screen h-screen overflow-hidden bg-background">
        <FlickeringGrid
          className="z-0 absolute inset-0 w-full h-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.1}
          height={dimensions.height}
          width={dimensions.width}
        />
        
        {/* Typing Cursor Effect */}
        <TypingCursorEffect />

        <div className="relative z-10">{children}</div>
      </div>
    </ThemeProvider>
  );
}
