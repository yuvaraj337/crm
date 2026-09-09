export const heroSlides = [
  {
    id: 'apartments',
    tag: 'Luxury Apartments',
    icon: '🏢',
    title: 'Sky-High Living,\nGrounded in Trust',
    desc: 'Premium 2 & 3 BHK apartments with world-class amenities in Hyderabad\'s best locations.',
    btnText: 'Explore Apartments',
    link: '#/apartments',
    image: '/images/hero-apartments.jpg'
  },
  {
    id: 'farmlands',
    tag: 'Farm Lands',
    icon: '🌲',
    title: 'Your Green Escape,\nYour Investment',
    desc: 'Managed farm lands that blend weekend living with long-term appreciation.',
    btnText: 'Explore Farm Lands',
    link: '#/farmlands',
    image: '/images/hero-farmlands.jpg'
  },
  {
    id: 'villas',
    tag: 'Luxury Villas',
    icon: '🏡',
    title: 'Find the Right\nProperty for Your\nFuture',
    desc: 'Premium gated-community villas delivering exceptional value and returns to investors.',
    btnText: 'Explore Villas',
    link: '#/villas',
    image: '/images/hero-villas.jpg'
  },
  {
    id: 'openplots',
    tag: 'Open Plots',
    icon: '📐',
    title: 'Own Land That\nGrows in Value',
    desc: 'HMDA & DTCP approved open plots in fast-growing corridors of Telangana & Andhra Pradesh.',
    btnText: 'Explore Open Plots',
    link: '#/open-plots',
    image: '/images/hero-openplots.jpg'
  }
];

export const propertyCategories = [
  {
    id: 'villas',
    title: 'Villas',
    feature: 'Gated Communities',
    icon: '🏡',
    image: '/images/cat-villas.jpg',
    link: '#/villas'
  },
  {
    id: 'openplots',
    title: 'Open Plots',
    feature: 'HMDA / DTCP Approved',
    icon: '📖',
    image: '/images/cat-openplots.jpg',
    link: '#/open-plots'
  },
  {
    id: 'apartments',
    title: 'Apartments',
    feature: '2 & 3 BHK Luxury',
    icon: '🏢',
    image: '/images/cat-apartments.jpg',
    link: '#/apartments'
  },
  {
    id: 'farmlands',
    title: 'Farm Lands',
    feature: 'Managed Farmlands',
    icon: '🌲',
    image: '/images/cat-farmlands.jpg',
    link: '#/farmlands'
  }
];

export const locationOpportunities = [
  {
    id: 'amaravati',
    name: 'Amaravati',
    icon: '🏛️',
    desc: 'Open plots and property opportunities across Amaravati and nearby capital-region locations.',
    link: '#/location/amaravati'
  },
  {
    id: 'vijayawada',
    name: 'Vijayawada',
    icon: '🏙️',
    desc: 'Explore property opportunities in Vijayawada and nearby growth locations.',
    link: '#/location/vijayawada'
  },
  {
    id: 'visakhapatnam',
    name: 'Visakhapatnam',
    icon: '🌊',
    desc: 'Open plots and properties across Vizag and nearby VMRDA growth locations.',
    link: '#/location/visakhapatnam'
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    icon: '🏢',
    desc: 'Villas, apartments and open plots across Hyderabad and major growth corridors.',
    link: '#/location/hyderabad'
  }
];

export const popularSearches = [
  { label: 'Amaravati Open Plots', link: '#/open-plots?region=amaravati' },
  { label: 'Anandapuram / Vizag Plots', link: '#/open-plots?region=vizag' },
  { label: 'Shadnagar Open Plots', link: '#/open-plots?region=shadnagar' },
  { label: 'Patancheru / Isnapur', link: '#/open-plots?region=patancheru' }
];

export const buyerGuides = [
  { title: 'Amaravati Buyer Guide', link: '#/guides/amaravati' },
  { title: 'Vijayawada Buyer Guide', link: '#/guides/vijayawada' },
  { title: 'Visakhapatnam Buyer Guide', link: '#/guides/visakhapatnam' },
  { title: 'Hyderabad Buyer Guide', link: '#/guides/hyderabad' },
  { title: 'Shadnagar vs Patancheru', link: '#/guides/shadnagar-vs-patancheru' },
  { title: 'AP & Telangana Approval Guide', link: '#/guides/approval-guide' }
];

export const featuredProperties = [
  {
    id: 'silicon-valley',
    title: 'SILICON VALLEY',
    location: 'Visakhapatnam – VMRDA Region',
    badges: ['₹22 Lakhs onwards*', '133'],
    image: '/images/featured-silicon-valley.jpg',
    link: '#/property/silicon-valley'
  },
  {
    id: 'sanjeevani-golden-farm',
    title: 'Sanjeevani Golden Farm',
    location: 'Kallepalli Village, Balanagar',
    badges: ['₹72,00,000', '8 Guntas'],
    image: '/images/featured-sanjeevani.jpg',
    link: '#/property/sanjeevani-golden-farm'
  },
  {
    id: 'anvaya-villas',
    title: 'ANVAYA VILLAS',
    location: 'Kongara Kalan',
    badges: ['Contact for Latest Price', '200 - 472'],
    image: '/images/featured-anvaya.jpg',
    link: '#/property/anvaya-villas'
  }
];

export const openPlotsList = [
  {
    id: 'amodha',
    title: 'Amodha',
    tagline: 'The Joy of Living',
    location: 'Burgula',
    state: 'Telangana',
    stateType: 'telangana',
    image: '/images/plot-amodha-clean.jpg',
    logo: '/images/logo-amodha.png',
    link: '#/amodha',
    type: 'Open Plot',
    status: 'Available',
    price: 'Price on Request',
    approval: 'DTCP / HMDA Approved',
    size: '150 - 400 Sq. Yds',
    facing: 'East / West / North',
    desc: 'Amodha is a premium villa plots community located strategically at Burgula near Shadnagar on the fast-growing Bangalore Highway corridor. Enjoy world-class amenities, blacktop roads, underground drainage, and lush greenery.'
  },
  {
    id: 'fortune-avenue',
    title: 'Fortune Avenue',
    tagline: 'Luxury Villa Plots @ Shadnagar',
    location: 'Shadnagar',
    state: 'Telangana',
    stateType: 'telangana',
    image: '/images/plot-fortune-avenue.jpg',
    logo: '/images/logo-fortune-avenue.png',
    link: '#/property/fortune-avenue',
    type: 'Open Plot',
    status: 'Available',
    price: 'Price on Request',
    approval: 'HMDA Approved',
    size: '167 - 350 Sq. Yds',
    facing: 'East / West / North',
    desc: 'Fortune Avenue offers prime residential villa plots right near Shadnagar town center with quick access to the Hyderabad-Bangalore Highway and upcoming Regional Ring Road.'
  },
  {
    id: 'sez-city',
    title: 'SEZ CITY',
    tagline: 'Commercial & Residential Plots',
    location: 'Balanagar (Shadnagar)',
    state: 'Telangana',
    stateType: 'telangana',
    image: '/images/plot-sez-city.jpg',
    logo: '/images/logo-sez-city.png',
    link: '#/property/sez-city',
    type: 'Open Plot',
    status: 'Available',
    price: 'Price on Request',
    approval: 'DTCP Approved',
    size: '200 - 500 Sq. Yds',
    facing: 'All Facings Available',
    desc: 'SEZ City is located close to major Special Economic Zones and manufacturing corridors in Balanagar, providing high growth potential for savvy property investors.'
  },
  {
    id: 'shadnagar-heights',
    title: 'Shadnagar Heights',
    tagline: "Eeshanya's Shadnagar Heights",
    location: 'Mogiligidda',
    state: 'Telangana',
    stateType: 'telangana',
    image: '/images/plot-shadnagar-heights.jpg',
    logo: '/images/logo-shadnagar-heights.png',
    link: '#/property/shadnagar-heights',
    type: 'Open Plot',
    status: 'Available',
    price: 'Price on Request',
    approval: 'HMDA & DTCP Approved',
    size: '150 - 300 Sq. Yds',
    facing: 'East / West',
    desc: 'Nestled in a peaceful, serene green location at Mogiligidda, Shadnagar Heights is an idyllic gated development with club facilities and high capital appreciation prospects.'
  },
  {
    id: 'vrindavan',
    title: 'Vrindavan',
    tagline: 'The Harmony Enclave',
    location: 'Shadnagar Town',
    state: 'Telangana',
    stateType: 'telangana',
    image: '/images/plot-vrindavan.jpg',
    logo: '/images/logo-vrindavan.png',
    link: '#/property/vrindavan',
    type: 'Open Plot',
    status: 'Available',
    price: 'Price on Request',
    approval: 'HMDA Approved',
    size: '180 - 450 Sq. Yds',
    facing: 'East / North / South',
    desc: 'Vrindavan The Harmony Enclave offers ready-to-construct open plots right within Shadnagar Municipality limits, surrounded by established schools, hospitals, and transit.'
  },
  {
    id: 'eeshanya-county',
    title: 'Eeshanya County',
    tagline: 'Welcome to a New Lifestyle',
    location: 'Raikal, Shadnagar',
    state: 'Telangana',
    stateType: 'telangana',
    image: '/images/plot-eeshanya-county.jpg',
    logo: '/images/logo-eeshanya-county.png',
    link: '#/property/eeshanya-county',
    type: 'Open Plot',
    status: 'Available',
    price: 'Price on Request',
    approval: 'DTCP Approved Layout',
    size: '150 - 350 Sq. Yds',
    facing: 'East / West',
    desc: 'Eeshanya County at Raikal is a master-planned plotted layout on the Bangalore Expressway axis, featuring grand arch entrance, avenue plantation, and crystal clear titles.'
  }
];
