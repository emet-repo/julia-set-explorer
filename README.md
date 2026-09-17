# Julia Set Explorer HD (Modern Web App)

High-performance, 60–144 FPS WebGL2 & TypeScript port of the classic complex dynamics project (Prof. Zalman Rubinstein's course at University of Haifa).

---

## Live Demo on GitHub Pages
This project is configured for automated deployment via GitHub Actions:
https://<your-username>.github.io/julia-set-explorer/

---

## Features
* **GPU-Accelerated Escape-Time Renderer:** Instantaneous 60–144 FPS rendering of filled Julia sets $ and boundaries $ at full 4K resolution using WebGL2 GLSL fragment shaders.
* **Rubinstein Stopping Condition:** Exact fidelity to the original 1990s Borland C++ condition $|P_c(z)| > \max(|c|, 2.0)$.
* **All 35 Classical Benchmark Datasets:** Includes full embedded metadata and notes for presets J_TEST01.DAT through J_TEST35.DAT (Douady Rabbit, San Marco Dragon, Siegel Disks, Dendrites, Cauliflower, etc.).
* **Multiple Palettes:** Authentic 1990s Borland 28-shade stepped spectrum, plus smooth continuous HD gradients (Fire, Ocean, Neon).
* **Interactive Navigation:**
  * Left-click drag to pan.
  * Mouse wheel exponential zoom.
  * Live cursor HUD reporting exact complex coordinates  = x + iy$.
  * Real-time  = c_r + ic_i$ sliders and iteration adjustments.
  * 1-Click 4K PNG screenshot export.

---

## Local Development

`ash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production deployment
npm run build
`

---

## Deployment to GitHub Pages

1. Push this repository to GitHub on branch main.
2. In your repository on GitHub:
   * Go to **Settings** -> **Pages**.
   * Under **Build and deployment** -> **Source**, select **GitHub Actions**.
3. Every push to main will automatically build and publish the live site.
