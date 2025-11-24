/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'react';

interface SkillBadgeProps {
  name: string;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ name }) => {
  return (
    <span className="bg-[#282828cc] border border-white/10 text-white px-3 py-1 rounded-[20px] text-sm font-medium">
      {name}
    </span>
  );
};