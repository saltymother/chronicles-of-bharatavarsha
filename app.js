/**
 * CHRONICLES OF BHARATAVARSHA: MAIN ORCHESTRATOR & APPLICATION ENGINE
 * Coordinates 3D Picture Frames, Subcontinent Territorial Conquest Map,
 * WebGL 3D Armory, Procedural Audio FX & Grand Court Modal.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Subsystems
  const audioEngine = new HistoricalAudioEngine();
  const mapEngine = new SubcontinentMapEngine("subcontinentMapCanvas", "gtavMiniMapCanvas");
  const weaponsEngine = new Weapons3DEngine("weapon3DCanvas");

  window.audioEngine = audioEngine;
  window.mapEngine = mapEngine;
  window.weaponsEngine = weaponsEngine;

  // State
  let activeTab = "gallery";
  let isPlayingTimeline = false;
  let timelineInterval = null;

  // DOM Elements
  const navTabs = document.querySelectorAll(".nav-tab-btn");
  const appViews = document.querySelectorAll(".app-view");
  const galleryGrid = document.getElementById("galleryGrid");
  const courtModal = document.getElementById("courtModal");
  const courtModalClose = document.getElementById("courtModalClose");
  const courtModalContent = document.getElementById("courtModalContent");

  // Audio Buttons
  const toggleSoundBtn = document.getElementById("toggleSoundBtn");
  const playShankhaBtn = document.getElementById("playShankhaBtn");
  const playDrumsBtn = document.getElementById("playDrumsBtn");
  const ambientMusicBtn = document.getElementById("ambientMusicBtn");

  // Timeline Scrubber Elements
  const timelineSlider = document.getElementById("timelineSlider");
  const activeYearDisplay = document.getElementById("activeYearDisplay");
  const playTimelineBtn = document.getElementById("playTimelineBtn");
  const prevEventBtn = document.getElementById("prevEventBtn");
  const nextEventBtn = document.getElementById("nextEventBtn");

  // Annexation Ledger Elements
  const ledgerDynastyBadge = document.getElementById("ledgerDynastyBadge");
  const ledgerTitle = document.getElementById("ledgerTitle");
  const ledgerRuler = document.getElementById("ledgerRuler");
  const ledgerAnnexed = document.getElementById("ledgerAnnexed");
  const ledgerLost = document.getElementById("ledgerLost");
  const ledgerDesc = document.getElementById("ledgerDesc");
  const ledgerCoords = document.getElementById("ledgerCoords");

  // Armory Elements
  const weaponChipsContainer = document.getElementById("weaponChipsContainer");
  const weaponActionBtn = document.getElementById("weaponActionBtn");
  const weaponDamascusToggle = document.getElementById("weaponDamascusToggle");
  const weaponWireframeToggle = document.getElementById("weaponWireframeToggle");
  const weaponLightingSelect = document.getElementById("weaponLightingSelect");
  const weaponDossierTitle = document.getElementById("weaponDossierTitle");
  const weaponDossierHindi = document.getElementById("weaponDossierHindi");
  const weaponDossierDesc = document.getElementById("weaponDossierDesc");
  const weaponDossierSpecs = document.getElementById("weaponDossierSpecs");
  const weaponDossierUsers = document.getElementById("weaponDossierUsers");
  const weaponDossierBattle = document.getElementById("weaponDossierBattle");
  const statReach = document.getElementById("statReach");
  const statDamage = document.getElementById("statDamage");
  const statArmor = document.getElementById("statArmor");

  // EIC Timeline Container
  const eicStagesContainer = document.getElementById("eicStagesContainer");

  // GTA V Mini-Map HUD
  const gtavRadarWidget = document.getElementById("gtavRadarWidget");
  const hudCoordinates = document.getElementById("hudCoordinates");

  /* ==========================================================================
     1. NAVIGATION SYSTEM
     ========================================================================== */
  navTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetView = tab.getAttribute("data-tab");
      switchView(targetView);
    });
  });

  function switchView(viewId) {
    activeTab = viewId;
    navTabs.forEach(t => t.classList.toggle("active", t.getAttribute("data-tab") === viewId));
    appViews.forEach(v => v.classList.toggle("active", v.id === `view-${viewId}`));

    // Trigger redraws on canvas resize when switching views
    if (viewId === "map") {
      setTimeout(() => mapEngine.renderMainMap(), 50);
    } else if (viewId === "armory") {
      setTimeout(() => weaponsEngine.loadWeapon(weaponsEngine.currentWeaponId), 50);
    }
  }

  /* ==========================================================================
     2. AUDIO INTEGRATION
     ========================================================================== */
  if (toggleSoundBtn) {
    toggleSoundBtn.addEventListener("click", () => {
      const muted = audioEngine.toggleMute();
      toggleSoundBtn.innerHTML = muted ? "🔇" : "🔊";
      toggleSoundBtn.title = muted ? "Unmute Audio" : "Mute Audio";
    });
  }

  if (playShankhaBtn) {
    playShankhaBtn.addEventListener("click", () => {
      audioEngine.playShankha();
    });
  }

  if (playDrumsBtn) {
    playDrumsBtn.addEventListener("click", () => {
      audioEngine.playWarDrum(130);
      setTimeout(() => audioEngine.playWarDrum(100), 220);
      setTimeout(() => audioEngine.playWarDrum(80), 440);
    });
  }

  if (ambientMusicBtn) {
    ambientMusicBtn.addEventListener("click", () => {
      const isPlaying = audioEngine.toggleAmbience();
      ambientMusicBtn.classList.toggle("active", isPlaying);
      ambientMusicBtn.innerText = isPlaying ? "🎵 Palace Drone Active" : "🎵 Play Palace Ambience";
    });
  }

  /* ==========================================================================
     3. 3D PICTURE FRAME GALLERY GENERATOR
     ========================================================================== */
  function renderGallery() {
    if (!galleryGrid || !window.DYNASTIES_DATA) return;
    galleryGrid.innerHTML = "";

    window.DYNASTIES_DATA.forEach((dynasty, index) => {
      const cardContainer = document.createElement("div");
      cardContainer.className = "picture-frame-container";
      cardContainer.setAttribute("data-dynasty-id", dynasty.id);

      // Interactive 3D Parallax Tilt Effect on Mouse Move
      cardContainer.addEventListener("mousemove", (e) => {
        const rect = cardContainer.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateY = (x / (rect.width / 2)) * 14;
        const rotateX = -(y / (rect.height / 2)) * 14;
        cardContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      cardContainer.addEventListener("mouseleave", () => {
        cardContainer.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      });

      const frame = document.createElement("div");
      frame.className = "picture-frame";

      frame.innerHTML = `
        <div class="frame-corner corner-tl"></div>
        <div class="frame-corner corner-tr"></div>
        <div class="frame-corner corner-bl"></div>
        <div class="frame-corner corner-br"></div>

        <div class="portrait-stage">
          <div class="reign-badge">${dynasty.era}</div>
          <div class="portrait-layer-art">
            ${generateMonarchSVG(dynasty.monarch.portraitType, dynasty.monarch.name)}
          </div>
        </div>

        <div class="dynasty-info">
          <div class="dynasty-title">
            <span>${dynasty.name}</span>
            <span class="hindi-title">${dynasty.hindiName}</span>
          </div>
          <div class="monarch-lead">👑 ${dynasty.monarch.name}</div>
          <div class="monarch-epithet">${dynasty.monarch.title}</div>

          <div class="dynasty-meta-chips">
            <span class="meta-chip">🏛️ ${dynasty.capital}</span>
            <span class="meta-chip">🚩 ${dynasty.flagEmblem.split('&')[0]}</span>
            <span class="meta-chip">🗺️ ${dynasty.territoryKm}</span>
          </div>

          <p class="dynasty-desc">${dynasty.description}</p>

          <button class="enter-frame-btn" data-dynasty="${dynasty.id}">
            <span>✨ Enter Picture Frame</span>
          </button>
        </div>
      `;

      // Enter Picture Frame Click Handler
      frame.querySelector(".enter-frame-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        openCourtRoom(dynasty);
        audioEngine.playShankha();
      });

      cardContainer.appendChild(frame);
      galleryGrid.appendChild(cardContainer);
    });
  }

  /* ==========================================================================
     4. HISTORIC MONARCH & ROYAL SVG PORTRAITURE
     ========================================================================== */
  function generateMonarchSVG(portraitType, name) {
    if (portraitType === "maurya_king") {
      // Chandragupta Maurya with golden royal chhatra, mauryan crown, and lion shield
      return `
        <svg class="monarch-svg-portrait" viewBox="0 0 200 200">
          <defs>
            <radialGradient id="aurora" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stop-color="#fef08a" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#d97706" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="goldPlate" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fef3c7"/>
              <stop offset="50%" stop-color="#f59e0b"/>
              <stop offset="100%" stop-color="#b45309"/>
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="88" fill="url(#aurora)" />
          <!-- Royal Halo -->
          <circle cx="100" cy="88" r="62" fill="none" stroke="url(#goldPlate)" stroke-width="3" stroke-dasharray="6,4"/>
          <!-- Mauryan Royal Crown (Mukuta) -->
          <path d="M72 65 L85 30 L100 45 L115 30 L128 65 Z" fill="url(#goldPlate)" stroke="#78350f" stroke-width="2"/>
          <circle cx="100" cy="45" r="5" fill="#dc2626"/>
          <!-- King's Face & Beard -->
          <circle cx="100" cy="85" r="28" fill="#fcd34d" stroke="#b45309" stroke-width="2"/>
          <!-- Expressive Eyes -->
          <ellipse cx="90" cy="80" rx="3.5" ry="2" fill="#1e293b"/>
          <ellipse cx="110" cy="80" rx="3.5" ry="2" fill="#1e293b"/>
          <!-- Royal Mustache & Regal Beard -->
          <path d="M86 92 Q100 96 114 92 Q100 106 86 92 Z" fill="#1e1b4b"/>
          <!-- Royal Armor Breastplate with Ashoka Lion Motif -->
          <path d="M65 118 Q100 108 135 118 L145 180 Q100 190 55 180 Z" fill="url(#goldPlate)" stroke="#78350f" stroke-width="2.5"/>
          <circle cx="100" cy="145" r="14" fill="#1e3a8a" stroke="#fbbf24" stroke-width="2"/>
          <!-- Ashoka Wheel Spokes -->
          <path d="M100 131 L100 159 M86 145 L114 145" stroke="#ffffff" stroke-width="2"/>
        </svg>
      `;
    } else if (portraitType === "kushan_king") {
      // Emperor Kanishka with Hellenistic-Gandhara tunic, high conical hat and spear
      return `
        <svg class="monarch-svg-portrait" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="85" fill="rgba(220, 38, 38, 0.2)" stroke="#ef4444" stroke-width="2"/>
          <!-- Kushan Conical Cap -->
          <path d="M78 68 L100 18 L122 68 Z" fill="#b91c1c" stroke="#fbbf24" stroke-width="3"/>
          <circle cx="100" cy="18" r="6" fill="#fbbf24"/>
          <!-- Face -->
          <circle cx="100" cy="88" r="26" fill="#fde68a" stroke="#92400e" stroke-width="2"/>
          <!-- Kushan Cloak & Heavy Overcoat -->
          <path d="M60 120 L100 110 L140 120 L150 185 L50 185 Z" fill="#991b1b" stroke="#fbbf24" stroke-width="3"/>
          <!-- Gold Medallion Belt -->
          <rect x="75" y="145" width="50" height="12" fill="#fbbf24" rx="3"/>
        </svg>
      `;
    } else if (portraitType === "chola_king") {
      // Rajaraja Chola with bronze crown, Shaivite Tripundra and Tiger Banner
      return `
        <svg class="monarch-svg-portrait" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="85" fill="rgba(185, 28, 28, 0.25)" stroke="#fbbf24" stroke-width="2.5"/>
          <!-- Elaborate Chola Bronze Crown (Kirita Makuta) -->
          <path d="M75 70 L88 25 L100 20 L112 25 L125 70 Z" fill="#d97706" stroke="#fbbf24" stroke-width="2"/>
          <circle cx="100" cy="20" r="5" fill="#fef08a"/>
          <!-- Face -->
          <circle cx="100" cy="90" r="27" fill="#fcd34d" stroke="#b45309" stroke-width="2"/>
          <!-- Sacred Tripundra Vibhuti Marks -->
          <line x1="88" y1="78" x2="112" y2="78" stroke="#ffffff" stroke-width="2"/>
          <line x1="88" y1="82" x2="112" y2="82" stroke="#ffffff" stroke-width="2"/>
          <circle cx="100" cy="80" r="2" fill="#dc2626"/>
          <!-- Royal Silk Angavastram & Heavy Gold Necklaces -->
          <path d="M60 122 Q100 115 140 122 L145 185 L55 185 Z" fill="#b91c1c" stroke="#fbbf24" stroke-width="2"/>
          <circle cx="100" cy="140" r="12" fill="#fbbf24"/>
        </svg>
      `;
    } else if (portraitType === "maratha_king") {
      // Chhatrapati Shivaji Maharaj with Maratha Pagadi, Kalgi (feather finial), and Bhavani Talwar
      return `
        <svg class="monarch-svg-portrait" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="85" fill="rgba(234, 88, 12, 0.25)" stroke="#ea580c" stroke-width="2.5"/>
          <!-- Saffron Halo -->
          <circle cx="100" cy="90" r="64" fill="none" stroke="#f97316" stroke-width="2" stroke-dasharray="4,4"/>
          <!-- Traditional Maratha Pagadi (Turban) with Jijabai's blessings -->
          <path d="M65 65 Q100 35 145 60 Q130 80 65 65 Z" fill="#ea580c" stroke="#c2410c" stroke-width="2.5"/>
          <!-- Royal Kalgi (Ruby & Pearl Feather Finial) -->
          <path d="M125 50 Q135 20 145 28 Q135 45 125 50 Z" fill="#fbbf24" stroke="#dc2626" stroke-width="1.5"/>
          <!-- Face with sharp vision and famous beard/mustache -->
          <circle cx="98" cy="88" r="26" fill="#fcd34d" stroke="#b45309" stroke-width="2"/>
          <!-- Chandrakor Tilak (Crescent Moon Forehead Mark) -->
          <path d="M96 74 Q98 70 100 74 Q98 76 96 74 Z" fill="#dc2626"/>
          <!-- Beard -->
          <path d="M85 94 Q98 108 112 94 Q98 118 85 94 Z" fill="#18181b"/>
          <!-- Kurta & Angarkha Armor -->
          <path d="M60 120 Q98 112 138 120 L145 185 L52 185 Z" fill="#ffffff" stroke="#f97316" stroke-width="3"/>
          <path d="M85 120 L98 150 L112 120" fill="none" stroke="#ea580c" stroke-width="3"/>
        </svg>
      `;
    } else if (portraitType === "mughal_king") {
      // Mughal Emperor with turban, plume, pearl strings, and ornate jama
      return `
        <svg class="monarch-svg-portrait" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="85" fill="rgba(4, 120, 87, 0.25)" stroke="#10b981" stroke-width="2.5"/>
          <!-- Mughal Turban with Sarpech (Plume & Emerald) -->
          <ellipse cx="100" cy="62" rx="36" ry="24" fill="#047857" stroke="#fbbf24" stroke-width="2.5"/>
          <path d="M96 42 Q100 15 106 20 Q102 38 96 42 Z" fill="#fef08a" stroke="#dc2626" stroke-width="1.5"/>
          <!-- Face -->
          <circle cx="100" cy="88" r="25" fill="#fde68a" stroke="#b45309" stroke-width="2"/>
          <!-- Ornate Jama Silk Coat -->
          <path d="M58 120 Q100 112 142 120 L150 185 L50 185 Z" fill="#065f46" stroke="#fbbf24" stroke-width="3"/>
          <!-- Multi-strand Pearl Mala -->
          <path d="M78 124 Q100 150 122 124" fill="none" stroke="#ffffff" stroke-width="3" stroke-dasharray="4,4"/>
        </svg>
      `;
    } else if (portraitType === "sikh_king") {
      // Maharaja Ranjit Singh with royal Khalsa turban, single seeing eye of wisdom, and beard
      return `
        <svg class="monarch-svg-portrait" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="85" fill="rgba(249, 115, 22, 0.25)" stroke="#f97316" stroke-width="2.5"/>
          <!-- Saffron Dastar (Turban) with Golden Kalgi -->
          <ellipse cx="100" cy="60" rx="38" ry="26" fill="#f97316" stroke="#b45309" stroke-width="2.5"/>
          <!-- Face -->
          <circle cx="100" cy="88" r="26" fill="#fcd34d" stroke="#b45309" stroke-width="2"/>
          <!-- Royal Flowing Grey Beard -->
          <path d="M78 92 Q100 135 122 92 Q100 150 78 92 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
          <!-- Silk Choga -->
          <path d="M58 120 Q100 110 142 120 L150 185 L50 185 Z" fill="#1e3a8a" stroke="#f97316" stroke-width="3"/>
        </svg>
      `;
    } else if (portraitType === "eic_ruler") {
      // East India Company Governor / Crown Standard
      return `
        <svg class="monarch-svg-portrait" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="85" fill="rgba(220, 38, 38, 0.25)" stroke="#dc2626" stroke-width="2.5"/>
          <!-- Imperial Crown -->
          <path d="M68 65 L80 32 L100 45 L120 32 L132 65 Z" fill="#fbbf24" stroke="#78350f" stroke-width="2"/>
          <circle cx="100" cy="45" r="5" fill="#dc2626"/>
          <!-- Redcoat Military Uniform -->
          <path d="M55 110 Q100 100 145 110 L152 185 L48 185 Z" fill="#b91c1c" stroke="#fbbf24" stroke-width="3"/>
          <rect x="94" y="112" width="12" height="70" fill="#ffffff"/>
          <circle cx="100" cy="130" r="4" fill="#fbbf24"/>
          <circle cx="100" cy="148" r="4" fill="#fbbf24"/>
          <circle cx="100" cy="166" r="4" fill="#fbbf24"/>
        </svg>
      `;
    } else {
      // Republic of India National Ashoka Lion Capital & Tricolor
      return `
        <svg class="monarch-svg-portrait" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="tiranga" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#f97316"/>
              <stop offset="50%" stop-color="#ffffff"/>
              <stop offset="100%" stop-color="#16a34a"/>
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="85" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="2.5"/>
          <!-- Lion Capital Core -->
          <rect x="75" y="145" width="50" height="25" fill="#fbbf24" rx="4" stroke="#78350f" stroke-width="2"/>
          <!-- 24-Spoke Navy Blue Ashoka Chakra in Center -->
          <circle cx="100" cy="100" r="32" fill="#ffffff" stroke="#1e3a8a" stroke-width="3"/>
          <circle cx="100" cy="100" r="5" fill="#1e3a8a"/>
          <!-- Spokes -->
          <g stroke="#1e3a8a" stroke-width="1.8">
            <line x1="100" y1="70" x2="100" y2="130"/>
            <line x1="70" y1="100" x2="130" y2="100"/>
            <line x1="79" y1="79" x2="121" y2="121"/>
            <line x1="79" y1="121" x2="121" y2="79"/>
            <line x1="88" y1="72" x2="112" y2="128"/>
            <line x1="112" y1="72" x2="88" y2="128"/>
            <line x1="72" y1="88" x2="128" y2="112"/>
            <line x1="72" y1="112" x2="128" y2="88"/>
          </g>
        </svg>
      `;
    }
  }

  /* ==========================================================================
     4B. ROYAL HERALDIC FLAGS & IMPERIAL BANNERS
     ========================================================================== */
  function generateFlagSVG(dynastyId) {
    if (dynastyId === "maurya") {
      return `
        <svg viewBox="0 0 160 100" class="royal-flag-banner">
          <rect width="160" height="100" fill="#ea580c"/>
          <circle cx="80" cy="50" r="32" fill="#ffffff"/>
          <circle cx="80" cy="50" r="28" fill="none" stroke="#1e3a8a" stroke-width="3"/>
          <circle cx="80" cy="50" r="5" fill="#1e3a8a"/>
          <!-- 24 Spokes -->
          <g stroke="#1e3a8a" stroke-width="1.6">
            <line x1="80" y1="22" x2="80" y2="78"/>
            <line x1="52" y1="50" x2="108" y2="50"/>
            <line x1="60" y1="30" x2="100" y2="70"/>
            <line x1="60" y1="70" x2="100" y2="30"/>
            <line x1="69" y1="24" x2="91" y2="76"/>
            <line x1="91" y1="24" x2="69" y2="76"/>
            <line x1="54" y1="39" x2="106" y2="61"/>
            <line x1="54" y1="61" x2="106" y2="39"/>
          </g>
          <!-- Golden Border Fringe -->
          <rect x="0" y="0" width="160" height="100" fill="none" stroke="#fbbf24" stroke-width="3"/>
        </svg>
      `;
    } else if (dynastyId === "chola") {
      return `
        <svg viewBox="0 0 160 100" class="royal-flag-banner">
          <rect width="160" height="100" fill="#b91c1c"/>
          <!-- Jumping Tiger Silhouette -->
          <g transform="translate(45, 20) scale(0.7)">
            <path d="M10 50 Q30 20 60 30 Q80 20 95 35 Q105 30 110 40 Q90 55 80 65 Q70 80 50 75 Q30 75 10 50 Z" fill="#fbbf24" stroke="#000000" stroke-width="1.5"/>
            <!-- Tiger Stripes -->
            <path d="M40 32 L44 48 M55 33 L58 52 M70 36 L72 55 M85 40 L85 58" stroke="#000000" stroke-width="2.5"/>
            <!-- Tiger Tail Curled up -->
            <path d="M10 50 Q-15 35 -5 10 Q10 15 5 35" fill="none" stroke="#fbbf24" stroke-width="4"/>
          </g>
          <circle cx="30" cy="30" r="10" fill="#fbbf24"/>
          <rect x="0" y="0" width="160" height="100" fill="none" stroke="#fbbf24" stroke-width="3"/>
        </svg>
      `;
    } else if (dynastyId === "maratha") {
      return `
        <svg viewBox="0 0 160 100" class="royal-flag-banner">
          <!-- Maratha Double Swallowtail Bhagwa Dhwaj -->
          <polygon points="0,0 160,0 120,48 160,100 0,100" fill="#ea580c"/>
          <polygon points="0,0 160,0 120,48 160,100 0,100" fill="none" stroke="#c2410c" stroke-width="2"/>
          <circle cx="45" cy="50" r="12" fill="#fbbf24" opacity="0.6"/>
        </svg>
      `;
    } else if (dynastyId === "sikh") {
      return `
        <svg viewBox="0 0 160 100" class="royal-flag-banner">
          <!-- Triangular Nishan Sahib -->
          <polygon points="0,0 160,50 0,100" fill="#f97316"/>
          <!-- Holy Khanda Emblem in Center -->
          <g transform="translate(38, 25) scale(0.65)" fill="#1e3a8a">
            <!-- Double-edged sword -->
            <rect x="23" y="0" width="4" height="60" rx="2"/>
            <!-- Chakram circle -->
            <circle cx="25" cy="30" r="18" fill="none" stroke="#1e3a8a" stroke-width="5"/>
            <!-- Twin Kirpans on sides -->
            <path d="M5 45 Q2 15 25 2 Q22 25 15 45 Z"/>
            <path d="M45 45 Q48 15 25 2 Q28 25 35 45 Z"/>
          </g>
        </svg>
      `;
    } else if (dynastyId === "mughal") {
      return `
        <svg viewBox="0 0 160 100" class="royal-flag-banner">
          <!-- Triangular Green Alam Banner with Lion and Rising Sun -->
          <polygon points="0,0 160,50 0,100" fill="#047857"/>
          <!-- Rising Sun -->
          <circle cx="55" cy="40" r="14" fill="#fbbf24"/>
          <!-- Golden Lion Body -->
          <ellipse cx="65" cy="58" rx="20" ry="10" fill="#fbbf24"/>
          <circle cx="82" cy="52" r="8" fill="#fbbf24"/>
          <path d="M45 58 Q35 45 40 35" fill="none" stroke="#fbbf24" stroke-width="3"/>
        </svg>
      `;
    } else if (dynastyId === "eic") {
      return `
        <svg viewBox="0 0 160 100" class="royal-flag-banner">
          <!-- 13 Red and White Stripes -->
          <rect width="160" height="100" fill="#ffffff"/>
          <rect y="0" width="160" height="7.7" fill="#dc2626"/>
          <rect y="15.4" width="160" height="7.7" fill="#dc2626"/>
          <rect y="30.8" width="160" height="7.7" fill="#dc2626"/>
          <rect y="46.2" width="160" height="7.7" fill="#dc2626"/>
          <rect y="61.5" width="160" height="7.7" fill="#dc2626"/>
          <rect y="76.9" width="160" height="7.7" fill="#dc2626"/>
          <rect y="92.3" width="160" height="7.7" fill="#dc2626"/>
          <!-- Canton: St. George's Cross -->
          <rect x="0" y="0" width="65" height="50" fill="#ffffff" stroke="#1e3a8a" stroke-width="1"/>
          <rect x="27" y="0" width="11" height="50" fill="#dc2626"/>
          <rect x="0" y="20" width="65" height="10" fill="#dc2626"/>
        </svg>
      `;
    } else {
      // Modern Indian Tiranga (Saffron, White, Green with Ashoka Chakra)
      return `
        <svg viewBox="0 0 160 100" class="royal-flag-banner">
          <rect width="160" height="33.3" fill="#f97316"/>
          <rect y="33.3" width="160" height="33.4" fill="#ffffff"/>
          <rect y="66.7" width="160" height="33.3" fill="#16a34a"/>
          <!-- 24-Spoke Navy Blue Ashoka Chakra -->
          <circle cx="80" cy="50" r="14" fill="none" stroke="#1e3a8a" stroke-width="1.8"/>
          <circle cx="80" cy="50" r="2.5" fill="#1e3a8a"/>
          <g stroke="#1e3a8a" stroke-width="1">
            <line x1="80" y1="36" x2="80" y2="64"/>
            <line x1="66" y1="50" x2="94" y2="50"/>
            <line x1="70" y1="40" x2="90" y2="60"/>
            <line x1="70" y1="60" x2="90" y2="40"/>
            <line x1="74" y1="37" x2="86" y2="63"/>
            <line x1="86" y1="37" x2="74" y2="63"/>
            <line x1="67" y1="44" x2="93" y2="56"/>
            <line x1="67" y1="56" x2="93" y2="44"/>
          </g>
        </svg>
      `;
    }
  }

  /* ==========================================================================
     5. IMPERIAL COURT ROOM MODAL ("INSIDE THE PICTURE FRAME")
     ========================================================================== */
  function openCourtRoom(dynasty) {
    if (!courtModal || !courtModalContent) return;

    const m = dynasty.monarch;

    // Build Lineage & Successor HTML
    let lineageHtml = "";
    if (m.queen) {
      lineageHtml += `
        <div class="lineage-card">
          <h5>👸 Empress / Queen</h5>
          <p>${m.queen}</p>
        </div>
      `;
    }
    if (m.mentor) {
      lineageHtml += `
        <div class="lineage-card">
          <h5>📜 Prime Minister / Royal Mentor</h5>
          <p>${m.mentor}</p>
        </div>
      `;
    }
    if (m.sons && m.sons.length > 0) {
      m.sons.forEach(s => {
        lineageHtml += `
          <div class="lineage-card">
            <h5>⚔️ Crown Prince & Son: ${s.name}</h5>
            <p>${s.role}</p>
          </div>
        `;
      });
    }
    if (m.grandsons && m.grandsons.length > 0) {
      m.grandsons.forEach(g => {
        lineageHtml += `
          <div class="lineage-card">
            <h5>🌟 Successor Line: ${g.name}</h5>
            <p>${g.role}</p>
          </div>
        `;
      });
    }
    if (m.commanders && m.commanders.length > 0) {
      m.commanders.forEach(c => {
        lineageHtml += `
          <div class="lineage-card">
            <h5>🛡️ Legendary General: ${c.name}</h5>
            <p>${c.role}</p>
          </div>
        `;
      });
    }
    if (m.resistersAndHeroes && m.resistersAndHeroes.length > 0) {
      m.resistersAndHeroes.forEach(h => {
        lineageHtml += `
          <div class="lineage-card">
            <h5>🔥 Patriot / Hero: ${h.name}</h5>
            <p>${h.role}</p>
          </div>
        `;
      });
    }

    courtModalContent.innerHTML = `
      <div class="court-hero-grid">
        <div class="court-portrait-box">
          <div class="court-portrait-svg">
            ${generateMonarchSVG(m.portraitType, m.name)}
          </div>
          <h3 style="font-family: var(--font-display); color: var(--accent-gold); font-size: 1.4rem;">${m.name}</h3>
          <p style="color: var(--accent-cyan); font-size: 0.85rem; font-weight: 600;">${m.title}</p>
          <p style="color: var(--text-muted); font-size: 0.75rem; margin-top: 0.3rem;">Reign: ${m.reign}</p>

          <div style="margin-top: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 0.8rem;">
            <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-gold); text-transform: uppercase;">🚩 Imperial Standard Flag:</span>
            <div style="margin-top: 0.5rem; display: flex; justify-content: center;">
              ${generateFlagSVG(dynasty.id)}
            </div>
            <p style="font-size: 0.72rem; color: #cbd5e1; margin-top: 0.4rem;">${dynasty.flagEmblem}</p>
          </div>

          <div style="margin-top: 1rem;">
            <button class="armory-action-btn battle-strike-btn" style="width: 100%; justify-content: center;" id="modalShankhaBtn">
              🎺 Sound Royal Conch
            </button>
          </div>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
            <h2 style="font-family: var(--font-display); font-size: 1.8rem; color: #ffffff;">${dynasty.name}</h2>
            <span style="font-family: var(--font-mono); color: var(--accent-gold);">${dynasty.era}</span>
          </div>

          <p class="royal-decree-quote">"${m.royalQuote}"</p>

          <h4 style="font-family: var(--font-display); color: var(--accent-gold); margin-top: 1.5rem; margin-bottom: 0.6rem;">
            ⚔️ Decisive Military Achievements & Campaigns
          </h4>
          <ul style="padding-left: 1.25rem; font-size: 0.88rem; color: #cbd5e1; display: flex; flex-direction: column; gap: 0.5rem;">
            ${m.militaryAchievements.map(a => `<li>${a}</li>`).join("")}
          </ul>

          <h4 style="font-family: var(--font-display); color: var(--accent-gold); margin-top: 1.5rem; margin-bottom: 0.6rem;">
            🏛️ Architectural Marvels, Literature & Enduring Legacy
          </h4>
          <ul style="padding-left: 1.25rem; font-size: 0.88rem; color: #cbd5e1; display: flex; flex-direction: column; gap: 0.5rem;">
            ${m.monumentsAndLegacy.map(l => `<li>${l}</li>`).join("")}
          </ul>
        </div>
      </div>

      <h4 style="font-family: var(--font-display); color: var(--accent-gold); margin-bottom: 0.8rem;">
        👑 Royal Family, Queens, Sons & Imperial Lineage
      </h4>
      <div class="lineage-tree-block">
        ${lineageHtml}
      </div>

      <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: flex-end;">
        <button class="playback-btn" id="modalViewOnMapBtn">
          🗺️ View Imperial Borders on Map (${dynasty.zenithYear} CE)
        </button>
      </div>
    `;

    document.getElementById("modalShankhaBtn").addEventListener("click", () => {
      audioEngine.playShankha();
    });

    document.getElementById("modalViewOnMapBtn").addEventListener("click", () => {
      closeCourtRoom();
      switchView("map");
      updateTimelineYear(dynasty.zenithYear);
    });

    courtModal.classList.add("open");
  }

  function closeCourtRoom() {
    if (courtModal) {
      courtModal.classList.remove("open");
    }
  }

  if (courtModalClose) {
    courtModalClose.addEventListener("click", closeCourtRoom);
  }

  window.addEventListener("click", (e) => {
    if (e.target === courtModal) {
      closeCourtRoom();
    }
  });

  /* ==========================================================================
     6. TERRITORIAL ANNEXATION ENGINE & TIMELINE SCRUBBER
     ========================================================================== */
  function initTimeline() {
    if (!timelineSlider || !window.TIMELINE_EVENTS) return;

    timelineSlider.min = 0;
    timelineSlider.max = window.TIMELINE_EVENTS.length - 1;
    timelineSlider.value = 0;

    timelineSlider.addEventListener("input", (e) => {
      const idx = parseInt(e.target.value, 10);
      setTimelineEventIndex(idx);
    });

    if (playTimelineBtn) {
      playTimelineBtn.addEventListener("click", () => {
        if (isPlayingTimeline) {
          pauseTimeline();
        } else {
          startTimelinePlayback();
        }
      });
    }

    if (prevEventBtn) {
      prevEventBtn.addEventListener("click", () => {
        pauseTimeline();
        const currentIdx = parseInt(timelineSlider.value, 10);
        if (currentIdx > 0) {
          setTimelineEventIndex(currentIdx - 1);
        }
      });
    }

    if (nextEventBtn) {
      nextEventBtn.addEventListener("click", () => {
        pauseTimeline();
        const currentIdx = parseInt(timelineSlider.value, 10);
        if (currentIdx < window.TIMELINE_EVENTS.length - 1) {
          setTimelineEventIndex(currentIdx + 1);
        }
      });
    }

    setTimelineEventIndex(0);
  }

  function setTimelineEventIndex(idx) {
    const evt = window.TIMELINE_EVENTS[idx];
    if (!evt) return;

    timelineSlider.value = idx;
    if (activeYearDisplay) {
      activeYearDisplay.innerText = evt.yearLabel;
    }

    // Update Annexation Ledger
    if (ledgerDynastyBadge) ledgerDynastyBadge.innerText = evt.yearLabel;
    if (ledgerTitle) ledgerTitle.innerText = evt.title;
    if (ledgerRuler) ledgerRuler.innerText = evt.ruler;
    if (ledgerAnnexed) ledgerAnnexed.innerText = evt.annexedLand;
    if (ledgerLost) ledgerLost.innerText = evt.lostLand;
    if (ledgerDesc) ledgerDesc.innerText = evt.territoryDescription;
    if (ledgerCoords) ledgerCoords.innerText = `LAT: ${evt.coordinates.lat.toFixed(2)}° N | LON: ${evt.coordinates.lon.toFixed(2)}° E`;

    // Update GTA V HUD readout
    if (hudCoordinates) {
      hudCoordinates.innerText = `GPS: ${evt.coordinates.lat.toFixed(2)}° N, ${evt.coordinates.lon.toFixed(2)}° E | ${evt.yearLabel}`;
    }

    // Sync Map Engine
    mapEngine.setYear(evt.year);
    audioEngine.playWarDrum(90);
  }

  function updateTimelineYear(year) {
    if (!window.TIMELINE_EVENTS) return;
    let closestIdx = 0;
    let minDiff = Infinity;
    window.TIMELINE_EVENTS.forEach((e, i) => {
      const diff = Math.abs(e.year - year);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    });
    setTimelineEventIndex(closestIdx);
  }

  function startTimelinePlayback() {
    isPlayingTimeline = true;
    if (playTimelineBtn) {
      playTimelineBtn.innerHTML = "⏸️ Pause";
    }
    timelineInterval = setInterval(() => {
      let nextIdx = parseInt(timelineSlider.value, 10) + 1;
      if (nextIdx >= window.TIMELINE_EVENTS.length) {
        nextIdx = 0; // Loop around
      }
      setTimelineEventIndex(nextIdx);
    }, 2800);
  }

  function pauseTimeline() {
    isPlayingTimeline = false;
    if (timelineInterval) {
      clearInterval(timelineInterval);
      timelineInterval = null;
    }
    if (playTimelineBtn) {
      playTimelineBtn.innerHTML = "▶️ Play Chronicles";
    }
  }

  /* ==========================================================================
     7. 3D IMPERIAL ARMORY CONTROLLER
     ========================================================================== */
  function initArmory() {
    if (!weaponChipsContainer || !window.WEAPONS_DATA) return;
    weaponChipsContainer.innerHTML = "";

    window.WEAPONS_DATA.forEach((w, idx) => {
      const btn = document.createElement("button");
      btn.className = `weapon-chip-btn ${idx === 0 ? "active" : ""}`;
      btn.innerText = w.name.split('(')[0].trim();
      btn.setAttribute("data-weapon-id", w.id);

      btn.addEventListener("click", () => {
        document.querySelectorAll(".weapon-chip-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectWeapon(w.id);
      });

      weaponChipsContainer.appendChild(btn);
    });

    // Armory Toolbar Handlers
    if (weaponActionBtn) {
      weaponActionBtn.addEventListener("click", () => {
        weaponsEngine.triggerActionAnimation();
        // Weapon-specific audio
        if (weaponsEngine.currentWeaponId === "cannon") {
          audioEngine.playCannonBlast();
        } else if (weaponsEngine.currentWeaponId === "toradar") {
          audioEngine.playCannonBlast();
        } else {
          audioEngine.playSwordClang();
        }
      });
    }

    if (weaponDamascusToggle) {
      weaponDamascusToggle.addEventListener("click", () => {
        const isDamascus = weaponsEngine.toggleDamascus();
        weaponDamascusToggle.innerText = isDamascus ? "✨ Damascus: ON" : "✨ Damascus: OFF";
      });
    }

    if (weaponWireframeToggle) {
      weaponWireframeToggle.addEventListener("click", () => {
        const isWireframe = weaponsEngine.toggleWireframe();
        weaponWireframeToggle.innerText = isWireframe ? "🕸️ Solid View" : "🕸️ Wireframe";
      });
    }

    if (weaponLightingSelect) {
      weaponLightingSelect.addEventListener("change", (e) => {
        weaponsEngine.setLightingTheme(e.target.value);
      });
    }

    selectWeapon("khanda");
  }

  function selectWeapon(weaponId) {
    weaponsEngine.loadWeapon(weaponId);
    const data = window.WEAPONS_DATA.find(w => w.id === weaponId);
    if (!data) return;

    if (weaponDossierTitle) weaponDossierTitle.innerText = data.name;
    if (weaponDossierHindi) weaponDossierHindi.innerText = data.hindiName;
    if (weaponDossierDesc) weaponDossierDesc.innerText = data.description;

    if (weaponDossierSpecs) {
      weaponDossierSpecs.innerHTML = `
        <tr><td>Type:</td><td>${data.type}</td></tr>
        <tr><td>Era:</td><td>${data.era}</td></tr>
        <tr><td>Blade Metallurgy:</td><td>${data.bladeSteel || data.metalCast || "Damascus Steel"}</td></tr>
        <tr><td>Hilt Craft:</td><td>${data.hiltStyle || data.actionType || "Masterwork Grip"}</td></tr>
        <tr><td>Dimensions:</td><td>${data.length || data.diameter} | ${data.weight}</td></tr>
      `;
    }

    if (weaponDossierUsers) {
      weaponDossierUsers.innerHTML = data.historicalUsers.map(u => `<li>${u}</li>`).join("");
    }

    if (weaponDossierBattle) {
      weaponDossierBattle.innerText = data.famousBattle;
    }

    if (statReach) statReach.style.width = `${data.specs.reach}%`;
    if (statDamage) statDamage.style.width = `${data.specs.damage}%`;
    if (statArmor) statArmor.style.width = `${data.specs.armorPiercing}%`;
  }

  /* ==========================================================================
     8. EAST INDIA COMPANY EXPANSION EXPLORER
     ========================================================================== */
  function initEICExplorer() {
    if (!eicStagesContainer || !window.EIC_EXPANSION_STAGES) return;
    eicStagesContainer.innerHTML = "";

    window.EIC_EXPANSION_STAGES.forEach(stage => {
      const item = document.createElement("div");
      item.className = "eic-stage-item";

      const isIndependence = stage.phase === 8;

      item.innerHTML = `
        <div class="stage-number-disc ${isIndependence ? 'independence' : ''}">
          ${isIndependence ? '🇮🇳' : stage.phase}
        </div>
        <div class="eic-stage-card">
          <div class="eic-card-header">
            <h4>${stage.title}</h4>
            <span class="eic-year-badge">${stage.year}</span>
          </div>

          <div style="margin-bottom: 0.6rem;">
            <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-emerald); text-transform: uppercase; font-weight: 700;">
              🗺️ Territory Annexed:
            </span>
            <p style="font-size: 0.85rem; color: #e2e8f0;">${stage.territoryGained}</p>
          </div>

          <div style="margin-bottom: 0.6rem;">
            <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-gold); text-transform: uppercase; font-weight: 700;">
              ⚙️ Annexation Mechanism:
            </span>
            <p style="font-size: 0.85rem; color: #cbd5e1;">${stage.mechanism}</p>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.8rem; border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 0.6rem;">
            <span style="font-size: 0.75rem; color: var(--accent-cyan);">
              👑 Key Figures: ${stage.keyFigures}
            </span>
            <button class="playback-btn eic-sync-map-btn" style="font-size: 0.75rem; padding: 0.2rem 0.6rem;">
              🔍 Sync Radar & Map
            </button>
          </div>
        </div>
      `;

      item.querySelector(".eic-sync-map-btn").addEventListener("click", () => {
        switchView("map");
        // Jump timeline to year
        const yr = parseInt(stage.year.split('–')[0].trim(), 10) || 1947;
        updateTimelineYear(yr);
      });

      eicStagesContainer.appendChild(item);
    });
  }

  /* ==========================================================================
     9. GTA V RADAR HUD CLICK TO EXPAND
     ========================================================================== */
  if (gtavRadarWidget) {
    gtavRadarWidget.addEventListener("click", () => {
      switchView("map");
      audioEngine.playWarDrum(120);
    });
  }

  // Global City Click Callback from Map Engine
  window.onCitySelect = (city) => {
    audioEngine.playWarDrum(110);
    if (hudCoordinates) {
      hudCoordinates.innerText = `TARGET: ${city.name.toUpperCase()} | ${city.dynasty.toUpperCase()}`;
    }
  };

  // Keyboard Shortcuts for Historian Navigation
  window.addEventListener("keydown", (e) => {
    if (e.key === "1") switchView("gallery");
    if (e.key === "2") switchView("map");
    if (e.key === "3") switchView("armory");
    if (e.key === "4") switchView("eic");
    if (e.key === " ") {
      // Space toggles timeline playback if in map view
      if (activeTab === "map") {
        e.preventDefault();
        if (isPlayingTimeline) pauseTimeline();
        else startTimelinePlayback();
      }
    }
    if (e.key === "Escape") {
      closeCourtRoom();
    }
  });

  // INITIALIZE EVERYTHING
  renderGallery();
  initTimeline();
  initArmory();
  initEICExplorer();
});
