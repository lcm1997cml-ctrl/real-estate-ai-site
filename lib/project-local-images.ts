import fs from "fs";
import path from "path";
import type { ProjectLocalImages } from "@/lib/project-local-images-types";

export type { ProjectLocalImages };

function toPublicUrl(slug: string, filename: string): string {
  return `/images/${slug}/${filename}`;
}

function isImageFilename(name: string): boolean {
  return /\.(jpe?g|png|webp)$/i.test(name);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Scan public/images/{slug}/ (sync, server-only). Safe if folder missing.
 */
export function scanLocalProjectImages(slug: string): ProjectLocalImages {
  const empty: ProjectLocalImages = {
    hero: null,
    neighborhood: [],
    floorplans: [],
    amenities: [],
    layouts: [],
    gallery: [],
  };

  const dir = path.join(process.cwd(), "public", "images", slug);
  if (!fs.existsSync(dir)) return empty;
  const st = fs.statSync(dir);
  if (!st.isDirectory()) return empty;

  const allFiles = fs.readdirSync(dir).filter((name) => {
    const fp = path.join(dir, name);
    try {
      return fs.statSync(fp).isFile() && isImageFilename(name);
    } catch {
      return false;
    }
  });

  const esc = escapeRegExp(slug);

  const heroCandidates = [
    `${slug}-hero.jpg`,
    `${slug}-hero.jpeg`,
    `${slug}-hero.png`,
    `${slug}-hero-new.jpg`,
    `${slug}-hero-new.jpeg`,
    `${slug}-hero-new.png`,
  ];
  let heroFile: string | null = null;
  for (const c of heroCandidates) {
    if (allFiles.includes(c)) {
      heroFile = c;
      break;
    }
  }

  const reNeighNum = new RegExp(`^${esc}-neighborhood-(\\d+)\\.(jpe?g|png|webp)$`, "i");
  const reNeighSingle = new RegExp(`^${esc}-neighborhood\\.(jpe?g|png|webp)$`, "i");
  const reFpNum = new RegExp(`^${esc}-floorplan-(\\d+)\\.(jpe?g|png|webp)$`, "i");
  const reFpSingle = new RegExp(`^${esc}-floorplan\\.(jpe?g|png|webp)$`, "i");
  const reAmen = new RegExp(`^${esc}-amenities-(\\d+)\\..+`, "i");
  const reLayoutJpg = new RegExp(`^${esc}-layout\\.jpe?g$`, "i");
  const reLayoutPng = new RegExp(`^${esc}-layout\\.png$`, "i");

  const consumed = new Set<string>();
  if (heroFile) consumed.add(heroFile);

  const neighborhoodsNum: { file: string; n: number }[] = [];
  const neighborhoodSingle: string[] = [];
  const floorplansNum: { file: string; n: number }[] = [];
  const floorplanSingle: string[] = [];
  const amenitiesNum: { file: string; n: number }[] = [];
  const layoutFiles: { file: string; pri: number }[] = [];

  for (const f of allFiles) {
    if (consumed.has(f)) continue;

    let m = f.match(reNeighNum);
    if (m) {
      neighborhoodsNum.push({ file: f, n: parseInt(m[1], 10) });
      consumed.add(f);
      continue;
    }
    m = f.match(reNeighSingle);
    if (m) {
      neighborhoodSingle.push(f);
      consumed.add(f);
      continue;
    }
    m = f.match(reFpNum);
    if (m) {
      floorplansNum.push({ file: f, n: parseInt(m[1], 10) });
      consumed.add(f);
      continue;
    }
    m = f.match(reFpSingle);
    if (m) {
      floorplanSingle.push(f);
      consumed.add(f);
      continue;
    }
    m = f.match(reAmen);
    if (m) {
      amenitiesNum.push({ file: f, n: parseInt(m[1], 10) });
      consumed.add(f);
      continue;
    }
    if (reLayoutJpg.test(f)) {
      layoutFiles.push({ file: f, pri: 0 });
      consumed.add(f);
      continue;
    }
    if (reLayoutPng.test(f)) {
      layoutFiles.push({ file: f, pri: 1 });
      consumed.add(f);
      continue;
    }
  }

  const others = allFiles.filter((f) => !consumed.has(f));

  neighborhoodsNum.sort((a, b) => a.n - b.n);
  const neighborhoodUrls = [
    ...neighborhoodsNum.map((t) => toPublicUrl(slug, t.file)),
    ...neighborhoodSingle.sort().map((f) => toPublicUrl(slug, f)),
  ];

  floorplansNum.sort((a, b) => a.n - b.n);
  const floorplanUrls = [
    ...floorplansNum.map((t) => toPublicUrl(slug, t.file)),
    ...floorplanSingle.sort().map((f) => toPublicUrl(slug, f)),
  ];

  amenitiesNum.sort((a, b) => a.n - b.n);
  const amenitiesUrls = amenitiesNum.map((t) => toPublicUrl(slug, t.file));

  layoutFiles.sort((a, b) => a.pri - b.pri);
  const layoutsUrls = layoutFiles.map((t) => toPublicUrl(slug, t.file));

  const othersUrls = others.sort().map((f) => toPublicUrl(slug, f));

  const gallery = [...new Set([...amenitiesUrls, ...layoutsUrls, ...othersUrls])];

  return {
    hero: heroFile ? toPublicUrl(slug, heroFile) : null,
    neighborhood: neighborhoodUrls,
    floorplans: floorplanUrls,
    amenities: amenitiesUrls,
    layouts: layoutsUrls,
    gallery,
  };
}
