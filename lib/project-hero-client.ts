import type { Project } from "@/types/project";
import { isValidImagePath } from "@/lib/image-path-utils";

/**
 * Hero URL for Client Components (no fs). Uses Supabase-merged project fields only.
 * Prefer local files on the server via resolveProjectHeroWithLocal on detail pages.
 */
export function resolveProjectHeroForClient(project: Project): string {
  if (isValidImagePath(project.heroImage)) return project.heroImage;
  const fromGallery = project.galleryImages.find((img) => isValidImagePath(img));
  return fromGallery ?? "";
}
