export type UnitType = {
  name: string;
  area: string;
  priceFrom: string;
  layout: string;
  tag?: string;
  areaSqft?: number;
  priceMin?: number;
  pricePsf?: number;
  description?: string;
  sortOrder?: number;
};

export type Facility = {
  category: string;
  name: string;
  distance: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type ArticleItem = {
  slug:
    | "investment-analysis"
    | "first-time-buyer"
    | "pricing-breakdown"
    | "rental-yield"
    | "district-development"
    | "compare-nearby-projects"
    | "pros-cons"
    | "case-study"
    | "faq-guide"
    | "get-price-list";
  title: string;
  description: string;
};

/** Who this project is best suited for. */
export type Suitability = {
  /** Short label, e.g. "首置", "投資", "換樓" */
  label: string;
  /** One-line reason why this audience fits. */
  reason: string;
};

export type Project = {
  id?: string;
  slug: string;
  name: string;
  district: string;
  subArea?: string;
  priceFrom: string;
  avgPricePerSqft: string;
  developer: string;
  status: string;
  tags: string[];
  heroImage: string;
  galleryImages: string[];
  highlights: string[];
  unitTypes: UnitType[];
  nearbyFacilities: Facility[];
  faq: FAQItem[];
  seoKeywords: string[];
  shortDescription: string;
  articles: ArticleItem[];
  /** Key selling points (pros). */
  pros?: string[];
  /** Drawbacks / risks. */
  cons?: string[];
  /** Target audience summary for the decision card. */
  suitability?: Suitability[];
  /** Per-project WhatsApp number (digits only). Falls back to NEXT_PUBLIC_WHATSAPP_NUMBER. */
  whatsappNumber?: string;
  /** Pre-filled WhatsApp message for this project. */
  whatsappMessage?: string;
  /** Floor plan image path for this project. */
  floorPlanImage?: string;
  /** Resolved floor plan image URLs (DB floorplan type + fallback). Used by 平面圖資料 section. */
  floorPlanImages?: string[];
  /** Neighborhood / surrounding area image path. */
  neighborhoodImage?: string;
  /** Neighborhood description paragraph(s). */
  neighborhoodDescription?: string;
};

export type LeadFormInput = {
  name: string;
  phone: string;
  whatsapp: string;
  budget: string;
  purpose: string;
  district: string;
  notes?: string;
};
