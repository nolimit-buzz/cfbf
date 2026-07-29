/**
 * CFBF National Footprint Map Data
 *
 * Architecture note: This file is structured for easy migration to a live data source.
 * The `fetchLGAProjects(lga, state)` adapter at the bottom is where you'll plug in:
 *   - WordPress Custom Post Types via REST API (/wp-json/wp/v2/cfbf_project?lga=Karu)
 *   - External data API (e.g., InfraCredit data feed)
 *
 * All interfaces are exported so they can be reused in API response types.
 */

// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface LGAProjectEntry {
  developer: string;
  community: string;
  state: string;
  lga: string;
  projectType: string;
  puePotential: number;
  enumerators: number;
}

export interface StateInfo {
  /** Matches the id in @svg-maps/nigeria (e.g. 'nasarawa', 'cross-river') */
  mapId: string;
  /** Display name */
  name: string;
  /** Whether this state has active CFBF project footprint */
  hasProjects: boolean;
  /** Project category type for legend coloring */
  projectType?: 'rural-electrification' | 'rural-telephony' | 'both' | 'mini-grids' | 'pue' | 'default';
}

// ─── All Nigerian States ──────────────────────────────────────────────────────
// Option A: All 36 + FCT listed, non-project states are greyed out

export const ALL_STATES: StateInfo[] = [
  { mapId: 'abia',        name: 'Abia',                           hasProjects: true,  projectType: 'rural-electrification' },
  { mapId: 'adamawa',     name: 'Adamawa',                        hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'akwa-ibom',   name: 'Akwa Ibom',                      hasProjects: true,  projectType: 'rural-electrification' },
  { mapId: 'anambra',     name: 'Anambra',                        hasProjects: true,  projectType: 'rural-electrification' },
  { mapId: 'bauchi',      name: 'Bauchi',                         hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'bayelsa',     name: 'Bayelsa',                        hasProjects: true,  projectType: 'rural-electrification' },
  { mapId: 'benue',       name: 'Benue',                          hasProjects: true,  projectType: 'both' },
  { mapId: 'borno',       name: 'Borno',                          hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'cross-river', name: 'Cross River',                    hasProjects: true,  projectType: 'rural-electrification' },
  { mapId: 'delta',       name: 'Delta',                          hasProjects: true,  projectType: 'rural-electrification' },
  { mapId: 'ebonyi',      name: 'Ebonyi',                         hasProjects: true,  projectType: 'rural-electrification' },
  { mapId: 'edo',         name: 'Edo',                            hasProjects: true,  projectType: 'rural-electrification' },
  { mapId: 'ekiti',       name: 'Ekiti',                          hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'enugu',       name: 'Enugu',                          hasProjects: true,  projectType: 'rural-electrification' },
  { mapId: 'fct',         name: 'Federal Capital Territory',      hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'gombe',       name: 'Gombe',                          hasProjects: true,  projectType: 'rural-electrification' },
  { mapId: 'imo',         name: 'Imo',                            hasProjects: true,  projectType: 'rural-electrification' },
  { mapId: 'jigawa',      name: 'Jigawa',                         hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'kaduna',      name: 'Kaduna',                         hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'kano',        name: 'Kano',                           hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'katsina',     name: 'Katsina',                        hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'kebbi',       name: 'Kebbi',                          hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'kogi',        name: 'Kogi',                           hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'kwara',       name: 'Kwara',                          hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'lagos',       name: 'Lagos',                          hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'nasarawa',    name: 'Nasarawa',                       hasProjects: true,  projectType: 'both' },
  { mapId: 'niger',       name: 'Niger',                          hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'ogun',        name: 'Ogun',                           hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'ondo',        name: 'Ondo',                           hasProjects: true,  projectType: 'both' },
  { mapId: 'osun',        name: 'Osun',                           hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'oyo',         name: 'Oyo',                            hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'plateau',     name: 'Plateau',                        hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'rivers',      name: 'Rivers',                         hasProjects: true,  projectType: 'rural-electrification' },
  { mapId: 'sokoto',      name: 'Sokoto',                         hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'taraba',      name: 'Taraba',                         hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'yobe',        name: 'Yobe',                           hasProjects: true,  projectType: 'rural-telephony' },
  { mapId: 'zamfara',     name: 'Zamfara',                        hasProjects: true,  projectType: 'rural-telephony' },
];

// ─── State LGA Mappings (sourced from infracredit.ng/climate-facility/geographical-distribution/) ───

export const STATE_LGAS: Record<string, string[]> = {
  abia: ['Umunneochi', 'Ohafia', 'Isuikwuato'],
  adamawa: ['Hong', 'Mubi North', 'Demsa'],
  'akwa-ibom': ['Eket', 'Ikot Ekpene', 'Uyo', 'Essien Udim'],
  anambra: ['Anambra West', 'Awka South', 'Anaocha', 'Oji River'],
  bauchi: ["Jam'are", 'Tafawa-Balewa', 'Shira', 'Giade', "Jama'are", 'Katagum', 'Ningi', 'Ganjuwa', 'Warji', 'Itas', 'Toro', 'Darazo', 'Bauchi'],
  bayelsa: ['Southern Ijaw', 'Sagbama'],
  benue: ['Apa', 'Ohimini', 'Bukuru', 'Ushongo', 'Guma', 'Oju', 'Gboko', 'Obi', 'Kwande', 'Konshisha', 'Ukum', 'Gwer West', 'Katsina-Ala', 'Oshongo'],
  borno: ['Hawul'],
  'cross-river': ['Akampa', 'Obrubra', 'Ikom', 'Boki', 'Obubra', 'Yala', 'Akamkpa', 'Biase', 'Ogoja'],
  delta: ['Ika South', 'Uvwie', 'Oshimili South'],
  ebonyi: ['Izzi', 'Ohaukwu', 'Ohaozara'],
  edo: ['Ovia South East', 'Egor', 'Ovia South West', 'Ikpoba-Okha'],
  ekiti: ['Ikole', 'Ado-Ekiti'],
  enugu: ['Oji River', 'Anaocha'],
  fct: ['Kuje', 'Bwari', 'Kwali', 'Gwagwalada', 'Abaji', 'Karu', 'AMAC', 'Abuja'],
  gombe: ['Akko', 'Dukku', 'Gombe', 'Kaltungo', 'Balanga', 'Biliri', 'Yamaltu/Deba', 'Kwami', 'Shongom', 'Billiri', 'Nafada'],
  imo: ['Owerri', 'Ohai-Egbema'],
  jigawa: ['Babura', 'Gwaram', 'Miga', 'Kaugama', 'Auyo', 'Guri', 'Garki', 'Kiri Kasama', 'Bade', 'Kazaure', 'Sule Tankakar', 'Birnin Kudu', 'Dankgwanki', 'Jahun', 'Kiyawa', 'Kafin Hausa', 'Ringim', 'Dutse'],
  kaduna: ['Lere', 'Kagarko', 'Sanga', 'Kudan', 'Kachia', 'Zangon Kataf', 'Ikara', 'Kauru', 'Giwa', 'Maru', 'Birnin Gwari', 'Bichi', 'Jema\'a', 'Igabi', 'Gwagwada', 'Makarfi', 'Kaduna North', 'Kaduna South', 'Kubau', 'Sabon Gari', 'Zaria'],
  kano: ['Dambatta', 'Rogo', 'Gezawa', 'Tudun Wada', 'Bichi', 'Gabasawa', 'Kunchi', 'Kibiya', 'Rano', 'Sumaila', 'Gaya', 'Bagwai', 'Kiru', 'Garki', 'Karaye', 'Wudil', 'Warawa', 'Ajingi', 'Kura', 'Garun Malam'],
  katsina: ['Daura', 'Baure', 'Kankia', 'Kankara', 'Kusada', 'Safana', 'Musawa', 'Sandamu', 'Jibia', 'Dutsin Ma', 'Zango', 'Kaita', 'Ingawa', 'Bindawa', 'Charanchi', 'Bakori', 'Dan Musa', 'Funtua', 'Katsina', 'Malumfashi', 'Matazu'],
  kebbi: ['Alijero', 'Bunza', 'Jega', 'Birnin Kebbi', 'Suru', 'Augie'],
  kogi: ['Dekina', 'Yagba West', 'Ijumu', 'Ankpa', 'Olamaboro', 'Lokoja', 'Ibaji', 'Kabba/Bunu', 'Omala', 'Bassa', 'Ofu', 'Igala-Mela/Odolu'],
  kwara: ['Asa', 'Baruten', 'Edu', 'Gwanara'],
  lagos: ['Ikorodu', 'Ikeja', 'Ajeromi Ifelodun', 'Lagos Island', 'Eti Osa', 'Lagos Mainland'],
  nasarawa: ['Awe', 'Karu', 'Toto', 'Nasarawa', 'Zangon Kataf', 'Lafia', 'Akwanga', 'Nassarawa Egon'],
  niger: ['Agwara', 'Lavun/Mokwa', 'Birnin Maza/Tashibo', 'Magama', 'Wushishi', 'Mokwa', 'Rafi', 'Edati', 'Mashegu', 'Mariga', 'Rijau', 'Borgu', 'Gbako', 'Paikoro', 'Munya', 'Katcha', 'Lavun'],
  ogun: ['Yewa North', 'Odeda', 'Ado-Odo/Ota', 'Obafemi Owode', 'Epe', 'Yewa', 'Ikenne', 'Abeokuta South', 'Ijebu Ode'],
  ondo: ['Ondo', 'Odigbo', 'Irele', 'Akure North', 'Ese Odo', 'Ondo East', 'Meoluji/Oke Igbo', 'Oke Igbo', 'Akoko North-West', 'Idanre', 'Akure South'],
  osun: ['Isokan', 'Ilesha West', 'Ayedire', 'Iwo'],
  oyo: ['Iseyin', 'Ido', 'Saki East', 'Ibarapa Central', 'Afijio', 'Ibarapa East', 'Ogbomoso', 'Surulere', 'Itesiwaju', 'Ibadan North'],
  plateau: ['Wase', 'Shendam', 'Langtang South'],
  rivers: ['Ahoada East', 'Bonny', 'Degema', 'Eleme', 'Ikwerre', 'Khana', 'Obio/Akpor', 'Tai'],
  sokoto: ['Sabon Birni', 'Shagari', 'Illela', 'Gada', 'Goronyo', 'Augie', 'Rabah', 'Birdawa/Sabon Birni'],
  taraba: ['Bau', 'Ardo-Kola', 'Sardauna', 'Wukari', 'Bali'],
  yobe: ['Jakusko', 'Fika'],
  zamfara: ['Bukkuyum', 'Maru', 'Tsafe', 'Birnin Magaji/Kiyaw', 'Zurmi', 'Bakura', 'Bungudun'],
};

// ─── LGA Project Entries (seeded from portfolio companies, ready for API swap) ─

export const LGA_PROJECTS: Record<string, LGAProjectEntry[]> = {
  // Nasarawa - First Electric
  'Karu': [
    { developer: 'ACOB', community: 'Koroduma-New Karu-MADUGU', state: 'Nasarawa', lga: 'Karu', projectType: 'Isolated Minigrids', puePotential: 5, enumerators: 0 },
    { developer: 'Infratel Ltd.', community: 'New Karu (Kabusu) KUPE', state: 'Nasarawa', lga: 'Karu', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
    { developer: 'Infratel Ltd.', community: 'Tattara/Pandam/Panda/Kare', state: 'Nasarawa', lga: 'Karu', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
    { developer: 'MMCL', community: 'New Karu (Kabusu) KUPE', state: 'Nasarawa', lga: 'Karu', projectType: 'Isolated Minigrids', puePotential: 0, enumerators: 0 },
    { developer: 'MMCL', community: 'Tattara/Pandam/Panda/Kare', state: 'Nasarawa', lga: 'Karu', projectType: 'Isolated Minigrids', puePotential: 0, enumerators: 0 },
  ],
  'Awe': [
    { developer: 'First Electric', community: 'Awe Township', state: 'Nasarawa', lga: 'Awe', projectType: 'Solar Hybrid Mini-Grid', puePotential: 12, enumerators: 3 },
    { developer: 'First Electric', community: 'Doma Road Community', state: 'Nasarawa', lga: 'Awe', projectType: 'Solar Hybrid Mini-Grid', puePotential: 8, enumerators: 2 },
  ],
  'Lafia': [
    { developer: 'First Electric', community: 'Lafia South', state: 'Nasarawa', lga: 'Lafia', projectType: 'Solar Hybrid Mini-Grid', puePotential: 20, enumerators: 5 },
    { developer: 'MMCL', community: 'Lafia Central Market', state: 'Nasarawa', lga: 'Lafia', projectType: 'Mini Grids - Markets', puePotential: 15, enumerators: 4 },
  ],
  // Cross River - CEESOLAR
  'Akamkpa': [
    { developer: 'CEESOLAR Energy', community: 'Akamkpa North', state: 'Cross River', lga: 'Akamkpa', projectType: 'Solar Hybrid Mini-Grid', puePotential: 18, enumerators: 4 },
    { developer: 'CEESOLAR Energy', community: 'Akamkpa South', state: 'Cross River', lga: 'Akamkpa', projectType: 'Solar Hybrid Mini-Grid', puePotential: 14, enumerators: 3 },
  ],
  'Ikom': [
    { developer: 'CEESOLAR Energy', community: 'Ikom Township', state: 'Cross River', lga: 'Ikom', projectType: 'Solar Hybrid Mini-Grid', puePotential: 22, enumerators: 6 },
    { developer: 'CEESOLAR Energy', community: 'Oku Iboku', state: 'Cross River', lga: 'Ikom', projectType: 'Isolated Minigrids', puePotential: 10, enumerators: 2 },
  ],
  'Yala': [
    { developer: 'CEESOLAR Energy', community: 'Yala Central', state: 'Cross River', lga: 'Yala', projectType: 'Solar Hybrid Mini-Grid', puePotential: 16, enumerators: 4 },
  ],
  'Obubra': [
    { developer: 'CEESOLAR Energy', community: 'Obubra Township', state: 'Cross River', lga: 'Obubra', projectType: 'Solar Hybrid Mini-Grid', puePotential: 12, enumerators: 3 },
    { developer: 'Infratel Ltd.', community: 'Obubra Telecom Site', state: 'Cross River', lga: 'Obubra', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  // Gombe - First Electric
  'Akko': [
    { developer: 'First Electric', community: 'Akko Central', state: 'Gombe', lga: 'Akko', projectType: 'Solar Hybrid Mini-Grid', puePotential: 25, enumerators: 6 },
    { developer: 'First Electric', community: 'Kumo', state: 'Gombe', lga: 'Akko', projectType: 'Solar Hybrid Mini-Grid', puePotential: 20, enumerators: 5 },
  ],
  'Gombe': [
    { developer: 'First Electric', community: 'Gombe Metro South', state: 'Gombe', lga: 'Gombe', projectType: 'Solar Hybrid Mini-Grid', puePotential: 30, enumerators: 7 },
    { developer: 'Infratel Ltd.', community: 'Gombe Telecom Sites', state: 'Gombe', lga: 'Gombe', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  // Benue - Prado Power
  'Gboko': [
    { developer: 'Prado Power Energy', community: 'Gboko Central', state: 'Benue', lga: 'Gboko', projectType: 'Agro-Processing Solar Hub', puePotential: 35, enumerators: 8 },
    { developer: 'Prado Power Energy', community: 'Mkar', state: 'Benue', lga: 'Gboko', projectType: 'Solar Hybrid Mini-Grid', puePotential: 18, enumerators: 4 },
  ],
  'Ushongo': [
    { developer: 'Prado Power Energy', community: 'Ushongo Township', state: 'Benue', lga: 'Ushongo', projectType: 'Agro-Processing Solar Hub', puePotential: 28, enumerators: 6 },
  ],
  'Kwande': [
    { developer: 'Prado Power Energy', community: 'Adikpo', state: 'Benue', lga: 'Kwande', projectType: 'Solar Hybrid Mini-Grid', puePotential: 22, enumerators: 5 },
    { developer: 'Prado Power Energy', community: 'Kwande Central', state: 'Benue', lga: 'Kwande', projectType: 'Agro-Processing Solar Hub', puePotential: 30, enumerators: 7 },
  ],
  // Rivers - Darway Coast
  'Ahoada East': [
    { developer: 'Darway Coast', community: 'Ahoada Township', state: 'Rivers', lga: 'Ahoada East', projectType: 'Solar Hybrid Mini-Grid', puePotential: 40, enumerators: 9 },
    { developer: 'Darway Coast', community: 'Omoku', state: 'Rivers', lga: 'Ahoada East', projectType: 'Isolated Minigrids', puePotential: 25, enumerators: 5 },
  ],
  'Degema': [
    { developer: 'Darway Coast', community: 'Degema Island', state: 'Rivers', lga: 'Degema', projectType: 'Isolated Minigrids', puePotential: 18, enumerators: 4 },
    { developer: 'Darway Coast', community: 'Ke', state: 'Rivers', lga: 'Degema', projectType: 'Solar Hybrid Mini-Grid', puePotential: 12, enumerators: 3 },
  ],
  // Edo - ACOB Lightning
  'Egor': [
    { developer: 'ACOB Lightning Technology', community: 'Egor Township', state: 'Edo', lga: 'Egor', projectType: 'Solar Hybrid Mini-Grid', puePotential: 22, enumerators: 5 },
    { developer: 'ACOB Lightning Technology', community: 'Ugbowo', state: 'Edo', lga: 'Egor', projectType: 'Solar Hybrid Mini-Grid', puePotential: 18, enumerators: 4 },
  ],
  'Ovia South West': [
    { developer: 'ACOB Lightning Technology', community: 'Igueben', state: 'Edo', lga: 'Ovia South West', projectType: 'Solar Hybrid Mini-Grid', puePotential: 15, enumerators: 3 },
    { developer: 'ACOB Lightning Technology', community: 'Ekpon', state: 'Edo', lga: 'Ovia South West', projectType: 'Isolated Minigrids', puePotential: 10, enumerators: 2 },
  ],
  // Ondo - First Electric + ACOB
  'Ondo': [
    { developer: 'First Electric', community: 'Ondo City South', state: 'Ondo', lga: 'Ondo', projectType: 'Solar Hybrid Mini-Grid', puePotential: 28, enumerators: 6 },
    { developer: 'ACOB Lightning Technology', community: 'Ondo City North', state: 'Ondo', lga: 'Ondo', projectType: 'Isolated Minigrids', puePotential: 20, enumerators: 4 },
  ],
  'Odigbo': [
    { developer: 'First Electric', community: 'Ore', state: 'Ondo', lga: 'Odigbo', projectType: 'Solar Hybrid Mini-Grid', puePotential: 24, enumerators: 5 },
    { developer: 'ACOB Lightning Technology', community: 'Odigbo Township', state: 'Ondo', lga: 'Odigbo', projectType: 'Solar Hybrid Mini-Grid', puePotential: 16, enumerators: 4 },
  ],
  'Irele': [
    { developer: 'First Electric', community: 'Irele Township', state: 'Ondo', lga: 'Irele', projectType: 'Solar Hybrid Mini-Grid', puePotential: 18, enumerators: 4 },
  ],
  // Kaduna - Hotspot Network
  'Zangon Kataf': [
    { developer: 'Hotspot Network', community: 'Zango Kataf', state: 'Kaduna', lga: 'Zangon Kataf', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
    { developer: 'Hotspot Network', community: 'Zonkwa', state: 'Kaduna', lga: 'Zangon Kataf', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  'Kachia': [
    { developer: 'Hotspot Network', community: 'Kachia Town', state: 'Kaduna', lga: 'Kachia', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  // Kano - Hotspot Network
  'Dambatta': [
    { developer: 'Hotspot Network', community: 'Dambatta Township', state: 'Kano', lga: 'Dambatta', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  'Bichi': [
    { developer: 'Hotspot Network', community: 'Bichi Town', state: 'Kano', lga: 'Bichi', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  // Abia - Darway Coast
  'Umunneochi': [
    { developer: 'Darway Coast', community: 'Isuochi', state: 'Abia', lga: 'Umunneochi', projectType: 'Solar Hybrid Mini-Grid', puePotential: 20, enumerators: 4 },
    { developer: 'Darway Coast', community: 'Umunneochi Central', state: 'Abia', lga: 'Umunneochi', projectType: 'Isolated Minigrids', puePotential: 14, enumerators: 3 },
  ],
  'Ohafia': [
    { developer: 'Darway Coast', community: 'Ohafia Township', state: 'Abia', lga: 'Ohafia', projectType: 'Solar Hybrid Mini-Grid', puePotential: 18, enumerators: 4 },
  ],
  // Anambra
  'Anambra West': [
    { developer: 'CEESOLAR Energy', community: 'Onitsha West', state: 'Anambra', lga: 'Anambra West', projectType: 'Solar Hybrid Mini-Grid', puePotential: 25, enumerators: 5 },
  ],
  'Awka South': [
    { developer: 'CEESOLAR Energy', community: 'Awka South Central', state: 'Anambra', lga: 'Awka South', projectType: 'Solar Hybrid Mini-Grid', puePotential: 30, enumerators: 6 },
  ],
  // FCT
  'Kuje': [
    { developer: 'Hotspot Network', community: 'Kuje Township', state: 'FCT', lga: 'Kuje', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  'Gwagwalada': [
    { developer: 'Hotspot Network', community: 'Gwagwalada Town', state: 'FCT', lga: 'Gwagwalada', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  // Lagos
  'Ikorodu': [
    { developer: 'Hotspot Network', community: 'Ikorodu North', state: 'Lagos', lga: 'Ikorodu', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
    { developer: 'Hotspot Network', community: 'Ijede', state: 'Lagos', lga: 'Ikorodu', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  // Oyo
  'Iseyin': [
    { developer: 'Hotspot Network', community: 'Iseyin Township', state: 'Oyo', lga: 'Iseyin', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  'Saki East': [
    { developer: 'Hotspot Network', community: 'Saki Town East', state: 'Oyo', lga: 'Saki East', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  // Jigawa
  'Dutse': [
    { developer: 'Hotspot Network', community: 'Dutse Township', state: 'Jigawa', lga: 'Dutse', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  // Sokoto
  'Sabon Birni': [
    { developer: 'Hotspot Network', community: 'Sabon Birni Township', state: 'Sokoto', lga: 'Sabon Birni', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  // Kebbi
  'Birnin Kebbi': [
    { developer: 'Hotspot Network', community: 'Birnin Kebbi Central', state: 'Kebbi', lga: 'Birnin Kebbi', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  // Zamfara
  'Gusau': [
    { developer: 'Hotspot Network', community: 'Gusau Township', state: 'Zamfara', lga: 'Gusau', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  // Katsina
  'Katsina': [
    { developer: 'Hotspot Network', community: 'Katsina Township', state: 'Katsina', lga: 'Katsina', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  // Taraba
  'Wukari': [
    { developer: 'Hotspot Network', community: 'Wukari Township', state: 'Taraba', lga: 'Wukari', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  // Plateau
  'Wase': [
    { developer: 'Hotspot Network', community: 'Wase Township', state: 'Plateau', lga: 'Wase', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  // Kogi
  'Dekina': [
    { developer: 'Hotspot Network', community: 'Dekina Township', state: 'Kogi', lga: 'Dekina', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  // Kwara
  'Baruten': [
    { developer: 'Hotspot Network', community: 'Baruten Township', state: 'Kwara', lga: 'Baruten', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  // Niger
  'Borgu': [
    { developer: 'Hotspot Network', community: 'New Bussa', state: 'Niger', lga: 'Borgu', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  // Yobe
  'Fika': [
    { developer: 'Hotspot Network', community: 'Fika Township', state: 'Yobe', lga: 'Fika', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
  // Ogun
  'Yewa North': [
    { developer: 'Hotspot Network', community: 'Igbooro', state: 'Ogun', lga: 'Yewa North', projectType: 'Solar as a Service for Telecom Towers', puePotential: 0, enumerators: 0 },
  ],
};

// ─── Project Type Legend ──────────────────────────────────────────────────────

export const PROJECT_TYPE_LEGEND = [
  { label: 'Rural Electrification',               color: '#c8e6c9', type: 'rural-electrification' },
  { label: 'Rural Telephony',                      color: '#b3c5e8', type: 'rural-telephony' },
  { label: 'Rural Electrification & Telephony',    color: '#fff9c4', type: 'both' },
  { label: 'Mini Grids – Markets',                 color: '#c8b9a4', type: 'mini-grids' },
  { label: 'Default',                              color: '#2d6a4f', type: 'default' },
  { label: 'PUE',                                  color: '#69b44b', type: 'pue' },
  { label: 'Rural Electrification & PUE',          color: '#f4845f', type: 'rural-elec-pue' },
] as const;

// ─── API Adapter ─────────────────────────────────────────────────────────────
// TODO: Replace the static return with a fetch call when ready.
// Example WP CPT endpoint: /wp-json/wp/v2/cfbf_project?lga={lga}&state={state}&per_page=100
// Example external API: process.env.NEXT_PUBLIC_CFBF_API_URL + `/projects?lga=${lga}`

export async function fetchLGAProjects(
  lga: string,
  _state: string
): Promise<LGAProjectEntry[]> {
  // Static data fallback — replace with:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_CFBF_API_URL}/projects?lga=${encodeURIComponent(lga)}&state=${encodeURIComponent(_state)}`);
  // const data = await res.json();
  // return data as LGAProjectEntry[];
  return LGA_PROJECTS[lga] ?? [];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getStateByMapId(mapId: string): StateInfo | undefined {
  return ALL_STATES.find(s => s.mapId === mapId);
}

export function getLGAsForState(mapId: string): string[] {
  return STATE_LGAS[mapId] ?? [];
}

export function getProjectTypeColor(type: StateInfo['projectType']): string {
  switch (type) {
    case 'rural-electrification': return 'rgba(72, 192, 163, 0.75)';
    case 'rural-telephony':       return 'rgba(100, 140, 220, 0.75)';
    case 'both':                  return 'rgba(253, 183, 19, 0.75)';
    case 'mini-grids':            return 'rgba(180, 160, 130, 0.75)';
    case 'pue':                   return 'rgba(105, 180, 75, 0.85)';
    default:                      return 'rgba(45, 106, 79, 0.75)';
  }
}
