import { keyframes } from '@emotion/react';

export const bounceScale = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

export const popAndSpin = keyframes`
  0% { transform: scale(1) rotate(0deg); }
  40% { transform: scale(1.3) rotate(-12deg); }
  80% { transform: scale(1.1) rotate(12deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

export const floatingHearts = keyframes`
  0% { 
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% { 
    transform: translateY(-100px) scale(0);
    opacity: 0;
  }
`;

export const shockwave = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
`;