import type { Project } from "@/types/project";
import { isValidImagePath } from "@/lib/image-path-utils";
import type { ProjectLocalImages } from "@/lib/project-local-images-types";

const LA_MIRABELLE_SLUG = "la-mirabelle";
const LA_MIRABELLE_NEIGHBORHOOD = "/images/la-mirabelle/la-mirabelle-neighborhood.jpg";

/** When public/images/{slug}/ is missing or yields no gallery files, keep known lists. */
const LEGACY_GALLERY_FALLBACK: Record<string, string[]> = {
  [LA_MIRABELLE_SLUG]: [
    "/images/la-mirabelle/la-mirabelle-hero-new.jpg",
    "/images/la-mirabelle/la-mirabelle-hero.jpg",
    "/images/la-mirabelle/la-mirabelle-amenities-1.jpg",
    "/images/la-mirabelle/la-mirabelle-amenities-2.jpg",
    "/images/la-mirabelle/la-mirabelle-amenities-3.jpg",
    "/images/la-mirabelle/la-mirabelle-floorplan.jpg",
    "/images/la-mirabelle/la-mirabelle-siteplan.jpg",
    LA_MIRABELLE_NEIGHBORHOOD,
  ],
  "pavilia-farm-iii": [
    "/images/pavilia-farm-iii/pavilia-farm-iii-hero.jpg",
    "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-1.jpg",
    "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-2.jpg",
    "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-3.jpg",
    "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-4.jpg",
    "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-5.jpg",
    "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-6.jpg",
    "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-7.jpg",
    "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-8.jpg.png",
  ],
};

export function dedupImages(paths: string[]) {
  return Array.from(new Set(paths.filter((p) => isValidImagePath(p))));
}

/** DB / Storage 路徑優先，本機 public/images 僅作補底（與 CMS 單一來源一致） */
export function mergeHero(project: Project, local: ProjectLocalImages): string {
  if (isValidImagePath(project.heroImage)) return project.heroImage;
  const fromGallery = project.galleryImages.find((img) => isValidImagePath(img));
  if (fromGallery) return fromGallery;
  if (local.hero) return local.hero;
  return "";
}

export function mergeFloorplanImages(project: Project, local: ProjectLocalImages): string[] {
  const fp = project.floorPlanImages;
  if (fp && fp.length > 0) return [...fp];
  const one = project.floorPlanImage;
  if (isValidImagePath(one)) return [String(one)];
  if (local.floorplans.length > 0) return [...local.floorplans];
  return [];
}

export function mergeNeighborhoodImages(project: Project, local: ProjectLocalImages): string[] {
  const n = project.neighborhoodImage;
  if (isValidImagePath(n)) return [String(n)];
  if (local.neighborhood.length > 0) return [...local.neighborhood];
  return [];
}

export function mergeDetailPageGallery(project: Project, local: ProjectLocalImages): string[] {
  const hero = mergeHero(project, local);
  const floorSet = new Set(mergeFloorplanImages(project, local));
  const neighSet = new Set(mergeNeighborhoodImages(project, local));
  const seen = new Set<string>();
  if (hero) seen.add(hero);
  for (const u of floorSet) seen.add(u);
  for (const u of neighSet) seen.add(u);

  const out: string[] = [];
  for (const u of project.galleryImages ?? []) {
    if (!u || seen.has(u)) continue;
    if (!isValidImagePath(u)) continue;
    out.push(u);
    seen.add(u);
  }
  for (const u of local.gallery) {
    if (!seen.has(u) && isValidImagePath(u)) {
      out.push(u);
      seen.add(u);
    }
  }
  if (out.length === 0) {
    const legacy = LEGACY_GALLERY_FALLBACK[project.slug];
    if (legacy) {
      for (const u of legacy) {
        if (!seen.has(u) && isValidImagePath(u)) {
          out.push(u);
          seen.add(u);
        }
      }
    }
  }

  return dedupImages(out);
}
