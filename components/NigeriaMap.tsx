"use client";

import React from 'react';
// @ts-ignore
import nigeriaMapData from '@svg-maps/nigeria';

interface StateLocation {
  id: string;
  name: string;
  path: string;
}

export default function NigeriaMap() {
  // Active project pipeline states
  const activeStates = [
    'gombe', 'nasarawa', 'edo', 'ondo', 'cross-river', 'akwa-ibom', 'benue', 'rivers', 'abia',
    'kaduna', 'kano', 'oyo', 'bauchi', 'katsina', 'jigawa', 'sokoto', 'zamfara', 'kebbi',
    'kogi', 'kwara', 'taraba', 'adamawa', 'borno', 'yobe', 'plateau', 'niger', 'ekiti',
    'osun', 'ogun', 'lagos', 'fct'
  ];

  // Coordinates matching the 744x600 viewBox of @svg-maps/nigeria
  const hotspots = [
    { name: 'Lagos', x: 85, y: 490 },
    { name: 'Abuja', x: 320, y: 290 },
    { name: 'Rivers', x: 290, y: 520 },
    { name: 'Kano', x: 370, y: 110 },
    { name: 'Gombe', x: 530, y: 200 },
    { name: 'Ondo', x: 190, y: 430 },
    { name: 'Cross River', x: 420, y: 480 },
    { name: 'Edo', x: 230, y: 450 },
    { name: 'Kaduna', x: 310, y: 200 }
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-[744/600] overflow-visible">
      <svg 
        viewBox={nigeriaMapData.viewBox} 
        className="w-full h-full select-none fill-none overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Render all states */}
        {(nigeriaMapData.locations as StateLocation[]).map((loc) => {
          const isActive = activeStates.includes(loc.id);
          return (
            <path 
              key={loc.id}
              d={loc.path}
              id={loc.id}
              name={loc.name}
              className="transition-colors duration-300 stroke-[#ffffff] stroke-[1px]"
              style={{
                fill: isActive ? '#BAE6FD' : '#F0F9FF', // Soft sky blue for active, lighter for others
                stroke: '#ffffff',
                strokeWidth: '1.2px'
              }}
            />
          );
        })}

        {/* Hotspot indicators (Pulse dots) */}
        {hotspots.map((spot, i) => (
          <g key={i} className="cursor-pointer">
            {/* Glowing outer ring */}
            <circle 
              cx={spot.x} 
              cy={spot.y} 
              r="14" 
              className="fill-green-400 opacity-40 animate-ping" 
              style={{ transformOrigin: `${spot.x}px ${spot.y}px` }}
            />
            {/* Direct inner solid dot */}
            <circle 
              cx={spot.x} 
              cy={spot.y} 
              r="5.5" 
              className="fill-green-500 stroke-white stroke-2 shadow-lg" 
            />
          </g>
        ))}
      </svg>
      
    </div>
  );
}
