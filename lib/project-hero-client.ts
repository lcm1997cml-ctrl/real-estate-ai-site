import type { Project } from "@/types/project";
import { isValidImagePath } from "@/lib/image-path-utils";

/**
 * Hero URL for Client Components (no fs). Expects `project.heroImage` to be pre-resolved
 * on the server (getProjects / getProjectBySlug use mergeHero + scan — see withListingHeroResolved).
 */
export function resolveProjectHeroForClient(project: Project): string {
  if (isValidImagePath(project.heroImage)) return project.heroImage;
  const fromGallery = project.galleryImages.find((img) => isValidImagePath(img));
  return fromGallery ?? "";
}
