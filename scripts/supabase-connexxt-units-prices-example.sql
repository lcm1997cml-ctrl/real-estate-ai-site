-- CONNEXXT：為 project_units 補價（請將金額改為實際數字後執行）
-- 前提：public.project_units 已有 price_min、price_psf 欄位（見 supabase-schema-recommended.sql）

BEGIN;

UPDATE public.project_units SET price_min = NULL, price_psf = NULL, tag = NULL
WHERE project_slug = 'connexxt';

-- 以下為範例占位 — 請以貴司價單替換
UPDATE public.project_units SET price_min = 5000000, price_psf = 18000 WHERE project_slug = 'connexxt' AND type = '開放式';
UPDATE public.project_units SET price_min = 7200000, price_psf = 17500 WHERE project_slug = 'connexxt' AND type = '2房（開廚）';
UPDATE public.project_units SET price_min = 8800000, price_psf = 17200 WHERE project_slug = 'connexxt' AND type = '3房（開廚）';
UPDATE public.project_units SET price_min = 9000000, price_psf = 19500 WHERE project_slug = 'connexxt' AND type = '3房';
UPDATE public.project_units SET price_min = 10500000, price_psf = 17800 WHERE project_slug = 'connexxt' AND type = '3房1套（開廚）';
UPDATE public.project_units SET price_min = 15000000, price_psf = 16800 WHERE project_slug = 'connexxt' AND type = '3房1套連工人套';

COMMIT;
