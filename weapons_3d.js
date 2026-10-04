/**
 * CHRONICLES OF BHARATAVARSHA: PURE WEBGL 3D WEAPONS ENGINE
 * Self-contained 3D renderer for historic Indian weaponry with Damascus shaders,
 * PBR specular reflections, interactive orbit controls, particle systems & battle animations.
 */

class Weapons3DEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.gl = this.canvas.getContext("webgl", { antialias: true, alpha: true }) ||
              this.canvas.getContext("experimental-webgl", { antialias: true, alpha: true });

    if (!this.gl) {
      console.warn("WebGL not supported, falling back to 2D Canvas preview.");
      this.initCanvasFallback();
      return;
    }

    this.rotation = { x: 0.2, y: 0.8, z: 0 };
    this.zoom = 4.2;
    this.autoRotate = true;
    this.wireframe = false;
    this.damascusMode = true;
    this.lightingTheme = "golden_palace"; // "golden_palace", "forge_fire", "moonlit_battle"
    this.currentWeaponId = "khanda";
    this.particles = [];
    this.isActionActive = false;
    this.actionTime = 0;

    this.isDragging = false;
    this.lastMousePos = { x: 0, y: 0 };

    this.initShaders();
    this.setupEvents();
    this.loadWeapon("khanda");
    this.startRenderLoop();
  }

  initShaders() {
    const gl = this.gl;

    const vsSource = `
      attribute vec3 aPosition;
      attribute vec3 aNormal;
      attribute vec2 aTexCoord;
      attribute vec3 aColor;

      uniform mat4 uModelMatrix;
      uniform mat4 uViewMatrix;
      uniform mat4 uProjMatrix;
      uniform mat3 uNormalMatrix;

      varying vec3 vNormal;
      varying vec3 vFragPos;
      varying vec2 vTexCoord;
      varying vec3 vColor;

      void main() {
        vec4 worldPos = uModelMatrix * vec4(aPosition, 1.0);
        vFragPos = worldPos.xyz;
        vNormal = normalize(uNormalMatrix * aNormal);
        vTexCoord = aTexCoord;
        vColor = aColor;
        gl_Position = uProjMatrix * uViewMatrix * worldPos;
      }
    `;

    const fsSource = `
      precision mediump float;

      varying vec3 vNormal;
      varying vec3 vFragPos;
      varying vec2 vTexCoord;
      varying vec3 vColor;

      uniform vec3 uLightPos1;
      uniform vec3 uLightColor1;
      uniform vec3 uLightPos2;
      uniform vec3 uLightColor2;
      uniform vec3 uViewPos;
      uniform int uDamascusMode;
      uniform int uLightingTheme;
      uniform float uTime;
      uniform float uGleam;

      void main() {
        vec3 norm = normalize(vNormal);
        vec3 viewDir = normalize(uViewPos - vFragPos);

        // Ambient lighting
        vec3 ambient = 0.28 * vColor;
        if (uLightingTheme == 1) { // Forge
          ambient += vec3(0.15, 0.04, 0.01);
        } else if (uLightingTheme == 2) { // Moonlit
          ambient += vec3(0.02, 0.05, 0.12);
        } else { // Royal Palace
          ambient += vec3(0.12, 0.09, 0.03);
        }

        // Light 1 (Key Light)
        vec3 lightDir1 = normalize(uLightPos1 - vFragPos);
        float diff1 = max(dot(norm, lightDir1), 0.0);
        vec3 diffuse1 = diff1 * uLightColor1 * vColor;

        vec3 reflectDir1 = reflect(-lightDir1, norm);
        float spec1 = pow(max(dot(viewDir, reflectDir1), 0.0), 32.0);
        vec3 specular1 = spec1 * uLightColor1 * 0.75;

        // Light 2 (Fill / Rim Light)
        vec3 lightDir2 = normalize(uLightPos2 - vFragPos);
        float diff2 = max(dot(norm, lightDir2), 0.0);
        vec3 diffuse2 = diff2 * uLightColor2 * vColor;

        vec3 reflectDir2 = reflect(-lightDir2, norm);
        float spec2 = pow(max(dot(viewDir, reflectDir2), 0.0), 16.0);
        vec3 specular2 = spec2 * uLightColor2 * 0.45;

        // Damascus Steel Procedural Waveform Pattern (Wootz Steel Texture)
        float damascus = 1.0;
        if (uDamascusMode == 1) {
          float wave1 = sin(vFragPos.y * 35.0 + sin(vFragPos.x * 25.0) * 2.2);
          float wave2 = cos(vFragPos.x * 40.0 + sin(vFragPos.z * 30.0) * 1.8);
          damascus = 0.88 + 0.18 * sin(wave1 * 3.1415 + wave2 * 2.0);
        }

        // Blade gleam / shine reflection streak
        float gleamEffect = 0.0;
        if (uGleam > 0.0) {
          float distToGleam = abs(vFragPos.y - (sin(uTime * 3.0) * 2.5));
          if (distToGleam < 0.3) {
            gleamEffect = (0.3 - distToGleam) * 2.5 * uGleam;
          }
        }

        vec3 finalColor = (ambient + diffuse1 + diffuse2) * damascus + specular1 + specular2 + vec3(gleamEffect);
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const vertShader = this.compileShader(gl.VERTEX_SHADER, vsSource);
    const fragShader = this.compileShader(gl.FRAGMENT_SHADER, fsSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Shader Link Error: " + gl.getProgramInfoLog(program));
      return;
    }

    this.program = program;
    gl.useProgram(program);

    this.attribs = {
      position: gl.getAttribLocation(program, "aPosition"),
      normal: gl.getAttribLocation(program, "aNormal"),
      texCoord: gl.getAttribLocation(program, "aTexCoord"),
      color: gl.getAttribLocation(program, "aColor")
    };

    this.uniforms = {
      model: gl.getUniformLocation(program, "uModelMatrix"),
      view: gl.getUniformLocation(program, "uViewMatrix"),
      proj: gl.getUniformLocation(program, "uProjMatrix"),
      normalMatrix: gl.getUniformLocation(program, "uNormalMatrix"),
      lightPos1: gl.getUniformLocation(program, "uLightPos1"),
      lightColor1: gl.getUniformLocation(program, "uLightColor1"),
      lightPos2: gl.getUniformLocation(program, "uLightPos2"),
      lightColor2: gl.getUniformLocation(program, "uLightColor2"),
      viewPos: gl.getUniformLocation(program, "uViewPos"),
      damascusMode: gl.getUniformLocation(program, "uDamascusMode"),
      lightingTheme: gl.getUniformLocation(program, "uLightingTheme"),
      time: gl.getUniformLocation(program, "uTime"),
      gleam: gl.getUniformLocation(program, "uGleam")
    };

    this.buffers = {
      position: gl.createBuffer(),
      normal: gl.createBuffer(),
      color: gl.createBuffer(),
      index: gl.createBuffer()
    };
  }

  compileShader(type, source) {
    const gl = this.gl;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compile error: " + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  setupEvents() {
    const c = this.canvas;

    c.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.lastMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener("mouseup", () => {
      this.isDragging = false;
    });

    window.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastMousePos.x;
      const dy = e.clientY - this.lastMousePos.y;
      this.rotation.y += dx * 0.008;
      this.rotation.x += dy * 0.008;
      this.lastMousePos = { x: e.clientX, y: e.clientY };
    });

    // Touch Support with Two-Finger Pinch Zoom
    c.style.touchAction = "none";
    let initialPinchDist = 0;

    c.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.lastMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        this.isDragging = false;
        initialPinchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });

    c.addEventListener("touchmove", (e) => {
      if (e.touches.length === 1 && this.isDragging) {
        const dx = e.touches[0].clientX - this.lastMousePos.x;
        const dy = e.touches[0].clientY - this.lastMousePos.y;
        this.rotation.y += dx * 0.01;
        this.rotation.x += dy * 0.01;
        this.lastMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2 && initialPinchDist > 0) {
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = (initialPinchDist - currentDist) * 0.008;
        this.zoom = Math.max(1.8, Math.min(8.0, this.zoom + factor));
        initialPinchDist = currentDist;
      }
    }, { passive: true });

    c.addEventListener("touchend", () => {
      this.isDragging = false;
      initialPinchDist = 0;
    });

    // Zoom
    c.addEventListener("wheel", (e) => {
      e.preventDefault();
      this.zoom += e.deltaY * 0.003;
      this.zoom = Math.max(1.8, Math.min(8.0, this.zoom));
    }, { passive: false });
  }

  loadWeapon(weaponId) {
    this.currentWeaponId = weaponId;
    this.meshData = this.generateWeaponMesh(weaponId);
    this.uploadMeshBuffers();
    this.isActionActive = false;
  }

  uploadMeshBuffers() {
    if (!this.gl || !this.meshData) return;
    const gl = this.gl;

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.meshData.positions), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normal);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.meshData.normals), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.color);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.meshData.colors), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.index);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.meshData.indices), gl.STATIC_DRAW);

    this.indexCount = this.meshData.indices.length;
  }

  /**
   * PROCEDURAL 3D MESH GENERATOR FOR INDIAN HISTORIC WEAPONS
   */
  generateWeaponMesh(id) {
    const positions = [];
    const normals = [];
    const colors = [];
    const indices = [];

    // Helper functions for geometric primitives
    const addBox = (cx, cy, cz, wx, wy, wz, col) => {
      const x0 = cx - wx/2, x1 = cx + wx/2;
      const y0 = cy - wy/2, y1 = cy + wy/2;
      const z0 = cz - wz/2, z1 = cz + wz/2;

      const faces = [
        // Front (Z+)
        { n: [0, 0, 1], v: [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]] },
        // Back (Z-)
        { n: [0, 0, -1], v: [[x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0]] },
        // Top (Y+)
        { n: [0, 1, 0], v: [[x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0]] },
        // Bottom (Y-)
        { n: [0, -1, 0], v: [[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]] },
        // Right (X+)
        { n: [1, 0, 0], v: [[x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1]] },
        // Left (X-)
        { n: [-1, 0, 0], v: [[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]] }
      ];

      faces.forEach(f => {
        const base = positions.length / 3;
        f.v.forEach(pt => {
          positions.push(...pt);
          normals.push(...f.n);
          colors.push(...col);
        });
        indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
      });
    };

    const addCylinder = (cx, cy, cz, rTop, rBottom, height, segments, col, axis = 'y') => {
      const halfH = height / 2;
      const baseIdx = positions.length / 3;

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);

        let pBot, pTop, n;
        if (axis === 'y') {
          pBot = [cx + rBottom * cos, cy - halfH, cz + rBottom * sin];
          pTop = [cx + rTop * cos, cy + halfH, cz + rTop * sin];
          n = [cos, 0, sin];
        } else if (axis === 'z') {
          pBot = [cx + rBottom * cos, cy + rBottom * sin, cz - halfH];
          pTop = [cx + rTop * cos, cy + rTop * sin, cz + halfH];
          n = [cos, sin, 0];
        } else { // x
          pBot = [cx - halfH, cy + rBottom * cos, cz + rBottom * sin];
          pTop = [cx + halfH, cy + rTop * cos, cz + rTop * sin];
          n = [0, cos, sin];
        }

        positions.push(...pBot, ...pTop);
        normals.push(...n, ...n);
        colors.push(...col, ...col);
      }

      for (let i = 0; i < segments; i++) {
        const idx = baseIdx + i * 2;
        indices.push(idx, idx + 1, idx + 2);
        indices.push(idx + 1, idx + 3, idx + 2);
      }
    };

    // Steel & Gold Material Palettes
    const wootzSteel = [0.72, 0.76, 0.82];
    const brightSteel = [0.85, 0.88, 0.93];
    const goldBrass = [0.88, 0.72, 0.22];
    const darkWood = [0.38, 0.22, 0.12];
    const bronzeGunmetal = [0.65, 0.45, 0.25];
    const crimsonSilk = [0.75, 0.12, 0.16];

    // MESH BUILDERS FOR EACH WEAPON
    if (id === "khanda") {
      // 1. Double-edged heavy straight blade with spatulate tip
      for (let seg = 0; seg < 12; seg++) {
        const y0 = -0.5 + seg * 0.25;
        const y1 = y0 + 0.25;
        // Khanda widens toward the tip
        const width = 0.22 + (seg / 12) * 0.12;
        addBox(0, (y0 + y1)/2, 0, width, 0.25, 0.035, wootzSteel);
      }
      // Rounded spatulate tip reinforcement
      addBox(0, 2.58, 0, 0.32, 0.18, 0.05, goldBrass);
      // Spinal reinforcement rib along back
      addBox(0, 0.8, 0.022, 0.06, 2.4, 0.02, goldBrass);
      addBox(0, 0.8, -0.022, 0.06, 2.4, 0.02, goldBrass);

      // Traditional Hindu Basket Hilt
      addBox(0, -0.65, 0, 0.42, 0.06, 0.14, goldBrass); // Guard
      addCylinder(0, -0.95, 0, 0.05, 0.05, 0.45, 12, darkWood); // Grip
      // Basket knuckle guard
      for (let k = 0; k < 6; k++) {
        const ky = -0.68 - k * 0.07;
        const kz = 0.12 + Math.sin((k/5) * Math.PI) * 0.14;
        addBox(0, ky, kz, 0.04, 0.06, 0.04, goldBrass);
      }
      // Saucer disc pommel (Katori)
      addCylinder(0, -1.22, 0, 0.22, 0.22, 0.05, 16, goldBrass);
      // Long curving pommel spike (finger lever / stabbing spike)
      addCylinder(0, -1.55, 0.04, 0.015, 0.04, 0.55, 10, goldBrass);
    }
    else if (id === "talwar") {
      // Curved Cavalry Sabre
      const numSegments = 16;
      for (let i = 0; i < numSegments; i++) {
        const t0 = i / numSegments;
        const t1 = (i + 1) / numSegments;
        const y0 = -0.4 + t0 * 2.8;
        const y1 = -0.4 + t1 * 2.8;
        const curve0 = Math.pow(t0, 1.8) * 0.55;
        const curve1 = Math.pow(t1, 1.8) * 0.55;

        const mx = (curve0 + curve1) / 2;
        const my = (y0 + y1) / 2;
        const width = 0.18 - t0 * 0.06;
        addBox(mx, my, 0, width, 0.19, 0.028, wootzSteel);
      }
      // Disc pommel hilt
      addBox(0, -0.55, 0, 0.38, 0.05, 0.12, goldBrass);
      addCylinder(0, -0.85, 0, 0.045, 0.045, 0.42, 12, crimsonSilk);
      addCylinder(0, -1.1, 0, 0.24, 0.24, 0.04, 18, goldBrass);
      // Sunburst finial dome
      addCylinder(0, -1.2, 0, 0.02, 0.08, 0.16, 12, goldBrass);
    }
    else if (id === "chakram") {
      // Aerodynamic Toroidal Ring
      const ringSegments = 32;
      const radius = 1.35;
      for (let i = 0; i < ringSegments; i++) {
        const theta0 = (i / ringSegments) * Math.PI * 2;
        const theta1 = ((i + 1) / ringSegments) * Math.PI * 2;
        const cx = Math.cos((theta0 + theta1)/2) * radius;
        const cy = Math.sin((theta0 + theta1)/2) * radius;
        addBox(cx, cy, 0, 0.22, 0.22, 0.025, wootzSteel);
        // Outer beveled razor edge
        const ox = Math.cos((theta0 + theta1)/2) * (radius + 0.12);
        const oy = Math.sin((theta0 + theta1)/2) * (radius + 0.12);
        addBox(ox, oy, 0, 0.06, 0.06, 0.008, brightSteel);
        // Gold Damascened inlays on quarter rings
        if (i % 8 === 0) {
          addBox(cx, cy, 0.016, 0.16, 0.16, 0.012, goldBrass);
          addBox(cx, cy, -0.016, 0.16, 0.16, 0.012, goldBrass);
        }
      }
    }
    else if (id === "bhala") {
      // Long Thrusting Spear
      // Long Bamboo / Rosewood shaft
      addCylinder(0, -0.8, 0, 0.045, 0.045, 3.4, 12, darkWood);
      // Brass reinforcing bands
      [-2.1, -1.2, -0.3, 0.6].forEach(y => {
        addCylinder(0, y, 0, 0.055, 0.055, 0.08, 12, goldBrass);
      });
      // Spearhead brass socket collar
      addCylinder(0, 1.0, 0, 0.07, 0.05, 0.35, 14, goldBrass);
      // Broad Leaf Spearhead with blood fuller
      for (let j = 0; j < 8; j++) {
        const tj = j / 8;
        const y = 1.25 + tj * 1.5;
        // Leaf bulge
        const w = Math.sin(tj * Math.PI) * 0.32 + 0.06;
        addBox(0, y, 0, w, 0.2, 0.03, wootzSteel);
        // Center spine ridge
        addBox(0, y, 0, 0.04, 0.2, 0.055, brightSteel);
      }
      // Counterweight brass shoe at bottom
      addCylinder(0, -2.55, 0, 0.02, 0.06, 0.25, 12, goldBrass);
    }
    else if (id === "cannon") {
      // Zamburak / Heavy Bronze Topkhana
      // Main tapered barrel
      addCylinder(0, 0, 0, 0.18, 0.34, 3.0, 18, bronzeGunmetal, 'y');
      // Flared ornamental muzzle with dragon/lion teeth trim
      addCylinder(0, 1.55, 0, 0.28, 0.18, 0.2, 18, goldBrass, 'y');
      // Cascabel spherical knob at rear
      addCylinder(0, -1.6, 0, 0.08, 0.2, 0.25, 14, goldBrass, 'y');
      // Trunnions (Pivot cylinders for mounting)
      addCylinder(0, -0.2, 0, 0.09, 0.09, 0.95, 12, bronzeGunmetal, 'x');

      // Carriage bed (Teak siege carriage)
      addBox(0, -0.65, -0.4, 0.65, 1.8, 0.25, darkWood);
      // Heavy Spoked Iron-rimmed Wheels on sides
      [-0.55, 0.55].forEach(x => {
        addCylinder(x, -0.65, -0.4, 0.55, 0.55, 0.08, 18, darkWood, 'x');
        // Iron rim tire
        addCylinder(x, -0.65, -0.4, 0.58, 0.58, 0.04, 18, wootzSteel, 'x');
        // Brass Hubcap
        addCylinder(x, -0.65, -0.4, 0.15, 0.15, 0.15, 12, goldBrass, 'x');
      });
    }
    else if (id === "toradar") {
      // Long Indian Matchlock Musket
      // Long slender barrel
      addCylinder(0, 0.7, 0.04, 0.035, 0.045, 2.6, 12, wootzSteel, 'y');
      // Brass muzzle band
      addCylinder(0, 2.02, 0.04, 0.05, 0.05, 0.08, 12, goldBrass, 'y');
      // Full-length wooden stock (teak inlaid with bone/ivory)
      addBox(0, 0.15, -0.01, 0.11, 2.4, 0.11, darkWood);
      // Curved buttstock
      addBox(0, -1.35, -0.16, 0.1, 0.9, 0.22, darkWood);
      // Ivory buttplate
      addBox(0, -1.82, -0.22, 0.09, 0.08, 0.24, brightSteel);
      // Brass barrel retaining bands
      [-0.4, 0.2, 0.8, 1.4].forEach(y => {
        addCylinder(0, y, 0.035, 0.065, 0.065, 0.05, 12, goldBrass, 'y');
      });
      // Serpentine matchlock hammer & flashpan
      addBox(0.08, -0.15, 0.06, 0.04, 0.16, 0.08, goldBrass);
      addBox(0.08, -0.28, 0.02, 0.03, 0.12, 0.03, wootzSteel);
    }
    else if (id === "katar") {
      // Armor-Piercing Push Dagger
      // Broad triangular blade
      for (let k = 0; k < 8; k++) {
        const tk = k / 8;
        const y = 0.35 + tk * 1.6;
        const w = (1.0 - tk) * 0.44 + 0.04;
        addBox(0, y, 0, w, 0.22, 0.035, wootzSteel);
      }
      // Reinforced diamond armor-piercing tip
      addBox(0, 1.98, 0, 0.08, 0.15, 0.07, brightSteel);
      // Dual blood fullers
      addBox(-0.08, 0.95, 0.02, 0.03, 0.9, 0.01, goldBrass);
      addBox(0.08, 0.95, 0.02, 0.03, 0.9, 0.01, goldBrass);

      // H-frame Handlebars (Side guards)
      addBox(-0.25, -0.3, 0, 0.05, 1.3, 0.14, goldBrass);
      addBox(0.25, -0.3, 0, 0.05, 1.3, 0.14, goldBrass);
      // Twin crossbars (the push grip)
      addCylinder(0, -0.25, 0, 0.035, 0.035, 0.46, 12, goldBrass, 'x');
      addCylinder(0, -0.55, 0, 0.035, 0.035, 0.46, 12, goldBrass, 'x');
    }
    else if (id === "urumi") {
      // Flexible Multi-Bladed Whip Sword
      // Hilt guard & grip
      addCylinder(0, -1.0, 0, 0.22, 0.22, 0.04, 16, goldBrass);
      addCylinder(0, -1.25, 0, 0.045, 0.045, 0.4, 12, darkWood);
      addCylinder(0, -1.48, 0, 0.16, 0.16, 0.04, 14, goldBrass);

      // 3 Ribbon steel blades spiraling dynamically
      for (let b = 0; b < 3; b++) {
        const phaseOffset = b * (Math.PI * 2 / 3);
        const bladeSegments = 24;
        for (let s = 0; s < bladeSegments; s++) {
          const t = s / bladeSegments;
          const y = -0.9 + t * 2.8;
          const curveX = Math.sin(t * 7.0 + phaseOffset) * (0.2 + t * 0.4);
          const curveZ = Math.cos(t * 5.0 + phaseOffset) * (0.15 + t * 0.3);
          addBox(curveX, y, curveZ, 0.06, 0.14, 0.012, brightSteel);
        }
      }
    }

    return { positions, normals, colors, indices };
  }

  triggerActionAnimation() {
    this.isActionActive = true;
    this.actionTime = 0;

    // Generate weapon specific action particles
    this.particles = [];
    if (this.currentWeaponId === "cannon") {
      for (let i = 0; i < 40; i++) {
        this.particles.push({
          x: (Math.random() - 0.5) * 0.4,
          y: 1.6 + Math.random() * 0.8,
          z: (Math.random() - 0.5) * 0.4,
          vx: (Math.random() - 0.5) * 0.8,
          vy: 1.5 + Math.random() * 2.0,
          vz: (Math.random() - 0.5) * 0.8,
          life: 1.0,
          color: [1.0, 0.5 + Math.random() * 0.5, 0.1]
        });
      }
    }
  }

  setLightingTheme(theme) {
    this.lightingTheme = theme;
  }

  toggleAutoRotate() {
    this.autoRotate = !this.autoRotate;
    return this.autoRotate;
  }

  toggleDamascus() {
    this.damascusMode = !this.damascusMode;
    return this.damascusMode;
  }

  toggleWireframe() {
    this.wireframe = !this.wireframe;
    return this.wireframe;
  }

  startRenderLoop() {
    let lastTime = performance.now();

    const render = (now) => {
      const delta = (now - lastTime) * 0.001;
      lastTime = now;

      if (this.autoRotate && !this.isDragging) {
        if (this.currentWeaponId === "chakram") {
          this.rotation.z += delta * 4.5; // Rapid spin for Chakram
          this.rotation.y += delta * 0.4;
        } else {
          this.rotation.y += delta * 0.5;
        }
      }

      let gleamIntensity = 0.0;
      if (this.isActionActive) {
        this.actionTime += delta;
        gleamIntensity = 1.0;
        if (this.actionTime > 1.8) {
          this.isActionActive = false;
        }
      }

      this.drawScene(now * 0.001, gleamIntensity);
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  }

  drawScene(timeSec, gleam) {
    const gl = this.gl;
    if (!gl || !this.program) return;

    // Resize viewport
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
      gl.viewport(0, 0, width, height);
    }

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.04, 0.05, 0.08, 0.0); // Transparent for sleek card backdrop
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(this.program);

    // Matrix Mathematics
    const aspect = width / height;
    const projMatrix = this.createPerspectiveMatrix(45 * Math.PI / 180, aspect, 0.1, 100.0);
    const viewMatrix = this.createLookAtMatrix([0, 0, this.zoom], [0, 0, 0], [0, 1, 0]);

    // Model matrix with rotation
    let modelMatrix = this.createIdentityMatrix();
    modelMatrix = this.rotateX(modelMatrix, this.rotation.x);
    modelMatrix = this.rotateY(modelMatrix, this.rotation.y);
    modelMatrix = this.rotateZ(modelMatrix, this.rotation.z);

    // If cannon action, add recoil shake
    if (this.isActionActive && this.currentWeaponId === "cannon") {
      const recoil = Math.sin(this.actionTime * 18.0) * Math.exp(-this.actionTime * 3.0) * 0.25;
      modelMatrix = this.translate(modelMatrix, 0, -recoil, 0);
    }

    // Normal matrix
    const normalMatrix = this.extractNormalMatrix(modelMatrix);

    // Pass matrices
    gl.uniformMatrix4fv(this.uniforms.proj, false, new Float32Array(projMatrix));
    gl.uniformMatrix4fv(this.uniforms.view, false, new Float32Array(viewMatrix));
    gl.uniformMatrix4fv(this.uniforms.model, false, new Float32Array(modelMatrix));
    gl.uniformMatrix3fv(this.uniforms.normalMatrix, false, new Float32Array(normalMatrix));

    // Uniform values
    gl.uniform3f(this.uniforms.viewPos, 0, 0, this.zoom);
    gl.uniform1i(this.uniforms.damascusMode, this.damascusMode ? 1 : 0);
    gl.uniform1f(this.uniforms.time, timeSec);
    gl.uniform1f(this.uniforms.gleam, gleam);

    // Light Theme setup
    let themeInt = 0;
    if (this.lightingTheme === "forge_fire") {
      themeInt = 1;
      gl.uniform3f(this.uniforms.lightPos1, 2.5, 3.5, 3.5);
      gl.uniform3f(this.uniforms.lightColor1, 1.0, 0.45, 0.15); // Hot forge orange
      gl.uniform3f(this.uniforms.lightPos2, -3.0, -1.0, 2.0);
      gl.uniform3f(this.uniforms.lightColor2, 0.9, 0.2, 0.05); // Embers
    } else if (this.lightingTheme === "moonlit_battle") {
      themeInt = 2;
      gl.uniform3f(this.uniforms.lightPos1, 1.5, 4.0, 3.0);
      gl.uniform3f(this.uniforms.lightColor1, 0.4, 0.6, 1.0); // Cool moonlight
      gl.uniform3f(this.uniforms.lightPos2, -2.5, -2.0, 1.0);
      gl.uniform3f(this.uniforms.lightColor2, 0.2, 0.4, 0.7);
    } else { // Golden Palace (Default)
      themeInt = 0;
      gl.uniform3f(this.uniforms.lightPos1, 3.0, 4.0, 3.5);
      gl.uniform3f(this.uniforms.lightColor1, 1.0, 0.9, 0.65); // Warm royal gold
      gl.uniform3f(this.uniforms.lightPos2, -3.0, -2.0, 2.0);
      gl.uniform3f(this.uniforms.lightColor2, 0.6, 0.5, 0.4);
    }
    gl.uniform1i(this.uniforms.lightingTheme, themeInt);

    // Vertex Attributes Binding
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
    gl.vertexAttribPointer(this.attribs.position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(this.attribs.position);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normal);
    gl.vertexAttribPointer(this.attribs.normal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(this.attribs.normal);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.color);
    gl.vertexAttribPointer(this.attribs.color, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(this.attribs.color);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.index);

    const drawMode = this.wireframe ? gl.LINES : gl.TRIANGLES;
    gl.drawElements(drawMode, this.indexCount, gl.UNSIGNED_SHORT, 0);
  }

  initCanvasFallback() {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "#fbbf24";
    ctx.font = "16px sans-serif";
    ctx.fillText("3D Hardware Acceleration Loaded", 20, 40);
  }

  // Linear Algebra Helpers
  createIdentityMatrix() {
    return [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];
  }

  createPerspectiveMatrix(fovy, aspect, near, far) {
    const f = 1.0 / Math.tan(fovy / 2);
    const nf = 1 / (near - far);
    return [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (far + near) * nf, -1,
      0, 0, (2 * far * near) * nf, 0
    ];
  }

  createLookAtMatrix(eye, center, up) {
    let z0 = eye[0] - center[0];
    let z1 = eye[1] - center[1];
    let z2 = eye[2] - center[2];
    let len = 1 / Math.hypot(z0, z1, z2);
    z0 *= len; z1 *= len; z2 *= len;

    let x0 = up[1] * z2 - up[2] * z1;
    let x1 = up[2] * z0 - up[0] * z2;
    let x2 = up[0] * z1 - up[1] * z0;
    len = 1 / Math.hypot(x0, x1, x2);
    x0 *= len; x1 *= len; x2 *= len;

    let y0 = z1 * x2 - z2 * x1;
    let y1 = z2 * x0 - z0 * x2;
    let y2 = z0 * x1 - z1 * x0;

    return [
      x0, y0, z0, 0,
      x1, y1, z1, 0,
      x2, y2, z2, 0,
      -(x0 * eye[0] + x1 * eye[1] + x2 * eye[2]),
      -(y0 * eye[0] + y1 * eye[1] + y2 * eye[2]),
      -(z0 * eye[0] + z1 * eye[1] + z2 * eye[2]),
      1
    ];
  }

  rotateX(m, angle) {
    const c = Math.cos(angle), s = Math.sin(angle);
    const r = [...m];
    r[4] = m[4] * c + m[8] * s;
    r[5] = m[5] * c + m[9] * s;
    r[6] = m[6] * c + m[10] * s;
    r[7] = m[7] * c + m[11] * s;
    r[8] = m[8] * c - m[4] * s;
    r[9] = m[9] * c - m[5] * s;
    r[10] = m[10] * c - m[6] * s;
    r[11] = m[11] * c - m[7] * s;
    return r;
  }

  rotateY(m, angle) {
    const c = Math.cos(angle), s = Math.sin(angle);
    const r = [...m];
    r[0] = m[0] * c - m[8] * s;
    r[1] = m[1] * c - m[9] * s;
    r[2] = m[2] * c - m[10] * s;
    r[3] = m[3] * c - m[11] * s;
    r[8] = m[0] * s + m[8] * c;
    r[9] = m[1] * s + m[9] * c;
    r[10] = m[2] * s + m[10] * c;
    r[11] = m[3] * s + m[11] * c;
    return r;
  }

  rotateZ(m, angle) {
    const c = Math.cos(angle), s = Math.sin(angle);
    const r = [...m];
    r[0] = m[0] * c + m[4] * s;
    r[1] = m[1] * c + m[5] * s;
    r[2] = m[2] * c + m[6] * s;
    r[3] = m[3] * c + m[7] * s;
    r[4] = m[4] * c - m[0] * s;
    r[5] = m[5] * c - m[1] * s;
    r[6] = m[6] * c - m[2] * s;
    r[7] = m[7] * c - m[3] * s;
    return r;
  }

  translate(m, tx, ty, tz) {
    const r = [...m];
    r[12] = m[0] * tx + m[4] * ty + m[8] * tz + m[12];
    r[13] = m[1] * tx + m[5] * ty + m[9] * tz + m[13];
    r[14] = m[2] * tx + m[6] * ty + m[10] * tz + m[14];
    r[15] = m[3] * tx + m[7] * ty + m[11] * tz + m[15];
    return r;
  }

  extractNormalMatrix(m) {
    // 3x3 Upper-left inverse-transpose for normal transformation
    return [
      m[0], m[1], m[2],
      m[4], m[5], m[6],
      m[8], m[9], m[10]
    ];
  }
}

if (typeof window !== "undefined") {
  window.Weapons3DEngine = Weapons3DEngine;
}
