export interface NewsArticle {
  id: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  author: string;
  authorAvatar: string;
  image: string;
  readTime: string;
  themes: string[];
  keyContext: string;
  paragraphs: {
    type: 'p' | 'h2' | 'blockquote' | 'image';
    text: string;
    caption?: string;
    url?: string;
  }[];
}

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    tag: "Market Insights",
    date: "December 12, 2025",
    readTime: "5 min read",
    themes: ["FINANCE", "LOCAL CURRENCY", "SOLAR"],
    keyContext: "Understanding how local currency guarantees are de-risking solar energy investments.",
    title: "The Future of Local Currency Financing and its Impact on Sub-Saharan Africa's Renewable Energy Transition",
    excerpt: "How local currency guarantees are de-risking investments and unlocking long-term debt from institutional investors for solar developers.",
    author: "Chinua Okeke",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    paragraphs: [
      {
        type: 'p',
        text: "The transition to clean energy in Sub-Saharan Africa faces a recurring challenge: foreign exchange risk. Historically, clean energy infrastructure projects have been funded in foreign hard currencies (USD or EUR), while their revenues are collected in local currencies (such as Naira). This mismatch leaves developers vulnerable to currency devaluations."
      },
      {
        type: 'h2',
        text: "Mitigating Currency Mismatch"
      },
      {
        type: 'p',
        text: "To address this hurdle, the Climate Finance Blending Facility (CFBF), in collaboration with partners like InfraCredit, is pioneering local currency blended financing. By providing local currency guarantees, the facility enables local institutional investors—such as pension funds—to invest confidently in local currency green bonds. This matches the funding currency directly with local utility tariffs."
      },
      {
        type: 'blockquote',
        text: "Local currency financing is not just an alternative; it is the bedrock of sustainable infrastructure development in emerging markets."
      },
      {
        type: 'p',
        text: "By de-risking the capital structure through a first-loss tranche, the Facility attracts private commercial pension capital that would otherwise steer clear of early-stage solar developments. This creates a sustainable cycle where domestic savings fund domestic infrastructure."
      },
      {
        type: 'image',
        url: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop",
        text: "Solar panels installation matching local currency investments.",
        caption: "Domestic pension funds represent a massive, untapped pool of long-term local capital."
      },
      {
        type: 'h2',
        text: "Expanding Beyond Solar"
      },
      {
        type: 'p',
        text: "While solar hybrid mini-grids have been the primary beneficiary of this model, the Facility plans to expand the local currency guarantee framework to encompass clean cooling value chains and agricultural processing hubs, cementing local currency debt as a standard tool for renewable energy developers across West Africa."
      }
    ]
  },
  {
    id: "2",
    tag: "Fund Updates",
    date: "November 20, 2025",
    readTime: "4 min read",
    themes: ["FUNDRAISING", "INVESTORS", "GROWTH"],
    keyContext: "A breakdown of the successful closure of our Series 2 capital raise from institutional partners.",
    title: "Clean Energy Fund Announces the Successful Closure of Series 2 Capital Raise for Institutional Investors",
    excerpt: "The facility secures additional commitments from domestic pensions and assurance funds to expand off-grid solar operations.",
    author: "Folasade Adebayo",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop",
    paragraphs: [
      {
        type: 'p',
        text: "The Climate Finance Blending Facility is thrilled to announce the successful final close of its Series 2 capital raise. The raise secured an additional ₦15 Billion from domestic institutional investors, including leading pension fund administrators and assurance companies."
      },
      {
        type: 'h2',
        text: "Unlocking Pension Liquidity"
      },
      {
        type: 'p',
        text: "This capital raise demonstrates the growing appetite among local asset managers for yield-bearing green instruments. The capital will be immediately deployed to co-finance a pipeline of solar mini-grids and clean commercial cooling setups across Nigeria, helping developers access credit-enhanced Naira financing."
      },
      {
        type: 'blockquote',
        text: "The success of this Series 2 close signals strong institutional trust in our risk-mitigated credit guarantee structure."
      },
      {
        type: 'p',
        text: "With this round of funding, the Facility's active capital pool increases significantly, enabling the de-risking of larger corporate clean energy bonds and helping developers secure up to 10-year tenor terms from domestic lenders."
      },
      {
        type: 'image',
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
        text: "Strategic meeting finalizing the Series 2 capital raise.",
        caption: "Aligning domestic institutional capital with sustainable energy development targets."
      },
      {
        type: 'h2',
        text: "Next Milestones"
      },
      {
        type: 'p',
        text: "Looking forward to 2026, the Facility plans to allocate capital across 12 new projects, focusing heavily on northern states where off-grid agricultural solar processing installations can drive the highest economic and social impacts."
      }
    ]
  },
  {
    id: "3",
    tag: "Impact Report",
    date: "October 05, 2025",
    readTime: "7 min read",
    themes: ["ESG", "SDGS", "COMMUNITIES"],
    keyContext: "A deep dive into our verified environmental and social metrics from the 2025 Impact Report.",
    title: "Annual Impact Report: Bridging the Energy Gap and Fostering Sustainable Economic Growth in Nigeria",
    excerpt: "A close look at how clean energy installations have impacted 2.4 million lives, created 300+ green jobs, and reduced carbon emissions.",
    author: "Amina Bello",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop",
    paragraphs: [
      {
        type: 'p',
        text: "Our 2025 Annual Sustainability and Impact Report has been officially released, highlighting key achievements in greenhouse gas reduction, clean energy access, and rural economic empowerment across our blended finance portfolio."
      },
      {
        type: 'h2',
        text: "Empowering Rural Livelihoods"
      },
      {
        type: 'p',
        text: "By de-risking solar developers, we have facilitated the installation of over 32 MW of renewable capacity, directly impacting 2.4 million lives. Rural communities that previously relied on toxic diesel generators now enjoy 24/7 reliable power, boosting micro-business yields and reducing local emissions."
      },
      {
        type: 'blockquote',
        text: "Our impact goes beyond metrics: we are witnessing the structural transformation of rural economies through clean energy."
      },
      {
        type: 'p',
        text: "In addition to carbon reduction, the projects have catalyzed the creation of over 300 direct green jobs, with a specific focus on training female engineers and micro-entrepreneurs to manage local grid systems."
      },
      {
        type: 'image',
        url: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1200&auto=format&fit=crop",
        text: "Community members benefited by solar installation.",
        caption: "Access to clean electricity supports local education and healthcare clinics."
      },
      {
        type: 'h2',
        text: "Verifiable Environmental Outcomes"
      },
      {
        type: 'p',
        text: "All carbon metrics have been independently audited and verified in compliance with the Climate Bonds Standard, resulting in a reduction of 611k tonnes of CO2 emissions annually, proving that financial de-risking can drive massive, verifiable climate outcomes."
      }
    ]
  },
  {
    id: "4",
    tag: "Industry News",
    date: "September 18, 2025",
    readTime: "6 min read",
    themes: ["POLICY", "REGULATION", "GREEN BONDS"],
    keyContext: "Understanding the evolving legal landscape that is facilitating the growth of green finance.",
    title: "Navigating the New Regulatory Frameworks Supporting Green Bonds and Climate Finance in Nigeria",
    excerpt: "Recent policy updates from the SEC and Central Bank are creating a more robust enabling environment for sustainable investments.",
    author: "Dr. Emmanuel Nwachukwu",
    authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=1200&auto=format&fit=crop",
    paragraphs: [
      {
        type: 'p',
        text: "The regulatory landscape for climate finance in Nigeria is maturing rapidly. Recent guidelines issued by the Securities and Exchange Commission (SEC) and the Central Bank of Nigeria (CBN) are providing much-needed clarity and standardization for green bonds and sustainable investment funds."
      },
      {
        type: 'h2',
        text: "Standardization and Taxonomy"
      },
      {
        type: 'p',
        text: "One of the most significant developments is the move towards a unified green taxonomy. By clearly defining what constitutes a 'green' or 'climate-aligned' investment, regulators are mitigating the risk of greenwashing and providing institutional investors with the confidence they need to allocate capital."
      },
      {
        type: 'p',
        text: "These frameworks align closely with international standards, such as the ICMA Green Bond Principles and the Climate Bonds Initiative standards, ensuring that Nigerian green financial instruments are globally competitive and credible."
      },
      {
        type: 'image',
        url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop",
        text: "Legal books and document folders.",
        caption: "Clear regulatory frameworks are essential for scaling climate finance."
      },
      {
        type: 'h2',
        text: "Incentivizing Green Capital"
      },
      {
        type: 'p',
        text: "Beyond standardization, there are ongoing discussions regarding potential incentives for green investments. These could include favorable capital charge treatments for banks holding green bonds or tax exemptions for returns generated from certified sustainable funds."
      },
      {
        type: 'blockquote',
        text: "A robust regulatory framework is the invisible infrastructure that allows green capital to flow freely and securely."
      },
      {
        type: 'p',
        text: "While some of these incentives are still in the proposal stage, the direction of travel is clear. Policymakers recognize that mobilizing private capital is essential to meeting Nigeria's Nationally Determined Contributions (NDCs) under the Paris Agreement."
      },
      {
        type: 'h2',
        text: "Implications for Fund Managers"
      },
      {
        type: 'p',
        text: "For vehicles like the Climate Finance Blending Facility, these regulatory advancements are highly positive. They validate our stringent ESG reporting processes and our commitment to third-party verification (such as our CBI certification). As the market becomes more regulated, funds with established, transparent track records will be best positioned to attract institutional capital."
      }
    ]
  },
  {
    id: "5",
    tag: "Market Insights",
    date: "August 14, 2025",
    readTime: "6 min read",
    themes: ["CAPITAL", "MINI-GRIDS", "PARTNERSHIP"],
    keyContext: "How first-loss concessional tranches bridge early-stage developer risk profiles.",
    title: "Unlocking Capital for Mini-Grids in Rural Communities",
    excerpt: "FCDO and InfraCredit partnership demonstrates how first-loss capital bridges equity gaps for remote developers.",
    author: "Tunde Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1200&auto=format&fit=crop",
    paragraphs: [
      {
        type: 'p',
        text: "Bridging the capital gap for rural solar developers requires strategic collaboration. Commercial banks and typical debt investors avoid early-stage mini-grid installations due to perceived performance risk and long payback cycles."
      },
      {
        type: 'h2',
        text: "Concessional Blending at Work"
      },
      {
        type: 'p',
        text: "To bridge this gap, the partnership between the UK Foreign, Commonwealth & Development Office (FCDO) and InfraCredit leverages first-loss concessional funding. By placing FCDO seed capital in a subordinated position, the facility de-risks the capital stack, enabling institutional pension capital to step in as senior lenders."
      },
      {
        type: 'blockquote',
        text: "Subordinated, concessional capital is the key that unlocks long-term commercial credit for clean energy developers."
      },
      {
        type: 'p',
        text: "This framework has successfully mobilized private capital at a 1:4 leverage ratio, showing that every Naira of first-loss capital can draw in four Naira of domestic pension fund financing."
      },
      {
        type: 'image',
        url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
        text: "Rural solar mini-grid installation site.",
        caption: "Financing local infrastructure in local currency removes exchange rate shocks."
      },
      {
        type: 'h2',
        text: "Creating Investment-Grade Assets"
      },
      {
        type: 'p',
        text: "By packaging these guarantees, the Facility creates investment-grade debt options from high-risk off-grid projects. This makes green bonds an attractive asset class for conservative pension administrators, establishing a sustainable, long-term funding stream."
      }
    ]
  }
];
