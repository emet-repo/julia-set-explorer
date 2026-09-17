import { Complex } from './complex';

/**
 * Modern implementation of the 1990s JULIA_N3.CPP inverse iteration algorithm.
 * Solves Z_{n+1} = ± sqrt(Z_n - c) via a random-walk branching process.
 */
export function computeBoundaryPoints(
  c: Complex,
  pointCount: number = 25000,
  warmupIterations: number = 60
): Float32Array {
  const points = new Float32Array(pointCount * 2);

  // Compute fixed point Z = Z^2 + c -> Z^2 - Z + c = 0
  // Quadratic formula: Z = (1 ± sqrt(1 - 4c)) / 2
  const disc = new Complex(1 - 4 * c.re, -4 * c.im).sqrt();
  let z = new Complex((1 + disc.re) * 0.5, disc.im * 0.5);

  // Warmup iterations to let orbit converge onto the chaotic Julia boundary J_c
  for (let i = 0; i < warmupIterations; i++) {
    const diff = z.sub(c);
    const sq = diff.sqrt();
    const sign = Math.random() < 0.5 ? 1 : -1;
    z = new Complex(sq.re * sign, sq.im * sign);
  }

  // Generate chaotic boundary random walk
  let idx = 0;
  for (let i = 0; i < pointCount; i++) {
    const diff = z.sub(c);
    const sq = diff.sqrt();
    const sign = Math.random() < 0.5 ? 1 : -1;
    z = new Complex(sq.re * sign, sq.im * sign);

    points[idx++] = z.re;
    points[idx++] = z.im;
  }

  return points;
}
