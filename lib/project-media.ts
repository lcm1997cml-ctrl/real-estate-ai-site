/**
 * Server-side project media (reads public/images via fs).
 * Do not import from Client Components — use @/lib/project-hero-client in carousel, etc.
 */
export type { ProjectLocalImages } from "@/lib/project-local-images-types";
export { scanLocalProjectImages } from "@/lib/project-local-images";
export {
  dedupImages,
  mergeDetailPageGallery,
  mergeFloorplanImages,
  mergeHero,
  mergeNeighborhoodImages,
} from "@/lib/project-media-merge";
export {
  resolveProjectGalleryImages,
  resolveProjectHeroImage,
  resolveProjectHeroWithLocal,
  resolveProjectNeighborhoodImage,
} from "@/lib/project-media-server";
