import { getCityDisplayName, getCityFromSlug, type CityProfile } from "@/lib/cities";
import { PHONE_NUMBER, getServiceFamily, type PageEntry } from "@/lib/greasetrap";

export type FaqItem = { question: string; answer: string };

export type ContentSection = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: "shield" | "clipboard" | "clock" | "building" | "check" | "phone";
};

function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function getServiceTopic(page: PageEntry): string {
  let keyword = (page.primaryKeyword || page.title).toLowerCase();
  const city = getCityFromSlug(page.slug);

  if (city) {
    const cityTokens = [city.slug, city.name.toLowerCase(), city.slug.replace(/-/g, " ")];
    for (const token of cityTokens) {
      keyword = keyword.replace(new RegExp(`\\b${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g"), "");
    }
    keyword = keyword.replace(/\s+/g, " ").trim();
  }

  return keyword
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getServiceListLabel(page: PageEntry): string {
  return getServiceTopic(page);
}

export function getPageH1(page: PageEntry): string {
  const topic = getServiceTopic(page);
  const city = getCityDisplayName(page.targetArea);

  if (page.pageType === "City Service Page") {
    return `${topic} in ${city}`;
  }
  if (page.pageType === "Near Me Page") {
    return `Find ${topic} Near You`;
  }
  if (page.pageType === "Cost Guide") {
    const base = topic.replace(/\s+Cost$/i, "");
    return `What Does ${base} Cost?`;
  }
  if (page.pageType === "Rebate Guide") {
    return `${topic} Requirements in Ontario`;
  }
  if (page.pageType === "Service Page") {
    return topic;
  }
  return topic;
}

function pick<T>(items: T[], seed: number): T {
  return items[seed % items.length]!;
}

export function buildIntro(page: PageEntry): string {
  const topic = getServiceTopic(page);
  const family = getServiceFamily(page).toLowerCase();
  const seed = hashSlug(page.slug);
  const city = getCityFromSlug(page.slug);
  const cityName = getCityDisplayName(page.targetArea);

  const nationalIntros = [
    `Grease slows drains long before anyone smells it in the dining room. Our crews handle ${family} across Canada — pumping interceptors, scraping buildup, and documenting volumes so health inspections and landlords see a clear service history. You pick a window that fits prep and service hours; we confirm trap access, pump out, and leave pump records you can file the same week.`,
    `Kitchen managers call us when ${family} cannot wait for a vague callback. We separate urgent overflow from planned maintenance: backups get triaged first, while routine cleaning stays on a predictable schedule. Technicians explain what they found at the trap, what was removed, and when the next visit makes sense — without making you chase paperwork after the truck leaves.`,
    `Whether you run one restaurant or a portfolio of kitchens, the goal is the same: interceptors that flow, hoods that stay productive, and documentation that stands up to review. We coordinate ${family} coast to coast with licensed pump crews, sanitary waste handling, and notes your team can share with insurers or property owners.`,
  ];

  const cityIntros = (profile: CityProfile) => [
    `Kitchens in ${profile.name} — from spots near ${profile.landmark} through ${profile.neighbourhood} — depend on traps that keep up with fry volume and long service hours. We schedule ${family} around your prep line, pump and clean on site, and leave records ready for health or property review. ${profile.climate} affects how fast grease solidifies in lines; we factor that into timing and follow-up intervals.`,
    `Operators around ${profile.landmark} call when traps back up or when the calendar shows overdue maintenance. Our ${profile.name} crews confirm access, vacuum waste safely, and note trap condition in plain language. You get a confirmed visit window and pump documentation you can share with landlords or inspectors the same week.`,
    `Whether you manage a single ${profile.name} location or several sites in the region, you need ${family} that respects ${profile.population} traffic and tight shutdown windows. We coordinate local pump trucks, explain scope before dispatch, and document every visit so recurring cleaning does not slip quietly past the next review.`,
  ];

  const nearMeIntro = `Searching for a nearby crew should not mean calling five contractors and still wondering who is qualified. We route licensed pump teams to your address with clear arrival windows, upfront scope, and documentation included in every visit. Tell us your kitchen type and location — we match you with the right specialist, confirm scope before we dispatch, and follow up with records you can keep on file. One call connects you to Canada-wide coverage with local response times that respect your schedule.`;

  const costIntro = `Planning trap maintenance is easier when you know what drives the visit. Labour, trap size, access difficulty, and how often you pump all affect scheduling — and skipping service usually costs more later in backups or downtime. This guide explains what a standard pump-out includes, how often kitchens like yours are typically serviced, and what to prepare before we arrive. Use it to plan ahead and book work that keeps your kitchen inspection-ready.`;

  const rebateIntro = `Ontario municipalities and landlords often ask for proof that grease interceptors are maintained on schedule. This guide explains what documentation kitchens typically need, how pump records support inspections, and where provincial rebate or efficiency programs may apply to equipment upgrades. Practical steps — who to call, what to log, and how to sequence pumping — help you enter a review prepared rather than reactive.`;

  if (page.pageType === "City Service Page" && city) {
    return pick(cityIntros(city), seed);
  }
  if (page.pageType === "Near Me Page") return nearMeIntro;
  if (page.pageType === "Cost Guide") return costIntro;
  if (page.pageType === "Rebate Guide") return rebateIntro;

  return pick(nationalIntros, seed).replace(/family/g, family);
}

export function buildBodySections(page: PageEntry): ContentSection[] {
  const seed = hashSlug(page.slug);
  const family = getServiceFamily(page);
  const city = getCityFromSlug(page.slug);
  const cityName = getCityDisplayName(page.targetArea);

  const sections: ContentSection[] = [
    {
      id: "what-we-do",
      eyebrow: "What we do",
      title: pick(
        [
          "Pump, clean, and document",
          "Kitchen-ready trap work",
          "Clear pump records",
        ],
        seed,
      ),
      body: pick(
        [
          `Crews arrive with vacuum equipment sized for interceptors and under-sink traps. We confirm access with your kitchen lead, pump waste safely, scrape surfaces that need attention, and log volumes removed. You receive pump notes the same visit — not a one-line invoice weeks later.`,
          `Each job follows a simple flow: confirm scope, protect the work area, pump and clean, then review findings with your manager. We flag slow drainage, missing covers, or sizing issues that could cause the next backup. Records support health reviews and landlord reporting.`,
          `We focus on keeping the line open and the trap compliant — no scare tactics about impossible deadlines. Technicians explain what they pumped, what condition the trap was in, and when the next service fits your volume.`,
        ],
        seed + 1,
      ),
      icon: "shield",
    },
    {
      id: "who-we-serve",
      eyebrow: "Who we serve",
      title: pick(
        ["Built for commercial kitchens", "Restaurants, hotels, commissaries", "Operators who need clear records"],
        seed + 2,
      ),
      body: pick(
        [
          "Full-service restaurants, QSR chains, hotels, stadium concessions, commissaries, and institutional kitchens — if grease goes down the line, we have likely pumped a trap like yours. We work with chefs, facility managers, and landlords who need after-hours access when the floor cannot stop.",
          "Our clients include independent operators, franchise groups, and multi-unit portfolios. They need predictable pump schedules, consistent crews, and documentation that satisfies health inspectors without extra back-and-forth.",
          "One coordinator can align several locations on the same service calendar. Standardized pump records make it easier to see which traps are current and which sites need catch-up before review season.",
        ],
        seed + 3,
      ),
      icon: "building",
    },
    {
      id: "how-it-works",
      eyebrow: "How it works",
      title: pick(["Three steps to done", "Simple scheduling, serious standards", "From call to completed report"], seed + 4),
      body: pick(
        [
          `Call ${PHONE_NUMBER} with your city, kitchen type, and whether the trap is backing up or due for maintenance. We confirm scope, assign a pump crew, and send records after the visit. Many clients set recurring intervals so traps do not slip past health or lease requirements.`,
          "Share your address and last pump date — we handle scheduling. A coordinator confirms access and trap location; the crew pumps, cleans, and documents the visit. For overflow, say so upfront so we prioritize urgency.",
          "Start with a short conversation. We explain what the visit includes, propose a window that fits prep hours, and note any repairs or sizing issues that should be handled separately.",
        ],
        seed + 5,
      ),
      icon: "clock",
    },
  ];

  if (city) {
    sections.push({
      id: "local-context",
      eyebrow: `${cityName} coverage`,
      title: `Serving ${city.name} and nearby districts`,
      body: `Our ${city.name} clients include properties near ${city.landmark} and throughout ${city.neighbourhood}. With ${city.population} in a region known for ${city.climate}, equipment endures real stress — freeze-thaw cycles, humidity, and heavy daily use. We factor local conditions into every visit and can often coordinate multiple services in one trip when you manage several systems. Ask about bundled scheduling for portfolios in ${city.name} and surrounding communities.`,
      icon: "check",
    });
  }

  if (page.pageType === "Cost Guide") {
    sections.push({
      id: "service-factors",
      eyebrow: "Service factors",
      title: "What affects your visit",
      body: "Trap volume, hood output, after-hours access, travel to remote sites, and line condition all influence how long we are on site. A routine pump on a single under-sink unit differs from a multi-vault hotel property with tight mechanical access. We confirm scope on the phone before dispatch so you know what we will do when the crew arrives.",
      icon: "clipboard",
    });
  }

  return sections;
}

export function buildFaqs(page: PageEntry): FaqItem[] {
  const seed = hashSlug(page.slug);
  const family = getServiceFamily(page).toLowerCase();
  const city = getCityFromSlug(page.slug);
  const cityName = getCityDisplayName(page.targetArea);

  const pools: FaqItem[][] = [
    [
      {
        question: "How soon can you visit my building?",
        answer: `Most areas receive a confirmed pump window within a few business days. Tell us your address and whether the trap is backing up when you call ${PHONE_NUMBER} — overflow and kitchen shutdowns are prioritized ahead of routine cleaning.`,
      },
      {
        question: "What should I prepare before the technician arrives?",
        answer:
          "Clear access to the trap and floor drains, note any recent backups, and have your last pump record handy if available. A kitchen or facilities contact should meet the crew for the first few minutes to show trap location and operating hours.",
      },
      {
        question: "Do you provide documentation for inspectors and insurers?",
        answer:
          "Yes. Every visit includes pump records with volumes, condition notes, and recommended follow-up dates. Most kitchens store them digitally and print copies for health or landlord reviews.",
      },
      {
        question: "Can you service multiple buildings on one contract?",
        answer:
          "Absolutely. Portfolio managers receive consolidated scheduling, standardized reporting formats, and a dedicated coordinator so every property stays on the same compliance calendar.",
      },
    ],
    [
      {
        question: "How often does my building need this work?",
        answer: `Most commercial kitchens pump interceptors on a recurring schedule — often monthly to quarterly depending on fry volume and local rules. We review your last pump record and usage to suggest a realistic interval.`,
      },
      {
        question: "What happens if something fails during the visit?",
        answer:
          "We document the deficiency clearly, explain the safety impact, and outline repair options with timelines. You decide whether we return for remediation or use your preferred contractor — either way, you know exactly what the inspector will ask about.",
      },
      {
        question: "Are your technicians certified?",
        answer:
          "Our pump crews follow sanitary waste handling practices appropriate for grease interceptors and kitchen waste. Ask your coordinator for documentation needed for your property or health review.",
      },
      {
        question: "Do you work after hours or weekends?",
        answer:
          "Yes, when building operations require it. Restaurants, entertainment venues, and 24-hour facilities often need overnight or early-morning access — mention your constraints when booking.",
      },
    ],
    [
      {
        question: "Is there a minimum charge for small buildings?",
        answer:
          "Small sites still receive full documentation and on-site testing; minimum fees cover travel and setup. We quote transparently before confirming so you know the total before we dispatch.",
      },
      {
        question: "Can you coordinate with our existing maintenance vendor?",
        answer:
          "We regularly work alongside HVAC, electrical, and cleaning contractors. Share your vendor contacts and we align schedules to minimize duplicate trips and tenant disruption.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept major business payment methods and can invoice property-management companies directly. Ask about net terms for established portfolio accounts.",
      },
      {
        question: "How do I book a recurring annual program?",
        answer: `Call ${PHONE_NUMBER} and ask to enroll in annual reminders. We track your due dates and reach out before the next cycle so inspections never lapse quietly.`,
      },
    ],
  ];

  const selected = pools[seed % pools.length]!.slice(0, 3);

  if (city) {
    selected.push({
      question: `Do you cover all areas of ${city.name}?`,
      answer: `Yes — including ${city.neighbourhood} and properties near ${city.landmark}. Mention your exact address when booking so we assign the closest available technician.`,
    });
  } else if (page.pageType === "Near Me Page") {
    selected.push({
      question: "How do you match me with a local technician?",
      answer:
        "We use your postal code and building type to route the nearest qualified team. You receive a confirmed arrival window and technician contact before the visit.",
    });
  } else if (page.pageType === "Cost Guide") {
    selected.push({
      question: "Can I confirm scope before you dispatch?",
      answer:
        "Yes. Share trap size, kitchen type, and location — we walk through what the visit includes so you know what to expect before the crew arrives.",
    });
  }

  return selected;
}

export function buildHomeIntro(): string {
  return "Grease backups do not wait for a slow night or a convenient shift. Between fry volume, busy prep lines, and health inspection schedules, trap maintenance often lands on whoever already has the longest to-do list. Grease Trap Crew takes that off your plate — pumping, cleaning, maintenance, and emergency overflow support for commercial kitchens across Canada. Technicians show up on schedule, explain what they found in plain language, and leave documentation you can file without scrambling. One call coordinates service whether you run a single bistro or a national restaurant portfolio.";
}

export function buildHomeFaqs(): FaqItem[] {
  return [
    {
      question: "What types of kitchens do you service?",
      answer:
        "We work with full-service restaurants, quick-service chains, hotels, commissaries, food halls, stadium concessions, and institutional kitchens. Call to confirm trap size and access for your site.",
    },
    {
      question: "How quickly can I get a crew on-site?",
      answer: `Most areas receive a confirmed visit window within a few business days. Call ${PHONE_NUMBER} for emergency overflow — we prioritize active backups and shutdown risks.`,
    },
    {
      question: "Can you handle multiple locations under one account?",
      answer:
        "Yes. Multi-unit operators get consolidated scheduling, standardized pump records, and reminders so no trap quietly goes overdue between inspections.",
    },
    {
      question: "Do you provide documentation for health inspectors?",
      answer:
        "Every visit includes pump records, photos where needed, and recommended follow-up intervals. Managers use our documentation for health reviews and internal maintenance planning.",
    },
  ];
}

export function buildTrustPoints(): { title: string; description: string; icon: ContentSection["icon"] }[] {
  return [
    {
      title: "Licensed pump crews",
      description: "Field teams trained for commercial interceptors, vacuum extraction, and sanitary waste handling.",
      icon: "shield",
    },
    {
      title: "Clear pump records",
      description: "Documentation with volumes, condition notes, and next-service dates — ready for health reviews.",
      icon: "clipboard",
    },
    {
      title: "After-hours access",
      description: "Early-morning and late-night windows when the line cannot stop for a trap pump-out.",
      icon: "clock",
    },
    {
      title: "Nationwide coverage",
      description: "Coordinated dispatch across Canada with local crews in major kitchen markets.",
      icon: "building",
    },
  ];
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export function getPageWordCount(page: PageEntry): number {
  const intro = buildIntro(page);
  const sections = buildBodySections(page);
  const faqs = buildFaqs(page);
  const body = sections.map((s) => s.body).join(" ");
  const faqText = faqs.map((f) => f.question + " " + f.answer).join(" ");
  return countWords(intro + " " + body + " " + faqText);
}
