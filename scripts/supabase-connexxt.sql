-- CONNEXXT 薈悅（connexxt）— 僅更新此 slug，不影響其他樓盤
-- 請在 Supabase SQL Editor 執行整段腳本。
--
-- 說明：
-- • projects 使用與 pavilia-farm-iii 腳本相同的欄位集合；english_name / handover_year / floors
--   若表上不存在，會由下方 DO 區塊略過，不會報錯。
-- • project_units：先 DELETE project_slug = 'connexxt'，再 INSERT；size 範圍存入 description。

BEGIN;

-- 1) projects：核心欄位（不含 english_name、handover_year、floors，避免舊 schema 缺欄報錯）
INSERT INTO public.projects (
  slug,
  name,
  district,
  sub_area,
  address,
  developer,
  status,
  unit_count,
  units_available,
  units_sold,
  size_min_sqft,
  size_max_sqft,
  price_from,
  avg_price_per_sqft,
  price_psf_range,
  summary,
  hero_image_url,
  neighborhood_image,
  neighborhood_description
)
VALUES (
  'connexxt',
  'CONNEXXT 薈悅',
  '九龍',
  '飛凰街',
  '九龍飛凰街33號',
  '未提供',
  '待售',
  195,
  NULL,
  NULL,
  200,
  679,
  NULL,
  NULL,
  NULL,
  'CONNEXXT 薈悅位於九龍飛凰街33號，提供195伙，戶型由開放式至三房一套連工人套，實用面積由200至679平方呎。',
  NULL,
  NULL,
  NULL
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  district = EXCLUDED.district,
  sub_area = EXCLUDED.sub_area,
  address = EXCLUDED.address,
  developer = EXCLUDED.developer,
  status = EXCLUDED.status,
  unit_count = EXCLUDED.unit_count,
  units_available = EXCLUDED.units_available,
  units_sold = EXCLUDED.units_sold,
  size_min_sqft = EXCLUDED.size_min_sqft,
  size_max_sqft = EXCLUDED.size_max_sqft,
  price_from = EXCLUDED.price_from,
  avg_price_per_sqft = EXCLUDED.avg_price_per_sqft,
  price_psf_range = EXCLUDED.price_psf_range,
  summary = EXCLUDED.summary,
  hero_image_url = EXCLUDED.hero_image_url,
  neighborhood_image = EXCLUDED.neighborhood_image,
  neighborhood_description = EXCLUDED.neighborhood_description;

-- 1b) 可選欄位：僅在欄位存在時更新（避免 schema 無該欄時報錯）
DO $opt$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns c
    WHERE c.table_schema = 'public'
      AND c.table_name = 'projects'
      AND c.column_name = 'english_name'
  ) THEN
    EXECUTE $q$
      UPDATE public.projects
      SET english_name = 'CONNEXXT'
      WHERE slug = 'connexxt'
    $q$;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns c
    WHERE c.table_schema = 'public'
      AND c.table_name = 'projects'
      AND c.column_name = 'handover_year'
  ) THEN
    EXECUTE $q$
      UPDATE public.projects
      SET handover_year = 2026
      WHERE slug = 'connexxt'
    $q$;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns c
    WHERE c.table_schema = 'public'
      AND c.table_name = 'projects'
      AND c.column_name = 'floors'
  ) THEN
    EXECUTE $q$
      UPDATE public.projects
      SET floors = 19
      WHERE slug = 'connexxt'
    $q$;
  END IF;
END
$opt$;

-- 2) project_units：先刪除再插入
DELETE FROM public.project_units
WHERE project_slug = 'connexxt';

INSERT INTO public.project_units (project_slug, type, sort_order, description)
VALUES
  ('connexxt', '開放式', 1, '200-209 呎'),
  ('connexxt', '2房（開廚）', 2, '324-376 呎'),
  ('connexxt', '3房（開廚）', 3, '400-472 呎'),
  ('connexxt', '3房', 4, '462 呎'),
  ('connexxt', '3房1套（開廚）', 5, '481-520 呎'),
  ('connexxt', '3房1套連工人套', 6, '666-679 呎');

COMMIT;

-- 注意：ON CONFLICT (slug) 需要 public.projects.slug 有 UNIQUE 或 PRIMARY KEY。
-- 若貴司 schema 使用 project_id 而非 project_slug 於 project_units，請改為：
-- DELETE FROM public.project_units WHERE project_id = (SELECT id FROM public.projects WHERE slug = 'connexxt');
-- INSERT ... project_id, type, sort_order, description ...
