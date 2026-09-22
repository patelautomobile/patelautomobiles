const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const publicDir = path.join(process.cwd(), 'public');

const photoSlots = [
  // home
  { dir: 'photos/home', file: 'hero-fallback.webp', brand: 'Patel Automobiles', title: 'Hero Fallback Banner', slot: 'hero-fallback.webp' },
  { dir: 'photos/home', file: 'home-scooter-01.webp', brand: 'Patel Automobiles', title: 'Power • Style • Performance EV', slot: 'home-scooter-01.webp' },
  { dir: 'photos/home', file: 'home-scooter-02.webp', brand: 'Patel Automobiles', title: 'Simple • Stylish • Smart EV', slot: 'home-scooter-02.webp' },
  { dir: 'photos/home', file: 'home-showroom.webp', brand: 'Patel Automobiles', title: 'Lailunga Main Showroom Arena', slot: 'home-showroom.webp' },
  { dir: 'photos/home', file: 'home-feature.webp', brand: 'Patel Automobiles', title: 'Dealership Showcase Feature', slot: 'home-feature.webp' },

  // brands
  { dir: 'photos/brands', file: 'zelio.webp', brand: 'Zelio Electric', title: 'Zelio Authorized Lineup (17 Models)', slot: 'zelio.webp' },
  { dir: 'photos/brands', file: 'warivo.webp', brand: 'Warivo Motor', title: 'Warivo Authorized Lineup (7 Models)', slot: 'warivo.webp' },
  { dir: 'photos/brands', file: 'dynamo.webp', brand: 'Dynamo EV', title: 'Dynamo Authorized Lineup (15 Models)', slot: 'dynamo.webp' },

  // about
  { dir: 'photos/about', file: 'founder-pradeep-patel.webp', brand: 'Patel Automobiles', title: 'Founder - Pradeep Patel', slot: 'founder-pradeep-patel.webp' },
  { dir: 'photos/about', file: 'showroom.webp', brand: 'Patel Automobiles', title: 'Lailunga EV Showroom & Service Facility', slot: 'showroom.webp' },
  { dir: 'photos/about', file: 'dealership.webp', brand: 'Patel Automobiles', title: 'Authorized Multi-Brand Dealership', slot: 'dealership.webp' },
  { dir: 'photos/about', file: 'team.webp', brand: 'Patel Automobiles', title: 'Certified Technical & Service Team', slot: 'team.webp' },

  // stories
  { dir: 'photos/stories', file: 'story-01.webp', brand: 'Customer Story', title: 'Customer Delivery Ceremony 01', slot: 'story-01.webp' },
  { dir: 'photos/stories', file: 'story-02.webp', brand: 'Customer Story', title: 'Customer Delivery Ceremony 02', slot: 'story-02.webp' },
  { dir: 'photos/stories', file: 'story-03.webp', brand: 'Customer Story', title: 'Customer Delivery Ceremony 03', slot: 'story-03.webp' },
  { dir: 'photos/stories', file: 'story-04.webp', brand: 'Customer Story', title: 'Customer Delivery Ceremony 04', slot: 'story-04.webp' },
  { dir: 'photos/stories', file: 'story-05.webp', brand: 'Customer Story', title: 'Customer Delivery Ceremony 05', slot: 'story-05.webp' },

  // contact
  { dir: 'photos/contact', file: 'showroom-contact.webp', brand: 'Patel Automobiles', title: 'Lailunga Main Road Showroom Front', slot: 'showroom-contact.webp' },
];

const zelioModels = [
  { slug: 'eeva-eco', name: 'Zelio Eeva Eco' },
  { slug: 'eeva', name: 'Zelio Eeva' },
  { slug: 'eeva-zx-plus', name: 'Zelio Eeva ZX+' },
  { slug: 'eeva-ecolx', name: 'Zelio Eeva Ecolx' },
  { slug: 'eeva-eco-zx', name: 'Zelio Eeva Eco ZX' },
  { slug: 'eeva-zx', name: 'Zelio Eeva ZX' },
  { slug: 'x-men-2', name: 'Zelio X-Men 2.0' },
  { slug: 'little-gracy', name: 'Zelio Little Gracy' },
  { slug: 'gracy', name: 'Zelio Gracy' },
  { slug: 'gracy-plus', name: 'Zelio Gracy+' },
  { slug: 'gracy-pro', name: 'Zelio Gracy Pro' },
  { slug: 'legender-plus-premium', name: 'Zelio Legender+ Premium' },
  { slug: 'legender-plus', name: 'Zelio Legender+' },
  { slug: 'legender', name: 'Zelio Legender' },
  { slug: 'mystery', name: 'Zelio Mystery' },
  { slug: 'logix', name: 'Zelio Logix' },
  { slug: 'logix-loader', name: 'Zelio Logix Loader' },
];

const warivoModels = [
  { slug: 'neo', name: 'Warivo Neo' },
  { slug: 'edge', name: 'Warivo Edge' },
  { slug: 'edge-plus', name: 'Warivo Edge+' },
  { slug: 'nova', name: 'Warivo Nova' },
  { slug: 'nova-x', name: 'Warivo Nova X' },
  { slug: 'nova-s', name: 'Warivo Nova S' },
  { slug: 'crx', name: 'Warivo CRX' },
];

const dynamoModels = [
  { slug: 'x1', name: 'Dynamo X1' },
  { slug: 'x3-t', name: 'Dynamo X3-T' },
  { slug: 'infinity', name: 'Dynamo INFINITY' },
  { slug: 'xplore', name: 'Dynamo XPLORE' },
  { slug: 'lima', name: 'Dynamo LIMA' },
  { slug: '3xl-loader', name: 'Dynamo 3XL Loader' },
  { slug: '3-x1', name: 'Dynamo 3 X1' },
  { slug: 'rx4', name: 'Dynamo RX4' },
  { slug: 'alpha', name: 'Dynamo Alpha' },
  { slug: 'x2', name: 'Dynamo X2' },
  { slug: 'x3', name: 'Dynamo X3' },
  { slug: 'xl-electric-loader', name: 'Dynamo XL Electric Loader' },
  { slug: 'x4', name: 'Dynamo X4' },
  { slug: 'rx1', name: 'Dynamo RX1' },
  { slug: 'smiley', name: 'Dynamo Smiley' },
];

const scooterAngles = [
  { file: 'front-3-4.webp', label: 'FRONT 3/4 ANGLE' },
  { file: 'side.webp', label: 'SIDE PROFILE' },
  { file: 'rear-3-4.webp', label: 'REAR 3/4 ANGLE' },
  { file: 'rear.webp', label: 'REAR VIEW' },
];

function generatePlaceholder(filePath, brand, title, angleLabel, filename) {
  const targetDir = path.dirname(filePath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Use convert to generate a clean, branded, high-contrast dark WebP placeholder
  const cmd = `convert -size 900x600 xc:"#0D0D0D" \\
    -fill "#1B0B0D" -draw "rectangle 24,24 876,576" \\
    -fill "#8B1E1E" -draw "line 24,24 876,24 line 24,576 876,576 line 24,24 24,576 line 876,24 876,576" \\
    -fill "#F9040C" -gravity North -pointsize 24 -annotate +0+55 "PATEL AUTOMOBILES  •  ELECTRIC MOBILITY" \\
    -fill "#FFFFFF" -gravity Center -pointsize 32 -annotate +0-35 "${title.replace(/"/g, '\\"')}" \\
    -fill "#E8B7B7" -gravity Center -pointsize 22 -annotate +0+25 "${angleLabel}  •  ${filename}" \\
    -fill "#F9040C" -gravity South -pointsize 18 -annotate +0+65 "[ IMAGE SLOT READY • REPLACE WITH ORIGINAL WEBP PHOTO ]" \\
    "${filePath}"`;

  execSync(cmd);
}

let createdCount = 0;

// 1. Generate Photo slots
console.log('Generating photos slots...');
for (const p of photoSlots) {
  const fullPath = path.join(publicDir, p.dir, p.file);
  generatePlaceholder(fullPath, p.brand, p.title, 'SECTION PHOTO', p.slot);
  createdCount++;
}

// 2. Generate Scooter image slots for Zelio (17 models * 4 angles = 68 slots)
console.log('Generating Zelio scooter slots (17 models * 4 angles)...');
for (const m of zelioModels) {
  const modelDir = path.join(publicDir, 'scooter-images', 'zelio', m.slug);
  for (const a of scooterAngles) {
    const fullPath = path.join(modelDir, a.file);
    generatePlaceholder(fullPath, 'Zelio', m.name, a.label, a.file);
    createdCount++;
  }
}

// 3. Generate Scooter image slots for Warivo (7 models * 4 angles = 28 slots)
console.log('Generating Warivo scooter slots (7 models * 4 angles)...');
for (const m of warivoModels) {
  const modelDir = path.join(publicDir, 'scooter-images', 'warivo', m.slug);
  for (const a of scooterAngles) {
    const fullPath = path.join(modelDir, a.file);
    generatePlaceholder(fullPath, 'Warivo', m.name, a.label, a.file);
    createdCount++;
  }
}

// 4. Generate Scooter image slots for Dynamo (15 models * 4 angles = 60 slots)
console.log('Generating Dynamo scooter slots (15 models * 4 angles)...');
for (const m of dynamoModels) {
  const modelDir = path.join(publicDir, 'scooter-images', 'dynamo', m.slug);
  for (const a of scooterAngles) {
    const fullPath = path.join(modelDir, a.file);
    generatePlaceholder(fullPath, 'Dynamo', m.name, a.label, a.file);
    createdCount++;
  }
}

console.log(`Successfully created ${createdCount} permanent image slot placeholders!`);
