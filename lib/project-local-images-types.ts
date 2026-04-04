/** Result of scanning public/images/{slug}/ (see project-local-images.ts). */
export type ProjectLocalImages = {
  hero: string | null;
  neighborhood: string[];
  floorplans: string[];
  amenities: string[];
  layouts: string[];
  /** amenities + layouts + other images not hero / neighborhood / floorplan */
  gallery: string[];
};
