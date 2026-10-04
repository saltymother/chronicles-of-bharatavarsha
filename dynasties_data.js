/**
 * CHRONICLES OF BHARATAVARSHA: HISTORICAL DATABASE (320 BCE - 2026 CE)
 * Comprehensive records of Rulers, Queens, Heirs, Dynasties, Annexations & Royal Regalia
 */

const DYNASTIES_DATA = [
  {
    id: "maurya",
    name: "Mauryan Empire",
    hindiName: "मौर्य साम्राज्य",
    era: "322 BCE – 185 BCE",
    startYear: -322,
    endYear: -185,
    zenithYear: -261,
    capital: "Pataliputra (Modern Patna)",
    territoryKm: "5,000,000 km² (Largest in Subcontinent History)",
    flagEmblem: "Ashoka Chakra & Lion Capital of Sarnath",
    flagColors: ["#d97706", "#fef3c7", "#1e3a8a"],
    description: "The first pan-Indian empire that united almost the entirety of the Indian subcontinent under a centralized administrative and economic framework, spearheaded by Chandragupta Maurya and the philosophical statesman Chanakya.",
    
    // Core Ruler Spotlight
    monarch: {
      name: "Chandragupta Maurya",
      title: "Samrat Chakravartin (First Universal Emperor)",
      reign: "322 BCE – 298 BCE",
      epithet: "Slayer of the Nanda Tyranny & Vanquisher of Seleucus",
      portraitType: "maurya_king",
      queen: "Maharani Durdhara (Mother of Bindusara) & Queen Helena (Daughter of Seleucus I)",
      mentor: "Acharya Chanakya (Kautilya / Vishnugupta, author of Arthashastra)",
      sons: [
        { name: "Bindusara (Amitraghata)", role: "Successor Emperor ('Slayer of Foes'), expanded realm south into Deccan" },
        { name: "Justin (via Helena)", role: "Imperial prince & diplomat to Seleucid court" }
      ],
      grandsons: [
        { name: "Ashoka the Great (Devanampriya Priyadasi)", role: "Conquered Kalinga, inscribed universal edicts of peace, propagated Dhamma across Asia" },
        { name: "Susima", role: "Viceroy of Taxila" },
        { name: "Vitashoka (Tissa)", role: "Buddhist monk and prince" }
      ],
      militaryAchievements: [
        "Overthrew the tyrannical Nanda Dynasty of Magadha in 322 BCE with a brilliant guerilla-turned-conventional war.",
        "Defeated Macedonian Emperor Seleucus I Nicator (successor to Alexander the Great) in 305 BCE in the Seleucid-Mauryan War.",
        "Treaty of the Indus: Annexed Gedrosia (Baluchistan), Arachosia (Kandahar), Paropamisadae (Kabul Valley), and Aria (Herat) into Bharatavarsha.",
        "Mobilized an invincible army recorded by Megasthenes: 600,000 infantry, 30,000 cavalry, and 9,000 war elephants.",
        "Constructed the precursor to the Grand Trunk Road (Uttarapath) stretching over 2,000 km from Bengal to Taxila."
      ],
      monumentsAndLegacy: [
        "Pataliputra Palaces: Magnificent wooden pillared halls praised by Greek travelers as exceeding Susa and Ecbatana.",
        "Arthashastra: World's first comprehensive treatise on statecraft, espionage, military strategy, and economic administration.",
        "Sarnath Lion Capital & Ashoka Pillar Edicts: Adopted in 1950 as the official National Emblem of the Republic of India."
      ],
      royalQuote: "In the happiness of his subjects lies his happiness; in their welfare his welfare. Whatever pleases himself he shall not consider as good, but whatever pleases his subjects he shall consider as good. — Chanakya & Chandragupta (Arthashastra)"
    },

    territorialExpansion: {
      annexed: [
        "322 BCE: Magadha heartland from the Nanda Dynasty",
        "316 BCE: Complete liberation of Punjab & Northwestern Satrapies from Greek garrisons",
        "305 BCE: Gandhara, Kabul, Kandahar & Baluchistan ceded by Seleucus I",
        "300 BCE: Central India and northern Deccan plateau subjugated",
        "261 BCE: Ashoka conquers Kalinga (modern Odisha) in decisive battle"
      ],
      lost: [
        "185 BCE: Assassination of Brihadratha by Pushyamitra Shunga marks end of Mauryan line"
      ]
    }
  },

  {
    id: "kushan",
    name: "Kushan Empire",
    hindiName: "कुषाण साम्राज्य",
    era: "30 CE – 375 CE",
    startYear: 30,
    endYear: 375,
    zenithYear: 127,
    capital: "Purushapura (Peshawar) & Mathura (Dual Capitals)",
    territoryKm: "3,800,000 km²",
    flagEmblem: "Triratna & Golden Sun-Disc of Mithra",
    flagColors: ["#b91c1c", "#fbbf24"],
    description: "A monumental bridge connecting the cultures of India, Persia, Central Asia, and the Greco-Roman world along the Silk Road, renowned for introducing stunning Buddhist 3D statuary and pure gold coinage.",

    monarch: {
      name: "Kanishka I (The Great)",
      title: "Devaputra (Son of Heaven) & King of Kings",
      reign: "127 CE – 150 CE",
      epithet: "Patron of the Fourth Buddhist Council & Silk Road Master",
      portraitType: "kushan_king",
      queen: "Mahadevi Subhadra",
      sons: [
        { name: "Huvishka", role: "Successor Emperor who consolidated Indian possessions from Mathura to Kashmir" },
        { name: "Vasishka", role: "Crown Prince and ruler of Northern regions" }
      ],
      militaryAchievements: [
        "Conquered the Tarim Basin (Kashgar, Khotan, Yarkand) and secured dominance over the Trans-Eurasian Silk Road.",
        "Established dual imperial capitals at Peshawar (Purushapura) and Mathura, controlling the Gangetic crossroads.",
        "Defeated Parthian and Eastern Satrap forces to consolidate Gandharan dominance."
      ],
      monumentsAndLegacy: [
        "Kanishka Stupa in Peshawar: A 13-story wooden pagoda measuring 400+ feet, documented as the tallest building in Asia.",
        "Gandhara & Mathura Art Schools: First human representations of the Buddha carved in stone, blending Hellenistic drapery with Vedic serenity.",
        "Charaka Samhita: Patronized Acharya Charaka, the father of Indian medicine and Ayurveda."
      ],
      royalQuote: "He who controls the mountain passes of the Hindu Kush and the river arteries of Mathura commands the wealth of both East and West."
    },

    territorialExpansion: {
      annexed: [
        "78 CE: Conquest of Gandhara and northern Indus valley",
        "127 CE: Expansion east to Varanasi, Pataliputra and south to Ujjain",
        "140 CE: Tarim Basin trade nodes garrisoned"
      ],
      lost: [
        "240 CE: Western regions lost to Sasanian Empire of Persia; heartland absorbed by rising Guptas"
      ]
    }
  },

  {
    id: "gupta",
    name: "Gupta Empire (The Golden Age)",
    hindiName: "गुप्त साम्राज्य (स्वर्ण युग)",
    era: "320 CE – 550 CE",
    startYear: 320,
    endYear: 550,
    zenithYear: 415,
    capital: "Pataliputra & Ujjain",
    territoryKm: "3,500,000 km²",
    flagEmblem: "Garuda Royal Standard (Garudadhvaja)",
    flagColors: ["#b45309", "#f59e0b", "#4338ca"],
    description: "The Classical Golden Age of India marked by peerless developments in mathematics (invention of zero and decimal notation), astronomy, Sanskrit literature, metallurgy, and philosophical freedom.",

    monarch: {
      name: "Samudragupta & Chandragupta II Vikramaditya",
      title: "Maharajadhiraja & Paramabhagavata",
      reign: "335 CE – 415 CE (Joint Golden Epoch)",
      epithet: "The Undefeated Military Virtuoso & Slayer of the Western Kshatrapas",
      portraitType: "gupta_king",
      queen: "Maharani Dattadevi (Consort to Samudragupta) & Maharani Dhruvadevi (Consort to Vikramaditya)",
      sons: [
        { name: "Chandragupta II (Vikramaditya)", role: "Annihilated the Shaka rulers of Western India; established Ujjain court" },
        { name: "Kumaragupta I (Mahendraditya)", role: "Son of Vikramaditya; founded the world-renowned Nalanda Mahavihara University" },
        { name: "Skandagupta", role: "Grandson; heroically repelled the fierce White Hun (Huna) invasions" }
      ],
      militaryAchievements: [
        "Prayag Prashasti (Allahabad Pillar): Recorded Samudragupta's Digvijaya—he conquered 9 kings of Aryavarta and 12 kings of Dakshinapatha.",
        "Performed the grand Ashvamedha Yajna (horse sacrifice) to signify subcontinental supremacy.",
        "Chandragupta Vikramaditya crushed the Shaka Kshatrapas in 395 CE, gaining Gujarat's lucrative Arabian Sea maritime ports (Bharuch/Sopara)."
      ],
      monumentsAndLegacy: [
        "Nalanda Mahavihara: The premier residential university of the ancient world with over 10,000 students and 9-story library (Dharmaganja).",
        "Rustless Iron Pillar of Delhi (Mehrauli): Advanced 1600-year-old metallurgy standing without corrosion.",
        "Navaratnas (Nine Gems): Kalidasa (author of Shakuntala and Meghaduta), Aryabhata (calculated π and planetary motion), Varahamihira, Dhanvantari."
      ],
      royalQuote: "He was without an antagonist on earth; his mind delighted in the company of poets and the melody of the veena, yet his sword knew only victory. — Harishena on Samudragupta"
    },

    territorialExpansion: {
      annexed: [
        "335 CE: Annexation of Ahichchhatra, Mathura, and upper Gangetic kingdoms",
        "350 CE: Tributary subjugation of Pallavas of Kanchipuram and Vakatakas",
        "395 CE: Saurashtra and Malwa annexed from Western Satraps by Vikramaditya",
        "420 CE: Bengal, Kamarupa (Assam), and Nepal recognized Gupta suzerainty"
      ],
      lost: [
        "480–528 CE: Huna invasions (Toramana & Mihirakula) sever northern arteries, precipitating decentralization"
      ]
    }
  },

  {
    id: "harsha",
    name: "Empire of Harsha (Vardhana)",
    hindiName: "हर्षवर्धन साम्राज्य",
    era: "606 CE – 647 CE",
    startYear: 606,
    endYear: 647,
    zenithYear: 630,
    capital: "Kannauj (Kanyakubja)",
    territoryKm: "2,200,000 km²",
    flagEmblem: "Solar Wheel & Lotus Crest",
    flagColors: ["#dc2626", "#fed7aa"],
    description: "A charismatic poet-emperor who reunited Northern India after the fall of the Guptas, hosted Chinese pilgrim Xuanzang, and established Kannauj as the cultural center of the subcontinent.",

    monarch: {
      name: "Harshavardhana",
      title: "Uttarapathapathi (Lord of the Northern Path)",
      reign: "606 CE – 647 CE",
      epithet: "The Playwright Emperor & Patron of Kannauj",
      portraitType: "harsha_king",
      queen: "Queen Durgavati",
      sons: [
        { name: "Vagyavardhana", role: "Imperial prince" },
        { name: "Kalyanavardhana", role: "Crown prince" }
      ],
      sister: "Rajyashri (Queen of Kannauj, whose rescue from Malwa inspired the Harsha saga)",
      militaryAchievements: [
        "United the kingdoms of Thanesar and Kannauj to forge a mighty northern military coalition.",
        "Subdued Bengal (Gauda kingdom) and Orissa, establishing authority from Punjab to Kamarupa.",
        "Epic Battle of Narmada (618 CE): Clash of titans against Chalukya Emperor Pulakeshin II, setting the Narmada River as the permanent North-South border."
      ],
      monumentsAndLegacy: [
        "Authored three classical Sanskrit plays: Ratnavali, Priyadarsika, and Nagananda.",
        "Convened the monumental 21-day Kannauj Assembly with 20 tributary kings and 4,000 Buddhist and Vedic scholars.",
        "Subsidized Nalanda University with revenue from 100 surrounding prosperous villages."
      ],
      royalQuote: "He forgot sleep and food in his devotion to good works; the treasures of his palace were emptied every five years at the Maha Moksha Parishad."
    },

    territorialExpansion: {
      annexed: [
        "606 CE: Thanesar and Kannauj unified",
        "615 CE: Northern plains and Vallabhi subjugated",
        "635 CE: Kongoda and coastal Orissa annexed"
      ],
      lost: [
        "618 CE: Narmada River frontier halted by Chalukya sovereign Pulakeshin II",
        "647 CE: Harsha passes away without surviving heir; Kannauj becomes center of Tripartite Struggle"
      ]
    }
  },

  {
    id: "chola",
    name: "Imperial Chola Dynasty (Maritime Empire)",
    hindiName: "चोल साम्राज्य (नौसैनिक महाशक्ति)",
    era: "848 CE – 1279 CE",
    startYear: 848,
    endYear: 1279,
    zenithYear: 1025,
    capital: "Thanjavur & Gangaikonda Cholapuram",
    territoryKm: "3,200,000 km² (Including Maritime Thalassocracy)",
    flagEmblem: "Jumping Royal Bengal Tiger (Pulikkodi)",
    flagColors: ["#b91c1c", "#fbbf24", "#000000"],
    description: "The world's foremost medieval maritime superpower. Built an ocean-going battle fleet that turned the Bay of Bengal into a 'Chola Lake', annexed Sri Lanka, and conquered Srivijaya across modern Indonesia and Malaysia.",

    monarch: {
      name: "Rajaraja Chola I & Rajendra Chola I",
      title: "Chola Martanda & Gangaikondan (Conqueror of the Ganga and the Oceans)",
      reign: "985 CE – 1044 CE (Peak Thalassocracy)",
      epithet: "Architect of Brihadisvara & Commander of the Bay of Bengal Armada",
      portraitType: "chola_king",
      queen: "Maharani Lokamahadevi, Maharani Cholamahadevi, Queen Mukkokilan",
      sons: [
        { name: "Rajendra Chola I", role: "Surpassed his father; conquered Srivijaya (Indonesia/Malaysia), Sri Lanka, and marched to the Ganga" },
        { name: "Rajadhiraja Chola", role: "Hero of the Chalukya wars, crowned directly on the battlefield" },
        { name: "Rajendra Chola II", role: "Defended the southern realm against Western Chalukyas" }
      ],
      militaryAchievements: [
        "Created an invincible Blue-Water Navy consisting of thousands of war vessels, transport ships, and boarding marines.",
        "1014 CE: Annexation of the entire island of Sri Lanka (Ilamandalalam) by Rajendra Chola.",
        "1019–1023 CE: Expedition to the River Ganga; defeated Mahipala of the Pala Empire and founded the new capital Gangaikonda Cholapuram.",
        "1025 CE: Epic Trans-Oceanic Expedition against Srivijaya; sacked Kedah, Pannai, Malacca Straits, securing Indian monopoly on China-Arab trade routes."
      ],
      monumentsAndLegacy: [
        "Brihadisvara Temple (Thanjavur): An architectural wonder with an 80-ton single granite monolithic cupola, built entirely without binding mortar.",
        "Nataraja Bronze Sculptures: Lost-wax casting masterpieces celebrated worldwide by sculptors and quantum physicists (Carl Sagan, CERN).",
        "Democratic Kudavolai Village Electoral System: Inscriptions at Uttaramerur detailing local self-government with ballot boxes and disqualification rules."
      ],
      royalQuote: "He dispatched many ships in the midst of the rolling sea and caught Sangrama-Vijayottungavarman, King of Kadaram, together with the elephants of his glorious army. — Thiruvalangadu Copper Plates"
    },

    territorialExpansion: {
      annexed: [
        "993 CE: Northern Sri Lanka (Anuradhapura) annexed by Rajaraja I",
        "1008 CE: Chera and Pandya territories absorbed",
        "1014 CE: Maldives and Lakshadweep islands subjugated",
        "1023 CE: Kalinga, Vengi, and lower Bengal reached",
        "1025 CE: Maritime suzerainty over Srivijaya (Sumatra, Java, Malay Peninsula)"
      ],
      lost: [
        "1250–1279 CE: Gradual decline under Maravarman Sundara Pandyan; absorption into Second Pandyan Empire"
      ]
    }
  },

  {
    id: "vijayanagara",
    name: "Vijayanagara Empire",
    hindiName: "विजयनगर साम्राज्य (हम्पी)",
    era: "1336 CE – 1646 CE",
    startYear: 1336,
    endYear: 1646,
    zenithYear: 1520,
    capital: "Hampi (Vijayanagara - The City of Victory)",
    territoryKm: "1,800,000 km²",
    flagEmblem: "Varaha (Boar), Dagger & Sun-Moon Royal Standard",
    flagColors: ["#d97706", "#7c2d12"],
    description: "The bastion of South Indian culture and sovereign resistance against northern Sultanates. Renowned for its monumental temple complexes, bustling diamond bazaars, and legendary military reforms under Krishnadevaraya.",

    monarch: {
      name: "Sri Krishnadevaraya (Tuluva Dynasty)",
      title: "Kannada Rajya Rama Ramana & Andhra Bhoja",
      reign: "1509 CE – 1529 CE",
      epithet: "Victor of Raichur & Patron of the Ashtadiggajas",
      portraitType: "vijayanagara_king",
      queen: "Queen Tirumala Devi & Queen Chinna Devi",
      sons: [
        { name: "Tirumala Raya", role: "Crown prince who was tragically poisoned during childhood" },
        { name: "Achyuta Deva Raya", role: "Brother and successor emperor" }
      ],
      advisors: [
        { name: "Prime Minister Timmarusu", role: "Chief strategist and mentor" },
        { name: "Tenali Ramakrishna", role: "Court poet, philosopher, and legendary quick-witted scholar" }
      ],
      militaryAchievements: [
        "Battle of Raichur (1520 CE): Crushing victory over Ismail Adil Shah of Bijapur with combined cavalry and Portuguese artillery.",
        "Subjugated the Gajapatis of Odisha and liberated the Krishna-Tungabhadra Doab.",
        "Maintained trade monopolies with Portuguese merchants in Goa for Persian war horses and bronze cannons."
      ],
      monumentsAndLegacy: [
        "Hampi Architectural Marvels: Stone Chariot at Vittala Temple, Virupaksha Temple tower, and musical pillars.",
        "Authored Amuktamalyada: Masterpiece of Telugu epic poetry on Vaishnava devotion and ideal state governance.",
        "Described by Portuguese traveler Domingo Paes as 'the best provided city in the world, with ruby and diamond bazaars sold by the sackful'."
      ],
      royalQuote: "An emperor should rule with Dharma as his chariot wheel, wisdom as his reins, and the happiness of the poorest peasant as his supreme objective. — Krishnadevaraya"
    },

    territorialExpansion: {
      annexed: [
        "1370 CE: Madurai Sultanate vanquished by Kumara Kampana",
        "1512 CE: Raichur, Udayagiri, and Kondavidu fortresses captured",
        "1520 CE: Complete dominion from Krishna River south to Cape Comorin"
      ],
      lost: [
        "1565 CE: Battle of Talikota — Coalition of Deccan Sultanates sacks Hampi; capital moves to Penukonda and Chandragiri"
      ]
    }
  },

  {
    id: "mughal",
    name: "Mughal Empire",
    hindiName: "मुगल साम्राज्य",
    era: "1526 CE – 1857 CE",
    startYear: 1526,
    endYear: 1857,
    zenithYear: 1700,
    capital: "Agra, Fatehpur Sikri, & Shahjahanabad (Delhi)",
    territoryKm: "4,000,000 km² (At Zenith under Aurangzeb)",
    flagEmblem: "Alam (Green Standard with Golden Lion and Rising Sun - Shir-o-Khurshid)",
    flagColors: ["#047857", "#fbbf24"],
    description: "A centralized gunpowder empire that brought together Persianate court culture with indigenous Indian traditions, creating timeless wonders like the Taj Mahal and controlling nearly 25% of global GDP in the 17th century.",

    monarch: {
      name: "Akbar the Great, Shah Jahan & Aurangzeb Alamgir",
      title: "Badshah Ghazi & Shahenshah",
      reign: "1556 CE – 1707 CE (The Grand Epoch)",
      epithet: "Masters of the Peacock Throne & Topkhana Field Artillery",
      portraitType: "mughal_king",
      queen: "Empress Mariam-uz-Zamani (Jodha Bai), Empress Nur Jahan, Empress Mumtaz Mahal",
      sons: [
        { name: "Jahangir (Salim)", role: "Patron of naturalistic miniature painting and justice bells" },
        { name: "Shah Jahan (Khurram)", role: "Architect of the Taj Mahal, Red Fort, and Peacock Throne" },
        { name: "Dara Shikoh", role: "Philosopher-prince who translated the 50 Upanishads into Persian (Sirr-i-Akbar)" },
        { name: "Aurangzeb Alamgir", role: "Expanded territory to greatest geographic limits across the Deccan" },
        { name: "Bahadur Shah Zafar", role: "Last titular emperor, declared figurehead of the 1857 Great Rebellion" }
      ],
      militaryAchievements: [
        "1526 CE: Babur's 1st Battle of Panipat introduced gunpowder matchlocks and wagon-breastwork tactics (Tulughma).",
        "1556 CE: 2nd Battle of Panipat where 13-year-old Akbar and Bairam Khan defeated Hemu.",
        "1576 CE: Battle of Haldighati against Maharana Pratap of Mewar.",
        "1686–1687 CE: Aurangzeb's sieges of Bijapur and Golconda brought the entire Deccan plateau into the empire."
      ],
      monumentsAndLegacy: [
        "Taj Mahal (Agra): White marble mausoleum designated as one of the New Seven Wonders of the World.",
        "Red Fort (Lal Qila) & Jama Masjid of Delhi: Epicenter of imperial court ceremonies.",
        "Mansabdari & Zabt Systems: Rigorous civil-military bureaucracy engineered by Raja Todar Mal."
      ],
      royalQuote: "If there is paradise on the face of the earth, it is here, it is here, it is here. — Inscription on Diwan-i-Khas, Red Fort"
    },

    territorialExpansion: {
      annexed: [
        "1526 CE: Delhi and Agra seized from Ibrahim Lodi",
        "1573 CE: Gujarat maritime ports annexed by Akbar",
        "1576 CE: Bengal Sultanate absorbed",
        "1686 CE: Sultanate of Bijapur annexed by Aurangzeb",
        "1687 CE: Sultanate of Golconda annexed, reaching southernmost Kaveri borders"
      ],
      lost: [
        "1707–1739 CE: Maratha conquests detach Malwa, Gujarat, Deccan; Nadir Shah of Persia sacks Delhi (1739)",
        "1757 CE: Bengal lost to East India Company at Plassey",
        "1858 CE: British crown deposes Bahadur Shah Zafar to Rangoon"
      ]
    }
  },

  {
    id: "maratha",
    name: "Maratha Empire (Hindavi Swarajya)",
    hindiName: "मराठा साम्राज्य (हिंदवी स्वराज्य)",
    era: "1674 CE – 1818 CE",
    startYear: 1674,
    endYear: 1818,
    zenithYear: 1758,
    capital: "Raigad, Satara, & Pune (Peshwa Seat)",
    territoryKm: "2,800,000 km² (From Attock on the Indus to Thanjavur)",
    flagEmblem: "Bhagwa Dhwaj (Saffron Double-Swallowtail Banner)",
    flagColors: ["#ea580c", "#c2410c"],
    description: "Founded by Chhatrapati Shivaji Maharaj on the principles of self-rule ('Hindavi Swarajya'), naval mastery, and lightning guerilla warfare. The Marathas shattered Mughal dominance and became the premier power of 18th-century India.",

    monarch: {
      name: "Chhatrapati Shivaji Maharaj",
      title: "Chhatrapati, Shakakarta (Era-Maker), & Father of the Indian Navy",
      reign: "1674 CE – 1680 CE (Empire continued by Sambhaji & Peshwas to 1818)",
      epithet: "Architect of Ganimi Kava Guerilla Warfare & Fort Sovereign",
      portraitType: "maratha_king",
      queen: "Maharani Saibai, Maharani Soyarabai, Maharani Putalabai",
      mother: "Rajmata Jijabai (Guiding moral visionary and educator of Shivaji)",
      sons: [
        { name: "Chhatrapati Sambhaji Maharaj (Chhava)", role: "Fierce warrior-scholar; fought 120 battles undefeated, held off Aurangzeb's full imperial army for 9 years" },
        { name: "Chhatrapati Rajaram Maharaj", role: "Sustained the war of independence from Jinji Fort in Tamil Nadu" },
        { name: "Chhatrapati Shahu I", role: "Consolidated the imperial Maratha Confederacy with Peshwa Balaji Vishwanath" }
      ],
      commanders: [
        { name: "Peshwa Baji Rao I", role: "Undefeated in 41 pitched battles; rode to Delhi gates; struck terror across Mughal provinces" },
        { name: "Kanhoji Angre", role: "Naval Admiral (Sarkhel) who dominated the Konkan coast and routed Dutch, British, and Portuguese fleets" },
        { name: "Raghunathrao", role: "Planted the saffron Bhagwa Dhwaj at Attock on the Indus River in 1758 (modern Pakistan)" }
      ],
      militaryAchievements: [
        "1659 CE: Defeated Bijapuri commander Afzal Khan at the Battle of Pratapgad using tiger claws (Bagh Nakh).",
        "1663 CE: Daring midnight surgical raid on Shaista Khan's palace in Pune.",
        "Built and fortified a chain of 370+ hill and sea forts (Raigad, Sindhudurg, Murud Janjira, Vijaydurg).",
        "Constituted the Maratha Navy: Pioneered indigenous gunboats (Gurabs and Gallivats) to protect coastal sovereignty."
      ],
      monumentsAndLegacy: [
        "Raigad Fort: The Gibraltar of the East, perched high in the Sahyadris.",
        "Ashta Pradhan Council: A modern Cabinet system dividing statecraft into eight ministerial portfolios.",
        "Strict Military Ethics: Zero toleration for dishonor toward women, prisoners of war, or holy texts of any faith."
      ],
      royalQuote: "Never bow your head, always keep it high. It is the birthright of every human to be free, and we shall forge our own Swarajya with our swords! — Chhatrapati Shivaji Maharaj"
    },

    territorialExpansion: {
      annexed: [
        "1674 CE: Western Ghats, Konkan coastline, and northern Karnataka liberated",
        "1720–1740 CE: Peshwa Baji Rao I captures Malwa, Gujarat, Bundelkhand",
        "1758 CE: Marathas capture Lahore and Peshawar, planting flag at Fort of Attock",
        "1760 CE: Annexation of Delhi under Sadashivrao Bhau"
      ],
      lost: [
        "1761 CE: Third Battle of Panipat against Ahmad Shah Durrani (heavy casualties, but Marathas restored control within a decade)",
        "1803–1818 CE: Anglo-Maratha Wars result in British annexation of Peshwa territories"
      ]
    }
  },

  {
    id: "sikh",
    name: "Sikh Empire (Sarkar-i-Khalsa)",
    hindiName: "सिख साम्राज्य (सरकार-ए-खालसा)",
    era: "1799 CE – 1849 CE",
    startYear: 1799,
    endYear: 1849,
    zenithYear: 1837,
    capital: "Lahore & Amritsar",
    territoryKm: "1,500,000 km²",
    flagEmblem: "Nishan Sahib (Triangular Saffron Standard with Khanda Crest)",
    flagColors: ["#f97316", "#1e3a8a"],
    description: "A secular, fiercely independent empire founded by Sher-e-Punjab Maharaja Ranjit Singh that secured the Khyber Pass, modernized its army with European tacticians, and maintained absolute communal harmony without a single death penalty.",

    monarch: {
      name: "Maharaja Ranjit Singh",
      title: "Sher-e-Punjab (Lion of Punjab)",
      reign: "1799 CE – 1839 CE",
      epithet: "Protector of the Golden Temple & Sovereign of the North-West Frontier",
      portraitType: "sikh_king",
      queen: "Maharani Jind Kaur (The Last Empress and rebel against British annexation), Maharani Mehtab Kaur, Maharani Datar Kaur",
      sons: [
        { name: "Kharak Singh", role: "Successor Maharaja of the Khalsa Commonwealth" },
        { name: "Sher Singh", role: "Maharaja who patronized arts and military discipline" },
        { name: "Maharaja Duleep Singh", role: "Last child Maharaja, exiled to England after annexation; original owner of the Koh-i-Noor" }
      ],
      commanders: [
        { name: "Sardar Hari Singh Nalwa", role: "Feared Commander-in-Chief who permanently fortified the Khyber Pass against Afghan invasions" },
        { name: "General Zorawar Singh", role: "The 'Napoleon of India' who conquered Ladakh, Baltistan, and marched into Western Tibet" }
      ],
      militaryAchievements: [
        "1799 CE: Unified the twelve fragmented Sikh Misls into a unified centralized state.",
        "Built the Fauj-i-Khas: Elite infantry and artillery corps drilled by French and Italian Napoleonic generals (Allard, Ventura, Court).",
        "Battle of Jamrud (1837 CE): Crushed Afghan forces, forever halting foreign overland incursions into the subcontinent.",
        "Recovered the sacred Koh-i-Noor diamond and the Gates of Somnath."
      ],
      monumentsAndLegacy: [
        "Harmandir Sahib (Golden Temple, Amritsar): Covered the sanctum with 750 kg of pure gold leaf and marble inlay.",
        "Secular Governance: Court included Prime Minister Dhian Singh (Dogra), Foreign Minister Fakir Azizuddin (Muslim), and Finance Minister Diwan Dina Nath (Hindu).",
        "Abolition of Capital Punishment: In 40 years of rule, not a single individual was executed by state decree."
      ],
      royalQuote: "God intended me to look upon all religions with one eye; that is why he took away the sight from my other. — Maharaja Ranjit Singh"
    },

    territorialExpansion: {
      annexed: [
        "1799 CE: Capture of Lahore",
        "1818 CE: Multan captured after epic siege",
        "1819 CE: Kashmir liberated from Afghan Durranis",
        "1823 CE: Peshawar and NWFP conquered",
        "1834 CE: Ladakh and Baltistan annexed by General Zorawar Singh"
      ],
      lost: [
        "1845–1846 CE: First Anglo-Sikh War (Treaty of Lahore)",
        "1849 CE: Second Anglo-Sikh War — British East India Company annexes Punjab, takes Koh-i-Noor"
      ]
    }
  },

  {
    id: "eic",
    name: "British East India Company & The Raj",
    hindiName: "ईस्ट इंडिया कंपनी और ब्रिटिश राज",
    era: "1757 CE – 1947 CE",
    startYear: 1757,
    endYear: 1947,
    zenithYear: 1910,
    capital: "Calcutta (1772–1911) & New Delhi (1911–1947)",
    territoryKm: "4,600,000 km² (Direct British India + 565 Princely States)",
    flagEmblem: "East India Company Striped Ensign (1757) / Star of India & Union Jack (1858)",
    flagColors: ["#dc2626", "#ffffff", "#1e3a8a"],
    description: "The transformation of a private London corporate joint-stock monopoly into an imperial subjugation apparatus, engineered through bribery, military technology, the Doctrine of Lapse, and systematic economic drain.",

    monarch: {
      name: "Robert Clive, Lord Dalhousie & Queen Victoria",
      title: "Governors-General, Viceroys & Kaisar-i-Hind (Empress of India)",
      reign: "1757 CE (Plassey) – 1947 CE (Independence)",
      epithet: "Monopoly Traders Turned Imperial Masters",
      portraitType: "eic_ruler",
      resistersAndHeroes: [
        { name: "Siraj-ud-Daulah", role: "Nawab of Bengal betrayed by Mir Jafar at Plassey (1757)" },
        { name: "Tipu Sultan (Tiger of Mysore)", role: "Pioneered rocket artillery, died sword-in-hand defending Seringapatam (1799)" },
        { name: "Rani Lakshmibai of Jhansi", role: "Icon of the 1857 Uprising: 'Main apni Jhansi nahi doongi!'" },
        { name: "Mangal Pandey & Tatya Tope", role: "Sparks and guerilla leaders of the 1857 Great Rebellion" },
        { name: "Subhas Chandra Bose (Netaji)", role: "Formed the Indian National Army (Azad Hind Fauj), launched military assault from northeast" },
        { name: "Mahatma Gandhi & Sardar Patel", role: "Led the Non-Cooperation and Quit India mass movements; integrated 565 princely states" }
      ],
      militaryAchievements: [
        "1757 CE: Battle of Plassey — Clive bribed general Mir Jafar, conquered Bengal without full battle.",
        "1764 CE: Battle of Buxar — Defeated combined Mughal and Awadh armies; extracted Diwani (tax collection rights) over 20 million people in Treaty of Allahabad (1765).",
        "1799 CE: Fall of Seringapatam — Ended Mysore resistance; killed Tipu Sultan.",
        "1818 CE: Overthrow of the Maratha Peshwai; captured Pune.",
        "1848–1856 CE: Lord Dalhousie's 'Doctrine of Lapse' annexed Jhansi, Satara, Sambalpur, and Awadh without military combat.",
        "1857 CE: Brutal suppression of the First War of Independence; dissolution of the East India Company by the British Parliament (Government of India Act 1858)."
      ],
      monumentsAndLegacy: [
        "Economic Drain: Over $45 trillion extracted from the subcontinent (documented by economist Utsa Patnaik).",
        "Infrastructure for Extraction: Constructed the Indian Railways (1853), telegraph network, and civil services to transport raw cotton, opium, and tea to British ports.",
        "Catastrophic Famines: Bengal Famine of 1770 and 1943 resulting in millions of civilian deaths due to wartime grain hoarding."
      ],
      royalQuote: "A corporate trading firm governed an empire of 300 million people, backed by a private mercenary army larger than that of almost any sovereign state on Earth."
    },

    territorialExpansion: {
      annexed: [
        "1757 CE: Bengal after Battle of Plassey",
        "1765 CE: Diwani rights over Bengal, Bihar, and Orissa",
        "1799 CE: Mysore partitioned after death of Tipu Sultan",
        "1818 CE: Bombay Presidency formed from Maratha heartland",
        "1843 CE: Sindh conquered by Sir Charles Napier",
        "1849 CE: Punjab annexed after Anglo-Sikh Wars",
        "1853–1856 CE: Jhansi, Nagpur, and Awadh annexed via Doctrine of Lapse",
        "1886 CE: Upper Burma annexed to British Indian administration"
      ],
      lost: [
        "August 15, 1947: Complete end of British colonial rule; partition into Sovereign India and Pakistan"
      ]
    }
  },

  {
    id: "republic",
    name: "Republic of India (Sovereign Bharat)",
    hindiName: "भारत गणराज्य (स्वतंत्र भारत)",
    era: "1947 CE – 2026 CE+",
    startYear: 1947,
    endYear: 2026,
    zenithYear: 2026,
    capital: "New Delhi",
    territoryKm: "3,287,263 km²",
    flagEmblem: "Tiranga (Saffron, White, Green with 24-Spoke Navy Blue Ashoka Chakra)",
    flagColors: ["#f97316", "#ffffff", "#16a34a"],
    description: "The world's largest sovereign democracy, home to 1.4+ billion people, possessing a nuclear triad, cutting-edge space exploration (Chandrayaan & Gaganyaan), digital public infrastructure (UPI), and an ancient civilizational renaissance.",

    monarch: {
      name: "Democratic Republic & Founding Visionaries",
      title: "Sovereign Socialist Secular Democratic Republic",
      reign: "January 26, 1950 (Constitution Enacted) – 2026 CE+",
      epithet: "World's Largest Democracy & Rising Global Power",
      portraitType: "republic_emblem",
      leaders: [
        { name: "Dr. B.R. Ambedkar", role: "Architect & Chairman of the Constitution Drafting Committee" },
        { name: "Sardar Vallabhbhai Patel (Iron Man of India)", role: "Unified 565 Princely States into one united national territory" },
        { name: "Jawaharlal Nehru", role: "First Prime Minister; laid scientific and industrial foundations (IITs, ISRO precursor, Atomic Energy)" },
        { name: "Dr. A.P.J. Abdul Kalam (Missile Man)", role: "Father of indigenous missile technology (Agni, Prithvi) and beloved President" }
      ],
      militaryAchievements: [
        "1947–1948: Integration of Junagadh, Hyderabad (Operation Polo), and Jammu & Kashmir.",
        "1961: Liberation of Goa, Daman, and Diu from 450 years of Portuguese colonial occupation (Operation Vijay).",
        "1971: Decisive military victory liberating Bangladesh with the surrender of 93,000 enemy troops.",
        "1998: Operation Shakti (Pokhran-II nuclear tests establishing nuclear deterrence).",
        "1999: Kargil War (Operation Vijay) reclaiming high-altitude Himalayan peaks."
      ],
      monumentsAndLegacy: [
        "The Constitution of India: Longest written constitution of any sovereign state in the world, guaranteeing universal adult franchise from day one.",
        "Space Prowess: ISRO became the 1st nation to land on the Moon's South Pole (Chandrayaan-3) and sent Mars Orbiter (Mangalyaan) on first attempt.",
        "Digital Infrastructure: Unified Payments Interface (UPI) accounting for nearly 45% of all global real-time digital payment transactions."
      ],
      royalQuote: "Satyameva Jayate (Truth Alone Triumphs) — Mundaka Upanishad, National Motto of India"
    },

    territorialExpansion: {
      annexed: [
        "1947–1949: Accession and integration of 565 Princely States by Sardar Patel",
        "1961: Liberation and integration of Portuguese Goa, Daman, and Diu",
        "1975: Democratic accession and statehood of Sikkim",
        "2019: Reorganization of Jammu & Kashmir and Ladakh into Union Territories",
        "2026: Modern unified sovereign federal republic with 28 States and 8 Union Territories"
      ],
      lost: [
        "1947: Tragic Partition creating West & East Pakistan",
        "1962: Aksai Chin territorial occupation by China along LAC"
      ]
    }
  }
];

// Timeline Key Milestones for Territorial Annexation Engine
const TIMELINE_EVENTS = [
  {
    year: -322,
    yearLabel: "322 BCE",
    title: "Rise of Chandragupta Maurya & Fall of Nanda Empire",
    dynastyId: "maurya",
    ruler: "Chandragupta Maurya & Chanakya",
    territoryDescription: "Chandragupta overthrows Dhana Nanda in Pataliputra, establishing Mauryan control over the Gangetic Basin.",
    annexedLand: "Magadha, Bihar, Bengal, Eastern Uttar Pradesh",
    lostLand: "Nanda Dynasty completely dissolved",
    coordinates: { lat: 25.61, lon: 85.14 }, // Pataliputra
    mapHighlight: "gangetic_core"
  },
  {
    year: -305,
    yearLabel: "305 BCE",
    title: "Mauryan-Seleucid War & Treaty of the Indus",
    dynastyId: "maurya",
    ruler: "Chandragupta Maurya vs. Seleucus I Nicator",
    territoryDescription: "Seleucus cedes Kabul, Kandahar, Gandhara, and Baluchistan to Chandragupta in exchange for 500 war elephants.",
    annexedLand: "Arachosia (Kandahar), Gedrosia (Baluchistan), Gandhara (Taxila), Kabul Valley",
    lostLand: "Seleucid Empire loses its eastern satrapies forever",
    coordinates: { lat: 33.74, lon: 72.78 }, // Taxila
    mapHighlight: "northwest_afghanistan"
  },
  {
    year: -261,
    yearLabel: "261 BCE",
    title: "The Kalinga War & Ashoka's Edicts",
    dynastyId: "maurya",
    ruler: "Samrat Ashoka the Great",
    territoryDescription: "Ashoka conquers coastal Kalinga in a catastrophic conflict; transforms his reign to Dhamma Vijaya (Conquest by Righteousness).",
    annexedLand: "Kalinga (Modern Odisha, Northern Andhra)",
    lostLand: "Independent Kalinga Republic absorbed",
    coordinates: { lat: 20.24, lon: 85.83 }, // Dhauli / Kalinga
    mapHighlight: "kalinga_odisha"
  },
  {
    year: 127,
    yearLabel: "127 CE",
    title: "Kanishka I Zenith & Silk Road Consolidation",
    dynastyId: "kushan",
    ruler: "Emperor Kanishka I",
    territoryDescription: "Kushans dominate trans-Eurasian trade corridors connecting Bactria, Gandhara, Punjab, and Mathura.",
    annexedLand: "Tarim Basin, Kashmir, Punjab, Mathura, Varanasi",
    lostLand: "Indo-Parthian and localized tribal kingdoms assimilated",
    coordinates: { lat: 34.01, lon: 71.52 }, // Peshawar
    mapHighlight: "kushan_silk_road"
  },
  {
    year: 350,
    yearLabel: "350 CE",
    title: "Samudragupta's Digvijaya Campaign",
    dynastyId: "gupta",
    ruler: "Maharajadhiraja Samudragupta",
    territoryDescription: "Samudragupta subjugates Aryavarta kings directly and exacts tribute from 12 Dakshinapatha rulers as far south as Kanchipuram.",
    annexedLand: "Upper Gangetic plains, Central India, Bengal; tributary suzerainty over Pallavas and Vakatakas",
    lostLand: "Naga and Kota dynasties overthrown",
    coordinates: { lat: 25.43, lon: 81.84 }, // Prayagraj
    mapHighlight: "gupta_aryavarta"
  },
  {
    year: 395,
    yearLabel: "395 CE",
    title: "Chandragupta Vikramaditya Crushes Western Kshatrapas",
    dynastyId: "gupta",
    ruler: "Chandragupta II Vikramaditya",
    territoryDescription: "Guptas conquer Gujarat and Saurashtra, securing Arabian Sea trade with Rome and Alexandria; establishes Ujjain cultural capital.",
    annexedLand: "Malwa, Saurashtra, Gujarat, ports of Bharuch and Sopara",
    lostLand: "Western Shaka Satraps extinguished after 300 years of rule",
    coordinates: { lat: 23.17, lon: 75.78 }, // Ujjain
    mapHighlight: "gujarat_malwa"
  },
  {
    year: 618,
    yearLabel: "618 CE",
    title: "Battle of Narmada: Harsha vs. Pulakeshin II",
    dynastyId: "harsha",
    ruler: "Harshavardhana vs. Pulakeshin II Chalukya",
    territoryDescription: "Chalukya Emperor Pulakeshin II repels Harsha's grand southern expedition along the Narmada River, solidifying Deccan autonomy.",
    annexedLand: "Harsha consolidates northern empire up to Narmada; Pulakeshin II secures Deccan and South",
    lostLand: "Harsha abandons ambitions south of the Narmada",
    coordinates: { lat: 21.70, lon: 74.00 }, // Narmada River
    mapHighlight: "narmada_divide"
  },
  {
    year: 1025,
    yearLabel: "1025 CE",
    title: "Rajendra Chola's Maritime Armada Conquers Srivijaya",
    dynastyId: "chola",
    ruler: "Rajendra Chola I",
    territoryDescription: "The Imperial Chola Navy sails 3,000 km across the Indian Ocean to defeat Srivijaya, Kadaram (Kedah), and secure the Malacca Straits.",
    annexedLand: "Sri Lanka (complete), Andaman & Nicobar, Malacca Straits trade outposts, Southern peninsular India",
    lostLand: "Srivijaya King Sangrama-Vijayottungavarman captured; monopoly broken",
    coordinates: { lat: 10.78, lon: 79.13 }, // Thanjavur
    mapHighlight: "chola_thalassocracy"
  },
  {
    year: 1520,
    yearLabel: "1520 CE",
    title: "Battle of Raichur: Krishnadevaraya's Triumphant March",
    dynastyId: "vijayanagara",
    ruler: "Sri Krishnadevaraya",
    territoryDescription: "Vijayanagara forces defeat the Adil Shahi Sultanate of Bijapur, recapturing the strategic fertile Raichur Doab.",
    annexedLand: "Raichur Doab, Mudgal, Krishna-Tungabhadra river valley",
    lostLand: "Bijapur Sultanate cedes fortified territories",
    coordinates: { lat: 15.33, lon: 76.46 }, // Hampi
    mapHighlight: "vijayanagara_deccan"
  },
  {
    year: 1526,
    yearLabel: "1526 CE",
    title: "First Battle of Panipat: Babur Establishes Mughal Dynasty",
    dynastyId: "mughal",
    ruler: "Zahir-ud-din Muhammad Babur",
    territoryDescription: "Babur's field artillery and Tulughma cavalry envelop Ibrahim Lodi's 100,000-man army, ending the Delhi Sultanate.",
    annexedLand: "Delhi, Agra, Doab region",
    lostLand: "Lodi Dynasty of Delhi Sultanate collapses",
    coordinates: { lat: 29.39, lon: 76.96 }, // Panipat
    mapHighlight: "mughal_delhi_core"
  },
  {
    year: 1674,
    yearLabel: "1674 CE",
    title: "Coronation of Shivaji Maharaj at Raigad (Hindavi Swarajya)",
    dynastyId: "maratha",
    ruler: "Chhatrapati Shivaji Maharaj",
    territoryDescription: "Shivaji crowns himself Chhatrapati of an independent sovereign realm, having carved out 300+ forts from Mughal and Bijapuri grip.",
    annexedLand: "Konkan coast, Pune, Satara, Kolhapur, Raigad, parts of North Karnataka",
    lostLand: "Mughal and Adil Shahi tax collectors expelled from Sahyadri forts",
    coordinates: { lat: 18.23, lon: 73.44 }, // Raigad Fort
    mapHighlight: "maratha_swarajya"
  },
  {
    year: 1700,
    yearLabel: "1700 CE",
    title: "Aurangzeb's Deccan Sieges Reach Maximum Territorial Extent",
    dynastyId: "mughal",
    ruler: "Aurangzeb Alamgir",
    territoryDescription: "Mughal borders stretch from Kabul to Jinji, covering 4 million sq km; however, 27-year war against Maratha guerillas bankrupts the state.",
    annexedLand: "Sultanates of Bijapur (1686) and Golconda (1687), parts of Tamil Nadu",
    lostLand: "Deccan treasuries drained; Maratha resurgence begins under Tarabai and Peshwas",
    coordinates: { lat: 19.87, lon: 75.34 }, // Aurangabad
    mapHighlight: "mughal_zenith"
  },
  {
    year: 1757,
    yearLabel: "1757 CE",
    title: "Battle of Plassey: East India Company Seizes Bengal",
    dynastyId: "eic",
    ruler: "Robert Clive vs. Nawab Siraj-ud-Daulah",
    territoryDescription: "Clive conspires with Mir Jafar; British forces rout the Nawab's army and gain puppet control over Bengal's vast wealth.",
    annexedLand: "Bengal Presidency de facto administrative suzerainty",
    lostLand: "Independent Nawab of Bengal loses sovereignty",
    coordinates: { lat: 23.80, lon: 88.25 }, // Plassey (Palashi)
    mapHighlight: "eic_bengal_plassey"
  },
  {
    year: 1765,
    yearLabel: "1765 CE",
    title: "Treaty of Allahabad: Diwani Tax Rights Granted to EIC",
    dynastyId: "eic",
    ruler: "Robert Clive & Mughal Emperor Shah Alam II",
    territoryDescription: "Following the Battle of Buxar (1764), Mughal Emperor grants the British Company direct tax collection rights over Bengal, Bihar, and Orissa.",
    annexedLand: "Diwani rights over 20 million citizens across Bengal, Bihar, and Orissa",
    lostLand: "Mughal fiscal authority over eastern India completely alienated",
    coordinates: { lat: 25.43, lon: 81.84 }, // Allahabad Fort
    mapHighlight: "eic_diwani_east"
  },
  {
    year: 1799,
    yearLabel: "1799 CE",
    title: "Fourth Anglo-Mysore War: Fall of Seringapatam",
    dynastyId: "eic",
    ruler: "British EIC (General Harris/Wellesley) vs. Tipu Sultan",
    territoryDescription: "Tipu Sultan is killed defending his water gate; Mysore's rocket corps broken; territories partitioned between EIC, Nizam, and Wodeyars.",
    annexedLand: "Coimbatore, Canara coast, Wayanad; Wodeyar puppet dynasty installed under Subsidiary Alliance",
    lostLand: "Kingdom of Mysore loses coastal access and half its territory",
    coordinates: { lat: 12.41, lon: 76.69 }, // Seringapatam
    mapHighlight: "eic_mysore_conquest"
  },
  {
    year: 1818,
    yearLabel: "1818 CE",
    title: "Third Anglo-Maratha War: Fall of the Peshwai",
    dynastyId: "eic",
    ruler: "British EIC vs. Peshwa Baji Rao II & Maratha Confederacy",
    territoryDescription: "British crush the Peshwa, Holkar, and Bhonsle armies; Peshwaship abolished; Bombay Presidency created from Maratha heartland.",
    annexedLand: "Maharashtra heartland, Konkan, Khandesh, parts of Gujarat and Central India",
    lostLand: "Maratha Imperial Confederacy completely dismantled",
    coordinates: { lat: 18.52, lon: 73.85 }, // Pune / Shaniwar Wada
    mapHighlight: "eic_maratha_annex"
  },
  {
    year: 1849,
    yearLabel: "1849 CE",
    title: "Second Anglo-Sikh War: Annexation of Punjab",
    dynastyId: "eic",
    ruler: "Lord Dalhousie vs. Sikh Khalsa Army",
    territoryDescription: "Following the battles of Chillianwala and Gujrat, British annex the entire Sikh Empire; 10-year-old Maharaja Duleep Singh surrenders Koh-i-Noor.",
    annexedLand: "Punjab, North-West Frontier, Multan, Kashmir (sold to Gulab Singh)",
    lostLand: "Sarkar-i-Khalsa sovereign empire ceases to exist",
    coordinates: { lat: 31.52, lon: 74.35 }, // Lahore
    mapHighlight: "eic_punjab_annex"
  },
  {
    year: 1856,
    yearLabel: "1856 CE",
    title: "Doctrine of Lapse & Annexation of Awadh",
    dynastyId: "eic",
    ruler: "Lord Dalhousie",
    territoryDescription: "Dalhousie annexes kingdoms without biological male heirs (Jhansi, Satara, Nagpur) and annexes Awadh on pretext of 'misgovernance'.",
    annexedLand: "Awadh (Oudh - Lucknow), Jhansi, Nagpur, Satara, Sambalpur",
    lostLand: "Nawab Wajid Ali Shah exiled; Rani Lakshmibai dispossessed, fueling 1857 Uprising",
    coordinates: { lat: 26.84, lon: 80.94 }, // Lucknow
    mapHighlight: "eic_lapse_doctrine"
  },
  {
    year: 1858,
    yearLabel: "1858 CE",
    title: "1857 Great Rebellion & Crown Direct Rule Proclamation",
    dynastyId: "eic",
    ruler: "Queen Victoria's Proclamation (Government of India Act 1858)",
    territoryDescription: "After nationwide uprising led by Rani Lakshmibai, Mangal Pandey, and Tatya Tope, British Parliament dissolves EIC; British Raj instituted.",
    annexedLand: "All Company territories converted into Direct Crown Colony + 565 Princely States under British Paramountcy",
    lostLand: "East India Company dissolved forever; Mughal dynasty officially extinguished with exile of Bahadur Shah Zafar",
    coordinates: { lat: 28.65, lon: 77.23 }, // Delhi Red Fort
    mapHighlight: "british_raj_total"
  },
  {
    year: 1947,
    yearLabel: "1947 CE",
    title: "Independence of India & Accession of 565 Princely States",
    dynastyId: "republic",
    ruler: "Sardar Vallabhbhai Patel & Prime Minister Jawaharlal Nehru",
    territoryDescription: "Tiranga hoisted at Red Fort. Sardar Patel negotiates Instrument of Accession integrating 565 princely states into one united Republic of India.",
    annexedLand: "Integration of Hyderabad (Operation Polo), Junagadh, Kashmir, Travancore, Rajputana into Sovereign Indian Union",
    lostLand: "Tragic Partition dividing Punjab and Bengal to form Pakistan",
    coordinates: { lat: 28.61, lon: 77.20 }, // New Delhi
    mapHighlight: "independent_india_1947"
  },
  {
    year: 2026,
    yearLabel: "2026 CE",
    title: "Sovereign Republic of India Today: 5th Largest Global Economy",
    dynastyId: "republic",
    ruler: "Sovereign Democratic Republic of India (1.4+ Billion Citizens)",
    territoryDescription: "Modern 28 States and 8 Union Territories with space exploration, nuclear deterrence, digital public infrastructure, and civilizational pride.",
    annexedLand: "Integral territory spanning Siachen Glacier to Kanyakumari, Sir Creek to Kibithu",
    lostLand: "Unyielding defense of Line of Control (LoC) and Line of Actual Control (LAC)",
    coordinates: { lat: 28.61, lon: 77.20 }, // New Delhi (Kartavya Path)
    mapHighlight: "modern_india_2026"
  }
];

// 3D Armory Database: Historic Weapons of the Indian Subcontinent
const WEAPONS_DATA = [
  {
    id: "khanda",
    name: "Khanda (The Double-Edged Holy Broadsword)",
    hindiName: "खांडा",
    era: "300 BCE – 19th Century CE",
    dynasties: ["Maurya", "Gupta", "Rajput", "Maratha", "Sikh Khalsa"],
    type: "Double-Edged Straight Cleaving Sword",
    length: "95 cm – 105 cm",
    weight: "1.4 kg – 1.8 kg",
    bladeSteel: "Wootz Steel (Crucible Indian High-Carbon Damascus)",
    hiltStyle: "Traditional Hindu Basket Hilt with Extended Pommel Spike",
    description: "The premier heavy sword of ancient and medieval India. Engineered with a broadening blunt-tipped spatulate blade and a reinforced spinal rib along the back, enabling catastrophic cleaving blows against mail armor.",
    tacticalUse: "Wielded with both one or two hands by elite vanguard shock infantry and cavalry. The long pommel spike ('Katora') was gripped with the second hand for crushing leverage or used as a secondary puncturing dagger in close-quarters grapple.",
    historicalUsers: [
      "Chandragupta Maurya's royal guards in Pataliputra",
      "Maharana Pratap and Rajput warrior clans",
      "Akali Nihang warriors of the Sikh Khalsa as a sacred holy weapon"
    ],
    famousBattle: "Battle of Haldighati (1576) & Battle of Chamkaur (1704)",
    specs: {
      reach: 88,
      damage: 96,
      armorPiercing: 85,
      weightRating: "Medium-Heavy",
      craftDifficulty: "Masterwork Crucible Wootz"
    }
  },

  {
    id: "talwar",
    name: "Talwar (The Curved Wootz Cavalry Sabre)",
    hindiName: "तलवार",
    era: "12th – 19th Century CE",
    dynasties: ["Mughal", "Maratha", "Rajput", "Sikh Empire"],
    type: "Single-Edged Curved Slashing Sabre",
    length: "85 cm – 95 cm",
    weight: "1.0 kg – 1.3 kg",
    bladeSteel: "Damascus / Wootz (Ukku) with Watered-Silk Crystallization",
    hiltStyle: "Disc Pommel (Katori) with Quillon Crossguard and Sunburst Finial",
    description: "The quintessential curved sword of the Indian warrior. The unique disc pommel locks the user's wrist firmly into a dedicated cutting angle, making it mechanically impossible for the weapon to twist on impact and delivering devastating draw-cuts.",
    tacticalUse: "Optimized for horseback combat. The curve of the blade draws smoothly through flesh and fabric on high-speed cavalry sweeps, slicing cleanly rather than getting lodged in bone.",
    historicalUsers: [
      "Mughal heavy cavalry (Ahadis and Mansabdars)",
      "Maratha light cavalry under Peshwa Baji Rao I",
      "Maharaja Ranjit Singh's Fauj-i-Khas cavalry troopers"
    ],
    famousBattle: "Battle of Palkhed (1728) & Battle of Panipat (1526, 1556)",
    specs: {
      reach: 82,
      damage: 92,
      armorPiercing: 70,
      weightRating: "Balanced Cavalry",
      craftDifficulty: "Gold-Inlaid Koftgari Metallurgy"
    }
  },

  {
    id: "chakram",
    name: "Chakram (The Razor-Edged War Discus)",
    hindiName: "चक्रम",
    era: "Ancient Vedic Era to 19th Century CE",
    dynasties: ["Maurya", "Gupta", "Vijayanagara", "Sikh Khalsa"],
    type: "High-Velocity Aerodynamic Throwing Weapon",
    diameter: "22 cm – 30 cm",
    weight: "0.4 kg – 0.7 kg",
    bladeSteel: "Tempered Spring Wootz Steel",
    hiltStyle: "Ring aerofoil (inner bevel dull, outer edge razor-sharp)",
    description: "A legendary throwing weapon native exclusively to the Indian subcontinent. Shaped as an aerodynamic circular steel ring with an aerofoil cross-section, enabling it to fly with deadly lift and stability over distances up to 60 meters.",
    tacticalUse: "Spun around the index finger or twirled on a bamboo rod before launching with a horizontal flick of the wrist. Sikh Nihang warriors carried up to 10 chakrams stacked on their tall conical dastar turbans, hurling them in rapid volleys to decapitate enemy ranks.",
    historicalUsers: [
      "Ancient Vedic Chakravartin kings (emblematic of Vishnu's Sudarshana Chakra)",
      "Vijayanagara infantry line-breakers",
      "Akali Nihang vanguard troops in the Sikh Empire"
    ],
    famousBattle: "Battle of Jamrud (1837) against Afghan tribal skirmishers",
    specs: {
      reach: 95,
      damage: 89,
      armorPiercing: 76,
      weightRating: "Ultra-Light Aerodynamic",
      craftDifficulty: "Aerofoil Ring Forging"
    }
  },

  {
    id: "bhala",
    name: "Bhala / Vel (The Imperial Thrusting Lance)",
    hindiName: "भाला",
    era: "300 BCE – Present Day (Ceremonial)",
    dynasties: ["Maurya", "Chola", "Maratha", "Rajput", "Company Cavalry"],
    type: "Two-Handed Heavy Thrusting & Cavalry Lance",
    length: "2.4 m – 3.2 m",
    weight: "2.1 kg – 2.8 kg",
    bladeSteel: "Forged Steel Leaf Spearhead with Fluted Blood-Runners",
    hiltStyle: "Treated Tonkin Bamboo or Malacca Cane with Brass Counterweight Shoe",
    description: "The primary battle weapon of Indian infantry phalanxes and cavalry charges for over two millennia. Designed with a broad leaf-shaped head capable of both puncturing breastplates and delivering wide slashing thrusts.",
    tacticalUse: "Maratha light cavalry under Shivaji Maharaj transformed the Bhala into a terror weapon. Riding swift Deccan ponies, Maratha lancers used long bamboo spears to out-range heavier Mughal sabres while crossing rocky ghat terrain at speed.",
    historicalUsers: [
      "Mauryan frontline elephant guards and charioteers",
      "Chola royal marine boarding units in the Bay of Bengal",
      "Chhatrapati Shivaji's Bargir cavalry forces"
    ],
    famousBattle: "Battle of Pratapgad (1659) & Battle of Sinhagad (1670)",
    specs: {
      reach: 99,
      damage: 94,
      armorPiercing: 92,
      weightRating: "Long Two-Handed",
      craftDifficulty: "Tempered Socketed Spearhead"
    }
  },

  {
    id: "cannon",
    name: "Zamburak & Topkhana Siege Cannon",
    hindiName: "जम्बूरक एवं तोपखाना",
    era: "15th – 19th Century CE",
    dynasties: ["Mughal", "Vijayanagara", "Maratha", "Kingdom of Mysore", "Sikh Empire"],
    type: "Gunpowder Field Artillery & Camel-Mounted Swivel Gun",
    length: "1.2 m (Zamburak) to 4.5 m (Malik-e-Maidan)",
    weight: "35 kg (Swivel) to 55,000 kg (Great Siege Cannon)",
    metalCast: "Bronze / Brass Alloy & Multi-Ring Welded Damascus Iron",
    carriage: "Two-Wheeled Teak Field Carriage / Camel Saddle Gimbal",
    description: "Artillery transformed Indian warfare. The Zamburak was a mobile swivel gun mounted on the saddle of a camel, providing high-mobility sniper artillery. Meanwhile, massive bronze cannons like Bijapur's 'Malik-e-Maidan' (Lord of the Battlefield) fired 400 kg iron cannonballs capable of disintegrating granite fort gates.",
    tacticalUse: "Employed in the 'Tulughma' tactic: chained together in lines fronted by gun-carts (Araba), creating an impenetrable fortress of fire while cavalry swept around the flanks.",
    historicalUsers: [
      "Babur at 1st Battle of Panipat (1526) directed by master gunner Ustad Ali Quli",
      "Tipu Sultan's Topkhana and iron-cased war rocket artillery",
      "Maharaja Ranjit Singh's horse-drawn artillery park commanded by General Court"
    ],
    famousBattle: "1st Battle of Panipat (1526) & Siege of Seringapatam (1799)",
    specs: {
      reach: 100,
      damage: 100,
      armorPiercing: 100,
      weightRating: "Super-Heavy Gunpowder",
      craftDifficulty: "Monolithic Bronze Lost-Wax Casting"
    }
  },

  {
    id: "toradar",
    name: "Toradar (Indian Matchlock & Flintlock Musket)",
    hindiName: "तोड़ेदार बंदूक",
    era: "16th – 19th Century CE",
    dynasties: ["Mughal", "Maratha", "Rajput", "Company Sepoy Regiments"],
    type: "Smoothbore Long Matchlock Musket",
    length: "140 cm – 180 cm",
    weight: "3.5 kg – 4.5 kg",
    barrelCraft: "Spiral-Twisted Damascus Steel with Gold Inlay and Ivory Stock",
    actionType: "Serpentine Matchlock / Flintlock Cock with Powder Pan",
    description: "The Toradar was significantly longer and more accurate than contemporary European matchlocks. Its long, slender Damascus barrel ensured complete powder burn, giving it exceptional range across open plains and fortress battlements.",
    tacticalUse: "Used by defensive sharpshooters along fort ramparts and by specialized matchlock infantry (Barqandaz). The glowing slow match was clipped into the serpentine lever, which dropped into the powder flashpan when the trigger bar was pulled.",
    historicalUsers: [
      "Akbar the Great (who personally test-fired his royal matchlock 'Sangram')",
      "Bundela and Rajput sharpshooters",
      "Sepoys of the East India Company armies prior to the 1857 Enfield introduction"
    ],
    famousBattle: "Siege of Chittorgarh (1567) & Siege of Bharatpur (1805)",
    specs: {
      reach: 98,
      damage: 95,
      armorPiercing: 90,
      weightRating: "Long Powder Arm",
      craftDifficulty: "Damascus Spiral Welded Barrel"
    }
  },

  {
    id: "katar",
    name: "Katar (The Armor-Piercing Push Dagger)",
    hindiName: "कटार",
    era: "14th – 19th Century CE",
    dynasties: ["Vijayanagara", "Mughal", "Rajput", "Maratha"],
    type: "H-Grip Armor-Piercing Punch Dagger",
    length: "35 cm – 50 cm",
    weight: "0.6 kg – 0.9 kg",
    bladeSteel: "Thickened Diamond-Section Wootz Tip with Dual Fullers",
    hiltStyle: "Parallel Steel Handlebars with Two Crossbar Grips and Arm Guards",
    description: "A weapon unique to the Indian subcontinent. Unlike conventional knives gripped like a baton, the Katar is held by crossbars perpendicular to the blade. When punching, the entire kinetic force of the warrior's shoulder and torso is directed straight through the reinforced diamond-section point.",
    tacticalUse: "Designed explicitly to punch through riveted chainmail and padded gambesons. Later variants included scissors-blades that expanded on impact and dual flintlock pistols integrated into the sidebars.",
    historicalUsers: [
      "Vijayanagara noble warriors depicted on temple bas-reliefs",
      "Rajput warriors for close-quarter honor combat and tiger hunting",
      "Mughal courtiers as an emblem of imperial status tucked into the sash (Kamarband)"
    ],
    famousBattle: "Close-quarters assaults during the Deccan Fort Sieges",
    specs: {
      reach: 45,
      damage: 91,
      armorPiercing: 98,
      weightRating: "Compact Kinetic",
      craftDifficulty: "Monolithic Forged H-Frame"
    }
  },

  {
    id: "urumi",
    name: "Urumi / Chuttuval (The Flexible Whip-Sword)",
    hindiName: "उरुमि (लचीली तलवार)",
    era: "Ancient Sangam Period to Present Day",
    dynasties: ["Chera", "Chola", "Pandya", "Vijayanagara"],
    type: "Flexible Multi-Bladed Spring Steel Whip",
    length: "1.2 m – 1.8 m (Up to 3–4 flexible blades)",
    weight: "0.5 kg – 0.8 kg",
    bladeSteel: "High-Temper Flexible Carbon Ribbon Steel",
    hiltStyle: "Small Round Disc Guard with Brass Pommel and Finger Ring",
    description: "Considered one of the most dangerous weapons in martial arts history. Originating in Kalaripayattu of Kerala, the Urumi features paper-thin, razor-sharp ribbons of tempered spring steel that act as a whip. When not in combat, it can be coiled and worn around the waist like an unassuming metallic belt.",
    tacticalUse: "Wielded in continuous whirling centrifugal figure-eight motions, creating an impenetrable lethal radius of spinning razor edges. It strikes multiple opponents simultaneously and wraps around shields or parrying weapons to lacerate the defender.",
    historicalUsers: [
      "Kalaripayattu masters and royal bodyguards in Kerala and Tamil lands",
      "Legendary warrior Unniyarcha of the Vadakkan Pattukal folklore",
      "Elite palace covert operatives"
    ],
    famousBattle: "Medieval duels (Ankam) and crowd-clearing skirmishes",
    specs: {
      reach: 86,
      damage: 88,
      armorPiercing: 40,
      weightRating: "Centrifugal Whip",
      craftDifficulty: "Elastic Spring Tempering"
    }
  }
];

// East India Company Step-by-Step Annexation Campaign Data
const EIC_EXPANSION_STAGES = [
  {
    phase: 1,
    year: "1600 – 1750",
    title: "Mercantile Entrenchment & Factory Fortresses",
    mapPhase: "eic_stage_1",
    territoryGained: "Coastal trading footholds: Surat (1612), Fort St. George/Madras (1644), Bombay Island (1668), Fort William/Calcutta (1696)",
    mechanism: "Royal Charter granted by Queen Elizabeth I; trade firman acquired from Mughal Emperor Jahangir; fortified trade depots to protect textiles, saltpetre, and spices.",
    keyFigures: "Sir Thomas Roe, Job Charnock, Gerald Aungier",
    militaryAction: "Small private company garrisons; European rivalry against Portuguese and French East India Company (Dupleix)."
  },
  {
    phase: 2,
    year: "1757 – 1765",
    title: "The Conquest of Bengal (Plassey to Buxar)",
    mapPhase: "eic_stage_2",
    territoryGained: "Entire province of Bengal, Bihar, and coastal Orissa (The richest agrarian tax base in Asia)",
    mechanism: "Military conspiracy and bribing Mir Jafar at Battle of Plassey (1757); total military defeat of combined Mughal, Awadh, and Bengal forces at Battle of Buxar (1764).",
    keyFigures: "Robert Clive, Nawab Siraj-ud-Daulah, Mir Jafar, Shah Alam II",
    militaryAction: "Treaty of Allahabad (1765) grants Diwani rights. Company transitions from trading merchant into tax-extracting military government."
  },
  {
    phase: 3,
    year: "1767 – 1799",
    title: "Subjugation of Mysore & The Subsidiary Alliance",
    mapPhase: "eic_stage_3",
    territoryGained: "Malabar coast, Coimbatore, Dindigul, Seringapatam hinterlands; Nizam of Hyderabad forced into vassalage",
    mechanism: "Lord Wellesley's 'Subsidiary Alliance': Indian princes were forced to disband their native armies, station British troops at their own expense, and surrender foreign diplomacy.",
    keyFigures: "Hyder Ali, Tipu Sultan (Tiger of Mysore), Lord Wellesley, Arthur Wellesley (later Duke of Wellington)",
    militaryAction: "Four brutal Anglo-Mysore Wars. Siege of Seringapatam (1799) where Tipu Sultan was slain; Mysore partitioned."
  },
  {
    phase: 4,
    year: "1775 – 1818",
    title: "Destruction of the Maratha Confederacy",
    mapPhase: "eic_stage_4",
    territoryGained: "Maharashtra, Pune, Gujarat, Bundelkhand, Delhi, and Rajasthan protectorates (Formation of Bombay Presidency)",
    mechanism: "Exploiting internal divisions between Peshwa, Holkar, Scindia, and Bhonsle chiefs; military encirclement by Company armies.",
    keyFigures: "Peshwa Baji Rao II, Yashwantrao Holkar, Daulat Rao Scindia, Lord Hastings",
    militaryAction: "Three Anglo-Maratha Wars. Battle of Assaye (1803), Battle of Khadki (1817). The Peshwa seat at Pune dissolved in 1818; British achieve paramountcy over Central India."
  },
  {
    phase: 5,
    year: "1839 – 1849",
    title: "North-West Expansion: Sindh & The Sikh Empire",
    mapPhase: "eic_stage_5",
    territoryGained: "Sindh (1843), Punjab, Peshawar, Jammu & Kashmir (1849)",
    mechanism: "Direct military invasion driven by paranoia over Russian expansion ('The Great Game'); conquest of Sindh under Sir Charles Napier; Anglo-Sikh Wars.",
    keyFigures: "Maharaja Ranjit Singh (post-death fragmentation), Maharani Jind Kaur, Lord Dalhousie, General Gough",
    militaryAction: "Battle of Sobraon (1846), Battle of Chillianwala and Gujrat (1849). Annexation of Punjab; Koh-i-Noor diamond seized and shipped to Queen Victoria."
  },
  {
    phase: 6,
    year: "1848 – 1856",
    title: "Dalhousie's Aggressive 'Doctrine of Lapse'",
    mapPhase: "eic_stage_6",
    territoryGained: "Satara (1848), Sambalpur (1849), Jhansi (1853), Nagpur (1854), Awadh (1856)",
    mechanism: "Refusal to recognize traditional Hindu adopted heirs for sovereign titles; automatic annexation to British dominion upon king's death without biological son.",
    keyFigures: "Lord Dalhousie, Rani Lakshmibai of Jhansi, Nawab Wajid Ali Shah of Awadh",
    militaryAction: "Administrative seizure of Awadh based on fabricated allegations of misgovernance; widespread discontent ignited across native sepoy regiments."
  },
  {
    phase: 7,
    year: "1857 – 1858",
    title: "The 1857 Great Rebellion & Dissolution of EIC",
    mapPhase: "eic_stage_7",
    territoryGained: "Direct Crown Colony Rule ('The British Raj') proclaimed over 300 million people",
    mechanism: "Greased cartridge incident ignites uprising in Meerut; Rani Lakshmibai, Mangal Pandey, Nana Saheb, and Tatya Tope revolt across northern India.",
    keyFigures: "Rani Lakshmibai, Mangal Pandey, Bahadur Shah Zafar, Lord Canning, Queen Victoria",
    militaryAction: "Brutal reconquest of Delhi, Kanpur, and Lucknow. Government of India Act 1858 revokes the East India Company's charter forever; British Crown takes direct rule."
  },
  {
    phase: 8,
    year: "1947",
    title: "Indian Independence & Territorial Integration",
    mapPhase: "eic_stage_8",
    territoryGained: "Sovereign Union of India; 565 Princely States successfully integrated into one democratic republic",
    mechanism: "Decades of mass non-violent resistance, revolutionary actions (Netaji Subhas Chandra Bose & INA), Royal Indian Navy Mutiny (1946); diplomatic integration by Sardar Patel.",
    keyFigures: "Sardar Vallabhbhai Patel, Mahatma Gandhi, Subhas Chandra Bose, Jawaharlal Nehru, V.P. Menon",
    militaryAction: "Operation Polo (Hyderabad 1948), Accession of Kashmir and Junagadh; birth of modern democratic Republic of India."
  }
];

if (typeof window !== "undefined") {
  window.DYNASTIES_DATA = DYNASTIES_DATA;
  window.TIMELINE_EVENTS = TIMELINE_EVENTS;
  window.WEAPONS_DATA = WEAPONS_DATA;
  window.EIC_EXPANSION_STAGES = EIC_EXPANSION_STAGES;
}
