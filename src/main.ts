import { DATASET_CATALOG } from './catalog';
import { Complex } from './complex';
import { VERTEX_SHADER_SRC, FRAGMENT_SHADER_SRC } from './shaders';

class JuliaApp {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private program!: WebGLProgram;

  // Render State
  private c: Complex = new Complex(-0.1, 0.8); // Default: Douady Rabbit
  private center: [number, number] = [0.0, 0.0];
  private zoom: number = 1.0;
  private maxIters: number = 50;
  private paletteMode: number = 0; // 0: 1990s Classic, 1: Fire, 2: Ocean, 3: Neon
  private renderMode: 'filled' | 'boundary' | 'hybrid' = 'filled';

  // Interaction State
  private isDragging = false;
  private lastMouseX = 0;
  private lastMouseY = 0;
  private activeDatasetIndex = 3; // J_TEST04 (Douady's Rabbit)

  // Animation State
  private isAnimating = false;
  private animTime = 0;

  // Uniform Locations
  private uResolutionLoc!: WebGLUniformLocation;
  private uCLoc!: WebGLUniformLocation;
  private uCenterLoc!: WebGLUniformLocation;
  private uZoomLoc!: WebGLUniformLocation;
  private uMaxItersLoc!: WebGLUniformLocation;
  private uPaletteModeLoc!: WebGLUniformLocation;
  private uRenderModeLoc!: WebGLUniformLocation;
  private uTimeLoc!: WebGLUniformLocation;

  // Performance stats
  private lastFrameTime = performance.now();
  private frameCount = 0;

  constructor() {
    this.canvas = document.getElementById('julia-canvas') as HTMLCanvasElement;
    const gl = this.canvas.getContext('webgl2', { antialias: false, powerPreference: 'high-performance' });
    if (!gl) {
      alert('WebGL 2.0 is not supported on this browser/hardware.');
      throw new Error('WebGL2 not supported');
    }
    this.gl = gl;

    this.initShaders();
    this.initBuffers();
    this.setupUI();
    this.setupEvents();
    this.populateDatasetList();
    this.handleResize();

    window.requestAnimationFrame((t) => this.renderLoop(t));
  }

  private initShaders() {
    const gl = this.gl;
    const vShader = this.compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fShader = this.compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);

    const program = gl.createProgram()!;
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      throw new Error('Failed to link WebGL program');
    }

    this.program = program;
    this.uResolutionLoc = gl.getUniformLocation(program, 'u_resolution')!;
    this.uCLoc = gl.getUniformLocation(program, 'u_c')!;
    this.uCenterLoc = gl.getUniformLocation(program, 'u_center')!;
    this.uZoomLoc = gl.getUniformLocation(program, 'u_zoom')!;
    this.uMaxItersLoc = gl.getUniformLocation(program, 'u_max_iters')!;
    this.uPaletteModeLoc = gl.getUniformLocation(program, 'u_palette_mode')!;
    this.uRenderModeLoc = gl.getUniformLocation(program, 'u_render_mode')!;
    this.uTimeLoc = gl.getUniformLocation(program, 'u_time')!;
  }

  private compileShader(type: number, src: string): WebGLShader {
    const gl = this.gl;
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      throw new Error('Shader compilation error');
    }
    return shader;
  }

  private initBuffers() {
    const gl = this.gl;
    const quad = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1
    ]);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(this.program, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
  }

  private setupUI() {
    const sliderCr = document.getElementById('slider-cr') as HTMLInputElement;
    const sliderCi = document.getElementById('slider-ci') as HTMLInputElement;
    const sliderIters = document.getElementById('slider-iters') as HTMLInputElement;

    const valCr = document.getElementById('val-cr')!;
    const valCi = document.getElementById('val-ci')!;
    const valIters = document.getElementById('val-iters')!;

    sliderCr.addEventListener('input', () => {
      this.c.re = parseFloat(sliderCr.value);
      valCr.textContent = this.c.re.toFixed(4);
      this.updateHud();
    });

    sliderCi.addEventListener('input', () => {
      this.c.im = parseFloat(sliderCi.value);
      valCi.textContent = this.c.im.toFixed(4);
      this.updateHud();
    });

    sliderIters.addEventListener('input', () => {
      this.maxIters = parseInt(sliderIters.value, 10);
      valIters.textContent = this.maxIters.toString();
    });

    // Palette Selector
    const palGroup = document.getElementById('palette-group')!;
    palGroup.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('button');
      if (!target) return;
      palGroup.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      target.classList.add('active');
      const p = target.getAttribute('data-palette');
      if (p === 'classic') this.paletteMode = 0;
      else if (p === 'fire') this.paletteMode = 1;
      else if (p === 'ocean') this.paletteMode = 2;
      else if (p === 'neon') this.paletteMode = 3;
    });

    // Render Mode Selector
    const modeGroup = document.getElementById('mode-group')!;
    modeGroup.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('button');
      if (!target) return;
      modeGroup.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      target.classList.add('active');
      this.renderMode = target.getAttribute('data-mode') as any;
    });

    // Sidebar Toggle
    const sidebar = document.getElementById('sidebar')!;
    const btnToggle = document.getElementById('btn-toggle-sidebar')!;
    const btnClose = document.getElementById('btn-close-sidebar')!;

    btnToggle.addEventListener('click', () => sidebar.classList.remove('collapsed'));
    btnClose.addEventListener('click', () => sidebar.classList.add('collapsed'));

    // Reset View Button
    document.getElementById('btn-reset-view')!.addEventListener('click', () => {
      this.center = [0.0, 0.0];
      this.zoom = 1.0;
      this.updateHud();
    });

    // Trajectory Playback Button (ANIM01)
    const btnPlay = document.getElementById('btn-play-anim')!;
    btnPlay.addEventListener('click', () => {
      this.isAnimating = !this.isAnimating;
      btnPlay.textContent = this.isAnimating
        ? '⏸ Pause Animation'
        : '▶ Auto-Morph Trajectory (ANIM01)';
    });

    // Export PNG
    document.getElementById('btn-export-png')!.addEventListener('click', () => {
      this.exportImage();
    });
  }

  private populateDatasetList() {
    const container = document.getElementById('dataset-container')!;
    container.innerHTML = '';

    DATASET_CATALOG.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'dataset-card';
      card.innerHTML = `
        <div class="title-line">
          <strong>${idx + 1}. ${item.title}</strong>
          <span class="code">${item.filename}</span>
        </div>
        <div class="sub-line">${item.classification}</div>
      `;

      card.addEventListener('click', () => {
        this.selectDataset(idx);
      });

      container.appendChild(card);
    });
  }

  private selectDataset(idx: number) {
    this.activeDatasetIndex = idx;
    const entry = DATASET_CATALOG[idx];

    this.c = new Complex(entry.reC, entry.imC);
    this.maxIters = entry.maxIters;
    this.center = [0.0, 0.0];
    this.zoom = 1.0;

    // Update UI controls
    (document.getElementById('slider-cr') as HTMLInputElement).value = this.c.re.toString();
    (document.getElementById('slider-ci') as HTMLInputElement).value = this.c.im.toString();
    (document.getElementById('slider-iters') as HTMLInputElement).value = this.maxIters.toString();

    document.getElementById('val-cr')!.textContent = this.c.re.toFixed(4);
    document.getElementById('val-ci')!.textContent = this.c.im.toFixed(4);
    document.getElementById('val-iters')!.textContent = this.maxIters.toString();
    document.getElementById('active-dataset-tag')!.textContent = `${entry.filename} (${entry.title})`;

    // Update active highlight in list
    const cards = document.querySelectorAll('.dataset-card');
    cards.forEach((c, i) => c.classList.toggle('active', i === idx));

    this.updateHud();
  }

  private setupEvents() {
    window.addEventListener('resize', () => this.handleResize());

    // Pan via Mouse Drag
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      // Calculate complex coordinate at cursor
      const rect = this.canvas.getBoundingClientRect();
      const minDim = Math.min(this.canvas.width, this.canvas.height);
      const nx = ((e.clientX - rect.left) * window.devicePixelRatio - 0.5 * this.canvas.width) / minDim;
      const ny = ((this.canvas.height - (e.clientY - rect.top) * window.devicePixelRatio) - 0.5 * this.canvas.height) / minDim;

      const zx = this.center[0] + nx * (3.4 / this.zoom);
      const zy = this.center[1] + ny * (3.4 / this.zoom);
      document.getElementById('hud-z')!.textContent = `${zx.toFixed(3)} ${zy >= 0 ? '+' : '-'} ${Math.abs(zy).toFixed(3)}i`;

      if (!this.isDragging) return;
      const dx = e.clientX - this.lastMouseX;
      const dy = e.clientY - this.lastMouseY;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;

      const scale = (3.4 / this.zoom) / minDim * window.devicePixelRatio;
      this.center[0] -= dx * scale;
      this.center[1] += dy * scale;
      this.updateHud();
    });

    // Exponential Zoom via Mouse Wheel
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
      this.zoom = Math.max(0.1, Math.min(this.zoom * zoomFactor, 1e7));
      this.updateHud();
    }, { passive: false });

    // Keyboard Shortcuts (Matching the classic 1990s keys)
    window.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      if (key === 'n' || key === ']') {
        this.selectDataset((this.activeDatasetIndex + 1) % DATASET_CATALOG.length);
      } else if (key === 'p' || key === '[') {
        this.selectDataset((this.activeDatasetIndex - 1 + DATASET_CATALOG.length) % DATASET_CATALOG.length);
      } else if (key === 'c') {
        this.paletteMode = (this.paletteMode + 1) % 4;
        const buttons = document.querySelectorAll('#palette-group button');
        buttons.forEach((b, i) => b.classList.toggle('active', i === this.paletteMode));
      } else if (key === 'r') {
        this.center = [0.0, 0.0];
        this.zoom = 1.0;
        this.updateHud();
      }
    });
  }

  private handleResize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.floor(window.innerWidth * dpr);
    const h = Math.floor(window.innerHeight * dpr);

    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
      this.gl.viewport(0, 0, w, h);
    }
  }

  private updateHud() {
    const crStr = `${this.c.re >= 0 ? '+' : ''}${this.c.re.toFixed(3)}`;
    const ciStr = `${this.c.im >= 0 ? '+' : ''}${this.c.im.toFixed(3)}i`;
    document.getElementById('hud-c')!.textContent = `${crStr} ${ciStr}`;
    document.getElementById('hud-zoom')!.textContent = `${this.zoom.toFixed(2)}x`;
  }

  private renderLoop(timestamp: number) {
    // FPS computation
    this.frameCount++;
    if (timestamp - this.lastFrameTime >= 1000) {
      document.getElementById('hud-fps')!.textContent = this.frameCount.toString();
      this.frameCount = 0;
      this.lastFrameTime = timestamp;
    }

    // Auto-morphing animation trajectory
    if (this.isAnimating) {
      this.animTime += 0.015;
      this.c.re = -0.75 + 0.35 * Math.sin(this.animTime);
      this.c.im = 0.15 + 0.35 * Math.cos(this.animTime * 0.7);
      (document.getElementById('slider-cr') as HTMLInputElement).value = this.c.re.toString();
      (document.getElementById('slider-ci') as HTMLInputElement).value = this.c.im.toString();
      document.getElementById('val-cr')!.textContent = this.c.re.toFixed(4);
      document.getElementById('val-ci')!.textContent = this.c.im.toFixed(4);
      this.updateHud();
    }

    const gl = this.gl;
    gl.clearColor(0.01, 0.02, 0.05, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(this.program);
    gl.uniform2f(this.uResolutionLoc, this.canvas.width, this.canvas.height);
    gl.uniform2f(this.uCLoc, this.c.re, this.c.im);
    gl.uniform2f(this.uCenterLoc, this.center[0], this.center[1]);
    gl.uniform1f(this.uZoomLoc, this.zoom);
    gl.uniform1i(this.uMaxItersLoc, this.maxIters);
    gl.uniform1i(this.uPaletteModeLoc, this.paletteMode);
    gl.uniform1i(this.uRenderModeLoc, this.renderMode === 'filled' ? 0 : this.renderMode === 'boundary' ? 1 : 2);
    gl.uniform1f(this.uTimeLoc, timestamp * 0.001);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    window.requestAnimationFrame((t) => this.renderLoop(t));
  }

  private exportImage() {
    const link = document.createElement('a');
    link.download = 'julia-set.png';
    link.href = this.canvas.toDataURL('image/png');
    link.click();
  }
}

// Start application
window.addEventListener('DOMContentLoaded', () => {
  new JuliaApp();
});
