export type Breakpoint = 'compact' | 'mobile' | 'tablet' | 'desktop';
export function breakpointForWidth(width: number): Breakpoint { if (width < 480) return 'compact'; if (width < 768) return 'mobile'; if (width < 1024) return 'tablet'; return 'desktop'; }
