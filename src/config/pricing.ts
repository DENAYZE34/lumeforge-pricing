export type BillingCycle = "monthly" | "annual";

export interface PlanFeatureGroup {
  title: string;
  items: { label: string; included: boolean; tag?: string }[];
}

export interface Plan {
  id: "starter" | "creator" | "agency";
  name: string;
  tagline: string;
  badge?: string;
  priceMonthly: number;
  priceAnnual: number;
  listPriceAnnual?: number;
  ctaLabel: string;
  featured?: boolean;
  creditsLabel: string;
  breakdown: string[];
  groups: PlanFeatureGroup[];
  included: { label: string; included: boolean }[];
}

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Для первого захода в AI и автоматизацию",
    priceMonthly: 29,
    priceAnnual: 19,
    ctaLabel: "Начать со Starter",
    creditsLabel: "10 проектных кредитов / месяц",
    breakdown: [
      "5 AI-скриптов или мини-автоматизаций",
      "1 часовая консультация по стеку",
    ],
    groups: [
      {
        title: "Базовые инструменты",
        items: [
          { label: "Готовые AI-промпты и шаблоны", included: true },
          { label: "Базовая настройка MCP-клиента", included: true },
          { label: "Кастомная разработка MCP-серверов", included: false },
          { label: "Next.js-приложение под ключ", included: false },
        ],
      },
    ],
    included: [
      { label: "Приоритетная поддержка", included: false },
      { label: "Передача прав на исходный код", included: true },
      { label: "Выделенный Slack/Telegram-канал", included: false },
      { label: "Ежемесячный отчёт по прогрессу", included: false },
    ],
  },
  {
    id: "creator",
    name: "Creator Pro",
    tagline: "Для продакшена: веб, автоматизация, медиа",
    badge: "Популярный выбор",
    priceMonthly: 149,
    priceAnnual: 99,
    listPriceAnnual: 169,
    ctaLabel: "Выбрать Creator Pro",
    featured: true,
    creditsLabel: "40 проектных кредитов / месяц",
    breakdown: [
      "Генерация видео Seedance 2.0",
      "Разделение дорожек UVR5 и пайплайны DaVinci Resolve",
    ],
    groups: [
      {
        title: "Веб и автоматизация",
        items: [
          { label: "Next.js-приложение под ключ", included: true, tag: "до 10 страниц" },
          { label: "Кастомная разработка MCP-серверов", included: true, tag: "1 сервер" },
          { label: "Автоматизация пайплайнов (n8n/Make)", included: true },
          { label: "Выделенный DevOps-инженер", included: false },
        ],
      },
      {
        title: "Аудио / видео продакшн",
        items: [
          { label: "Генерация видео Seedance 2.0", included: true, tag: "до 5 клипов" },
          { label: "Разделение дорожек UVR5", included: true, tag: "до 10 треков" },
          { label: "Скрипты и автоматизация DaVinci Resolve", included: true },
          { label: "Кастомные DSP-плагины (C++/JUCE)", included: false },
        ],
      },
    ],
    included: [
      { label: "Приоритетная поддержка", included: true },
      { label: "Передача прав на исходный код", included: true },
      { label: "Выделенный Slack/Telegram-канал", included: true },
      { label: "Ежемесячный отчёт по прогрессу", included: true },
    ],
  },
  {
    id: "agency",
    name: "Agency / Enterprise",
    tagline: "Системы под ключ и полное техническое сопровождение",
    priceMonthly: 399,
    priceAnnual: 279,
    listPriceAnnual: 459,
    ctaLabel: "Обсудить Enterprise",
    creditsLabel: "Неограниченные кредиты + выделенная команда",
    breakdown: [
      "Архитектура на Next.js + Rust-сервисы",
      "Кастомные DSP-плагины на C++/JUCE и MCP-серверы",
    ],
    groups: [
      {
        title: "Веб и автоматизация",
        items: [
          { label: "Next.js-приложение под ключ", included: true, tag: "без лимита страниц" },
          { label: "Кастомная разработка MCP-серверов", included: true, tag: "без лимита" },
          { label: "Автоматизация пайплайнов (n8n/Make)", included: true },
          { label: "Выделенный DevOps-инженер", included: true },
        ],
      },
      {
        title: "Аудио / видео продакшн",
        items: [
          { label: "Генерация видео Seedance 2.0", included: true, tag: "без лимита" },
          { label: "Разделение дорожек UVR5", included: true, tag: "без лимита" },
          { label: "Скрипты и автоматизация DaVinci Resolve", included: true },
          { label: "Кастомные DSP-плагины (C++/JUCE)", included: true },
        ],
      },
    ],
    included: [
      { label: "Приоритетная поддержка", included: true },
      { label: "Передача прав на исходный код", included: true },
      { label: "Выделенный Slack/Telegram-канал", included: true },
      { label: "Ежемесячный отчёт по прогрессу", included: true },
    ],
  },
];

export interface MatrixRow {
  label: string;
  values: [string | boolean, string | boolean, string | boolean];
}

export interface MatrixCategory {
  id: string;
  title: string;
  rows: MatrixRow[];
}

export const matrixCategories: MatrixCategory[] = [
  {
    id: "web-dev",
    title: "Веб-разработка",
    rows: [
      { label: "Страниц в проекте", values: ["до 3", "до 10", "без лимита"] },
      { label: "Кастомные компоненты и анимации", values: [false, true, true] },
      { label: "Аудит производительности и SEO", values: [false, true, true] },
      { label: "Выделенная инфраструктура / деплой", values: [false, false, true] },
    ],
  },
  {
    id: "ai-automation",
    title: "AI-автоматизация",
    rows: [
      { label: "Workflow-автоматизации в месяц", values: ["2", "10", "без лимита"] },
      { label: "Интеграции с внешними API", values: ["1", "5", "без лимита"] },
      { label: "Поддержка собственных LLM-агентов", values: [false, true, true] },
      { label: "Оркестрация мультиагентных сценариев", values: [false, false, true] },
    ],
  },
  {
    id: "mcp-servers",
    title: "MCP-серверы",
    rows: [
      { label: "Кастомные MCP-серверы", values: [false, "1 сервер", "без лимита"] },
      { label: "Поддержка Claude Code / Claude Desktop", values: [true, true, true] },
      { label: "Документация и передача конфигурации", values: [false, true, true] },
      { label: "Доработка существующих серверов", values: [false, false, true] },
    ],
  },
  {
    id: "video-audio",
    title: "Видео / аудио",
    rows: [
      { label: "Разделение дорожек (UVR5) в месяц", values: [false, "10 треков", "без лимита"] },
      { label: "Скрипты DaVinci Resolve", values: [false, true, true] },
      { label: "Кастомные DSP-плагины (C++/JUCE)", values: [false, false, true] },
      { label: "Цветокоррекция и монтаж под ключ", values: [false, "по запросу", true] },
    ],
  },
  {
    id: "business",
    title: "Бизнес и сопровождение",
    rows: [
      { label: "Время ответа поддержки", values: ["48 ч", "24 ч", "4 ч, приоритет"] },
      { label: "Выделенный технический стратег", values: [false, false, true] },
      { label: "Ежемесячный разбор метрик и стратегии", values: [false, true, true] },
      { label: "NDA и передача прав на весь код", values: [true, true, true] },
    ],
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Как работают проектные кредиты?",
    answer:
      "Каждый тариф включает пул кредитов в месяц — единицу стоимости для скриптов, консультаций и доработок. Неиспользованные кредиты не переносятся на следующий месяц, но их можно докупить со скидкой на тарифах Creator Pro и Enterprise.",
  },
  {
    question: "Можно ли сменить тариф в любой момент?",
    answer:
      "Да. Апгрейд применяется сразу, даунгрейд — с начала следующего расчётного периода. Разницу в оплате при апгрейде на годовом плане мы пересчитываем пропорционально.",
  },
  {
    question: "Что входит в кастомную разработку MCP-серверов?",
    answer:
      "Проектирование инструментов и ресурсов под ваш стек, интеграция с внешними API, тестирование в Claude Code / Claude Desktop и документация для вашей команды. На тарифе Agency сервер поддерживается и дорабатывается на постоянной основе.",
  },
  {
    question: "Есть ли скидка при оплате за год?",
    answer:
      "Да, годовая оплата снижает ежемесячную стоимость на 30–35% в зависимости от тарифа — переключатель выше показывает актуальную разницу в реальном времени.",
  },
  {
    question: "Передаёте ли вы права на исходный код и подписываете NDA?",
    answer:
      "Да, на всех тарифах. Весь код, конфигурации MCP-серверов и созданные ассеты передаются вам по завершении работ; NDA подписывается до старта проекта по запросу.",
  },
  {
    question: "Что если моя задача не вписывается ни в один тариф?",
    answer:
      "Опишите задачу в заявке — мы либо подберём ближайший тариф с докупкой кредитов, либо соберём индивидуальное предложение на базе Enterprise.",
  },
];
