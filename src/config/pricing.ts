export type BillingCycle = "monthly" | "annual";
export type PlanMode = "individual" | "business";

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
  creditsPerMonth: number;
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
    creditsPerMonth: 10,
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
          { label: "Автоматизация пайплайнов (n8n/Make)", included: false },
          { label: "Генерация видео Seedance 2.0", included: false },
        ],
      },
    ],
    included: [
      { label: "Приоритетная поддержка", included: false },
      { label: "Передача прав на исходный код", included: true },
      { label: "Выделенный Slack/Telegram-канал", included: false },
      { label: "Ежемесячный отчёт по прогрессу", included: false },
      { label: "Докупка кредитов со скидкой", included: false },
      { label: "Ранний доступ к новым возможностям", included: false },
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
    creditsPerMonth: 40,
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
      { label: "Докупка кредитов со скидкой", included: true },
      { label: "Ранний доступ к новым возможностям", included: false },
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
    creditsPerMonth: 999,
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
      { label: "Докупка кредитов со скидкой", included: true },
      { label: "Ранний доступ к новым возможностям", included: true },
    ],
  },
];

// ---- Business plans (seat-based team retainers, mirrors Higgsfield's
// Individual/Business split, adapted to an agency-retainer model) ----

export interface BusinessPlan {
  id: "team" | "scale" | "custom";
  name: string;
  tagline: string;
  badge?: string;
  featured?: boolean;
  pricePerSeatMonthly: number | null;
  pricePerSeatAnnual: number | null;
  listPricePerSeatAnnual?: number;
  minSeats: number;
  creditsPerSeat: number | null;
  bonusCreditsPerExtraSeat: number | null;
  ctaLabel: string;
  groups: PlanFeatureGroup[];
  included: { label: string; included: boolean }[];
}

export const businessPlans: BusinessPlan[] = [
  {
    id: "team",
    name: "Team",
    tagline: "Для агентств и небольших команд",
    pricePerSeatMonthly: 199,
    pricePerSeatAnnual: 149,
    minSeats: 3,
    creditsPerSeat: 25,
    bonusCreditsPerExtraSeat: 8,
    ctaLabel: "Подключить Team",
    groups: [
      {
        title: "Администрирование",
        items: [
          { label: "Контроль расходов администратором", included: false },
          { label: "SSO", included: false },
          { label: "Делегированный доступ к пополнению", included: false },
          { label: "Базовая аналитика и приоритетная поддержка", included: true },
        ],
      },
      {
        title: "Безопасность и соответствие",
        items: [
          { label: "Индемнификация", included: false },
          { label: "Данные не используются для обучения моделей", included: false },
          { label: "Персональный технический куратор", included: false },
        ],
      },
    ],
    included: [
      { label: "Перенос кредитов первого месяца", included: false },
      { label: "От 2 до 9 участников в общем воркспейсе", included: true },
      { label: "Доступ ко всем инструментам и фичам", included: true },
      { label: "Общий пул кредитов на команду", included: true },
    ],
  },
  {
    id: "scale",
    name: "Scale",
    badge: "Выгоднее всего",
    featured: true,
    tagline: "Для высоконагруженных команд",
    pricePerSeatMonthly: 449,
    pricePerSeatAnnual: 349,
    listPricePerSeatAnnual: 499,
    minSeats: 5,
    creditsPerSeat: 70,
    bonusCreditsPerExtraSeat: 20,
    ctaLabel: "Подключить Scale",
    groups: [
      {
        title: "Администрирование",
        items: [
          { label: "Делегированный доступ к пополнению", included: true },
          { label: "Детальная аналитика и приоритетная поддержка", included: true },
          { label: "Контроль расходов администратором", included: true },
          { label: "Базовый SSO", included: true },
        ],
      },
      {
        title: "Безопасность и соответствие",
        items: [
          { label: "Индемнификация", included: false },
          { label: "Данные не используются для обучения моделей", included: false },
          { label: "Персональный технический куратор", included: true },
        ],
      },
    ],
    included: [
      { label: "Перенос кредитов первого месяца", included: true },
      { label: "От 5 до 15 участников в общем воркспейсе", included: true },
      { label: "Доступ ко всем инструментам и фичам", included: true },
      { label: "Общий пул кредитов на команду", included: true },
    ],
  },
  {
    id: "custom",
    name: "Custom",
    tagline: "Для организаций любого масштаба",
    pricePerSeatMonthly: null,
    pricePerSeatAnnual: null,
    minSeats: 1,
    creditsPerSeat: null,
    bonusCreditsPerExtraSeat: null,
    ctaLabel: "Связаться с отделом продаж",
    groups: [
      {
        title: "Администрирование",
        items: [
          { label: "Делегированный доступ к пополнению", included: true },
          { label: "Детальная аналитика и приоритетная поддержка", included: true },
          { label: "Контроль расходов администратором", included: true },
          { label: "Кастомный SSO", included: true },
        ],
      },
      {
        title: "Безопасность и соответствие",
        items: [
          { label: "Индемнификация", included: true },
          { label: "Данные не используются для обучения моделей", included: true },
          { label: "Персональный технический куратор", included: true },
        ],
      },
    ],
    included: [
      { label: "Кредиты по запросу в любом объёме", included: true },
      { label: "Неограниченное число мест", included: true },
      { label: "Кастомный доступ к моделям и стеку", included: true },
      { label: "Индивидуальные скидки на объём", included: true },
    ],
  },
];

export interface MatrixRow {
  label: string;
  values: [string | boolean, string | boolean, string | boolean];
  info?: string;
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
      { label: "Адаптивная вёрстка (mobile-first)", values: [true, true, true] },
      { label: "Интеграция с CMS", values: [false, true, true] },
      { label: "Аудит производительности и SEO", values: [false, true, true] },
      { label: "A/B-тестирование лендингов", values: [false, false, true] },
      { label: "Выделенная инфраструктура / деплой", values: [false, false, true] },
      { label: "SLA на аптайм продакшена", values: [false, false, "99.9%"] },
    ],
  },
  {
    id: "ai-automation",
    title: "AI-автоматизация",
    rows: [
      { label: "Workflow-автоматизации в месяц", values: ["2", "10", "без лимита"] },
      { label: "Интеграции с внешними API", values: ["1", "5", "без лимита"] },
      { label: "Чат-боты и AI-ассистенты", values: [false, true, true] },
      { label: "Поддержка собственных LLM-агентов", values: [false, true, true] },
      { label: "RAG-пайплайны на своих данных", values: [false, "по запросу", true] },
      {
        label: "Оркестрация мультиагентных сценариев",
        values: [false, false, true],
        info: "Несколько AI-агентов работают над задачей совместно — один исследует, другой пишет код, третий проверяет результат, под единым контролем.",
      },
      { label: "Мониторинг и алерты по автоматизациям", values: [false, false, true] },
    ],
  },
  {
    id: "mcp-servers",
    title: "MCP-серверы",
    rows: [
      { label: "Кастомные MCP-серверы", values: [false, "1 сервер", "без лимита"] },
      { label: "Поддержка Claude Code / Claude Desktop", values: [true, true, true] },
      { label: "Интеграция с внутренними API компании", values: [false, true, true] },
      { label: "Документация и передача конфигурации", values: [false, true, true] },
      { label: "Тестовое покрытие инструментов сервера", values: [false, false, true] },
      { label: "Доработка существующих серверов", values: [false, false, true] },
      { label: "Постоянная поддержка и мониторинг", values: [false, false, true] },
    ],
  },
  {
    id: "video-engines",
    title: "Видео-движки",
    rows: [
      { label: "Text-to-Video генерация", values: [true, true, true] },
      { label: "Image-to-Video анимация", values: [false, true, true] },
      { label: "Video-to-Video рестайлинг", values: [false, false, true] },
      { label: "Максимальное разрешение", values: ["720p", "1080p", "4K upscale"] },
      { label: "Длительность ролика", values: ["до 5 сек", "до 15 сек", "без лимита"] },
      { label: "Соотношения сторон", values: ["16:9", "16:9 / 9:16 / 1:1", "любое под проект"] },
      {
        label: "Частота кадров",
        values: ["24fps", "30fps", "60fps с интерполяцией"],
        info: "Интерполяция достраивает промежуточные кадры AI-моделью, повышая частоту кадров без повторной съёмки или рендера.",
      },
      { label: "Движки генерации", values: [false, "Seedance 2.0", "Seedance 2.0 + Veo 3.1 + Kling 3.0"] },
    ],
  },
  {
    id: "character-style",
    title: "Персонажи и стиль",
    rows: [
      {
        label: "Soul ID — консистентность персонажа",
        values: [false, true, true],
        info: "Референс-изображения лица/объекта фиксируются как «якорь», чтобы персонаж оставался узнаваемым во всех сгенерированных кадрах и ракурсах.",
      },
      { label: "Лимит референс-изображений", values: ["2 фото", "4 фото", "без лимита"] },
      { label: "Обучение кастомного стиля (fine-tuning)", values: [false, false, true] },
      { label: "Сохранение фирменной цветовой палитры бренда", values: [false, true, true] },
    ],
  },
  {
    id: "director-tools",
    title: "Инструменты режиссёра",
    rows: [
      { label: "Управление виртуальной камерой (pan/tilt/zoom/dolly)", values: [false, true, true] },
      { label: "Настройки объектива (фокусное расстояние, ГРИП)", values: [false, true, true] },
      {
        label: "Motion Brush — анимация выбранных зон кадра",
        values: [false, false, true],
        info: "Точечная разметка кадра кистью: указываете, что именно должно двигаться (волосы, флаг, вода), остальная сцена остаётся статичной.",
      },
      { label: "Inpainting / outpainting — дорисовка краёв кадра", values: [false, false, true] },
    ],
  },
  {
    id: "audio-lipsync",
    title: "Аудио и липсинк",
    rows: [
      { label: "Генерация речи (TTS)", values: [false, true, true] },
      { label: "Клонирование голоса", values: [false, false, true] },
      { label: "Липсинк под готовую аудиодорожку", values: [false, true, true] },
      {
        label: "Разделение дорожек (UVR5) в месяц",
        values: [false, "10 треков", "без лимита"],
        info: "Ultimate Vocal Remover 5 — AI-модель, которая отделяет вокал от инструментала в готовом треке: нужна для ремиксов, караоке-версий и чистки архивных записей.",
      },
      {
        label: "Кастомные DSP-плагины (C++/JUCE)",
        values: [false, false, true],
        info: "Собственный аудиоплагин (VST/AU) под ваш звуковой эффект или обработку, написанный на C++ с фреймворком JUCE — работает в любой DAW как нативный инструмент.",
      },
    ],
  },
  {
    id: "commercial-rights",
    title: "Права и интеграции",
    rows: [
      { label: "Кредиты в месяц", values: ["10", "40", "без лимита"] },
      { label: "Приоритет очереди", values: ["Standard", "Fast", "Priority GPU"] },
      { label: "Параллельные генерации", values: ["1", "3", "10"] },
      { label: "Перенос остатка кредитов на следующий месяц", values: [false, false, true] },
      { label: "Коммерческая лицензия на результаты", values: [false, true, true] },
      { label: "Доступ к API / кастомным MCP-серверам", values: [false, "по запросу", "включён"] },
      { label: "SLA и поддержка", values: ["Email, 48 ч", "Slack, 24 ч", "Выделенный менеджер, 4 ч"] },
      { label: "NDA и передача прав на весь код", values: [true, true, true] },
      { label: "Доступ к приватным бета-фичам", values: [false, false, true] },
    ],
  },
];

// ---- "Find the best plan for you" calculator ----

export interface QuizGoal {
  id: string;
  label: string;
}

export const quizGoals: QuizGoal[] = [
  { id: "website", label: "Сайт / лендинг" },
  { id: "automation", label: "AI-автоматизация" },
  { id: "mcp", label: "MCP-сервер" },
  { id: "video", label: "Видео-продакшн" },
  { id: "audio", label: "Аудио-продакшн" },
  { id: "consulting", label: "Консультация по стеку" },
];

// Rough credit weight per goal, used to seed the volume slider default.
export const quizGoalCreditWeight: Record<string, number> = {
  website: 12,
  automation: 8,
  mcp: 10,
  video: 6,
  audio: 4,
  consulting: 2,
};

export interface QuizFeatureChip {
  id: string;
  label: string;
  creditWeight: number;
}

export const quizFeatureChips: QuizFeatureChip[] = [
  { id: "custom-mcp", label: "Кастомный MCP-сервер", creditWeight: 10 },
  { id: "video-gen", label: "Генерация видео Seedance 2.0", creditWeight: 6 },
  { id: "stem-split", label: "Разделение дорожек UVR5", creditWeight: 4 },
  { id: "dsp-plugin", label: "Кастомный DSP-плагин", creditWeight: 15 },
  { id: "devops", label: "Выделенный DevOps-инженер", creditWeight: 20 },
  { id: "strategy", label: "Технический стратег", creditWeight: 12 },
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
    question: "Чем отличаются Individual и Business тарифы?",
    answer:
      "Individual — фиксированные тарифы для одного проекта или фаундера. Business — тарифы с местами в команде (seats), общим пулом кредитов, делегированным доступом к пополнению и контролем расходов для агентств и студий.",
  },
  {
    question: "Передаёте ли вы права на исходный код и подписываете NDA?",
    answer:
      "Да, на всех тарифах. Весь код, конфигурации MCP-серверов и созданные ассеты передаются вам по завершении работ; NDA подписывается до старта проекта по запросу.",
  },
  {
    question: "Что если моя задача не вписывается ни в один тариф?",
    answer:
      "Опишите задачу в заявке — мы либо подберём ближайший тариф с докупкой кредитов, либо соберём индивидуальное предложение на базе Enterprise или Custom.",
  },
];
