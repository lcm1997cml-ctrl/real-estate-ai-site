# 香港一手樓盤 Lead Generation MVP

一個以香港新盤內容導向、收集潛在客戶查詢為核心嘅 Next.js MVP。  
風格定位為高級、簡潔、可信，適合資料分析型地產內容網站快速複製去第二個樓盤專案。

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- shadcn/ui
- react-hook-form + zod
- lucide-react
- Deploy: Vercel

## 安裝與啟動

```bash
npm install
npm run dev
```

打開 `http://localhost:3000` 即可。

## 常用指令

```bash
npm run dev
npm run lint
npm run build
```

## 已包含頁面

- `/` 首頁
- `/project/[slug]` 樓盤主頁
- `/project/[slug]/investment-analysis`
- `/project/[slug]/first-time-buyer`
- `/project/[slug]/pricing-breakdown`
- `/project/[slug]/rental-yield`
- `/project/[slug]/district-development`
- `/project/[slug]/compare-nearby-projects`
- `/project/[slug]/pros-cons`
- `/project/[slug]/case-study`
- `/project/[slug]/faq-guide`
- `/project/[slug]/get-price-list`
- `/contact`
- `/get-latest-price`
- `/api/leads` (POST mock API)

## Mock Data 在邊度改

主要資料放喺：

- `data/projects.ts`

你可以更新以下欄位：

- `slug`, `name`, `district`
- `priceFrom`, `avgPricePerSqft`, `developer`, `status`
- `heroImage`, `galleryImages`
- `highlights`, `unitTypes`, `nearbyFacilities`, `faq`
- `seoKeywords`, `articles`

## 如何新增第二個樓盤（快速複製流程）

1. 打開 `data/projects.ts`
2. 複製現有 project object 一份
3. 修改 `slug`（例如 `hung-hom-sky-one`）
4. 更新樓盤文案、價錢、戶型、FAQ、tags
5. 更新 `articles`（可沿用原本 10 個 slug）
6. 儲存後直接開：
   - `/project/新slug`
   - `/project/新slug/get-price-list`

因為頁面係由 `generateStaticParams` 同 project data 驅動，唔需要再額外加 route 檔案。

## Lead Form / API 行為

- 前端表單：`components/forms/lead-form.tsx`
- API route：`app/api/leads/route.ts`

提交後會：

1. 前端驗證欄位
2. POST 到 `/api/leads`
3. API `console.log` mock lead payload
4. 回傳 JSON 成功訊息

## SEO 結構

- 可重用 helper：`lib/seo.ts`
- 每個頁面都使用 metadata（包括 Open Graph 基本資料）
- 內容頁會按 `project + article` 動態生成 title/description

## Vercel Deploy

1. 將 repo push 到 GitHub
2. 去 [Vercel](https://vercel.com/) 匯入專案
3. Framework 選 Next.js（通常會自動偵測）
4. Build command 保持預設：`next build`
5. Deploy

完成後，每次 push 都會自動重新部署。
