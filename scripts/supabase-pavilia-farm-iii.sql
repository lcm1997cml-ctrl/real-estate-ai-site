-- 柏傲莊 III（pavilia-farm-iii）— 僅更新此 slug，不影響其他樓盤
-- 請在 Supabase SQL Editor 執行整段腳本。

BEGIN;

-- 1) projects：有則更新、無則插入（依 slug 唯一約束調整；若無 ON CONFLICT 請改為手動分開 INSERT/UPDATE）
INSERT INTO public.projects (
  slug,
  name,
  english_name,
  district,
  sub_area,
  address,
  developer,
  status,
  handover_year,
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
  'pavilia-farm-iii',
  '柏傲莊 III',
  'The Pavilia Farm III',
  '大圍',
  '車公廟',
  '車公廟路18號',
  '新世界發展 / 港鐵',
  '出售中',
  2023,
  892,
  364,
  358,
  285,
  1676,
  NULL,
  NULL,
  '17868 - 32152',
  '柏傲莊III由新世界發展及港鐵合作發展，位於車公廟路18號，屬鐵路上蓋大型住宅項目，提供892伙。項目戶型涵蓋1房至4房，部分單位設套房及工人套，實用面積由285至1,676平方呎，適合不同家庭需要。',
  '/images/pavilia-farm-iii/pavilia-farm-iii-hero.jpg',
  '/images/pavilia-farm-iii/pavilia-farm-iii-neighborhood.jpg',
  '項目位於大圍站上蓋，交通極為便利，連接東鐵線及屯馬線，快速往返港九新界。鄰近大型商場「圍方」及沙田新城市廣場，生活配套完善。區內設有多間中小學及國際學校，適合家庭客。同時鄰近城門河及多個休閒綠化空間，居住環境舒適。'
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  english_name = EXCLUDED.english_name,
  district = EXCLUDED.district,
  sub_area = EXCLUDED.sub_area,
  address = EXCLUDED.address,
  developer = EXCLUDED.developer,
  status = EXCLUDED.status,
  handover_year = EXCLUDED.handover_year,
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

-- 若 projects 表沒有 slug 的 UNIQUE 約束，請改用：
-- UPDATE public.projects SET ... WHERE slug = 'pavilia-farm-iii';
-- 若 affected rows = 0 再 INSERT。

-- 2) project_units：先刪除舊資料，再插入（使用 project_slug）
DELETE FROM public.project_units
WHERE project_slug = 'pavilia-farm-iii';

INSERT INTO public.project_units (project_slug, type, sort_order, description)
VALUES
  ('pavilia-farm-iii', '1房 / 細2房', 1, '307 - 359 呎'),
  ('pavilia-farm-iii', '2房', 2, '452 - 534 呎'),
  ('pavilia-farm-iii', '3房', 3, '663 - 835 呎'),
  ('pavilia-farm-iii', '4房', 4, '991 - 1014 呎');

-- 若貴司 schema 使用 project_id 而非 project_slug，請改為：
-- DELETE FROM public.project_units WHERE project_id = (SELECT id FROM public.projects WHERE slug = 'pavilia-farm-iii');
-- INSERT ... project_id, type, sort_order, description ...

COMMIT;

-- 注意：ON CONFLICT (slug) 需要 public.projects.slug 有 UNIQUE 或 PRIMARY KEY。
-- 若執行報錯，請改用手動：
--   UPDATE public.projects SET ... WHERE slug = 'pavilia-farm-iii';
--   然後若 0 rows，再執行 INSERT（不含 ON CONFLICT）。
