// Каталог фабрик. Пока демо-данные (contacts в Supabase пуста) —
// структура готова, чтобы позже подтянуть из БД.

export interface Review {
  author: string;
  rating: number;
  comment: string;
}

export interface Factory {
  id: string;
  name: string;
  location: string;
  category: string;
  moq: number;
  leadTime: string;
  rating: number;
  verified: boolean;
  description: string;
  image: string;
  certifications: string[];
  reviews: Review[];
}

export const CATEGORIES = [
  "Кожаные сумки",
  "Фурнитура",
  "Текстиль",
  "Упаковка",
  "Обувь",
  "Аксессуары",
] as const;

const CITIES = ["Гуанчжоу", "Шэньчжэнь", "Дунгуань", "Иу", "Вэньчжоу", "Цюаньчжоу"];
const PREFIX = ["Yuelong", "Hengtai", "Jinma", "Ruishen", "Baicheng", "Tianhe", "Wanjia", "Senlin"];
const SUFFIX = ["Leather Atelier", "Manufacture", "Industrial", "Crafts", "Trading", "Hardware"];
const REVIEW_AUTHORS = ["Основатель бренда", "Закупщик", "Владелец марки", "Менеджер по производству"];
const REVIEW_TEXT = [
  "Образцы пришли за неделю, качество соответствует. Работаем дальше.",
  "Прямой контакт с цехом — цена сразу честнее, чем у посредников.",
  "Были правки по лекалу, переделали быстро и без споров.",
  "Стабильное качество от партии к партии. Рекомендую.",
];
const CERTS = ["ISO 9001", "BSCI", "SGS", "Disney FAMA"];

function seeded(i: number) {
  // детерминированная «случайность», чтобы данные не прыгали между рендерами
  return (Math.sin(i * 999) + 1) / 2;
}

export const FACTORIES: Factory[] = Array.from({ length: 48 }, (_, idx) => {
  const i = idx + 1;
  const category = CATEGORIES[i % CATEGORIES.length];
  const rating = Math.round((3.9 + seeded(i) * 1.1) * 10) / 10;
  const certCount = (i % 3) + 1;
  return {
    id: `fac_${i}`,
    name: `${PREFIX[i % PREFIX.length]} ${SUFFIX[i % SUFFIX.length]}`,
    location: CITIES[i % CITIES.length],
    category,
    moq: ((i * 30) % 450) + 50,
    leadTime: `${(i % 4) + 2} нед.`,
    rating,
    verified: i % 4 !== 0,
    description: `Контрактное производство полного цикла: ${category.toLowerCase()}. От разработки лекала до отгрузки. Опыт работы с брендами из Европы и СНГ.`,
    image: `https://picsum.photos/seed/chv${i}/640/440`,
    certifications: CERTS.slice(0, certCount),
    reviews: [
      { author: `${REVIEW_AUTHORS[i % REVIEW_AUTHORS.length]}`, rating: 5, comment: REVIEW_TEXT[i % REVIEW_TEXT.length] },
      { author: `${REVIEW_AUTHORS[(i + 1) % REVIEW_AUTHORS.length]}`, rating: 4, comment: REVIEW_TEXT[(i + 2) % REVIEW_TEXT.length] },
    ],
  };
});
