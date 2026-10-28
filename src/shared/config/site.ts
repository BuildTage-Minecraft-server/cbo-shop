export const siteConfig = {
  name: "Обрыгации",
  tagline: "донат-магазин игрового сервера",
  description:
    "Пополните баланс Обрыгаций: внутриигровой валюты сервера для тем меню, скинов, бустеров и слотов. Вход через аккаунт сервера, оплата через ЮKassa, автоматическое начисление.",
  documentsUpdatedAt: "26 октября 2026 г.",
  paymentProvider: "ЮKassa",
  seller: {
    fullName: "Фамилия Имя Отчество",
    status: "самозанятый (плательщик налога на профессиональный доход)",
    inn: "000000000000",
    email: "support@example.com",
    phone: "+7 (000) 000-00-00",
    supportHours: "ежедневно, ответ в течение 24 часов",
  },
  disclaimer: {
    ru: "Проект не является официальным продуктом Minecraft, не одобрен Mojang или Microsoft и не связан с ними.",
    en: "NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.",
  },
} as const;
