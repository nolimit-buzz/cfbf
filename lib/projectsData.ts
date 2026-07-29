export interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  capital: string;
  capacity: string;
  category: string;
  connections: string;
  jobs: string;
  ghg: string;
  status: string;
  image: string;
  problem: string;
  solution: string;
  impact: string;
  desc: string;
  financing: string;
  impact_desc: string;
  testimonial?: {
    name: string;
    role: string;
    quote: string;
  };
  percentages: {
    capital: number;
    capacity: number;
    connections: number;
    jobs: number;
    ghg: number;
  };
  gallery: {
    image: string;
    caption: string;
  }[];
  intro: {
    title: string;
    col1Text: string;
    col2Image: string;
    col3Image: string;
  };
  impactCard: {
    title: string;
    col1Text: string;
    col2Image: string;
    percentage: number;
    statText: string;
  };
  videos?: {
    id: string;
    title: string;
    category: string;
    youtubeId: string;
  }[];
}

export const projects: Record<string, Project> = {
  "01": {
    id: "01",
    title: "First Electric Power and Automation Services",
    location: "Gombe, Nasarawa & Ondo States",
    year: "Dec. 2025",
    capital: "₦1.70 Billion",
    capacity: "725KW",
    category: "Solar Grid",
    connections: "5,156 Connections",
    jobs: "616 Jobs",
    ghg: "762 Tonnes GHG/yr",
    status: "Under Construction",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    problem: "Remote community households and local agricultural mills across Gombe, Nasarawa, and Ondo states lacked access to clean energy grid systems. Relying on kerosene lamps and polluting petroleum engines caused high fuel expenses, carbon emissions, and stagnant community business growth.",
    solution: "CFBF co-financed and de-risked First Electric’s NGN debt financing to construct a 725kWp decentralized mesh grid electricity network. Utilizing intelligent metering and decentralized solar clusters, the project connects 5,156 households and SMEs directly.",
    impact: "Replaces traditional carbon-heavy lighting sources, saves over 762 tonnes of greenhouse gas emissions annually, and stimulates local agro-rural businesses with a stable and affordable power supply.",
    desc: "First Electric is deploying mesh-grid electricity networks with a total capacity of 724.8 kWp. This project aims to provide reliable power to off-grid households and small businesses across 20 communities in Gombe, Nasarawa, and Ondo States. The systems utilize solar PV technology supported by battery storage and inverters to ensure consistent power supply.",
    financing: "The project is financed through a blended, co-financing arrangement facilitated by InfraCredit. The UK-funded Climate Finance Blending Facility (CFBF) invested in the subordinated debt tranche, providing a 7-year fixed-rate local currency debt. The transaction was further supported by InfraCredit’s Construction Finance Warehouse Facility (CFWF), funded by the Nigeria Sovereign Investment Authority (NSIA), to provide short-term liquidity during the construction phase. InfraCredit provided its 'AAA'-rated credit guarantee to enhance the local currency debt issuance, de-risking it for domestic institutional investors. FSD Africa also supported upfront due diligence costs under a technical assistance agreement.",
    impact_desc: "The project on completion is expected to electrify approximately 5,156 households and small businesses, create up to 616 temporary and permanent jobs, and avoid approximately 762 tonnes of greenhouse gas (GHG) emissions annually, contributing directly to Nigeria’s universal electrification goals and UN Sustainable Development Goal 7 (Affordable and Clean Energy).",
    percentages: { capital: 75, capacity: 60, connections: 40, jobs: 80, ghg: 45 },
    gallery: [
      { image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600", caption: "Grid panels installed in agricultural fields across Nasarawa state." },
      { image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600", caption: "Rural retail shops powered for the first time by local clean energy grids." },
      { image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600", caption: "Agro-processing machinery running continuously on decentralized solar energy." },
      { image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600", caption: "A local community leader validating grid stability at the central monitoring hub." }
    ],
    intro: {
      title: "Advancing Clean Energy Infrastructure Across Underserved States",
      col1Text: "To maximize rural development impact, the mesh grid electricity model is co-financed with first-loss credit guarantees to absorb developer risk and unlock domestic institutional pensions.",
      col2Image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600",
      col3Image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600"
    },
    impactCard: {
      title: "Driving Sustainable Local Growth",
      col1Text: "Expanding Clean Grid Capacity. Resolving initial connection bottlenecks and establishing smart meters ensures sustainable regional collections and resource security.",
      col2Image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600",
      percentage: 80,
      statText: "80% of connected agricultural processors reported a doubling of monthly crop processing output."
    },
    videos: [
      {
        id: "fe-01",
        title: "First Electric Off-Grid Clean Energy Project",
        category: "Project Showcase",
        youtubeId: "l2OgF8FDHq0"
      }
    ]
  },
  "02": {
    id: "02",
    title: "CEESOLAR Energy Limited",
    location: "Cross River State",
    year: "Nov. 2025",
    capital: "₦1.70 Billion",
    capacity: "760KW",
    category: "Solar Grid",
    connections: "3,597 Connections",
    jobs: "561 Jobs",
    ghg: "737 Tonnes GHG/yr",
    status: "Under Construction",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    problem: "Rurally isolated farming communities in Cross River state had zero electricity connections. Small businesses suffered from irregular operations, and cocoa drying was dependent on firewood combustion, causing regional deforestation.",
    solution: "Blending First-Loss subordinated capital with local currency debt guarantees enabled CEESOLAR to access long-tenor financing. The funds are deployed to construct 760kWp solar-hybrid mini-grids in four rural farming communities.",
    impact: "Provides clean energy access to 3,597 residential and retail connections, replaces wood-burning agricultural processing dryer systems, and creates 561 jobs.",
    desc: "The project will construct 760kWp total capacity of solar-hybrid mini-grid in four communities without grid access within Cross Rivers state, that will connect 3,597 households and small businesses. Construction is planned to commence in 2025 and commercial operations for 2026. CEESOLAR Energy Limited delivers decentralised clean energy across Nigeria, with 729.5kWp installed since 2017. Its mini-grids and stand-alone solar systems now serve over 695 connections in seven states and the Federal Capital Territory (FCT).",
    financing: "The project was financed through a blended instrument, with the UK funded Climate Finance Blending Facility enabling a 7-year fixed rate local currency debt financing for the project by investing in the subordinated debt tranche. The transaction was further supported by InfraCredit’s Construction Finance Warehouse Facility (CFWF) — a bridge financing instrument funded by the Nigeria Sovereign Investment Authority (NSIA) which enables developers to access short-term construction liquidity ahead of long-term refinancing through InfraCredit-guaranteed bonds.",
    impact_desc: "The project on completion will electrify up to 3,597 unserved households and small businesses, create up to 561 temporary and permanent jobs whilst enhancing access to renewable energy for productive uses, and avoid 737 tCO2e of GHG emissions. The 4 hybrid-solar mini-grids will have environmental benefits of climate change mitigation, energy savings and greenhouse gas reduction and simultaneously have a positive direct contribution to the United Nations Sustainable Development Goals (SDGs) 7, 8, 9, 11, 13 and 17 as identified in the Green Bond Framework.",
    percentages: { capital: 75, capacity: 55, connections: 35, jobs: 75, ghg: 40 },
    gallery: [
      { image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600", caption: "High-voltage battery packs stored in the central Cross River control facility." },
      { image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600", caption: "Solar array structures built adjacent to cocoa farming cooperatives." },
      { image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600", caption: "Technical engineers configuring remote prepaid meters." },
      { image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600", caption: "Hybrid inverters running test loads during grid commissioning." }
    ],
    intro: {
      title: "De-risking Cocoa Farming Value Chains in Cross River",
      col1Text: "Enabling local currency finance for remote farming hubs guarantees cocoa growers access to clean thermal drying, replacing forest-destructive wood combustion.",
      col2Image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600",
      col3Image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600"
    },
    impactCard: {
      title: "Mitigating Deforestation Patterns",
      col1Text: "Transitioning to Clean Dehydration. Replacing open-fire wood burners with solar hybrid crop driers limits regional carbon outputs and preserves local ecology.",
      col2Image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600",
      percentage: 70,
      statText: "70% reduction in local wood consumption recorded among participating cocoa cooperatives."
    },
    videos: [
      {
        id: "ceesolar-01",
        title: "CEESOLAR Off-Grid Energy Project",
        category: "Project Showcase",
        youtubeId: "l2OgF8FDHq0"
      }
    ]
  },
  "03": {
    id: "03",
    title: "Prado Power Energy Limited",
    location: "Akwa-Ibom & Benue States",
    year: "Oct. 2024",
    capital: "₦1.95 Billion",
    capacity: "850kW",
    category: "Agro-Processing",
    connections: "15,801 Connections",
    jobs: "740 Jobs",
    ghg: "893.5 Tonnes GHG/yr",
    status: "Under Construction",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop",
    problem: "Akwa-Ibom and Benue states are prime agricultural hubs, yet farmers suffered from high post-harvest losses (over 40%) due to a lack of power for cold preservation, milling, and value-addition processing.",
    solution: "Credit-enhanced green financing supported Prado Power to install a total of 850kWp capacity of solar hybrid mini-grids, directly connected to agricultural cold hubs and agro-processing equipment.",
    impact: "De-risks local food systems, extends fresh produce shelf-life, serves 15,801 connections (households and agro-processors), and cuts greenhouse gas emissions by 893 tonnes per year.",
    desc: "Prado Power Energy Limited is constructing solar-hybrid mini-grids with a total capacity of 850kWp across four communities in Akwa Ibom and Benue States that currently lack grid access. The project aims to provide reliable electricity to unserved and underserved areas, with commercial operations expected to commence by 2025.",
    financing: "The project utilized an innovative blended finance model and is recognized as the first certified blended local currency Green Infrastructure Forward Ijarah Lease Sukuk for a solar mini-grid project in Nigeria. Concessional first-loss capital was provided by the UK-funded Climate Finance Blending Facility (CFBF), supported by the Foreign, Commonwealth & Development Office (FCDO), which invested in the subordinated debt tranche. This de-risked the transaction and reduced capital costs, allowing InfraCredit to issue a 'AAA'-rated guaranteed senior green sukuk that successfully mobilized N1.95 billion in private capital from 12 domestic institutional investors. Additionally, upfront due diligence and green certification costs were funded by InfraCredit’s technical assistance facility.",
    impact_desc: "The project on completion is expected to connect approximately 15,801 households, small businesses, and agro-processors to reliable power, create up to 740 direct and indirect jobs, and avoid approximately 893.53 tonnes of greenhouse gas (GHG) emissions per year, supporting UN Sustainable Development Goals (SDGs) 7, 8, 9, 11, 13, and 17.",
    percentages: { capital: 80, capacity: 70, connections: 50, jobs: 85, ghg: 50 },
    gallery: [
      { image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600", caption: "Walk-in solar cold room structures completed in Akwa-Ibom agricultural hub." },
      { image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600", caption: "Community sorting warehouse running on stable solar-powered circuits." },
      { image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=600", caption: "Farmers inspecting crop quality under high-efficiency cooling conditions." },
      { image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600", caption: "Power distribution panels routing clean electricity to milling engines." }
    ],
    intro: {
      title: "Securing Agricultural Value Chains & Reducing Post-Harvest Loss",
      col1Text: "Linking cold storage hubs and solarized crop processors directly to regional farms guarantees crop preservation and elevates rural incomes.",
      col2Image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600",
      col3Image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=600"
    },
    impactCard: {
      title: "Strengthening Rural Food Security",
      col1Text: "Providing Resilient Cooling. Sustainable refrigeration preserves crop freshness, reduces food waste metrics, and expands farmers' regional market reach.",
      col2Image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600",
      percentage: 60,
      statText: "60% decrease in average post-harvest losses reported across Akwa-Ibom solar hubs."
    },
    videos: [
      {
        id: "prado-01",
        title: "Prado Power Solar Powered Rural Electrification Project",
        category: "Project Verification",
        youtubeId: "AtymyZffhPY"
      },
      {
        id: "prado-02",
        title: "Prado Power Mini-Grid Impact Overview",
        category: "Community Impact",
        youtubeId: "-g0rzXKEByY"
      }
    ]
  },
  "04": {
    id: "04",
    title: "Hotspot Network Limited",
    location: "22 States in Nigeria",
    year: "Jun. 2023",
    capital: "₦955 Million",
    capacity: "324kW",
    category: "Telecoms",
    connections: "120 Sites",
    jobs: "720 Jobs",
    ghg: "8.34 Tonnes GHG/yr",
    status: "Operational",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop",
    problem: "Rural telecommunication towers require continuous power, but grid absence forced network operators to run dirty diesel generators 24/7. This led to high maintenance costs, frequent network downtime, and heavy local carbon emissions.",
    solution: "Hotspot Network created a special purpose vehicle, Micropolitan Mobile Connectivity Limited, raising NGN 955 million in green-certified debt capital de-risked by CFBF. The proceeds funded the solarization of 120 rural base stations in collaboration with major mobile operators.",
    impact: "Provides clean, solar-powered mobile network services across 120 remote communities. It guarantees 99.9% uptime, reduces diesel combustion, and supports 720 local maintenance jobs.",
    desc: "The project involves the construction, installation, and commissioning of 120 solar-powered mobile network base stations (sites) in 120 communities across 22 states in Nigeria. Micropolitan Mobile Connectivity Limited (Hotspot Network Limited's SPV) builds, owns, and operates these base stations in collaboration with Mobile Network Operators (MNOs) like MTN, replacing traditional fossil-fuel-powered infrastructure with climate-smart solar energy in off-grid rural communities.",
    financing: "The project was financed through a blended finance structure co-financed by the UK-funded Climate Finance Blending Facility (CFBF), which provided subordinated first-loss capital to de-risk the project and reduce capital costs. This enabled Micropolitan Mobile Connectivity Limited to issue a ₦955 million, 7-year fixed-rate guaranteed senior green infrastructure bond (due 2030) credit-enhanced by a 'AAA'-rated guarantee from InfraCredit, successfully crowding in matching investments from 9 domestic institutional investors.",
    impact_desc: "The project on completion is expected to enable between 9 and 16 million new mobile subscribers and 6 million new data users over 10 years, create up to 720 jobs, and avoid 8.34 tonnes of greenhouse gas (GHG) emissions annually, establishing a model to deploy up to 2,000 additional telecom sites.",
    percentages: { capital: 100, capacity: 100, connections: 100, jobs: 100, ghg: 100 },
    gallery: [
      { image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600", caption: "Solar hybrid power plant backing up a rural telephony mast." },
      { image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600", caption: "Technicians mounting photovoltaic frames onto mast enclosures." },
      { image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600", caption: "Clean hybrid battery storage bank operational on site." },
      { image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600", caption: "A local technician performing quarterly panel efficiency cleaning." }
    ],
    intro: {
      title: "Decarbonizing Digital Connectivity Networks Across 22 States",
      col1Text: "Replacing round-the-clock diesel fuel combustion at remote towers with high-efficiency solar-hybrid storage lowers network costs and emissions.",
      col2Image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600",
      col3Image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600"
    },
    impactCard: {
      title: "Sustaining Continuous Connectivity",
      col1Text: "Replacing Diesel Dependence. Transitioning telecom towers to solar hybrid setups prevents fuel theft disruptions and provides 99.9% network reliability.",
      col2Image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600",
      percentage: 99,
      statText: "99.9% network uptime achieved, cutting operating expenses and generator reliance."
    },
    videos: [
      {
        id: "hotspot-01",
        title: "Green Finance for Solar Powered Rural Telephony in Nigeria",
        category: "Project Showcase",
        youtubeId: "osqlW1cbu9s"
      },
      {
        id: "hotspot-02",
        title: "Hotspot Rural Telephony Mast Infrastructure",
        category: "Technical Overview",
        youtubeId: "tKAkI6bCTP8"
      }
    ]
  },
  "05": {
    id: "05",
    title: "Darway Coast Limited",
    location: "Rivers & Abia States",
    year: "Sep. 2022",
    capital: "₦800 Million",
    capacity: "526kW",
    category: "Solar Grid",
    connections: "7,711 Connections",
    jobs: "2,296 Jobs",
    ghg: "4,856 Tonnes GHG/yr",
    status: "Operational",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop",
    problem: "Underserved coastal and riverine communities in Rivers and Abia states suffered from absolute energy poverty. Local businesses and fishermen relied on toxic petrol generators, driving up operational costs and damaging coastal ecosystems.",
    solution: "Pioneered the first-ever green-certified blended local currency debt issue for a solar mini-grid in Nigeria. The NGN 800 million funding backed Darway Coast to build 526kWp of isolated solar mini-grids utilizing smart prepaid meters and remote disconnections.",
    impact: "Eliminated diesel generators in target locations, cutting 4,856 tonnes of CO2 emissions annually. Powered 7,711 homes and retail stores, creating 2,296 direct and indirect jobs.",
    desc: "The project involves the construction of isolated solar mini-grids with a total capacity of 526.1 kW across six communities in Rivers and Abia States that previously lacked grid access. Darway Coast specializes in providing hybrid solar mini-grid and micro-grid solutions using a 'Pay-As-You-Go' (PAYG) business model supported by smart meters and remote monitoring systems.",
    financing: "The project utilized a blended finance structure, issuing an NGN 800 million, 7-year Series 1 Fixed Rate Guaranteed Senior Green Infrastructure Bond (due 2029). The transaction was co-financed by the UK-funded Climate Finance Blending Facility (CFBF) providing subordinated first-loss capital, which de-risked the project and enabled InfraCredit to provide a AAA-rated guarantee, crowding in matching investments from 6 domestic institutional investors.",
    impact_desc: "Expected impacts from the project include electrifying up to 7,711 unserved households and small businesses, creating up to 497 jobs, and avoiding an estimated 4,856 tonnes of greenhouse gas (GHG) emissions annually, conforming to the Climate Bonds Standard Solar Sector Criteria and contributing to UN SDGs 7, 8, 9, 11, 13, and 17.",
    testimonial: {
      name: "Felicia Adindu",
      role: "Small Business Owner, Akpoku Village",
      quote: "In Akpoku, we once struggled with unreliable electricity which limited our business hours. Since the solar grid arrived, our lighting costs have dropped, sales have doubled, and we can preserve our fresh goods without generator noise."
    },
    percentages: { capital: 100, capacity: 100, connections: 100, jobs: 100, ghg: 100 },
    gallery: [
      { image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=600", caption: "Community members in Akpoku village accessing clean grid sockets." },
      { image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600", caption: "Mini-grid substation panels overlooking Akpoku community boundaries." },
      { image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600", caption: "Smart prepayment terminals operational inside local retail shops." },
      { image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600", caption: "Technical training session for local mini-grid operators." }
    ],
    intro: {
      title: "Pioneering Green Blended Local Currency Bonds for Mini-Grids",
      col1Text: "Securing capital enhancement guarantees enabled a local developer to secure long-term NGN financing, bringing clean energy grids to coastal markets.",
      col2Image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=600",
      col3Image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600"
    },
    impactCard: {
      title: "Transforming Coastal Economies",
      col1Text: "Replacing Petrol Generators. Phasing out small, dirty retail fuel engines lowers local merchant operating expenses and preserves coastal air quality.",
      col2Image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600",
      percentage: 95,
      statText: "95% of village retail merchants reported significant operational cost reductions."
    },
    videos: [
      {
        id: "darway-01",
        title: "Meet Felicia Adindu – End User, Darway Coast",
        category: "Community Interview",
        youtubeId: "rawk7X7R2Y8"
      },
      {
        id: "darway-02",
        title: "Meet Uche Anaele – End User, Darway Coast",
        category: "Community Interview",
        youtubeId: "T_JELUJK0Ws"
      },
      {
        id: "darway-03",
        title: "Meet Emeka Chiagu – End User, Darway Coast",
        category: "Community Interview",
        youtubeId: "vJJiM03WFb0"
      },
      {
        id: "darway-04",
        title: "Meet Chioma Chiwendu – End User, Darway Coast",
        category: "Community Interview",
        youtubeId: "kBGxtT3dd0s"
      }
    ]
  },
  "06": {
    id: "06",
    title: "ACOB Lighting Technology Limited",
    location: "Edo & Ondo States",
    year: "Dec. 2023",
    capital: "₦755 Million",
    capacity: "335kW",
    category: "Solar Grid",
    connections: "3,597 Connections",
    jobs: "868 Jobs",
    ghg: "352 Tonnes GHG/yr",
    status: "Operational",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop",
    problem: "Energy poverty in rural cocoa-farming communities with zero electricity access. Manual cocoa processing caused low productivity and post-harvest decay.",
    solution: "Through NGN 755 million in credit-enhanced debt finance, ACOB constructed a 335kWp solar hybrid mini-grid to power households, agricultural centers, and high-efficiency streetlights.",
    impact: "Powers 3,597 connections, providing reliable energy to agro-businesses, enhancing security with solar streetlights, and preventing 352 tonnes of GHG emissions yearly.",
    desc: "The project involves the construction, installation, and operation of isolated solar-hybrid mini-grids with a total capacity of 335 kWp across seven underserved communities in Edo and Ondo States. This initiative aims to supply sustainable electricity to unserved and underserved rural populations in Nigeria, as part of ACOB Lighting Technology Limited’s broader mission to expand energy access.",
    financing: "The project reached financial close in December 2023 and utilized a blended finance structure co-financed under the UK-funded Climate Finance Blending Facility (CFBF), which provided subordinated first-loss capital. This support enabled ACOB to issue a N755 million 7-Year Series 1 Fixed Rate Guaranteed Senior Green Infrastructure Bond. InfraCredit provided a 'AAA'-rated credit guarantee for the senior debt, successfully de-risking the transaction and crowding in matching investments from 8 domestic institutional investors.",
    impact_desc: "The expected impacts of the project include electrifying approximately 3,597 households and small businesses with clean power, creating up to 868 direct and indirect jobs, and reducing greenhouse gas emissions by approximately 352.15 tonnes annually, making a direct contribution to UN SDGs 7, 8, 9, 11, 13, and 17.",
    percentages: { capital: 100, capacity: 100, connections: 100, jobs: 100, ghg: 100 },
    gallery: [
      { image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600", caption: "High-efficiency streetlights illuminating cocoa collection points at dusk." },
      { image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600", caption: "Substation site in Ondo state during peak generation hours." },
      { image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600", caption: "A local cocoa processing mill running on clean smart circuits." },
      { image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=600", caption: "Resident families experiencing modern indoor lighting solutions." }
    ],
    intro: {
      title: "Lighting Up Agricultural Villages & Securing Cocoa Centers",
      col1Text: "Deploying credit-enhanced funding backed the creation of stable micro-power grids to run cocoa sorting machines and public streetlights.",
      col2Image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600",
      col3Image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600"
    },
    impactCard: {
      title: "Enhancing Rural Quality of Life",
      col1Text: "Activating Streetlights. Installing smart, solar-powered streetlights provides security, extends business hours, and supports village assembly points.",
      col2Image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600",
      percentage: 100,
      statText: "100% of target village centers now benefit from operational solar street lighting."
    },
    videos: [
      {
        id: "acob-01",
        title: "ACOB Lighting Solar Powered Rural Electrification Project",
        category: "Project Verification",
        youtubeId: "C6S2Qj-Dsc0"
      }
    ]
  }
};
