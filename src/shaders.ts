export const VERTEX_SHADER_SRC = `#version 300 es
in vec2 a_position;
out vec2 v_uv;

void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const FRAGMENT_SHADER_SRC = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 outColor;

uniform vec2 u_resolution;
uniform vec2 u_c;
uniform vec2 u_center;
uniform float u_zoom;
uniform int u_max_iters;
uniform int u_palette_mode; // 0: Classic 1990s, 1: Fire, 2: Ocean, 3: Neon
uniform int u_render_mode; // 0: Filled, 1: Boundary, 2: Hybrid
uniform float u_time;

// Authentic 1990s Borland 7-color / 28-shade escape palette
vec3 getClassicColor(int iter, int max_i) {
  if (iter >= max_i) return vec3(0.0, 0.0, 0.0); // Inside Kc = Black

  int colorGroup = iter % 7;
  float shade = float((iter / 7) % 4) / 3.0; // 4 shades per color
  float brightness = 0.45 + 0.55 * shade;

  vec3 baseColor;
  if (colorGroup == 0) baseColor = vec3(0.58, 0.0, 0.83); // Violet
  else if (colorGroup == 1) baseColor = vec3(0.29, 0.0, 0.51); // Indigo
  else if (colorGroup == 2) baseColor = vec3(0.0, 0.45, 0.95); // Blue
  else if (colorGroup == 3) baseColor = vec3(0.0, 0.85, 0.35); // Green
  else if (colorGroup == 4) baseColor = vec3(0.95, 0.88, 0.0); // Yellow
  else if (colorGroup == 5) baseColor = vec3(0.98, 0.50, 0.0); // Orange
  else baseColor = vec3(0.92, 0.12, 0.15); // Red

  return baseColor * brightness;
}

// Smooth continuous coloring
vec3 getSmoothPalette(float mu, int paletteMode) {
  if (paletteMode == 1) { // Fire
    float r = clamp(mu * 2.5, 0.0, 1.0);
    float g = clamp(mu * 1.5 - 0.2, 0.0, 1.0);
    float b = clamp(mu * 3.0 - 1.8, 0.0, 1.0);
    return vec3(r, g, b);
  } else if (paletteMode == 2) { // Ocean
    float r = clamp(sin(mu * 6.28) * 0.2 + 0.1, 0.0, 1.0);
    float g = clamp(mu * 1.2, 0.0, 0.9);
    float b = clamp(0.4 + mu * 0.8, 0.0, 1.0);
    return vec3(r, g, b);
  } else { // Neon
    float r = 0.5 + 0.5 * sin(mu * 12.0 + 0.0);
    float g = 0.5 + 0.5 * sin(mu * 12.0 + 2.094);
    float b = 0.5 + 0.5 * sin(mu * 12.0 + 4.188);
    return vec3(r, g, b);
  }
}

void main() {
  vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
  vec2 z = u_center + st * (3.4 / u_zoom);

  // Exact Rubinstein condition: Escape radius R = max(|c|, 2.0)
  float c_abs = length(u_c);
  float escape_r = max(c_abs, 2.0);
  float escape_r_sq = escape_r * escape_r;

  int iter = 0;
  float z_len_sq = 0.0;

  for (int i = 0; i < 1000; i++) {
    if (i >= u_max_iters) break;

    // Complex squaring: Z_{n+1} = Z_n^2 + c
    float x_temp = z.x * z.x - z.y * z.y + u_c.x;
    z.y = 2.0 * z.x * z.y + u_c.y;
    z.x = x_temp;

    z_len_sq = z.x * z.x + z.y * z.y;
    if (z_len_sq > escape_r_sq) {
      iter = i;
      break;
    }
    iter = i + 1;
  }

  bool isInside = iter >= u_max_iters;
  bool isBoundary = !isInside && iter >= max(1, u_max_iters - 8);

  if (u_render_mode == 1 && !isBoundary) {
    outColor = vec4(0.01, 0.02, 0.05, 1.0);
  } else if (u_render_mode == 2 && !isBoundary && !isInside) {
    outColor = vec4(0.01, 0.02, 0.05, 1.0);
  } else if (isInside) {
    // Inside the filled Julia set (Kc)
    outColor = vec4(0.01, 0.02, 0.05, 1.0);
  } else if (u_palette_mode == 0) {
    // Authentic 1990s Borland 28-shade spectrum
    vec3 col = getClassicColor(iter, u_max_iters);
    outColor = vec4(col, 1.0);
  } else {
    // Smooth HD continuous coloring
    float log_zn = log(z_len_sq) / 2.0;
    float nu = log(log_zn / log(2.0)) / log(2.0);
    float continuous_i = float(iter) + 1.0 - nu;
    float norm_i = clamp(continuous_i / float(u_max_iters), 0.0, 1.0);
    vec3 col = getSmoothPalette(norm_i, u_palette_mode);
    outColor = vec4(col, 1.0);
  }
}
`;
