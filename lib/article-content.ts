import { ArticleItem, Project } from "@/types/project";

export function getArticleBySlug(project: Project, articleSlug: string): ArticleItem | undefined {
  return project.articles.find((a) => a.slug === articleSlug);
}

/**
 * Returns article section paragraphs, replacing generic district references
 * with the actual project district where relevant.
 */
export function getArticleSections(slug: string, district = "啟德"): string[] {
  const map: Record<string, string[]> = {
    "investment-analysis": [
      `從區域規劃角度，${district}核心區仍有中長線升值條件，尤其受惠於交通及商業配套逐步落成。`,
      `租務方面，區內對一至兩房單位需求持續，對投資者較易建立穩定出租策略。`,
      `適合買家：重視流通性、可接受中線持有、希望兼顧自住彈性的用戶。`,
    ],
    "first-time-buyer": [
      `首次置業應先計算可承受月供，建議將總供款控制在月入 40% 以內，預留現金流應付利率波動。`,
      `首期之外需同時計算印花稅、律師費、按揭保險等成本，避免低估入市門檻。`,
      `可先以兩個情境測試：保守按揭比例與進取按揭比例，對比壓力測試結果後再作決定。`,
    ],
    "pricing-breakdown": [
      `價單閱讀重點不止開價，應對照折扣條款、付款辦法及景觀樓層差異。`,
      `同呎價單位亦會因座向、樓層、管理費差異影響實際持有成本。`,
      `建議用總持有成本而唔係單一折扣率作決策，確保比較基礎一致。`,
    ],
    "rental-yield": [
      `租金回報需以淨回報角度計算，扣除管理費、空置期及維修預算。`,
      `${district}區租客來源多元，交通配套改善可持續支持租務吸引力。`,
      `若以中長線持有，應定期檢視租金與利率變化，適時調整持有策略。`,
    ],
    "district-development": [
      `${district}未來發展以商業、零售、文體設施並行，將持續提升生活便利度。`,
      `交通面除現有鐵路外，巴士及幹道配套成熟度逐步提升，連接市區效率改善。`,
      `區域定位清晰，有利吸引自住及投資雙重需求，長線發展前景正面。`,
    ],
    "compare-nearby-projects": [
      `以下表格比較同區樓盤定位，協助你更快篩選合適選項，建議結合自身預算及持有目的作最終判斷。`,
    ],
    "pros-cons": [
      `優點：交通便利、配套增長快、戶型覆蓋面廣，適合多類買家需求。`,
      `缺點：短線價格波動風險存在，區內供應持續增加需留意競爭壓力。`,
      `結論：適合重視中線部署及流通性的買家，建議配合按揭策略靈活部署。`,
    ],
    "case-study": [
      `案例：月入 HK$40,000，目標一房至兩房單位，首期預算 HK$150–200 萬。`,
      `策略一：保守按揭，供款較高但安全邊際充足；策略二：提高按揭比例，保留更多流動資金。`,
      `最終建議按穩定收入同未來家庭規劃調整，並預留 3–6 個月備用資金。`,
    ],
    "faq-guide": [
      `付款流程一般包括入票、簽臨約、正式買賣合約、按揭申請及收樓安排，整個流程約需 3–6 個月。`,
      `印花稅及按揭成數會受物業價格及買家身份影響，需個別評估，首置客或有額外優惠。`,
      `建議及早準備收入及資產證明，縮短按揭批核時間，確保資金安排準時到位。`,
    ],
    "get-price-list": [
      `想第一時間掌握最新折扣、價單更新及示範單位安排，可直接提交資料獲取專人跟進。`,
    ],
  };

  return map[slug] ?? ["內容更新中，歡迎提交查詢獲取最新資訊。"];
}
