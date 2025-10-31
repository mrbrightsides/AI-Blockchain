
import React from 'react';

export const StarsBackground: React.FC = () => {
  const stars = Array.from({ length: 100 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 2000}px`, // Spread stars across a larger vertical area
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 10 + 10}s`, // Slower, more majestic movement
    };
    return <div key={i} className="absolute bg-white rounded-full animate-move-stars" style={style}></div>;
  });

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {stars}
    </div>
  );
};

// Add the following to your tailwind.config.js to enable the animation
// Or define @keyframes in a <style> tag in index.html, which is already done.
//
// theme: {
//   extend: {
//     animation: {
//       'move-stars': 'move-stars linear infinite',
//     },
//     keyframes: {
//       'move-stars': {
//         '0%': { transform: 'translateY(0)' },
//         '100%': { transform: 'translateY(-2000px)' },
//       },
//     },
//   },
// },
