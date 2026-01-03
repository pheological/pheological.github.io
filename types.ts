import React from 'react';

export interface LanyardData {
  kv: Record<string, string>;
  spotify: Spotify | null;
  discord_user: DiscordUser;
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
}

export interface Spotify {
  track_id: string;
  timestamps: {
    start: number;
    end: number;
  };
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

export interface DiscordUser {
  username: string;
  public_flags: number;
  id: string;
  discriminator: string;
  avatar: string;
}

export interface LanyardMessage {
  op: number;
  t?: string;
  d?: any;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<any>;
  color: string;
}