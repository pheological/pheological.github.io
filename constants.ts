import { Github, Youtube, Music, Box, Gamepad2 } from 'lucide-react';
import { SocialLink } from './types';

export const DISCORD_ID = '551949864968257536';
export const DISCORD_USERNAME = 'pheological';

export const SKILLS = [
  "Java",
  "Python",
  "Fabric API",
  "Mixin",
  "OpenGL",
  "Git"
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/pheological",
    icon: Github,
    color: "hover:text-white hover:bg-neutral-800"
  },
  {
    name: "Modrinth",
    url: "https://modrinth.com/user/pheological",
    icon: Box, // Using Box as a proxy for Modrinth icon
    color: "hover:text-green-400 hover:bg-green-900/20"
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@pheological",
    icon: Youtube,
    color: "hover:text-red-500 hover:bg-red-900/20"
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com/user/zknuty0k9dxh8hfe7nuh9xu43",
    icon: Music,
    color: "hover:text-emerald-400 hover:bg-emerald-900/20"
  }
];