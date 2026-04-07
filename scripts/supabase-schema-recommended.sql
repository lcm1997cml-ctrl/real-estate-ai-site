-- 推薦結構（與前端 lib/supabase-data.ts 對齊）
-- 請在 Supabase SQL Editor 依實際情況調整；此檔為參考，非自動遷移。

-- ---------------------------------------------------------------------------
-- projects：樓盤主檔
-- ---------------------------------------------------------------------------
-- 建議欄位（名稱已對應 normalizeProjectFromSupabase）：
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid()
--   slug text NOT NULL UNIQUE
--   name, district, sub_area, address, developer, status
--   price_from numeric, avg_price_per_sqft numeric, price_psf_range text
--   summary text, short_description text
--   hero_image_url text, hero_image text
--   gallery_images jsonb 或 text[]
--   highlights jsonb 或 text[]
--   seo_keywords text[]
--   whatsapp_number text, whatsapp_message text
--   floor_plan_image, neighborhood_image, neighborhood_description text
--   tags text[]

-- ---------------------------------------------------------------------------
-- project_units：戶型與價（前端 getProjectUnits）
-- ---------------------------------------------------------------------------
-- 建議欄位：
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid()
--   project_slug text NOT NULL REFERENCES projects(slug) ON DELETE CASCADE
--   type text NOT NULL
--   sort_order int
--   description text          -- 面積文案，如「200-209 呎」
--   area_sqft numeric         -- 可選
--   price_min numeric         -- 最低入場價（港元）
--   price_psf numeric         -- 呎價
--   tag text                  -- 可選

-- 若缺欄位可新增：
--   ALTER TABLE public.project_units ADD COLUMN IF NOT EXISTS price_min numeric;
--   ALTER TABLE public.project_units ADD COLUMN IF NOT EXISTS price_psf numeric;
--   ALTER TABLE public.project_units ADD COLUMN IF NOT EXISTS tag text;

-- ---------------------------------------------------------------------------
-- project_images：圖片（前端 getProjectImageAssets）
-- ---------------------------------------------------------------------------
--   project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE
--   image_url text NOT NULL
--   image_type text NOT NULL   -- 小寫建議：hero, banner, floorplan, neighborhood,
--                               -- nearby, surroundings, amenities, gallery, layout, siteplan
--   sort_order int DEFAULT 0

-- ---------------------------------------------------------------------------
-- 範例：CONNEXXT 寫入戶型價格（請改為實際數字）
-- ---------------------------------------------------------------------------
/*
UPDATE public.project_units SET price_min = 5000000, price_psf = 18000, tag = '入門'
WHERE project_slug = 'connexxt' AND type = '開放式';
*/
