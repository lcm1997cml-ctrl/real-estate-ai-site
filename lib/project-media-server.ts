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
