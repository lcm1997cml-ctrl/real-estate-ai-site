import { Project } from "@/types/project";

const LA_MIRABELLE_SLUG = "la-mirabelle";
const LA_MIRABELLE_HERO_NEW = "/images/la-mirabelle/la-mirabelle-hero-new.jpg";
const LA_MIRABELLE_HERO_OLD = "/images/la-mirabelle/la-mirabelle-hero.jpg";
const LA_MIRABELLE_NEIGHBORHOOD = "/images/la-mirabelle/la-mirabelle-neighborhood.jpg";
const LA_MIRABELLE_GALLERY = [
  LA_MIRABELLE_HERO_NEW,
  LA_MIRABELLE_HERO_OLD,
  "/images/la-mirabelle/la-mirabelle-amenities-1.jpg",
  "/images/la-mirabelle/la-mirabelle-amenities-2.jpg",
  "/images/la-mirabelle/la-mirabelle-amenities-3.jpg",
  "/images/la-mirabelle/la-mirabelle-floorplan.jpg",
  "/images/la-mirabelle/la-mirabelle-siteplan.jpg",
  LA_MIRABELLE_NEIGHBORHOOD,
];

const PAVILIA_FARM_III_SLUG = "pavilia-farm-iii";
const PAVILIA_FARM_III_HERO = "/images/pavilia-farm-iii/pavilia-farm-iii-hero.jpg";
const PAVILIA_FARM_III_NEIGHBORHOOD = "/images/pavilia-farm-iii/pavilia-farm-iii-neighborhood.jpg";
/** 實際檔名為 amenities-8.jpg.png，需用此路徑才可載入 */
const PAVILIA_FARM_III_GALLERY = [
  PAVILIA_FARM_III_HERO,
  "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-1.jpg",
  "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-2.jpg",
  "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-3.jpg",
  "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-4.jpg",
  "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-5.jpg",
  "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-6.jpg",
  "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-7.jpg",
  "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-8.jpg.png",
];

function isValidImagePath(path: string | undefined | null) {
  if (!path) return false;
  return path.startsWith("/") || path.startsWith("http://") || path.startsWith("https://");
}

function dedupImages(paths: string[]) {
  return Array.from(new Set(paths.filter((p) => isValidImagePath(p))));
}

export function resolveProjectHeroImage(project: Project) {
  if (project.slug === LA_MIRABELLE_SLUG) return LA_MIRABELLE_HERO_NEW;
  if (project.slug === PAVILIA_FARM_III_SLUG) return PAVILIA_FARM_III_HERO;
  if (isValidImagePath(project.heroImage)) return project.heroImage;
  const galleryFirst = project.galleryImages.find((img) => isValidImagePath(img));
  return galleryFirst ?? "";
}

export function resolveProjectGalleryImages(project: Project, galleryImagesFromDb: string[] = []) {
  if (project.slug === LA_MIRABELLE_SLUG) {
    return dedupImages([...galleryImagesFromDb, ...(project.galleryImages ?? []), ...LA_MIRABELLE_GALLERY]);
  }
  if (project.slug === PAVILIA_FARM_III_SLUG) {
    return dedupImages([...galleryImagesFromDb, ...(project.galleryImages ?? []), ...PAVILIA_FARM_III_GALLERY]);
  }
  return dedupImages([...galleryImagesFromDb, ...(project.galleryImages ?? [])]);
}

export function resolveProjectNeighborhoodImage(project: Project) {
  if (project.slug === LA_MIRABELLE_SLUG) return LA_MIRABELLE_NEIGHBORHOOD;
  if (project.slug === PAVILIA_FARM_III_SLUG) return PAVILIA_FARM_III_NEIGHBORHOOD;
  return isValidImagePath(project.neighborhoodImage) ? project.neighborhoodImage : "";
}
