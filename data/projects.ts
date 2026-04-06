import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "la-mirabelle",
    name: "海瑅灣 I",
    district: "將軍澳",
    subArea: "康城",
    priceFrom: "HK$5,934,700",
    avgPricePerSqft: "HK$14,800",
    developer: "海瑅發展有限公司",
    status: "開售中",
    tags: ["將軍澳新盤", "康城", "地鐵沿線", "海濱配套"],
    heroImage: "/images/la-mirabelle/la-mirabelle-hero-new.jpg",
    galleryImages: [
      "/images/la-mirabelle/la-mirabelle-hero.jpg",
      "/images/la-mirabelle/la-mirabelle-siteplan.jpg",
      "/images/la-mirabelle/la-mirabelle-amenities-1.jpg",
      "/images/la-mirabelle/la-mirabelle-amenities-2.jpg",
      "/images/la-mirabelle/la-mirabelle-amenities-3.jpg",
    ],
    floorPlanImage: "/images/la-mirabelle/la-mirabelle-floorplan.jpg",
    neighborhoodImage: "/images/la-mirabelle/la-mirabelle-neighborhood.jpg",
    neighborhoodDescription:
      "海瑅灣 La Mirabelle 位於港鐵康城站的大型生活社區，匯聚自然綠韻與生活便利。項目坐享日出康城內超過130萬呎綠化休憩園地，並毗鄰延綿至將軍澳南的海濱長廊及環保大道上的大型寵物公園，生活環境開揚舒適。\n\n鄰近大型購物商場「The LOHAS 康城」，面積約48萬平方呎，匯聚近150個商戶，涵蓋零售、餐飲、戲院及溜冰場等設施，日常生活與休閒娛樂一應俱全。\n\n同時區內學校資源豐富，包括中小學及國際學校，適合上車客、自住家庭及長線置業人士。",
    highlights: [
      "臨海地段 — 直面開揚海景，部分戶型享全海景，景觀稀缺價值突出",
      "港鐵上蓋生活圈 — 鐵路直達市區，大幅減省通勤時間，出行方便",
      "大型住客會所 — 設室內泳池、健身室、多功能廳，生活質素卓越",
      "優質校網配套 — 毗鄰多所知名學校，深受家庭置業客歡迎",
    ],
    unitTypes: [
      { name: "1房", area: "330–400 呎", priceFrom: "HK$4,880,000", layout: "開放式廚房" },
      { name: "2房", area: "520–620 呎", priceFrom: "HK$7,200,000", layout: "獨立廚房設計" },
      { name: "3房", area: "750–900 呎", priceFrom: "HK$10,500,000", layout: "連套房設計" },
    ],
    nearbyFacilities: [
      { category: "港鐵", name: "康城站", distance: "步行約5分鐘" },
      { category: "商場", name: "The LOHAS / 康城商場", distance: "步行約5分鐘" },
      { category: "學校", name: "將軍澳區校網", distance: "區內校網" },
      { category: "休閒", name: "海濱長廊", distance: "步行可達" },
    ],
    faq: [
      {
        question: "海瑅灣 I 有冇海景單位？",
        answer: "部分高層單位可享開揚海景，具體景觀視乎樓層及座向，建議向我哋索取詳細樓層景觀分析。",
      },
      {
        question: "入票前要準備幾多資金？",
        answer: "一般建議預留首期（約 30%）、印花稅及律師費，保守估算約樓價 35%–40%，再按個人按揭條件調整。",
      },
      {
        question: "屯門區嘅租務需求點樣？",
        answer: "屯門區租客以本地家庭及上班族為主，交通方便帶動穩定租務，1–2 房單位流通性較高。",
      },
      {
        question: "海瑅灣 I 適合首置買家嗎？",
        answer: "1房入場價約 HK$488 萬起，配合按揭計劃月供可低至約 HK$1.6 萬，對首置買家有一定吸引力。",
      },
    ],
    seoKeywords: ["海瑅灣 I", "La Mirabelle", "屯門新盤", "香港一手樓", "臨海住宅", "屯門海景"],
    shortDescription:
      "海瑅灣 I 位於將軍澳康城，鄰近港鐵及大型商場，配套完整，方便自住與長線部署。",
    pros: [
      "臨海地段，部分戶型享開揚海景，景觀稀缺",
      "港鐵沿線，通勤方便，生活配套完善",
      "大型住客會所，泳池及健身設施齊備",
    ],
    cons: [
      "屯門區距市區中心較遠，通勤時間略長",
      "新界西新盤供應持續，短線競爭壓力較大",
      "部分低層單位景觀受鄰近建築影響",
    ],
    suitability: [
      { label: "首置上車", reason: "1房入場約 HK$488 萬，供款估算相對友善" },
      { label: "小家庭", reason: "海景2房，配套完善，適合家庭居住" },
      { label: "投資者", reason: "鐵路沿線，租務需求穩定" },
    ],
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "85291234567",
    whatsappMessage: "你好，我想查詢海瑅灣 I La Mirabelle 嘅最新價單及付款辦法，謝謝！",
    articles: [
      { slug: "investment-analysis", title: "海瑅灣 I 值唔值得買？投資分析", description: "從海景溢價、租務需求及區域發展角度深度拆解。" },
      { slug: "first-time-buyer", title: "首置攻略：海瑅灣 I 月供估算", description: "由首期、供款到壓力測試，幫你估算真實入市成本。" },
      { slug: "pros-cons", title: "海瑅灣 I 適合邊類買家？", description: "從戶型配置、地區定位分析哪種買家最適合入市。" },
      { slug: "pricing-breakdown", title: "價單拆解：海瑅灣 I 呎價結構分析", description: "逐項分析折扣、樓層差異及付款辦法。" },
      { slug: "rental-yield", title: "租金回報分析：屯門租務市場前景", description: "以區內數據推演海瑅灣 I 持有回報。" },
      { slug: "district-development", title: "屯門未來 5 年發展藍圖", description: "交通升級、商業配套及填海計劃帶來的置業機遇。" },
      { slug: "compare-nearby-projects", title: "同區新盤比較：海瑅灣 I vs 其他屯門盤", description: "並排比較呎價、配套與景觀定位。" },
      { slug: "case-study", title: "個案分析：月入三萬點部署上車", description: "以不同按揭比例示範實際供款規劃。" },
      { slug: "faq-guide", title: "海瑅灣 I 置業 FAQ", description: "整合付款流程、按揭及印花稅常見問題。" },
      { slug: "get-price-list", title: "免費索取海瑅灣 I 最新價單", description: "登記後第一時間獲取銷售安排及付款辦法。" },
    ],
  },

  {
    slug: "kai-tak-grand-one",
    name: "天瀧匯 Grand One",
    district: "啟德",
    priceFrom: "HK$4,980,000",
    avgPricePerSqft: "HK$18,800",
    developer: "示範發展商",
    status: "熱賣中",
    tags: ["啟德新盤", "地鐵沿線", "投資自住皆宜"],
    heroImage:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=1600&auto=format&fit=crop",
    ],
    highlights: [
      "步行約 5 分鐘可達港鐵站，交通網絡成熟",
      "雙會所設計，兼備家庭休閒及商務接待空間",
      "區內大型商場及海濱長廊即將落成",
      "戶型由一房至三房，覆蓋上車及換樓需求",
    ],
    unitTypes: [
      { name: "1房", area: "280–330 呎", priceFrom: "HK$4,980,000", layout: "開放式廚房" },
      { name: "2房", area: "420–520 呎", priceFrom: "HK$7,680,000", layout: "獨立廚房選項" },
      { name: "3房", area: "680–760 呎", priceFrom: "HK$12,300,000", layout: "連套房設計" },
    ],
    nearbyFacilities: [
      { category: "交通", name: "港鐵啟德站", distance: "約 450 米" },
      { category: "商場", name: "啟德大型商業綜合體", distance: "約 600 米" },
      { category: "教育", name: "34 校網多間小學", distance: "車程約 8 分鐘" },
      { category: "休閒", name: "海濱公園及跑步徑", distance: "步行約 10 分鐘" },
    ],
    faq: [
      {
        question: "入票前要準備幾多資金？",
        answer: "一般建議先預留首期、印花稅及律師費，保守估算約為樓價 15%–20%，再按個人按揭條件調整。",
      },
      {
        question: "投資買入最應該關注咩？",
        answer: "建議重點睇租務需求、交通規劃、同區供應量及放租回報，唔好只睇開價折扣。",
      },
      {
        question: "可唔可以先拎價單再決定？",
        answer: "可以，我哋可提供最新價單重點、付款辦法及折扣結構，協助你先比較後入票。",
      },
    ],
    seoKeywords: ["啟德新盤", "香港一手樓", "天瀧匯", "最新價單", "一手樓投資"],
    shortDescription:
      "天瀧匯 Grand One 位於啟德核心生活圈，主打交通便利及中長線區域升值潛力，適合上車及投資部署。",
    pros: [
      "港鐵站步行 5 分鐘，出行效率高",
      "啟德區長線發展規劃成熟，升值潛力可期",
      "戶型由一房至三房，上車換樓選擇多元",
    ],
    cons: [
      "啟德區新盤供應持續增加，短線競爭壓力較大",
      "入場呎價偏高，較其他區新盤上車門檻高",
      "部分商業及文娛配套仍在興建，短期生活便利度有限",
    ],
    suitability: [
      { label: "首置上車", reason: "一房入場價 HK$498 萬起，戶型選擇靈活" },
      { label: "投資者", reason: "鐵路盤、海濱配套，租務需求穩定" },
    ],
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "85291234567",
    whatsappMessage: "你好，我想查詢天瀧匯 Grand One 嘅最新價單及付款辦法，謝謝！",
    articles: [
      { slug: "investment-analysis", title: "投資分析：天瀧匯值唔值得入手？", description: "由升值潛力、租務需求、供應量同持貨策略拆解。" },
      { slug: "first-time-buyer", title: "首次置業攻略：點樣評估自己入場能力", description: "由首期、供款、壓力測試到預算分配一文看清。" },
      { slug: "pricing-breakdown", title: "價單拆解：一手樓價背後你要知嘅細節", description: "逐項分析折扣、呎價、稅費同常見隱藏成本。" },
      { slug: "rental-yield", title: "租金回報分析：啟德區租務需求有幾穩定？", description: "以區內租務數據假設，推演持有回報。" },
      { slug: "district-development", title: "地區發展前景：啟德未來 5 年變化", description: "重點睇交通、商業、文體配套落成節奏。" },
      { slug: "compare-nearby-projects", title: "同區新盤比較：天瀧匯 vs 假設樓盤 A/B", description: "用表格比較價錢、呎數、配套與定位。" },
      { slug: "pros-cons", title: "客觀優缺點分析：入市前先睇風險", description: "由資金壓力、流通性到區內競爭全面列出。" },
      { slug: "case-study", title: "個案分析：月入四萬點部署上車", description: "示範不同按揭比例下嘅供款與現金流。" },
      { slug: "faq-guide", title: "一手樓 FAQ：付款流程、按揭、印花稅", description: "整合常見疑問，快速建立清晰決策框架。" },
      { slug: "get-price-list", title: "免費索取最新價單與付款辦法", description: "專頁收集查詢，提供最快資訊更新。" },
    ],
  },

  {
    slug: "tseung-kwan-o-nova",
    name: "海灣峰 Nova Bay",
    district: "將軍澳",
    priceFrom: "HK$5,280,000",
    avgPricePerSqft: "HK$16,500",
    developer: "示範發展商",
    status: "即將發售",
    tags: ["將軍澳新盤", "海景單位", "鐵路盤"],
    heroImage:
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1600&auto=format&fit=crop",
    ],
    highlights: [
      "部分單位享開揚海景，景觀價值突出",
      "步行約 8 分鐘至港鐵將軍澳站，出行方便",
      "區內多個大型商場，生活配套完善",
      "戶型設計以中小型為主，入場門檻相對友善",
    ],
    unitTypes: [
      { name: "開放式", area: "230–270 呎", priceFrom: "HK$5,280,000", layout: "開放式設計" },
      { name: "1房", area: "310–380 呎", priceFrom: "HK$6,500,000", layout: "開放式廚房" },
      { name: "2房", area: "480–560 呎", priceFrom: "HK$9,200,000", layout: "獨立廚房" },
    ],
    nearbyFacilities: [
      { category: "交通", name: "港鐵將軍澳站", distance: "約 650 米" },
      { category: "商場", name: "將軍澳廣場", distance: "約 400 米" },
      { category: "教育", name: "將軍澳多間官津小學", distance: "車程約 5 分鐘" },
      { category: "休閒", name: "將軍澳海濱長廊", distance: "步行約 12 分鐘" },
    ],
    faq: [
      {
        question: "將軍澳樓盤租務需求如何？",
        answer: "區內租客以年輕家庭及上班族為主，交通方便帶動穩定租務需求，開放式至兩房單位流通性較高。",
      },
      {
        question: "「即將發售」即係幾時可以入票？",
        answer: "發展商通常提前 2–4 週公布銷售安排，我哋會第一時間通知已登記客戶，建議先留低資料。",
      },
      {
        question: "海景單位定價溢價大嗎？",
        answer: "一般海景樓層溢價為 5%–15%，視乎景觀開揚度而定，可向我哋索取具體樓層呎價分析。",
      },
    ],
    seoKeywords: ["將軍澳新盤", "將軍澳海景", "海灣峰", "將軍澳一手樓", "Nova Bay"],
    shortDescription:
      "海灣峰 Nova Bay 坐落將軍澳核心位置，部分單位享開揚海景，鐵路盤配套成熟，是上車及換樓的理想選擇。",
    pros: [
      "部分單位享開揚海景，景觀稀缺性高",
      "商場、診所、學校一應俱全，生活配套完善",
      "開放式至二房均有，入場門檻相對友善",
    ],
    cons: [
      "將軍澳交通依賴單一鐵路線，繁忙時段出行壓力較大",
      "即將發售，定價及付款辦法細節仍未正式公布",
      "部分低層單位景觀受周邊新盤遮擋",
    ],
    suitability: [
      { label: "首置上車", reason: "開放式單位 HK$528 萬起，入場門檻友善" },
      { label: "小家庭", reason: "海景一/二房，區內配套完善" },
    ],
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "85291234567",
    whatsappMessage: "你好，我想查詢海灣峰 Nova Bay 嘅最新價單及付款辦法，謝謝！",
    articles: [
      { slug: "investment-analysis", title: "投資分析：海灣峰值唔值得入手？", description: "從海景溢價、租務需求與區域發展角度分析。" },
      { slug: "first-time-buyer", title: "首次置業攻略：將軍澳上車全攻略", description: "由首期、供款、壓力測試到預算分配一文看清。" },
      { slug: "pricing-breakdown", title: "價單拆解：海灣峰呎價同折扣結構", description: "逐項分析折扣、樓層差異及付款辦法。" },
      { slug: "rental-yield", title: "租金回報分析：將軍澳租務需求有幾穩定？", description: "以區內租務數據推演持有回報。" },
      { slug: "district-development", title: "將軍澳未來 5 年發展前景", description: "交通延伸、商業配套及人口增長趨勢分析。" },
      { slug: "compare-nearby-projects", title: "同區新盤比較：海灣峰 vs 將軍澳其他盤", description: "用表格比較價錢、呎數、景觀與配套定位。" },
      { slug: "pros-cons", title: "客觀優缺點：海灣峰入市前必睇", description: "由競爭供應到樓層景觀差異全面評估。" },
      { slug: "case-study", title: "個案分析：首置買家點選海景單位", description: "示範不同按揭比例下嘅供款與現金流。" },
      { slug: "faq-guide", title: "海灣峰置業 FAQ：價單、按揭、印花稅", description: "整合常見疑問，快速建立清晰決策框架。" },
      { slug: "get-price-list", title: "免費索取海灣峰最新價單", description: "登記後第一時間收到銷售安排及折扣通知。" },
    ],
  },

  {
    slug: "pavilia-farm-iii",
    name: "柏傲莊 III",
    district: "大圍",
    subArea: "車公廟",
    priceFrom: "-",
    avgPricePerSqft: "HK$17,868 – HK$32,152 / 呎",
    developer: "新世界發展 / 港鐵",
    status: "出售中",
    tags: ["大圍新盤", "鐵路上蓋", "東鐵線", "屯馬線"],
    heroImage: "/images/pavilia-farm-iii/pavilia-farm-iii-hero.jpg",
    floorPlanImage: "/images/pavilia-farm-iii/pavilia-farm-iii-floorplan.jpg",
    galleryImages: [
      "/images/pavilia-farm-iii/pavilia-farm-iii-hero.jpg",
      "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-1.jpg",
      "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-2.jpg",
      "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-3.jpg",
      "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-4.jpg",
      "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-5.jpg",
      "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-6.jpg",
      "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-7.jpg",
      "/images/pavilia-farm-iii/pavilia-farm-iii-amenities-8.jpg.png",
    ],
    neighborhoodImage: "/images/pavilia-farm-iii/pavilia-farm-iii-neighborhood.jpg",
    neighborhoodDescription:
      "項目位於大圍站上蓋，交通極為便利，連接東鐵線及屯馬線，快速往返港九新界。鄰近大型商場「圍方」及沙田新城市廣場，生活配套完善。區內設有多間中小學及國際學校，適合家庭客。同時鄰近城門河及多個休閒綠化空間，居住環境舒適。",
    highlights: [
      "新世界發展及港鐵合作，大圍鐵路上蓋大型住宅",
      "892伙，戶型由1房至4房，實用面積約285至1,676平方呎",
      "東鐵線及屯馬線交匯，接駁港九新界",
      "鄰近圍方、新城市廣場等商場，生活配套齊全",
    ],
    unitTypes: [
      { name: "1房 / 細2房", area: "307 - 359 呎", priceFrom: "-", layout: "" },
      { name: "2房", area: "452 - 534 呎", priceFrom: "-", layout: "" },
      { name: "3房", area: "663 - 835 呎", priceFrom: "-", layout: "" },
      { name: "4房", area: "991 - 1014 呎", priceFrom: "-", layout: "" },
    ],
    nearbyFacilities: [
      { category: "交通", name: "港鐵大圍站", distance: "上蓋直達" },
      { category: "商場", name: "圍方 The Wai", distance: "步行可達" },
      { category: "商場", name: "新城市廣場", distance: "港鐵一站或短途接駁" },
      { category: "休閒", name: "城門河", distance: "鄰近" },
    ],
    faq: [
      {
        question: "柏傲莊 III 交通方便嗎？",
        answer: "項目位於大圍站上蓋，連接東鐵線及屯馬線，往返市區及新界主要節點十分便利。",
      },
      {
        question: "附近有咩商場配套？",
        answer: "鄰近圍方及沙田新城市廣場等大型商場，零售、餐飲及娛樂選擇豐富。",
      },
    ],
    seoKeywords: ["柏傲莊 III", "The Pavilia Farm III", "大圍新盤", "大圍站", "鐵路上蓋"],
    shortDescription:
      "柏傲莊III由新世界發展及港鐵合作發展，位於車公廟路18號，屬鐵路上蓋大型住宅項目，提供892伙。項目戶型涵蓋1房至4房，部分單位設套房及工人套，實用面積由285至1,676平方呎，適合不同家庭需要。",
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "85291234567",
    whatsappMessage: "你好，我想查詢柏傲莊 III（The Pavilia Farm III）嘅最新價單及付款辦法，謝謝！",
    articles: [
      {
        slug: "investment-analysis",
        title: "柏傲莊 III 置業分析",
        description: "從交通、配套及戶型分佈角度整理入市參考。",
      },
      {
        slug: "first-time-buyer",
        title: "首置攻略：大圍鐵路盤預算與供款",
        description: "由首期、供款到壓力測試，估算真實入市成本。",
      },
      {
        slug: "faq-guide",
        title: "柏傲莊 III 常見問題",
        description: "整合按揭、配套及戶型相關疑問。",
      },
      {
        slug: "get-price-list",
        title: "索取柏傲莊 III 最新資料",
        description: "登記後獲取銷售安排及付款辦法參考。",
      },
    ],
  },

  {
    slug: "connexxt",
    name: "CONNEXXT 薈悅",
    district: "九龍",
    subArea: "飛凰街",
    priceFrom: "-",
    avgPricePerSqft: "-",
    developer: "未提供",
    status: "待售",
    tags: ["九龍新盤", "飛凰街", "開放式至三房"],
    heroImage: "/images/connexxt/connexxt-hero.jpg",
    galleryImages: [
      "/images/connexxt/connexxt-hero.jpg",
      "/images/connexxt/connexxt-neighborhood-1.jpg",
    ],
    neighborhoodImage: "/images/connexxt/connexxt-neighborhood-1.jpg",
    neighborhoodDescription: "之後可再補",
    highlights: [
      "九龍飛凰街33號，提供195伙",
      "戶型由開放式至三房一套連工人套，實用面積約200至679平方呎",
      "鄰近港鐵宋皇臺站及土瓜灣站，交通便捷",
    ],
    unitTypes: [
      { name: "開放式", area: "200-209 呎", priceFrom: "-", layout: "" },
      { name: "2房（開廚）", area: "324-376 呎", priceFrom: "-", layout: "" },
      { name: "3房（開廚）", area: "400-472 呎", priceFrom: "-", layout: "" },
      { name: "3房", area: "462 呎", priceFrom: "-", layout: "" },
      { name: "3房1套（開廚）", area: "481-520 呎", priceFrom: "-", layout: "" },
      { name: "3房1套連工人套", area: "666-679 呎", priceFrom: "-", layout: "" },
    ],
    nearbyFacilities: [
      { category: "交通", name: "港鐵宋皇臺站", distance: "步行約數分鐘" },
      { category: "交通", name: "港鐵土瓜灣站", distance: "步行約數分鐘" },
    ],
    faq: [
      {
        question: "CONNEXXT 薈悅位置在哪？",
        answer: "項目位於九龍飛凰街33號，鄰近宋皇臺及土瓜灣站一帶，往返市區及新界主要節點便利。",
      },
    ],
    seoKeywords: ["CONNEXXT", "薈悅", "飛凰街", "九龍新盤", "connexxt"],
    shortDescription:
      "CONNEXXT 薈悅位於九龍飛凰街33號，提供195伙，戶型由開放式至三房一套連工人套，實用面積由200至679平方呎。",
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "85291234567",
    whatsappMessage: "你好，我想查詢 CONNEXXT 薈悅嘅最新價單及付款辦法，謝謝！",
    articles: [
      {
        slug: "investment-analysis",
        title: "CONNEXXT 薈悅置業分析",
        description: "從交通、配套及戶型分佈角度整理入市參考。",
      },
      {
        slug: "faq-guide",
        title: "CONNEXXT 薈悅常見問題",
        description: "整合按揭、配套及戶型相關疑問。",
      },
      {
        slug: "get-price-list",
        title: "索取 CONNEXXT 薈悅最新資料",
        description: "登記後獲取銷售安排及付款辦法參考。",
      },
    ],
  },

  {
    slug: "ho-man-tin-grandeur",
    name: "皇御峰 Grandeur",
    district: "何文田",
    priceFrom: "HK$8,200,000",
    avgPricePerSqft: "HK$24,500",
    developer: "示範發展商",
    status: "公開發售",
    tags: ["何文田新盤", "豪宅定位", "山景海景"],
    heroImage:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=1600&auto=format&fit=crop",
    ],
    highlights: [
      "豪宅定位，呎價具市區核心競爭力",
      "港鐵何文田站步行約 6 分鐘，接駁觀塘線及屯馬線",
      "毗鄰多所名校，深受家庭置業客歡迎",
      "3 至 4 房大戶型為主，適合換樓及高端投資需求",
    ],
    unitTypes: [
      { name: "2房", area: "520–580 呎", priceFrom: "HK$8,200,000", layout: "連套房設計" },
      { name: "3房", area: "780–900 呎", priceFrom: "HK$13,500,000", layout: "連套房及工人房" },
      { name: "4房", area: "1,100–1,250 呎", priceFrom: "HK$22,000,000", layout: "全套房配置" },
    ],
    nearbyFacilities: [
      { category: "交通", name: "港鐵何文田站", distance: "約 500 米" },
      { category: "商場", name: "黃埔花園商場", distance: "約 800 米" },
      { category: "教育", name: "拔萃男書院等名校", distance: "步行約 10 分鐘" },
      { category: "醫療", name: "香港浸信會醫院", distance: "步行約 8 分鐘" },
    ],
    faq: [
      {
        question: "何文田豪宅市場流通性如何？",
        answer: "何文田長期是換樓客及高端買家目標，優質大單位稀缺，流通性較一般新盤穩定。",
      },
      {
        question: "呎價 $24,500 係咪偏貴？",
        answer: "與同區二手豪宅相比，新盤呎價具競爭力，加上設施及發展商品牌溢價，整體定位合理。",
      },
      {
        question: "有冇適合換樓客嘅按揭方案？",
        answer: "換樓客可考慮先買後賣策略，按揭成數視乎持有物業數量，建議先了解自身壓測狀況。",
      },
    ],
    seoKeywords: ["何文田新盤", "何文田豪宅", "皇御峰", "何文田一手樓", "Grandeur"],
    shortDescription:
      "皇御峰 Grandeur 坐落何文田核心地段，豪宅定位配合名校網絡，是換樓客及長線投資者的首選。",
    pros: [
      "毗鄰拔萃男書院等名校，教育資源豐富",
      "豪宅級設計，市區核心位置，升值潛力穩健",
      "屯馬線接駁，雙鐵路沿線，交通便利",
    ],
    cons: [
      "入場門檻高（HK$820 萬起），首置買家資金壓力較大",
      "大單位按揭成數受限，需預留充足流動資金",
      "何文田區二手樓流通量相對有限，退出策略需留意",
    ],
    suitability: [
      { label: "換樓客", reason: "大戶型設計，名校網絡，適合家庭升級" },
      { label: "長線投資", reason: "豪宅稀缺，區域升值潛力高" },
    ],
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "85291234567",
    whatsappMessage: "你好，我想查詢皇御峰 Grandeur 嘅最新價單及付款辦法，謝謝！",
    articles: [
      { slug: "investment-analysis", title: "投資分析：皇御峰豪宅值唔值得入手？", description: "從稀缺性、租務市場及長線持有策略分析。" },
      { slug: "first-time-buyer", title: "首置買豪宅？何文田入場策略全攻略", description: "由首期、供款、壓力測試到預算分配一文看清。" },
      { slug: "pricing-breakdown", title: "價單拆解：皇御峰大戶型呎價分析", description: "逐層分析景觀溢價、折扣結構及付款辦法。" },
      { slug: "rental-yield", title: "租金回報分析：何文田豪宅租務市場", description: "以區內高端租務數據推演持有回報。" },
      { slug: "district-development", title: "何文田未來 5 年發展前景", description: "屯馬線效應、舊區重建及商業配套提升分析。" },
      { slug: "compare-nearby-projects", title: "同區新盤比較：皇御峰 vs 何文田其他盤", description: "用表格比較呎價、戶型、景觀與定位。" },
      { slug: "pros-cons", title: "客觀優缺點：皇御峰入市前必睇", description: "由價格門檻到區域競爭全面評估。" },
      { slug: "case-study", title: "個案分析：換樓客點部署豪宅入市", description: "示範先買後賣策略下的資金流規劃。" },
      { slug: "faq-guide", title: "皇御峰置業 FAQ：大單位按揭、印花稅", description: "整合換樓客常見疑問，快速建立決策框架。" },
      { slug: "get-price-list", title: "免費索取皇御峰最新價單", description: "登記後第一時間收到銷售安排及示範單位資訊。" },
    ],
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const getAllDistricts = (): string[] =>
  Array.from(new Set(projects.map((p) => p.district)));
