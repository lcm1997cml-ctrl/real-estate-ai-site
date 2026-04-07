-- CONNEXXT（slug = connexxt）— 僅更新網站實際會讀取的 projects 欄位
-- 不使用 ON CONFLICT；以 information_schema 判斷欄位是否存在，避免報錯
-- 流程：依欄位 UPDATE → 若無該 slug 則動態 INSERT → project_units DELETE + INSERT
-- 可為 NULL 的 json / array 欄位一律 SET col = NULL（不帶型別轉換），適用 jsonb、text[] 等

BEGIN;

-- ========== 1) 已存在列：逐欄 UPDATE ==========
DO $upd$
DECLARE
  v_slug constant text := 'connexxt';
BEGIN
  IF to_regclass('public.projects') IS NULL THEN
    RAISE EXCEPTION 'Table public.projects does not exist';
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'name') THEN
    EXECUTE 'UPDATE public.projects SET name = $1 WHERE slug = $2' USING 'CONNEXXT 薈悅', v_slug;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'district') THEN
    EXECUTE 'UPDATE public.projects SET district = $1 WHERE slug = $2' USING '九龍', v_slug;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'sub_area') THEN
    EXECUTE 'UPDATE public.projects SET sub_area = $1 WHERE slug = $2' USING '飛凰街', v_slug;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'address') THEN
    EXECUTE 'UPDATE public.projects SET address = $1 WHERE slug = $2' USING '九龍飛凰街33號', v_slug;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'developer') THEN
    EXECUTE 'UPDATE public.projects SET developer = $1 WHERE slug = $2' USING '未提供', v_slug;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'status') THEN
    EXECUTE 'UPDATE public.projects SET status = $1 WHERE slug = $2' USING '待售', v_slug;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'tags') THEN
    EXECUTE 'UPDATE public.projects SET tags = NULL WHERE slug = $1' USING v_slug;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'price_from') THEN
    EXECUTE 'UPDATE public.projects SET price_from = $1 WHERE slug = $2' USING NULL::numeric, v_slug;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'avg_price_per_sqft') THEN
    EXECUTE 'UPDATE public.projects SET avg_price_per_sqft = $1 WHERE slug = $2' USING NULL::numeric, v_slug;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'price_psf_range') THEN
    EXECUTE 'UPDATE public.projects SET price_psf_range = $1 WHERE slug = $2' USING NULL::text, v_slug;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'gallery_images') THEN
    EXECUTE 'UPDATE public.projects SET gallery_images = NULL WHERE slug = $1' USING v_slug;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'hero_image_url') THEN
    EXECUTE 'UPDATE public.projects SET hero_image_url = $1 WHERE slug = $2' USING '/images/connexxt/connexxt-hero.jpg', v_slug;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'hero_image') THEN
    EXECUTE 'UPDATE public.projects SET hero_image = $1 WHERE slug = $2' USING '/images/connexxt/connexxt-hero.jpg', v_slug;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'highlights') THEN
    EXECUTE 'UPDATE public.projects SET highlights = NULL WHERE slug = $1' USING v_slug;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'summary') THEN
    EXECUTE 'UPDATE public.projects SET summary = $1 WHERE slug = $2' USING
      'CONNEXXT 薈悅位於九龍飛凰街33號，提供195伙，戶型由開放式至三房一套連工人套，實用面積由200至679平方呎。', v_slug;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'short_description') THEN
    EXECUTE 'UPDATE public.projects SET short_description = $1 WHERE slug = $2' USING
      'CONNEXXT 薈悅位於九龍飛凰街33號，提供195伙，戶型由開放式至三房一套連工人套，實用面積由200至679平方呎。', v_slug;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'seo_keywords') THEN
    EXECUTE 'UPDATE public.projects SET seo_keywords = NULL WHERE slug = $1' USING v_slug;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'whatsapp_number') THEN
    EXECUTE 'UPDATE public.projects SET whatsapp_number = $1 WHERE slug = $2' USING NULL::text, v_slug;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'whatsapp_message') THEN
    EXECUTE 'UPDATE public.projects SET whatsapp_message = $1 WHERE slug = $2' USING NULL::text, v_slug;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'floor_plan_image') THEN
    EXECUTE 'UPDATE public.projects SET floor_plan_image = $1 WHERE slug = $2' USING NULL::text, v_slug;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'neighborhood_image') THEN
    EXECUTE 'UPDATE public.projects SET neighborhood_image = $1 WHERE slug = $2' USING '/images/connexxt/connexxt-neighborhood-1.jpg', v_slug;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'neighborhood_description') THEN
    EXECUTE 'UPDATE public.projects SET neighborhood_description = $1 WHERE slug = $2' USING '之後可再補', v_slug;
  END IF;
END
$upd$;

-- ========== 2) 若尚無 connexxt：動態 INSERT（僅含存在的欄位） ==========
DO $ins$
DECLARE
  v_slug constant text := 'connexxt';
  summary_txt constant text :=
    'CONNEXXT 薈悅位於九龍飛凰街33號，提供195伙，戶型由開放式至三房一套連工人套，實用面積由200至679平方呎。';
  col text;
  col_names text[] := ARRAY[]::text[];
  val_exprs text[] := ARRAY[]::text[];
  sql text;
  i int;
BEGIN
  IF EXISTS (SELECT 1 FROM public.projects WHERE slug = v_slug) THEN
    RETURN;
  END IF;

  FOREACH col IN ARRAY ARRAY[
    'slug', 'name', 'district', 'sub_area', 'address', 'developer', 'status', 'tags',
    'price_from', 'avg_price_per_sqft', 'price_psf_range', 'gallery_images',
    'hero_image_url', 'hero_image', 'highlights', 'summary', 'short_description',
    'seo_keywords', 'whatsapp_number', 'whatsapp_message', 'floor_plan_image',
    'neighborhood_image', 'neighborhood_description'
  ]
  LOOP
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns c
      WHERE c.table_schema = 'public' AND c.table_name = 'projects' AND c.column_name = col
    ) THEN
      CONTINUE;
    END IF;

    CASE col
      WHEN 'slug' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, quote_literal('connexxt'));
      WHEN 'name' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, quote_literal('CONNEXXT 薈悅'));
      WHEN 'district' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, quote_literal('九龍'));
      WHEN 'sub_area' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, quote_literal('飛凰街'));
      WHEN 'address' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, quote_literal('九龍飛凰街33號'));
      WHEN 'developer' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, quote_literal('未提供'));
      WHEN 'status' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, quote_literal('待售'));
      WHEN 'tags' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, 'NULL');
      WHEN 'price_from' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, 'NULL');
      WHEN 'avg_price_per_sqft' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, 'NULL');
      WHEN 'price_psf_range' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, 'NULL');
      WHEN 'gallery_images' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, 'NULL');
      WHEN 'hero_image_url' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, quote_literal('/images/connexxt/connexxt-hero.jpg'));
      WHEN 'hero_image' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, quote_literal('/images/connexxt/connexxt-hero.jpg'));
      WHEN 'highlights' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, 'NULL');
      WHEN 'summary' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, quote_literal(summary_txt));
      WHEN 'short_description' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, quote_literal(summary_txt));
      WHEN 'seo_keywords' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, 'NULL');
      WHEN 'whatsapp_number' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, 'NULL');
      WHEN 'whatsapp_message' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, 'NULL');
      WHEN 'floor_plan_image' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, 'NULL');
      WHEN 'neighborhood_image' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, quote_literal('/images/connexxt/connexxt-neighborhood-1.jpg'));
      WHEN 'neighborhood_description' THEN
        col_names := array_append(col_names, col);
        val_exprs := array_append(val_exprs, quote_literal('之後可再補'));
    END CASE;
  END LOOP;

  IF col_names IS NULL OR array_length(col_names, 1) IS NULL OR array_length(col_names, 1) = 0 THEN
    RAISE EXCEPTION 'No matching columns on public.projects for INSERT';
  END IF;

  IF array_length(col_names, 1) <> array_length(val_exprs, 1) THEN
    RAISE EXCEPTION 'Internal error: column/value count mismatch';
  END IF;

  sql := 'INSERT INTO public.projects (';
  FOR i IN 1 .. array_length(col_names, 1)
  LOOP
    IF i > 1 THEN sql := sql || ', '; END IF;
    sql := sql || quote_ident(col_names[i]);
  END LOOP;
  sql := sql || ') VALUES (';
  FOR i IN 1 .. array_length(val_exprs, 1)
  LOOP
    IF i > 1 THEN sql := sql || ', '; END IF;
    sql := sql || val_exprs[i];
  END LOOP;
  sql := sql || ')';

  EXECUTE sql;
END
$ins$;

-- ========== 3) project_units：先刪後插 ==========
DO $units$
BEGIN
  IF to_regclass('public.project_units') IS NULL THEN
    RAISE NOTICE 'Skip project_units: table public.project_units not found';
    RETURN;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'project_units' AND column_name = 'project_slug'
  ) THEN
    RAISE NOTICE 'Skip project_units: column project_slug not found（若表僅有 project_id，請改以子查詢刪插）';
    RETURN;
  END IF;

  EXECUTE 'DELETE FROM public.project_units WHERE project_slug = $1' USING 'connexxt';

  INSERT INTO public.project_units (project_slug, type, sort_order, description)
  VALUES
    ('connexxt', '開放式', 1, '200-209 呎'),
    ('connexxt', '2房（開廚）', 2, '324-376 呎'),
    ('connexxt', '3房（開廚）', 3, '400-472 呎'),
    ('connexxt', '3房', 4, '462 呎'),
    ('connexxt', '3房1套（開廚）', 5, '481-520 呎'),
    ('connexxt', '3房1套連工人套', 6, '666-679 呎');
  -- 入場價／呎價請在表內有 price_min、price_psf 後執行 scripts/supabase-connexxt-units-prices-example.sql
END
$units$;

COMMIT;
