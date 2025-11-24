/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'react';

export const Avatar: React.FC = () => {
  return (
    <div className="w-[100px] h-[100px] relative flex-shrink-0 group">
      {/* Rotating border gradient */}
      <div 
        className="absolute inset-[-3px] rounded-full bg-gradient-to-tr from-[#333333] via-[#666666] to-[#cccccc] animate-spin opacity-100 z-0"
        style={{ animationDuration: '3s' }}
      ></div>
      
      {/* Inner Avatar Content */}
      <div className="w-full h-full bg-gradient-to-br from-[#333333] to-[#666666] rounded-full flex items-center justify-center text-[2.5rem] font-bold text-white relative z-10">
        P
      </div>
    </div>
  );
};