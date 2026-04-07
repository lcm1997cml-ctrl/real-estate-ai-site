import type { Project } from "@/types/project";
import { scanLocalProjectImages } from "@/lib/project-local-images";
import {
  dedupImages,
  mergeDetailPageGallery,
  mergeFloorplanImages,
  mergeHero,
  mergeNeighborhoodImages,
} from "@/lib/project-media-merge";

/** Detail / listing server paths: local folder first, then merged project fields. */
export function resolveProjectHeroWithLocal(project: Project): string {
  const local = scanLocalProjectImages(project.slug);
  return mergeHero(project, local);
}

export function resolveProjectHeroImage(project: Project): string {
  return resolveProjectHeroWithLocal(project);
}

export function resolveProjectGalleryImages(
  project: Project,
  galleryImagesFromDb: string[] = [],
): string[] {
  const local = scanLocalProjectImages(project.slug);
  const withDb: Project = {
    ...project,
    galleryImages: dedupImages([...(project.galleryImages ?? []), ...galleryImagesFromDb]),
  };
  return mergeDetailPageGallery(withDb, local);
}

export function resolveProjectNeighborhoodImage(project: Project): string {
  const local = scanLocalProjectImages(project.slug);
  return mergeNeighborhoodImages(project, local)[0] ?? "";
}

/**
 * 列表／輪播／卡片：與詳情頁相同順序 — mergeHero（本機 public/images/{slug}/*-hero* → DB hero → gallery 首張）。
 * 寫入 `heroImage` 後，Client（如 ProjectCarousel）只靠 `project.heroImage` 即可與 ProjectCard 一致。
 */
export function withListingHeroResolved(project: Project): Project {
  const local = scanLocalProjectImages(project.slug);
  return { ...project, heroImage: mergeHero(project, local) };
}

export function withListingHeroResolvedAll(projects: Project[]): Project[] {
  return projects.map(withListingHeroResolved);
}
