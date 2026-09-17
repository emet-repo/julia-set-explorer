export interface DatasetEntry {
  filename: string;
  title: string;
  classification: string;
  dynamicsNote: string;
  reC: number;
  imC: number;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  maxIters: number;
}

export const DATASET_CATALOG: DatasetEntry[] = [
  { filename: J_TEST01.DAT, title: San Marco Dragon, classification: Parabolic (Period 2), dynamicsNote: Basilica pinch points along real axis; homeomorphic to arches, reC: -1.0, imC: 0.0, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 45 },
  { filename: J_TEST02.DAT, title: Spiral Attractor, classification: Hyperbolic Component, dynamicsNote: Four-fold spiral arms radiating from central basin, reC: -0.3, imC: -0.4, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 45 },
  { filename: J_TEST03.DAT, title: Siegel Disk Candidate, classification: Irrational Rotation, dynamicsNote: Near the main cardioid boundary; delicate invariant curves, reC: 0.360284, imC: 0.100376, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 60 },
  { filename: J_TEST04.DAT, title: Douady's Rabbit, classification: Superstable (Period 3), dynamicsNote: Three major lobes connected by thin necks; critically stable, reC: -0.1, imC: 0.8, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 50 },
  { filename: J_TEST05.DAT, title: The Cauliflower, classification: Parabolic Cusp (Root 1), dynamicsNote: Boundary point c = 1/4; parabolic fixed point at z = 1/2, reC: 0.25, imC: 0.0, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 50 },
  { filename: J_TEST06.DAT, title: Perturbed Cauliflower, classification: Cantor Dust, dynamicsNote: c > 1/4 breaks connectivity; disintegrates into dust, reC: 0.255, imC: 0.0, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 50 },
  { filename: J_TEST07.DAT, title: Period-2 Root Node, classification: Parabolic Boundary, dynamicsNote: Root between period 1 and period 2 components, reC: -0.75, imC: 0.0, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 45 },
  { filename: J_TEST08.DAT, title: Perturbed Period-2, classification: Hyperbolic Mesh, dynamicsNote: Small imaginary perturbation creating spiral pinch bridges, reC: -0.75, imC: 0.1, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 50 },
  { filename: J_TEST09.DAT, title: Spiral Filaments, classification: Filamentous Hyperbolic, dynamicsNote: Double logarithmic whirlpool arms across the complex plane, reC: 0.4, imC: 0.3351, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 50 },
  { filename: J_TEST10.DAT, title: Dendrite (Branching), classification: Nowhere Dense, dynamicsNote: Tree-like fractal continuum with empty interior (Fatou void), reC: -0.3, imC: 1.0, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 60 },
  { filename: J_TEST11.DAT, title: Necklace of Islands, classification: Satellite Array, dynamicsNote: Connected chain of orbiting secondary Fatou disks, reC: -0.85, imC: 0.2, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 50 },
  { filename: J_TEST12.DAT, title: Siegel Dust Zoom, classification: Deep Siegel Dust, dynamicsNote: High magnification of self-similar rotational spirals, reC: 0.384, imC: 0.431, xMin: -1.12, xMax: 1.12, yMin: -1.71, yMax: 0.123, maxIters: 80 },
  { filename: J_TEST13.DAT, title: The Airplane Fractal, classification: Period-3 Real Axis, dynamicsNote: Three symmetric lobes along the negative horizontal axis, reC: -1.1529, imC: 0.209, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 50 },
  { filename: J_TEST14.DAT, title: Siegel Spiral Arms, classification: Irrational Boundary, dynamicsNote: Delicate filaments twisting toward irrational rotation nodes, reC: -0.213898, imC: -0.7, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 60 },
  { filename: J_TEST15.DAT, title: Complex Spiral Hub, classification: Multi-fold Vortex, dynamicsNote: High-order rotational symmetry around secondary hubs, reC: 0.134025, imC: 0.6, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 60 },
  { filename: J_TEST16.DAT, title: Satellite Minibrot, classification: Satellite Hyperbolic, dynamicsNote: Julia set corresponding to miniature Mandelbrot satellite, reC: -1.0234, imC: 0.008718, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 64 },
  { filename: J_TEST17.DAT, title: Spidery Web Network, classification: Interconnected, dynamicsNote: Filamentous bridges connecting tiny satellite Fatou disks, reC: -0.764271, imC: 0.086271, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 60 },
  { filename: J_TEST18.DAT, title: Smooth Fatou Core, classification: Hyperbolic Disk, dynamicsNote: Large attractive Fatou interior with smooth boundary waves, reC: -0.11, imC: 0.18, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 45 },
  { filename: J_TEST19.DAT, title: Multi-Spiral Vortex, classification: Coupled Attractor, dynamicsNote: Twin rotating spiral cores in mutual orbital balance, reC: 0.331864, imC: 0.565932, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 60 },
  { filename: J_TEST20.DAT, title: Twisted Dragon Zoom, classification: Dense Dragon Zoom, dynamicsNote: Zoomed view into dragon wing intersection, reC: -0.480476, imC: 0.6, xMin: -1.7, xMax: 1.7, yMin: -1.7, yMax: 1.7, maxIters: 70 },
  { filename: J_TEST21.DAT, title: Pinwheel Vortex, classification: Asymmetric Whirlpool, dynamicsNote: Dense pinwheel arms radiating outward, reC: 0.369925, imC: -0.29198, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 50 },
  { filename: J_TEST22.DAT, title: Airplane Fractal II, classification: Period-3 Dual, dynamicsNote: Symmetric airplane lobes (alternate coordinate preset), reC: -1.1529, imC: 0.209, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 50 },
  { filename: J_TEST23.DAT, title: Dendrite Edge Tendril, classification: Outer Periphery, dynamicsNote: Extremely thin tendrils on the outer periphery of chaos, reC: -0.0003, imC: -1.0001, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 75 },
  { filename: J_TEST24.DAT, title: Inverted Siegel, classification: Irrational Cusp, dynamicsNote: Dual configuration to Siegel candidate, reC: -0.360284, imC: 0.100376, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 50 },
  { filename: J_TEST25.DAT, title: Pure Dendrite (c = i), classification: Pure Dendritic, dynamicsNote: Completely dendritic, nowhere dense, zero interior area, reC: 0.0, imC: 1.0, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 100 },
  { filename: J_TEST26.DAT, title: Golden Ratio Siegel, classification: KAM Rotation, dynamicsNote: Golden mean rotation number with invariant curves, reC: -0.39054, imC: -0.58679, xMin: -1.6, xMax: 1.6, yMin: -1.6, yMax: 1.6, maxIters: 120 },
  { filename: J_TEST27.DAT, title: Feigenbaum Point, classification: Cascade Accumulation, dynamicsNote: Cascade accumulation point c = -1.401155; infinitely layered, reC: -1.401155, imC: 0.0, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 128 },
  { filename: J_TEST28.DAT, title: Twin Dragon Vortex, classification: Coupled Whirlpools, dynamicsNote: Interlocking dual spirals connected by filament bridges, reC: -0.8, imC: 0.156, xMin: -1.6, xMax: 1.6, yMin: -1.6, yMax: 1.6, maxIters: 90 },
  { filename: J_TEST29.DAT, title: Corona / Solar Flare, classification: Radiant Flare, dynamicsNote: Four-quadrant luminous coronal flares and burst rays, reC: 0.355, imC: 0.355, xMin: -1.8, xMax: 1.8, yMin: -1.8, yMax: 1.8, maxIters: 80 },
  { filename: J_TEST30.DAT, title: Galactic Swirl, classification: Logarithmic Spirals, dynamicsNote: Deep spiral galaxy pattern with swirling satellite islands, reC: -0.74543, imC: 0.11301, xMin: -1.7, xMax: 1.7, yMin: -1.7, yMax: 1.7, maxIters: 96 },
  { filename: J_TEST31.DAT, title: Electric Lightning, classification: High-Frequency Net, dynamicsNote: Intense branching tendrils resembling electric discharge, reC: -0.7726, imC: -0.0834, xMin: -1.7, xMax: 1.7, yMin: -1.7, yMax: 1.7, maxIters: 100 },
  { filename: J_TEST32.DAT, title: Starfish Attractor, classification: 5-Fold Symmetry, dynamicsNote: 5-fold rotational symmetry around central Fatou core, reC: -0.481762, imC: -0.531657, xMin: -1.6, xMax: 1.6, yMin: -1.6, yMax: 1.6, maxIters: 90 },
  { filename: J_TEST33.DAT, title: Seahorse Valley Julia, classification: Twin Spiral Valley, dynamicsNote: Julia set corresponding to Mandelbrot Seahorse Valley, reC: -0.75, imC: 0.11, xMin: -1.8, xMax: 1.8, yMin: -1.8, yMax: 1.8, maxIters: 80 },
  { filename: J_TEST34.DAT, title: Period-3 Real Airplane, classification: Aerodynamic Lobes, dynamicsNote: Clean aerodynamic lobes on real axis, reC: -1.25, imC: 0.0, xMin: -2.0, xMax: 2.0, yMin: -2.0, yMax: 2.0, maxIters: 64 },
  { filename: J_TEST35.DAT, title: Cauliflower Filaments, classification: Near-Cusp Explosion, dynamicsNote: Just beyond cusp boundary; explodes into dust jewels, reC: 0.285, imC: 0.013, xMin: -1.8, xMax: 1.8, yMin: -1.8, yMax: 1.8, maxIters: 100 }
];
