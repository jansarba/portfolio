export interface BackgroundSegment {
  upToPage: number;
  color: string;
  foreground: string;
}

export const BACKGROUND_SEGMENTS: BackgroundSegment[] = [
  { upToPage: 8, color: '#141313', foreground: '#FFFFFF' },
  { upToPage: 12, color: '#FFFFF0', foreground: '#141313' },
  { upToPage: Infinity, color: '#FFFFFF', foreground: '#141313' },
];
