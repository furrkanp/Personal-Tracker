import { breakpointForWidth } from '@/shared/utils/responsive';
test('maps widths to responsive breakpoints', () => { expect(breakpointForWidth(320)).toBe('compact'); expect(breakpointForWidth(600)).toBe('mobile'); expect(breakpointForWidth(800)).toBe('tablet'); expect(breakpointForWidth(1200)).toBe('desktop'); });
