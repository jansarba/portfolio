import { BACKGROUND_SEGMENTS } from '../config/backgrounds';

export interface PageBackground {
  background: string;
  foreground: string;
}

export function usePageBackground(page: number): PageBackground {
  const segment = BACKGROUND_SEGMENTS.find(s => page <= s.upToPage);
  return segment
    ? { background: segment.color, foreground: segment.foreground }
    : { background: '#FFFFFF', foreground: '#141313' };
}
