import { projects as fallbackProjects } from "@/data/projects";
import { FAQItem, Project } from "@/types/project";
import { supabase } from "@/lib/supabase";
import { formatPrice, formatPSF } from "@/lib/price";

const LA_MIRABELLE_HERO = "/images/la-mirabelle/la-mirabelle-hero-new.jpg";
const LA_MIRABELLE_OLD_HERO = "/images/la-mirabelle/la-mirabelle-hero.jpg";
const LA_MIRABELLE_NEIGHBORHOOD = "/images/la-mirabelle/la-mirabelle-neighborhood.jpg";
const LA_MIRABELLE_GALLERY_FALLBACK = [
  LA_MIRABELLE_HERO,
  LA_MIRABELLE_OLD_HERO,
  "/images/la-mirabelle/la-mirabelle-amenities-1.jpg",
  "/images/la-mirabelle/la-mirabelle-amenities-2.jpg",
  "/images/la-mirabelle/la-mirabelle-amenities-3.jpg",
  "/images/la-mirabelle/la-mirabelle-floorplan.jpg",
  "/images/la-mirabelle/la-mirabelle-siteplan.jpg",
];
const LA_MIRABELLE_NEIGHBORHOOD_DESCRIPTION = `海瑅灣 La Mirabelle 位於港鐵康城站的大型生活社區，匯聚自然綠韻與生活便利。項目坐享日出康城內超過130萬呎綠化休憩園地，並毗鄰延綿至將軍澳南的海濱長廊及環保大道上的大型寵物公園，生活環境開揚舒適。`;
const LA_MIRABELLE_NEIGHBORHOOD_DESCRIPTION_2 = `鄰近大型購物商場「The LOHAS 康城」，面積約48萬平方呎，匯聚近150個商戶，涵蓋零售、餐飲、戲院及溜冰場等設施，日常生活與休閒娛樂一應俱全。同時區內學校資源豐富，包括中小學及國際學校，適合上車客、自住家庭及長線置業人士。`;

const PAVILIA_FARM_III_HERO = "/images/pavilia-farm-iii/pavilia-farm-iii-hero.jpg";
const PAVILIA_FARM_III_NEIGHBORHOOD = "/images/pavilia-farm-iii/pavilia-farm-iii-neighborhood.jpg";
const PAVILIA_FARM_III_GALLERY_FALLBACK = [
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

function isUsableImagePath(path: string) {
  if (!path) return false;
  if (path.startsWith("http://") || path.startsWith("https://")) return true;
  return path.startsWith("/");
}

const LA_MIRABELLE_UNITS = [
  {
    name: "1房",
    tag: "入門上車",
    areaSqft: 360,
    priceMin: 5934700,
    pricePsf: 16480,
    description: "入門級上車之選，適合單身或投資收租",
    sortOrder: 1,
  },
  {
    name: "2房",
    tag: "主流戶型",
    areaSqft: 452,
    priceMin: 7053300,
    pricePsf: 15605,
    description: "最平2房入場單位，性價比高",
    sortOrder: 2,
  },
  {
    name: "2房",
    tag: "標準戶型",
    areaSqft: 458,
    priceMin: 7542800,
    pricePsf: 16469,
    description: "實用間隔，適合小家庭",
    sortOrder: 3,
  },
  {
    name: "2房半",
    tag: "2+1房",
    areaSqft: 558,
    priceMin: 8874800,
    pricePsf: 15905,
    description: "2房加書房，可靈活作細房或工作空間",
    sortOrder: 4,
  },
  {
    name: "2房",
    tag: "高端戶型",
    areaSqft: 472,
    priceMin: 8381000,
    pricePsf: 17758,
    description: "高呎價戶型，適合追求景觀及質素買家",
    sortOrder: 5,
  },
];

/** e.g. "17868 - 32152" → HK$17,868 – HK$32,152 / 呎 */
function formatPricePsfRangeLabel(range: unknown): string | null {
  if (range == null || typeof range !== "string") return null;
  const parts = range.split("-").map((s) => s.trim()).filter(Boolean);
  if (parts.length !== 2) return null;
  const low = Number(parts[0]);
  const high = Number(parts[1]);
  if (!Number.isFinite(low) || !Number.isFinite(high)) return null;
  return `HK$${low.toLocaleString("en-HK")} – HK$${high.toLocaleString("en-HK")} / 呎`;
}

function normalizeProjectFromSupabase(row: Record<string, unknown>): Project {
  const slug = String(row.slug ?? "");
  const priceFromNum = Number(row.price_from ?? 0);
  const psfNum = Number(row.avg_price_per_sqft ?? 0);
  const psfRangeLabel = formatPricePsfRangeLabel(row.price_psf_range);
  const gallery = Array.isArray(row.gallery_images)
    ? row.gallery_images.map((img) => String(img))
    : [];

  const heroPath = String(row.hero_image_url ?? row.hero_image ?? "");
  return {
    id: String(row.id ?? ""),
    slug,
    name: String(row.name ?? "未命名樓盤"),
    district: String(row.district ?? ""),
    subArea: String(row.sub_area ?? "") || undefined,
    priceFrom:
      priceFromNum > 0
        ? formatPrice(priceFromNum)
        : slug === "pavilia-farm-iii" || slug === "connexxt"
          ? "-"
          : "HK$0",
    avgPricePerSqft:
      psfNum > 0
        ? formatPSF(psfNum)
        : psfRangeLabel ??
          (slug === "pavilia-farm-iii" || slug === "connexxt" ? "-" : "HK$0 / 呎"),
    developer: String(row.developer ?? "未提供"),
    status: String(row.status ?? "資料更新中"),
    tags: Array.isArray(row.tags) ? row.tags.map((tag) => String(tag)) : [],
    heroImage: isUsableImagePath(heroPath) ? heroPath : "",
    galleryImages: gallery,
    highlights: Array.isArray(row.highlights) ? row.highlights.map((h) => String(h)) : [],
    unitTypes: [],
    nearbyFacilities: [],
    faq: [],
    seoKeywords: Array.isArray(row.seo_keywords) ? row.seo_keywords.map((k) => String(k)) : [],
    shortDescription: String(row.summary ?? row.short_description ?? ""),
    articles: [],
    whatsappNumber: String(row.whatsapp_number ?? "") || undefined,
    whatsappMessage: String(row.whatsapp_message ?? "") || undefined,
    floorPlanImage: String(row.floor_plan_image ?? "") || undefined,
    neighborhoodImage: String(row.neighborhood_image ?? "") || undefined,
    neighborhoodDescription: String(row.neighborhood_description ?? "") || undefined,
  };
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase.from("projects").select("*");

  if (error) {
    console.error("[Supabase] getProjects error:", error);
    return fallbackProjects;
  }

  if (!data || data.length === 0) {
    console.log("[Supabase] getProjects empty, fallback to local data");
    return fallbackProjects;
  }

  const normalized = data.map((row) => normalizeProjectFromSupabase(row as Record<string, unknown>));
  console.log(`[Supabase] getProjects success: ${normalized.length} rows`);
  return normalized;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  /** limit(1)：若 DB 誤存多筆相同 slug，避免 maybeSingle() 報錯而整段 fallback 到本地舊資料 */
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[Supabase] getProjectBySlug error:", error);
    return fallbackProjects.find((p) => p.slug === slug) ?? null;
  }

  if (!data) {
    console.log(`[Supabase] getProjectBySlug empty for slug=${slug}, fallback local`);
    return fallbackProjects.find((p) => p.slug === slug) ?? null;
  }

  const normalized = normalizeProjectFromSupabase(data as Record<string, unknown>);
  console.log(`[Supabase] getProjectBySlug success: ${slug}`);
  return normalized;
}

export async function getProjectImages(projectId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("project_images")
    .select("image_url, image_type, sort_order")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[Supabase] getProjectImages error:", error);
    return [];
  }

  const images = (data ?? [])
    .map((row) => String((row as { image_url?: unknown }).image_url ?? ""))
    .filter(Boolean);
  console.log(`[Supabase] getProjectImages success: ${images.length} rows for project=${projectId}`);
  return images;
}

async function getProjectImageAssets(projectId: string) {
  const { data, error } = await supabase
    .from("project_images")
    .select("image_url, image_type, sort_order")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[Supabase] getProjectImageAssets error:", error);
    return { hero: "", neighborhood: "", gallery: [] as string[], floorplans: [] as string[] };
  }

  const rows = (data ?? []).map((row) => {
    const r = row as { image_url?: unknown; image_type?: unknown };
    return {
      imageUrl: String(r.image_url ?? ""),
      imageType: String(r.image_type ?? "").toLowerCase(),
    };
  });

  const hero = rows.find((r) => r.imageType === "hero" || r.imageType === "banner")?.imageUrl ?? "";
  const neighborhood =
    rows.find((r) => ["neighborhood", "nearby", "surroundings"].includes(r.imageType))?.imageUrl ?? "";
  const gallery = rows
    .filter((r) => ["gallery", "amenities", "floorplan", "siteplan"].includes(r.imageType))
    .map((r) => r.imageUrl)
    .filter(Boolean);
  const floorplans = rows
    .filter((r) => r.imageType === "floorplan")
    .map((r) => r.imageUrl)
    .filter(Boolean);

  return { hero, neighborhood, gallery, floorplans };
}

export async function getProjectUnits(projectSlug: string) {
  const { data, error } = await supabase
    .from("project_units")
    .select("type, tag, area_sqft, price_min, price_psf, description, sort_order")
    .eq("project_slug", projectSlug)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[Supabase] getProjectUnits error:", error);
    if (projectSlug === "la-mirabelle") return LA_MIRABELLE_UNITS;
    return [];
  }

  const units = (data ?? []).map((row) => {
    const item = row as {
      type?: unknown;
      tag?: unknown;
      area_sqft?: unknown;
      price_min?: unknown;
      price_psf?: unknown;
      description?: unknown;
      sort_order?: unknown;
    };
    const areaSqft = Number(item.area_sqft ?? 0);
    const priceMin = Number(item.price_min ?? 0);
    const pricePsf = Number(item.price_psf ?? 0);
    const rawDesc = String(item.description ?? "").trim();
    const descAsArea = /呎/.test(rawDesc) ? rawDesc : "";
    const areaText = descAsArea || (areaSqft > 0 ? `${areaSqft} 呎` : rawDesc || "—");
    const layoutText = descAsArea ? "" : rawDesc;
    return {
      name: String(item.type ?? ""),
      tag: String(item.tag ?? ""),
      areaSqft,
      area: areaText,
      priceMin,
      priceFrom: priceMin > 0 ? `HK$${priceMin.toLocaleString("en-HK")}` : "-",
      pricePsf,
      layout: layoutText,
      description: layoutText || rawDesc,
      sortOrder: Number(item.sort_order ?? 0),
    };
  });

  if (units.length === 0 && projectSlug === "la-mirabelle") {
    console.log("[Supabase] getProjectUnits empty for la-mirabelle, fallback local units");
    return LA_MIRABELLE_UNITS.map((u) => ({
      ...u,
      area: `${u.areaSqft} 呎`,
      priceFrom: `HK$${u.priceMin.toLocaleString()}`,
      layout: u.description,
    }));
  }

  console.log(`[Supabase] getProjectUnits success: ${units.length} rows for slug=${projectSlug}`);
  return units;
}

export async function getProjectDetailBySlug(slug: string): Promise<Project | null> {
  const supabaseProject = await getProjectBySlug(slug);
  if (!supabaseProject) return null;

  // Supabase lookup failed or slug missing -> already fallback project
  if (!supabaseProject.id || !supabaseProject.id.trim()) {
    const fp = supabaseProject.floorPlanImage;
    return {
      ...supabaseProject,
      floorPlanImages: fp && isUsableImagePath(fp) ? [fp] : [],
    };
  }

  const [images, highlights, faqs, units] = await Promise.all([
    getProjectImages(supabaseProject.id),
    getProjectHighlights(supabaseProject.id),
    getProjectFaqs(supabaseProject.id),
    getProjectUnits(slug),
  ]);
  const imageAssets = await getProjectImageAssets(supabaseProject.id);

  const unitTypes = units.map((u) => {
    const row = u as {
      name: string;
      tag?: string;
      areaSqft?: number;
      area?: string;
      priceMin?: number;
      pricePsf?: number;
      description?: string;
      layout?: string;
      sortOrder?: number;
    };
    const areaSqft = Number(row.areaSqft ?? 0);
    const areaText =
      row.area && row.area !== "—" ? row.area : areaSqft > 0 ? `${areaSqft} 呎` : "—";
    const priceMin = Number(row.priceMin ?? 0);
    const layoutText = String(row.layout ?? row.description ?? "");
    return {
      name: String(row.name),
      tag: String(row.tag ?? ""),
      areaSqft,
      area: areaText,
      priceMin,
      priceFrom: formatPrice(priceMin),
      pricePsf: Number(row.pricePsf ?? 0),
      description: String(row.description ?? ""),
      layout: layoutText,
      sortOrder: Number(row.sortOrder ?? 0),
    };
  });

  const fallbackProject = fallbackProjects.find((p) => p.slug === slug);
  /** Supabase 有戶型資料則只用 DB；僅 la-mirabelle 保留本地 TS 後備（與 getProjectUnits 特例一致） */
  const mergedUnitTypes =
    unitTypes.length > 0
      ? unitTypes
      : slug === "la-mirabelle"
        ? (fallbackProject?.unitTypes ?? [])
        : [];

  const priceMins = mergedUnitTypes.map((u) => u.priceMin ?? 0).filter((n) => n > 0);
  const psfVals = mergedUnitTypes.map((u) => u.pricePsf ?? 0).filter((n) => n > 0);
  const minPrice = priceMins.length > 0 ? Math.min(...priceMins) : 0;
  const minPsf = psfVals.length > 0 ? Math.min(...psfVals) : 0;

  const floorplansFromDb = imageAssets.floorplans.filter(isUsableImagePath);
  const finalFloorPlanImages: string[] =
    floorplansFromDb.length > 0
      ? floorplansFromDb
      : isUsableImagePath(supabaseProject.floorPlanImage ?? "")
        ? [String(supabaseProject.floorPlanImage)]
        : fallbackProject?.floorPlanImage && isUsableImagePath(fallbackProject.floorPlanImage)
          ? [fallbackProject.floorPlanImage]
          : [];

  const mergedGallery = Array.from(
    new Set(
      [
        ...(supabaseProject.galleryImages ?? []),
        ...imageAssets.gallery,
        ...images,
        ...(slug === "la-mirabelle" ? LA_MIRABELLE_GALLERY_FALLBACK : []),
        ...(slug === "pavilia-farm-iii" ? PAVILIA_FARM_III_GALLERY_FALLBACK : []),
      ].filter((path) => isUsableImagePath(path)),
    ),
  );
  /** DB / project_images 優先，硬編碼預設圖僅作最後後備（避免 Supabase 更新 hero 仍被蓋掉） */
  const finalHeroForLaMirabelle =
    (isUsableImagePath(imageAssets.hero) ? imageAssets.hero : "") ||
    (isUsableImagePath(supabaseProject.heroImage) ? supabaseProject.heroImage : "") ||
    (isUsableImagePath(LA_MIRABELLE_HERO) ? LA_MIRABELLE_HERO : "") ||
    LA_MIRABELLE_OLD_HERO;

  const finalHero =
    slug === "la-mirabelle"
      ? finalHeroForLaMirabelle
      : slug === "pavilia-farm-iii"
        ? (isUsableImagePath(imageAssets.hero) ? imageAssets.hero : "") ||
          (isUsableImagePath(supabaseProject.heroImage) ? supabaseProject.heroImage : "") ||
          PAVILIA_FARM_III_HERO
        : (isUsableImagePath(imageAssets.hero) ? imageAssets.hero : "") ||
          (isUsableImagePath(supabaseProject.heroImage) ? supabaseProject.heroImage : "");
  const finalGallery =
    slug === "la-mirabelle" || slug === "pavilia-farm-iii"
      ? mergedGallery
      : mergedGallery.length > 0
        ? mergedGallery
        : supabaseProject.galleryImages;

  if (slug === "la-mirabelle") {
    console.log(`[ImageMapping][la-mirabelle] final hero: ${finalHero}`);
    console.log(`[ImageMapping][la-mirabelle] final gallery count: ${finalGallery.length}`);
    console.log("[ImageMapping][la-mirabelle] final gallery paths:", finalGallery);
  }

  return {
    ...supabaseProject,
    heroImage: finalHero,
    neighborhoodImage:
      (isUsableImagePath(imageAssets.neighborhood) ? imageAssets.neighborhood : "") ||
      (isUsableImagePath(supabaseProject.neighborhoodImage ?? "") ? supabaseProject.neighborhoodImage : "") ||
      (slug === "la-mirabelle"
        ? LA_MIRABELLE_NEIGHBORHOOD
        : slug === "pavilia-farm-iii"
          ? PAVILIA_FARM_III_NEIGHBORHOOD
          : undefined),
    neighborhoodDescription:
      supabaseProject.neighborhoodDescription ||
      (slug === "la-mirabelle"
        ? `${LA_MIRABELLE_NEIGHBORHOOD_DESCRIPTION}\n\n${LA_MIRABELLE_NEIGHBORHOOD_DESCRIPTION_2}`
        : undefined),
    galleryImages: finalGallery,
    highlights: highlights.length > 0 ? highlights : supabaseProject.highlights,
    faq: faqs.length > 0 ? faqs : supabaseProject.faq,
    unitTypes: mergedUnitTypes,
    priceFrom: minPrice > 0 ? formatPrice(minPrice) : supabaseProject.priceFrom,
    avgPricePerSqft: minPsf > 0 ? formatPSF(minPsf) : supabaseProject.avgPricePerSqft,
    floorPlanImages: finalFloorPlanImages,
  };
}

export async function getProjectHighlights(projectId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("project_highlights")
    .select("content, sort_order")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[Supabase] getProjectHighlights error:", error);
    return [];
  }

  const highlights = (data ?? [])
    .map((row) => String((row as { content?: unknown }).content ?? ""))
    .filter(Boolean);
  console.log(
    `[Supabase] getProjectHighlights success: ${highlights.length} rows for project=${projectId}`,
  );
  return highlights;
}

export async function getProjectFaqs(projectId: string): Promise<FAQItem[]> {
  const { data, error } = await supabase
    .from("project_faqs")
    .select("question, answer, sort_order")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[Supabase] getProjectFaqs error:", error);
    return [];
  }

  const faqs = (data ?? [])
    .map((row) => {
      const item = row as { question?: unknown; answer?: unknown };
      return {
        question: String(item.question ?? ""),
        answer: String(item.answer ?? ""),
      };
    })
    .filter((item) => item.question && item.answer);
  console.log(`[Supabase] getProjectFaqs success: ${faqs.length} rows for project=${projectId}`);
  return faqs;
}
