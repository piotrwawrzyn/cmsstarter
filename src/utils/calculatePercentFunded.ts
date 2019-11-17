export const calculatePercentFunded = (raised: number, outOf: number): number =>
  Math.floor((raised / outOf) * 100);
