/**
 * =========================================================================
 * FOLDER-BASED IMAGE SLOT SYSTEM — PATEL AUTOMOBILES
 * =========================================================================
 *
 * Each image slot on this website corresponds to a dedicated folder inside:
 *   src/assets/site-images/
 *
 * SCOOTERS (39 models x 4 angles = 156 slot folders):
 *   src/assets/site-images/scooters/{brand}/{slug}/{angle}/
 *   Angles:
 *     - front-3-4/
 *     - side/
 *     - rear-3-4/
 *     - rear/
 *
 * PHOTOS (18 slot folders):
 *   src/assets/site-images/photos/{category}/{slot-name}/
 *
 * How it works:
 * 1. Drop your photo (with ANY filename, e.g. IMG_2026.jpg, photo.png, WhatsApp.jpeg)
 *    into the respective slot folder.
 * 2. Vite automatically discovers and bundles the file at build time.
 * 3. If a slot folder is empty, the website gracefully displays a luxury branded
 *    black & red Patel Automobiles placeholder.
 * 4. NEVER requires renaming files.
 */

// Eagerly discover all image files in src/assets/site-images/
const siteImageModules = import.meta.glob<{ default: string } | string>(
  '/src/assets/site-images/**/*.{webp,jpg,jpeg,png,avif,WEBP,JPG,JPEG,PNG,AVIF}',
  { eager: true }
);

interface ResolvedSlot {
  url: string;
  filename: string;
  slotPath: string;
}

// In-memory index of slot folder -> resolved image
const slotIndex = new Map<string, ResolvedSlot>();

// Populate slotIndex from the glob results
for (const [modulePath, moduleExport] of Object.entries(siteImageModules)) {
  // Example modulePath: "/src/assets/site-images/scooters/zelio/eeva/front-3-4/IMG_123.jpg"
  const cleanPath = modulePath.replace(/^\/src\/assets\/site-images\//, '');
  const lastSlash = cleanPath.lastIndexOf('/');
  if (lastSlash === -1) continue;

  const folderPath = cleanPath.substring(0, lastSlash).toLowerCase();
  const filename = cleanPath.substring(lastSlash + 1);

  // Extract resolved URL string
  let url = '';
  if (typeof moduleExport === 'string') {
    url = moduleExport;
  } else if (moduleExport && typeof moduleExport === 'object' && 'default' in moduleExport) {
    url = typeof moduleExport.default === 'string' ? moduleExport.default : '';
  }

  if (!url) continue;

  if (slotIndex.has(folderPath)) {
    const existing = slotIndex.get(folderPath)!;
    if (import.meta.env?.DEV) {
      console.warn(
        `[Patel Automobiles Image Slots] Multiple images found in slot folder "${folderPath}". ` +
        `Using "${existing.filename}" and ignoring "${filename}". ` +
        `Please keep only one image per slot folder.`
      );
    }
  } else {
    slotIndex.set(folderPath, {
      url,
      filename,
      slotPath: folderPath,
    });
  }
}

/**
 * Normalize any slot query path (e.g. "scooters/zelio/eeva/front-3-4" or "/photos/about/founder-pradeep-patel/")
 */
function normalizeSlotPath(rawPath: string): string {
  return rawPath
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '')
    .replace(/^src\/assets\/site-images\//, '');
}

/**
 * Get the resolved image URL for an image slot folder.
 * Returns null if no image has been placed into the folder.
 */
export function getSlotImage(slotPath: string): string | null {
  const normalized = normalizeSlotPath(slotPath);
  const resolved = slotIndex.get(normalized);
  return resolved ? resolved.url : null;
}

/**
 * Check if an image slot folder contains an uploaded image.
 */
export function hasSlotImage(slotPath: string): boolean {
  const normalized = normalizeSlotPath(slotPath);
  return slotIndex.has(normalized);
}

/**
 * Returns the resolved 4-angle scooter images for a model.
 * If an angle folder is empty, returns an empty string `""` so UI components
 * render the branded fallback placeholder.
 */
export function getScooterSlotImages(brand: string, slug: string) {
  const b = brand.toLowerCase();
  return {
    frontThreeQuarter: getSlotImage(`scooters/${b}/${slug}/front-3-4`) || '',
    side: getSlotImage(`scooters/${b}/${slug}/side`) || '',
    rearThreeQuarter: getSlotImage(`scooters/${b}/${slug}/rear-3-4`) || '',
    rear: getSlotImage(`scooters/${b}/${slug}/rear`) || '',
  };
}

/**
 * Returns the resolved image for a normal photo slot.
 */
export function getPhotoSlotImage(category: string, slotName: string): string | null {
  return getSlotImage(`photos/${category.toLowerCase()}/${slotName.toLowerCase()}`);
}

/**
 * Debug helper returning all discovered slots and whether they have an image uploaded.
 */
export function getAllDiscoveredSlots(): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [folder, item] of slotIndex.entries()) {
    result[folder] = item.filename;
  }
  return result;
}
