import React from 'react';

// 站点标志：琥珀色方块里三层越往下越宽的横条，表示一层层搭起来的“stack”。
// public/favicon.svg 是同一个图形，改这里的时候记得一起改。
export const Logo: React.FC<{ size?: number; className?: string }> = ({ size = 32, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    role="img"
    aria-label="BuilderStack"
    className={className}
  >
    <rect x="1" y="1" width="30" height="30" rx="8" fill="#f59e0b" />
    <rect x="8" y="8" width="9" height="4" rx="2" fill="#09090b" />
    <rect x="8" y="14" width="13" height="4" rx="2" fill="#09090b" />
    <rect x="8" y="20" width="17" height="4" rx="2" fill="#09090b" />
  </svg>
);
