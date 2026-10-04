/**
 * CHRONICLES OF BHARATAVARSHA: SUBCONTINENT TERRITORIAL ENGINE & GTA V RADAR HUD
 * High-definition vector cartography of India & the subcontinent (320 BCE - 2026 CE),
 * dynamic territorial conquest/annexation polygons, and live GTA V circular mini-map HUD.
 */

class SubcontinentMapEngine {
  constructor(mainCanvasId, miniMapCanvasId) {
    this.mainCanvas = document.getElementById(mainCanvasId);
    this.miniCanvas = document.getElementById(miniMapCanvasId);

    if (this.mainCanvas) {
      this.ctx = this.mainCanvas.getContext("2d");
    }
    if (this.miniCanvas) {
      this.miniCtx = this.miniCanvas.getContext("2d");
    }

    this.currentYear = -322;
    this.activeDynastyId = "maurya";
    this.activeEventIndex = 0;
    this.focusLocation = { lat: 25.61, lon: 85.14, name: "Pataliputra" }; // Default Pataliputra
    this.radarAngle = 0;
    this.miniZoom = 1.0;
    this.isHoveringCity = null;

    // Viewport transform for main map
    this.view = {
      offsetX: 0,
      offsetY: 0,
      scale: 1.0,
      isPanning: false,
      panStart: { x: 0, y: 0 }
    };

    // Subcontinent Geographic Boundary Coordinates (Simplified high-fidelity polygon)
    // Longitude: 60E to 98E, Latitude: 5N to 38N
    this.subcontinentCoastline = [
      // Northwest / Balochistan / Indus Mouth
      { lon: 62.0, lat: 25.2 },
      { lon: 66.9, lat: 24.8 }, // Karachi
      { lon: 68.8, lat: 23.8 }, // Rann of Kutch
      { lon: 69.2, lat: 22.3 }, // Saurashtra / Dwarka
      { lon: 71.0, lat: 20.8 }, // Diu
      { lon: 72.8, lat: 21.2 }, // Surat
      { lon: 72.8, lat: 18.9 }, // Mumbai / Konkan
      { lon: 73.8, lat: 15.5 }, // Goa
      { lon: 74.8, lat: 12.9 }, // Mangalore / Malabar
      { lon: 76.2, lat: 9.9 },  // Kochi
      { lon: 77.5, lat: 8.1 },  // Kanyakumari (Cape Comorin)
      
      // Coromandel / Eastern Ghats / Bengal Coast
      { lon: 78.1, lat: 9.2 },  // Rameswaram
      { lon: 79.8, lat: 10.8 }, // Thanjavur / Kaveri Delta
      { lon: 80.3, lat: 13.1 }, // Chennai (Madras)
      { lon: 82.2, lat: 16.9 }, // Godavari / Kakinada
      { lon: 83.3, lat: 17.7 }, // Visakhapatnam
      { lon: 85.8, lat: 19.8 }, // Puri / Kalinga Coast
      { lon: 87.5, lat: 21.6 }, // Balasore
      { lon: 88.3, lat: 22.0 }, // Sundarbans / Ganga Delta
      { lon: 91.8, lat: 22.3 }, // Chittagong
      { lon: 92.8, lat: 20.2 }, // Arakan / Myanmar border

      // Northeast / Himalayas
      { lon: 95.5, lat: 27.5 }, // Assam / Brahmaputra upper
      { lon: 93.0, lat: 28.0 }, // Arunachal
      { lon: 88.5, lat: 27.8 }, // Sikkim
      { lon: 85.3, lat: 28.2 }, // Nepal / Everest range
      { lon: 81.0, lat: 30.5 }, // Uttarakhand / Garhwal
      { lon: 77.2, lat: 32.2 }, // Himachal Pradesh
      { lon: 75.0, lat: 35.5 }, // Ladakh / Karakoram
      { lon: 73.5, lat: 36.8 }, // Gilgit / Pamir Knot
      
      // Northwest / Hindu Kush / Afghan Satrapies
      { lon: 70.0, lat: 35.0 }, // Kabul / Khyber Pass
      { lon: 66.0, lat: 32.0 }, // Kandahar (Arachosia)
      { lon: 62.2, lat: 34.3 }, // Herat (Aria)
      { lon: 61.5, lat: 30.0 }  // Sistan / Gedrosia
    ];

    // Major River Arteries
    this.rivers = [
      // Indus
      { name: "Indus (Sindhu)", pts: [{ lon: 81.5, lat: 31.0 }, { lon: 76.8, lat: 34.0 }, { lon: 73.0, lat: 35.0 }, { lon: 71.5, lat: 32.5 }, { lon: 70.5, lat: 29.5 }, { lon: 68.0, lat: 26.0 }, { lon: 67.5, lat: 24.0 }] },
      // Ganga
      { name: "Ganga", pts: [{ lon: 78.5, lat: 31.0 }, { lon: 78.2, lat: 30.0 }, { lon: 80.3, lat: 26.5 }, { lon: 81.8, lat: 25.4 }, { lon: 83.0, lat: 25.3 }, { lon: 85.1, lat: 25.6 }, { lon: 88.0, lat: 24.5 }, { lon: 89.5, lat: 23.0 }] },
      // Yamuna
      { name: "Yamuna", pts: [{ lon: 78.4, lat: 31.0 }, { lon: 77.2, lat: 28.6 }, { lon: 78.0, lat: 27.2 }, { lon: 81.8, lat: 25.4 }] },
      // Brahmaputra
      { name: "Brahmaputra", pts: [{ lon: 95.0, lat: 29.0 }, { lon: 93.0, lat: 26.5 }, { lon: 90.0, lat: 26.0 }, { lon: 89.8, lat: 24.0 }] },
      // Narmada
      { name: "Narmada", pts: [{ lon: 81.8, lat: 22.7 }, { lon: 77.5, lat: 22.5 }, { lon: 74.0, lat: 21.8 }, { lon: 72.8, lat: 21.6 }] },
      // Godavari
      { name: "Godavari", pts: [{ lon: 73.5, lat: 19.9 }, { lon: 77.0, lat: 19.0 }, { lon: 80.0, lat: 18.5 }, { lon: 81.8, lat: 16.7 }] },
      // Krishna
      { name: "Krishna", pts: [{ lon: 73.7, lat: 17.9 }, { lon: 76.5, lat: 16.5 }, { lon: 78.0, lat: 16.0 }, { lon: 80.8, lat: 15.8 }] },
      // Kaveri
      { name: "Kaveri", pts: [{ lon: 75.5, lat: 12.4 }, { lon: 76.7, lat: 12.3 }, { lon: 78.5, lat: 11.0 }, { lon: 79.8, lat: 11.1 }] }
    ];

    // Major Historical Cities & Fortresses
    this.historicCities = [
      { id: "pataliputra", name: "Pataliputra (Patna)", lon: 85.14, lat: 25.61, dynasty: "Maurya / Gupta", type: "Imperial Capital" },
      { id: "taxila", name: "Taxila (Takshashila)", lon: 72.78, lat: 33.74, dynasty: "Maurya / Kushan", type: "University & Trade Hub" },
      { id: "kandahar", name: "Kandahar (Arachosia)", lon: 65.71, lat: 31.62, dynasty: "Maurya Gateway", type: "Northwestern Fortress" },
      { id: "kabul", name: "Kabul (Paropamisadae)", lon: 69.17, lat: 34.53, dynasty: "Maurya / Mughal", type: "Highland Citadel" },
      { id: "ujjain", name: "Ujjain (Avanti)", lon: 75.78, lat: 23.17, dynasty: "Gupta / Vikramaditya", type: "Astronomical & Cultural Seat" },
      { id: "kannauj", name: "Kannauj (Kanyakubja)", lon: 79.91, lat: 27.05, dynasty: "Harshavardhana", type: "Imperial City of Flowers" },
      { id: "thanjavur", name: "Thanjavur", lon: 79.13, lat: 10.78, dynasty: "Chola Empire", type: "Naval & Architectural Center" },
      { id: "hampi", name: "Hampi (Vijayanagara)", lon: 76.46, lat: 15.33, dynasty: "Vijayanagara", type: "City of Victory" },
      { id: "delhi", name: "Delhi (Shahjahanabad)", lon: 77.20, lat: 28.61, dynasty: "Mughal / Sultanate / Republic", type: "National Capital" },
      { id: "agra", name: "Agra", lon: 78.01, lat: 27.18, dynasty: "Mughal Empire", type: "Imperial Court & Taj Mahal" },
      { id: "raigad", name: "Raigad Fort", lon: 73.44, lat: 18.23, dynasty: "Maratha (Shivaji)", type: "Gibraltar of the East" },
      { id: "pune", name: "Pune (Shaniwar Wada)", lon: 73.85, lat: 18.52, dynasty: "Maratha Peshwas", type: "Confederacy Capital" },
      { id: "lahore", name: "Lahore", lon: 74.35, lat: 31.52, dynasty: "Sikh Empire / Mughal", type: "Sarkar-i-Khalsa Seat" },
      { id: "amritsar", name: "Amritsar (Golden Temple)", lon: 74.87, lat: 31.63, dynasty: "Sikh Empire", type: "Spiritual Sovereign Hub" },
      { id: "calcutta", name: "Calcutta (Fort William)", lon: 88.36, lat: 22.57, dynasty: "East India Company", type: "Colonial Commercial Capital" },
      { id: "mumbai", name: "Mumbai (Bombay)", lon: 72.87, lat: 18.92, dynasty: "EIC / Modern India", type: "Financial Capital" },
      { id: "jhansi", name: "Jhansi Fort", lon: 78.58, lat: 25.45, dynasty: "Rani Lakshmibai", type: "1857 Rebellion Epicenter" },
      { id: "plassey", name: "Plassey (Palashi)", lon: 88.25, lat: 23.80, dynasty: "Battle of 1757", type: "Turning Point of India" }
    ];

    this.setupMainCanvasEvents();
    this.startRadarLoop();
  }

  zoomIn() {
    this.view.scale = Math.min(3.8, this.view.scale * 1.25);
    this.renderMainMap();
  }

  zoomOut() {
    this.view.scale = Math.max(0.5, this.view.scale * 0.8);
    this.renderMainMap();
  }

  resetView() {
    this.view.scale = 1.0;
    this.view.offsetX = 0;
    this.view.offsetY = 0;
    this.renderMainMap();
  }

  setupMainCanvasEvents() {
    if (!this.mainCanvas) return;
    const c = this.mainCanvas;

    c.addEventListener("mousedown", (e) => {
      this.view.isPanning = true;
      this.view.panStart = { x: e.clientX - this.view.offsetX, y: e.clientY - this.view.offsetY };
    });

    window.addEventListener("mouseup", () => {
      this.view.isPanning = false;
    });

    c.addEventListener("mousemove", (e) => {
      const rect = c.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (this.view.isPanning) {
        this.view.offsetX = e.clientX - this.view.panStart.x;
        this.view.offsetY = e.clientY - this.view.panStart.y;
        this.renderMainMap();
      } else {
        this.checkCityHover(mouseX, mouseY);
      }
    });

    c.addEventListener("wheel", (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.88;
      this.view.scale = Math.max(0.6, Math.min(3.5, this.view.scale * zoomFactor));
      this.renderMainMap();
    }, { passive: false });

    c.addEventListener("click", (e) => {
      const rect = c.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const clickedCity = this.getCityAt(mouseX, mouseY);
      if (clickedCity) {
        this.focusOnLocation(clickedCity.lat, clickedCity.lon, clickedCity.name);
        if (typeof window.onCitySelect === "function") {
          window.onCitySelect(clickedCity);
        }
      }
    });
  }

  geoToScreen(lon, lat, width, height) {
    // Map bounding box: Lon [60, 98], Lat [6, 38]
    const minLon = 60.0, maxLon = 98.0;
    const minLat = 6.0, maxLat = 38.0;

    const xNorm = (lon - minLon) / (maxLon - minLon);
    const yNorm = 1.0 - (lat - minLat) / (maxLat - minLat); // Invert Y for screen coordinates

    const baseWidth = width * 0.85;
    const baseHeight = height * 0.90;
    const padX = width * 0.08;
    const padY = height * 0.05;

    const screenX = padX + xNorm * baseWidth;
    const screenY = padY + yNorm * baseHeight;

    return {
      x: (screenX - width/2) * this.view.scale + width/2 + this.view.offsetX,
      y: (screenY - height/2) * this.view.scale + height/2 + this.view.offsetY
    };
  }

  screenToGeo(sx, sy, width, height) {
    const unscaledX = (sx - width/2 - this.view.offsetX) / this.view.scale + width/2;
    const unscaledY = (sy - height/2 - this.view.offsetY) / this.view.scale + height/2;

    const baseWidth = width * 0.85;
    const baseHeight = height * 0.90;
    const padX = width * 0.08;
    const padY = height * 0.05;

    const minLon = 60.0, maxLon = 98.0;
    const minLat = 6.0, maxLat = 38.0;

    const xNorm = (unscaledX - padX) / baseWidth;
    const yNorm = 1.0 - (unscaledY - padY) / baseHeight;

    return {
      lon: minLon + xNorm * (maxLon - minLon),
      lat: minLat + yNorm * (maxLat - minLat)
    };
  }

  setYear(year) {
    this.currentYear = year;
    // Find closest event
    if (window.TIMELINE_EVENTS) {
      let closestIdx = 0;
      let minDiff = Infinity;
      window.TIMELINE_EVENTS.forEach((evt, idx) => {
        const diff = Math.abs(evt.year - year);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      this.activeEventIndex = closestIdx;
      const evt = window.TIMELINE_EVENTS[closestIdx];
      this.activeDynastyId = evt.dynastyId;
      this.focusLocation = { lat: evt.coordinates.lat, lon: evt.coordinates.lon, name: evt.title };
    }
    this.renderMainMap();
    this.renderMiniMap();
  }

  focusOnLocation(lat, lon, name = "") {
    this.focusLocation = { lat, lon, name };
    this.renderMainMap();
    this.renderMiniMap();
  }

  checkCityHover(mx, my) {
    const hovered = this.getCityAt(mx, my);
    if (hovered !== this.isHoveringCity) {
      this.isHoveringCity = hovered;
      this.mainCanvas.style.cursor = hovered ? "pointer" : "grab";
      this.renderMainMap();
    }
  }

  getCityAt(mx, my) {
    const width = this.mainCanvas.width;
    const height = this.mainCanvas.height;

    for (const city of this.historicCities) {
      const pos = this.geoToScreen(city.lon, city.lat, width, height);
      const dist = Math.hypot(mx - pos.x, my - pos.y);
      if (dist < 14) {
        return city;
      }
    }
    return null;
  }

  /**
   * MAIN SUB-CONTINENT MAP RENDERER
   */
  renderMainMap() {
    const c = this.mainCanvas;
    const ctx = this.ctx;
    if (!c || !ctx) return;

    const width = c.clientWidth;
    const height = c.clientHeight;
    if (c.width !== width || c.height !== height) {
      c.width = width;
      c.height = height;
    }

    // Deep Ocean / Historical Parchment backdrop
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#080c14");
    grad.addColorStop(0.5, "#0b121e");
    grad.addColorStop(1, "#070b12");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle tactical grid lines (GTA V GPS style)
    ctx.strokeStyle = "rgba(56, 189, 248, 0.04)";
    ctx.lineWidth = 1;
    const gridSize = 45 * this.view.scale;
    for (let x = (this.view.offsetX % gridSize); x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = (this.view.offsetY % gridSize); y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 1. Draw Landmass Base (Indian Subcontinent & Neighboring Regions)
    ctx.beginPath();
    this.subcontinentCoastline.forEach((pt, i) => {
      const pos = this.geoToScreen(pt.lon, pt.lat, width, height);
      if (i === 0) ctx.moveTo(pos.x, pos.y);
      else ctx.lineTo(pos.x, pos.y);
    });
    ctx.closePath();

    ctx.fillStyle = "#151e2e";
    ctx.fill();
    ctx.strokeStyle = "rgba(148, 163, 184, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Sri Lanka Island
    const sriLankaPts = [
      { lon: 79.8, lat: 9.6 },
      { lon: 81.8, lat: 8.5 },
      { lon: 81.9, lat: 6.8 },
      { lon: 80.5, lat: 5.9 },
      { lon: 79.8, lat: 7.0 }
    ];
    ctx.beginPath();
    sriLankaPts.forEach((pt, i) => {
      const pos = this.geoToScreen(pt.lon, pt.lat, width, height);
      if (i === 0) ctx.moveTo(pos.x, pos.y);
      else ctx.lineTo(pos.x, pos.y);
    });
    ctx.closePath();
    ctx.fillStyle = "#151e2e";
    ctx.fill();
    ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
    ctx.stroke();

    // 2. Draw Major Sacred Rivers
    ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
    ctx.lineWidth = 1.5 * this.view.scale;
    this.rivers.forEach(r => {
      ctx.beginPath();
      r.pts.forEach((pt, i) => {
        const pos = this.geoToScreen(pt.lon, pt.lat, width, height);
        if (i === 0) ctx.moveTo(pos.x, pos.y);
        else ctx.lineTo(pos.x, pos.y);
      });
      ctx.stroke();
    });

    // 3. Render Historical Imperial Territory Polygon
    this.renderTerritoryOverlay(ctx, width, height);

    // 4. Render Cities and Capital Fortresses
    this.historicCities.forEach(city => {
      const pos = this.geoToScreen(city.lon, city.lat, width, height);
      const isHovered = this.isHoveringCity && this.isHoveringCity.id === city.id;
      const isTarget = Math.hypot(city.lat - this.focusLocation.lat, city.lon - this.focusLocation.lon) < 0.3;

      // Glow ring for focus target
      if (isTarget) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 14 * this.view.scale, 0, Math.PI * 2);
        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Outer pin circle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, (isHovered ? 7 : 4.5) * this.view.scale, 0, Math.PI * 2);
      ctx.fillStyle = isTarget ? "#fbbf24" : (isHovered ? "#38bdf8" : "#94a3b8");
      ctx.fill();
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // City Label
      ctx.font = `${Math.max(10, 11 * this.view.scale)}px sans-serif`;
      ctx.fillStyle = isTarget ? "#fef08a" : (isHovered ? "#ffffff" : "#cbd5e1");
      ctx.shadowColor = "rgba(0,0,0,0.8)";
      ctx.shadowBlur = 4;
      ctx.fillText(city.name, pos.x + 8, pos.y + 4);
      ctx.shadowBlur = 0;
    });

    // 5. Draw Tactical Crosshair / Focus Marker on Active Historic Coordinates
    const targetPos = this.geoToScreen(this.focusLocation.lon, this.focusLocation.lat, width, height);
    this.drawTacticalPin(ctx, targetPos.x, targetPos.y, this.focusLocation.name);
  }

  drawTacticalPin(ctx, x, y, label) {
    ctx.save();
    // Pulse circle
    const pulse = (Math.sin(Date.now() * 0.005) + 1) * 0.5;
    ctx.beginPath();
    ctx.arc(x, y, 16 + pulse * 8, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(234, 88, 12, ${0.4 + pulse * 0.4})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Crosshair lines
    ctx.strokeStyle = "#f97316";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x - 22, y); ctx.lineTo(x + 22, y);
    ctx.moveTo(x, y - 22); ctx.lineTo(x, y + 22);
    ctx.stroke();

    // Central core
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#ef4444";
    ctx.fill();

    // HUD Label Banner
    if (label) {
      ctx.font = "bold 11px monospace";
      const txt = `[ TARGET: ${label.toUpperCase()} ]`;
      const w = ctx.measureText(txt).width;
      ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
      ctx.fillRect(x - w/2 - 6, y - 36, w + 12, 18);
      ctx.strokeStyle = "#f97316";
      ctx.strokeRect(x - w/2 - 6, y - 36, w + 12, 18);
      ctx.fillStyle = "#fdba74";
      ctx.fillText(txt, x - w/2, y - 23);
    }
    ctx.restore();
  }

  /**
   * DYNAMIC HISTORICAL TERRITORY OVERLAY GENERATOR
   * Produces crystal clear territorial boundaries for Chandragupta Maurya, Ashoka,
   * Guptas, Cholas, Mughals, Marathas, EIC Expansion, and modern India.
   */
  renderTerritoryOverlay(ctx, width, height) {
    const yr = this.currentYear;
    let territoryCoords = [];
    let fillColor = "rgba(217, 119, 6, 0.35)"; // Amber default
    let strokeColor = "#f59e0b";
    let empireLabel = "Imperial Dominion";

    // 1. CHANDRAGUPTA MAURYA & ASHOKA (322 BCE – 185 BCE)
    if (yr <= -185) {
      empireLabel = yr <= -298 ? "CHANDRAGUPTA MAURYA'S EMPIRE (322–298 BCE)" : "SAMRAT ASHOKA THE GREAT'S MAURYAN EMPIRE (261 BCE)";
      fillColor = "rgba(217, 119, 6, 0.40)"; // Deep Mauryan Saffron
      strokeColor = "#fbbf24";

      // Vast territory: Kandahar, Kabul, Herat, Taxila, Punjab, Magadha, Gujarat, Deccan down to Mysore
      territoryCoords = [
        { lon: 62.5, lat: 34.0 }, // Herat
        { lon: 69.2, lat: 34.8 }, // Kabul
        { lon: 73.0, lat: 34.0 }, // Taxila
        { lon: 77.0, lat: 32.0 }, // Himalayas border
        { lon: 85.0, lat: 28.5 }, // Nepal border
        { lon: 92.5, lat: 26.5 }, // Assam frontier
        { lon: 90.0, lat: 22.0 }, // Bengal Delta
        { lon: 86.0, lat: 20.0 }, // Kalinga (annexed 261 BCE)
        { lon: 80.5, lat: 14.5 }, // Andhra / Krishna
        { lon: 76.5, lat: 12.5 }, // Mysore / Karnataka boundary
        { lon: 73.5, lat: 16.0 }, // Western Ghats
        { lon: 70.0, lat: 21.0 }, // Saurashtra / Girnar Edicts
        { lon: 66.5, lat: 25.0 }, // Baluchistan (Gedrosia)
        { lon: 65.5, lat: 31.5 }  // Kandahar (Arachosia)
      ];
    }
    // 2. KUSHAN & SATAVAHANA (30 CE – 300 CE)
    else if (yr > -185 && yr <= 300) {
      empireLabel = "KUSHAN EMPIRE & SATAVAHANA DUAL POWER (127 CE)";
      fillColor = "rgba(185, 28, 28, 0.35)";
      strokeColor = "#f87171";

      territoryCoords = [
        { lon: 66.0, lat: 36.0 }, // Bactria
        { lon: 72.0, lat: 34.0 }, // Gandhara
        { lon: 76.0, lat: 31.0 }, // Punjab
        { lon: 78.0, lat: 27.5 }, // Mathura (Kushan Capital)
        { lon: 83.0, lat: 25.5 }, // Varanasi
        { lon: 80.0, lat: 23.0 }, // Central India
        { lon: 75.0, lat: 20.0 }, // Northern Deccan
        { lon: 70.0, lat: 23.0 }, // Gujarat
        { lon: 67.0, lat: 30.0 }  // Bolan Pass
      ];
    }
    // 3. GUPTA GOLDEN AGE (320 CE – 550 CE)
    else if (yr > 300 && yr <= 550) {
      empireLabel = "GUPTA EMPIRE: SAMUDRAGUPTA & VIKRAMADITYA (320–550 CE)";
      fillColor = "rgba(180, 83, 9, 0.38)";
      strokeColor = "#f59e0b";

      territoryCoords = [
        { lon: 71.0, lat: 32.5 }, // Western Punjab border
        { lon: 77.0, lat: 30.0 }, // Mathura / Delhi
        { lon: 85.0, lat: 27.5 }, // Gangetic Core
        { lon: 91.5, lat: 25.5 }, // Kamarupa (Assam frontier)
        { lon: 90.0, lat: 22.0 }, // Bengal (Gauda)
        { lon: 86.0, lat: 20.5 }, // Odisha
        { lon: 79.0, lat: 21.0 }, // Vakataka border
        { lon: 73.0, lat: 22.0 }, // Gujarat (conquered by Vikramaditya)
        { lon: 70.0, lat: 23.5 }, // Saurashtra
        { lon: 72.5, lat: 28.0 }  // Thar desert edge
      ];
    }
    // 4. HARSHAVARDHANA (606 CE – 647 CE)
    else if (yr > 550 && yr <= 750) {
      empireLabel = "EMPIRE OF HARSHA (NORTH) & PULAKESHIN II (SOUTH)";
      fillColor = "rgba(220, 38, 38, 0.35)";
      strokeColor = "#ef4444";

      territoryCoords = [
        { lon: 73.5, lat: 31.5 }, // Punjab
        { lon: 79.5, lat: 28.5 }, // Thanesar & Kannauj
        { lon: 88.5, lat: 25.0 }, // Gauda / Bengal
        { lon: 86.0, lat: 21.0 }, // Utkala
        { lon: 74.0, lat: 21.8 }, // Narmada River (South boundary vs Pulakeshin II)
        { lon: 71.5, lat: 22.5 }  // Vallabhi
      ];
    }
    // 5. CHOLA MARITIME EMPIRE (848 CE – 1279 CE)
    else if (yr > 750 && yr <= 1279) {
      empireLabel = "IMPERIAL CHOLA MARITIME THALASSOCRACY (985–1044 CE)";
      fillColor = "rgba(185, 28, 28, 0.42)";
      strokeColor = "#fbbf24";

      territoryCoords = [
        { lon: 74.5, lat: 14.0 }, // Western Ghats
        { lon: 80.0, lat: 17.5 }, // Vengi / Godavari
        { lon: 86.0, lat: 21.5 }, // Gangetic Expedition path
        { lon: 87.0, lat: 20.0 }, // Bay of Bengal maritime arc
        { lon: 82.0, lat: 6.5 },  // Sri Lanka (Ilamandalalam annexed)
        { lon: 77.0, lat: 8.0 },  // Kanyakumari
        { lon: 75.5, lat: 11.0 }  // Chera coast / Kerala
      ];
    }
    // 6. VIJAYANAGARA EMPIRE (1336 CE – 1526 CE)
    else if (yr > 1279 && yr <= 1526) {
      empireLabel = "VIJAYANAGARA EMPIRE: KRISHNADEVARAYA (1509–1529 CE)";
      fillColor = "rgba(217, 119, 6, 0.40)";
      strokeColor = "#f59e0b";

      territoryCoords = [
        { lon: 73.5, lat: 16.0 }, // Goa / West Coast
        { lon: 76.5, lat: 16.5 }, // Raichur Doab (Battle of Raichur 1520)
        { lon: 80.5, lat: 16.0 }, // Krishna Delta
        { lon: 80.0, lat: 12.0 }, // Coromandel Coast
        { lon: 77.5, lat: 8.2 },  // Cape Comorin
        { lon: 75.5, lat: 11.5 }  // Malabar
      ];
    }
    // 7. MUGHAL EMPIRE ZENITH (1526 CE – 1707 CE)
    else if (yr > 1526 && yr <= 1707) {
      empireLabel = yr < 1658 ? "MUGHAL EMPIRE: AKBAR TO SHAH JAHAN" : "MUGHAL EMPIRE ZENITH UNDER AURANGZEB (1700 CE)";
      fillColor = "rgba(4, 120, 87, 0.42)"; // Emerald Green
      strokeColor = "#10b981";

      territoryCoords = [
        { lon: 68.5, lat: 34.5 }, // Kabul
        { lon: 73.0, lat: 34.0 }, // Peshawar
        { lon: 75.0, lat: 32.0 }, // Lahore
        { lon: 77.2, lat: 28.6 }, // Delhi
        { lon: 88.0, lat: 26.0 }, // Bengal
        { lon: 91.5, lat: 23.5 }, // Chittagong
        { lon: 85.0, lat: 20.0 }, // Cuttack
        { lon: 79.5, lat: 13.0 }, // Jinji / Deccan extreme
        { lon: 74.0, lat: 16.0 }, // Bijapur
        { lon: 70.0, lat: 21.0 }, // Gujarat
        { lon: 67.0, lat: 25.0 }  // Sindh
      ];
    }
    // 8. MARATHA EMPIRE & SWARAJYA (1674 CE – 1800 CE)
    else if (yr > 1707 && yr <= 1761) {
      empireLabel = "MARATHA CONFEDERACY: ATTOCK TO THANJAVUR (1758 CE)";
      fillColor = "rgba(234, 88, 12, 0.45)"; // Saffron Bhagwa
      strokeColor = "#f97316";

      territoryCoords = [
        { lon: 72.5, lat: 33.9 }, // Attock Fort on Indus (Bhagwa Dhwaj planted 1758)
        { lon: 74.5, lat: 31.5 }, // Lahore
        { lon: 77.2, lat: 28.6 }, // Delhi (Maratha protection)
        { lon: 83.0, lat: 25.0 }, // Bundelkhand / Varanasi
        { lon: 86.0, lat: 21.0 }, // Cuttack (Bhonsles)
        { lon: 79.0, lat: 11.0 }, // Thanjavur Maratha principality
        { lon: 74.0, lat: 14.5 }, // Western Ghats / Konkan
        { lon: 73.4, lat: 18.2 }, // Raigad & Pune heartland
        { lon: 70.5, lat: 22.0 }, // Gujarat (Gaekwads)
        { lon: 73.0, lat: 27.0 }  // Rajasthan (tributary)
      ];
    }
    // 9. BRITISH EAST INDIA COMPANY EXPANSION PHASES (1757 CE – 1858 CE)
    else if (yr > 1761 && yr <= 1858) {
      empireLabel = yr < 1800 ? "EIC EXPANSION: BENGAL & MYSORE (1757–1799)" : "EIC PARAMOUNTCY: MARATHA & PUNJAB ANNEXATIONS (1818–1849)";
      fillColor = "rgba(220, 38, 38, 0.45)"; // British Redcoat Crimson
      strokeColor = "#f87171";

      if (yr <= 1799) {
        // Bengal, Bihar, Northern Circars, and Mysore partition
        territoryCoords = [
          { lon: 83.0, lat: 25.5 }, // Buxar / Bihar
          { lon: 88.5, lat: 26.0 }, // Bengal
          { lon: 90.5, lat: 23.0 }, // Calcutta
          { lon: 85.5, lat: 20.0 }, // Cuttack
          { lon: 82.0, lat: 16.5 }, // Northern Circars
          { lon: 80.0, lat: 13.0 }, // Madras Presidency
          { lon: 76.5, lat: 11.5 }, // Malabar / Seringapatam (1799)
          { lon: 72.8, lat: 18.9 }, // Bombay Island
          { lon: 72.5, lat: 21.5 }  // Surat
        ];
      } else {
        // Post-1818 & 1849: Across Maharashtra, Central Provinces, Sindh, Punjab, Awadh
        territoryCoords = [
          { lon: 71.5, lat: 34.0 }, // Peshawar
          { lon: 74.5, lat: 32.0 }, // Punjab (annexed 1849)
          { lon: 67.5, lat: 25.0 }, // Sindh (annexed 1843)
          { lon: 72.8, lat: 18.9 }, // Bombay Presidency (1818)
          { lon: 76.5, lat: 11.5 }, // Madras Presidency
          { lon: 80.5, lat: 14.0 }, // Coromandel
          { lon: 88.5, lat: 24.0 }, // Bengal
          { lon: 81.0, lat: 26.8 }, // Awadh (annexed 1856)
          { lon: 78.5, lat: 25.5 }, // Jhansi (annexed 1853)
          { lon: 77.2, lat: 28.6 }  // Delhi
        ];
      }
    }
    // 10. MODERN REPUBLIC OF INDIA (1947 CE – 2026 CE)
    else {
      empireLabel = "SOVEREIGN DEMOCRATIC REPUBLIC OF INDIA (1947–2026 CE)";
      fillColor = "rgba(34, 197, 94, 0.38)"; // Tricolor Green/Saffron glow
      strokeColor = "#4ade80";

      // Comprehensive 28 states & 8 UTs sovereign boundaries
      territoryCoords = [
        { lon: 74.8, lat: 36.8 }, // Siachen / Karakoram
        { lon: 78.5, lat: 34.0 }, // Ladakh
        { lon: 81.0, lat: 30.5 }, // Uttarakhand
        { lon: 88.5, lat: 27.5 }, // Sikkim
        { lon: 96.5, lat: 28.0 }, // Arunachal (Kibithu)
        { lon: 93.0, lat: 24.0 }, // Northeast frontiers
        { lon: 89.0, lat: 22.0 }, // West Bengal
        { lon: 85.5, lat: 19.5 }, // Odisha
        { lon: 80.3, lat: 13.1 }, // Tamil Nadu
        { lon: 77.5, lat: 8.1 },  // Kanyakumari
        { lon: 74.0, lat: 15.5 }, // Goa
        { lon: 72.8, lat: 19.0 }, // Mumbai
        { lon: 68.7, lat: 23.7 }, // Gujarat (Sir Creek)
        { lon: 71.0, lat: 28.0 }, // Rajasthan
        { lon: 74.5, lat: 32.5 }  // Punjab border
      ];
    }

    // Draw the territory polygon
    ctx.save();
    ctx.beginPath();
    territoryCoords.forEach((pt, idx) => {
      const pos = this.geoToScreen(pt.lon, pt.lat, width, height);
      if (idx === 0) ctx.moveTo(pos.x, pos.y);
      else ctx.lineTo(pos.x, pos.y);
    });
    ctx.closePath();

    ctx.fillStyle = fillColor;
    ctx.fill();

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2.5 * this.view.scale;
    ctx.shadowColor = strokeColor;
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.restore();

    // Territory Watermark HUD Banner on Map
    ctx.save();
    ctx.font = "bold 13px monospace";
    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.fillRect(16, 16, ctx.measureText(empireLabel).width + 24, 28);
    ctx.strokeStyle = strokeColor;
    ctx.strokeRect(16, 16, ctx.measureText(empireLabel).width + 24, 28);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(empireLabel, 28, 35);
    ctx.restore();
  }

  /**
   * GTA V STYLE RADAR / MINI-MAP HUD
   * Renders in real-time on circular mini-canvas with rotating compass,
   * range rings, radar sweep, and player blip.
   */
  startRadarLoop() {
    const loop = () => {
      this.radarAngle += 0.035; // 360 radar rotation sweep
      this.renderMiniMap();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  renderMiniMap() {
    const c = this.miniCanvas;
    const ctx = this.miniCtx;
    if (!c || !ctx) return;

    const size = c.clientWidth;
    if (c.width !== size || c.height !== size) {
      c.width = size;
      c.height = size;
    }

    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 8;

    ctx.clearRect(0, 0, size, size);

    // Save for circular radar clipping
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();

    // GTA V Dark Tactical Glass Background
    const bgGrad = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius);
    bgGrad.addColorStop(0, "rgba(8, 14, 24, 0.95)");
    bgGrad.addColorStop(1, "rgba(2, 6, 12, 0.98)");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, size, size);

    // Concentric Range Rings
    ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
    ctx.lineWidth = 1;
    [0.35, 0.65, 0.95].forEach(rRatio => {
      ctx.beginPath();
      ctx.arc(cx, cy, radius * rRatio, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Cross grid lines
    ctx.beginPath();
    ctx.moveTo(cx, cy - radius); ctx.lineTo(cx, cy + radius);
    ctx.moveTo(cx - radius, cy); ctx.lineTo(cx + radius, cy);
    ctx.stroke();

    // Draw Mini Coastline inside radar centered around focusLocation
    ctx.save();
    ctx.translate(cx, cy);
    const radarScale = 5.5 * this.miniZoom;

    ctx.beginPath();
    this.subcontinentCoastline.forEach((pt, i) => {
      const rx = (pt.lon - this.focusLocation.lon) * radarScale;
      const ry = -(pt.lat - this.focusLocation.lat) * radarScale; // Flip Y
      if (i === 0) ctx.moveTo(rx, ry);
      else ctx.lineTo(rx, ry);
    });
    ctx.closePath();
    ctx.fillStyle = "rgba(30, 41, 59, 0.85)";
    ctx.fill();
    ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Draw Nearby City Blips on radar
    this.historicCities.forEach(city => {
      const rx = (city.lon - this.focusLocation.lon) * radarScale;
      const ry = -(city.lat - this.focusLocation.lat) * radarScale;
      const dist = Math.hypot(rx, ry);
      if (dist < radius - 6) {
        ctx.beginPath();
        ctx.arc(rx, ry, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#38bdf8";
        ctx.fill();
      }
    });

    ctx.restore();

    // GTA V Radar Sweep Beam (Rotating green/cyan cone)
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.radarAngle);
    const sweepGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, radius);
    sweepGrad.addColorStop(0, "rgba(34, 197, 94, 0.35)");
    sweepGrad.addColorStop(1, "rgba(34, 197, 94, 0.0)");

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, 0, Math.PI * 0.35);
    ctx.closePath();
    ctx.fillStyle = sweepGrad;
    ctx.fill();
    ctx.restore();

    // Player Focus Blip (Center of Radar)
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#f97316";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // End Circular Clipping
    ctx.restore();

    // Circular Outer Border with Degree Ticks (GTA V Style)
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.7)";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // North 'N' Indicator on top
    ctx.save();
    ctx.font = "bold 11px sans-serif";
    ctx.fillStyle = "#ef4444";
    ctx.textAlign = "center";
    ctx.fillText("N", cx, cy - radius + 14);

    // Degree ticks
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 1.5;
    for (let deg = 0; deg < 360; deg += 30) {
      const rad = (deg * Math.PI) / 180;
      const x1 = cx + Math.cos(rad) * (radius - 5);
      const y1 = cy + Math.sin(rad) * (radius - 5);
      const x2 = cx + Math.cos(rad) * radius;
      const y2 = cy + Math.sin(rad) * radius;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.restore();
  }
}

if (typeof window !== "undefined") {
  window.SubcontinentMapEngine = SubcontinentMapEngine;
}
