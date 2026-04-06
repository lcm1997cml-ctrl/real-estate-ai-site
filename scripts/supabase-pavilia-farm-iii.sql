-- 柏傲莊 III（pavilia-farm-iii）— 僅更新此 slug，不影響其他樓盤
-- 不使用 ON CONFLICT (slug)；適用 slug 非唯一約束的 schema
-- 請在 Supabase SQL Editor 執行整段腳本。

BEGIN;

UPDATE public.projects SET
  name = '柏傲莊 III',
  english_name = 'The Pavilia Farm III',
  district = '大圍',
  sub_area = '車公廟',
  address = '車公廟路18號',
  developer = '新世界發展 / 港鐵',
  status = '出售中',
  handover_year = 2023,
  unit_count = 892,
  units_available = 364,
  units_sold = 358,
  size_min_sqft = 285,
  size_max_sqft = 1676,
  price_from = NULL,
  avg_price_per_sqft = NULL,
  price_psf_range = '17868 - 32152',
  summary = '柏傲莊III由新世界發展及港鐵合作發展，位於車公廟路18號，屬鐵路上蓋大型住宅項目，提供892伙。項目戶型涵蓋1房至4房，部分單位設套房及工人套，實用面積由285至1,676平方呎，適合不同家庭需要。',
  hero_image_url = '/images/pavilia-farm-iii/pavilia-farm-iii-hero.jpg',
  neighborhood_image = '/images/pavilia-farm-iii/pavilia-farm-iii-neighborhood.jpg',
  neighborhood_description = '項目位於大圍站上蓋，交通極為便利，連接東鐵線及屯馬線，快速往返港九新界。鄰近大型商場「圍方」及沙田新城市廣場，生活配套完善。區內設有多間中小學及國際學校，適合家庭客。同時鄰近城門河及多個休閒綠化空間，居住環境舒適。'
WHERE slug = 'pavilia-farm-iii';

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
SELECT
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
WHERE NOT EXISTS (
  SELECT 1 FROM public.projects p WHERE p.slug = 'pavilia-farm-iii'
);

DELETE FROM public.project_units
WHERE project_slug = 'pavilia-farm-iii';

INSERT INTO public.project_units (project_slug, type, sort_order, description)
VALUES
  ('pavilia-farm-iii', '1房 / 細2房', 1, '307 - 359 呎'),
  ('pavilia-farm-iii', '2房', 2, '452 - 534 呎'),
  ('pavilia-farm-iii', '3房', 3, '663 - 835 呎'),
  ('pavilia-farm-iii', '4房', 4, '991 - 1014 呎');

COMMIT;
