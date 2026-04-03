/**
 * Data abstraction layer.
 *
 * Currently delegates to local mock data in data/projects.ts.
 *
 * To switch data sources without rewriting pages, replace the bodies below:
 *
 * ── Supabase ────────────────────────────────────────────────────────────────
 *   import { createClient } from "@supabase/supabase-js"
 *   const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
 *
 *   export async function getAllProjects() {
 *     const { data } = await supabase.from("projects").select("*").order("created_at")
 *     return (data ?? []) as Project[]
 *   }
 *
 * ── Google Sheets (via webhook) ─────────────────────────────────────────────
 *   export async function getAllProjects() {
 *     const res = await fetch(process.env.GOOGLE_SHEETS_JSON_URL!, { next: { revalidate: 3600 } })
 *     return (await res.json()) as Project[]
 *   }
 *
 * ── Adding real project data ─────────────────────────────────────────────────
 *   Edit data/projects.ts and add a new Project object following the existing
 *   structure. Place hero/gallery images in public/images/[slug]/ or use
 *   Unsplash URLs. Re-run `npm run build` to regenerate static pages.
 */

import { projects as localProjects } from "@/data/projects";
import type { Project } from "@/types/project";

export type { Project };

/** Return all projects, ordered as defined in the data source. */
export async function getAllProjects(): Promise<Project[]> {
  return localProjects;
}

/** Return a single project by slug, or undefined if not found. */
export async function getProject(slug: string): Promise<Project | undefined> {
  return localProjects.find((p) => p.slug === slug);
}

/** Return the unique list of districts across all projects. */
export async function getDistricts(): Promise<string[]> {
  const all = await getAllProjects();
  return Array.from(new Set(all.map((p) => p.district)));
}
