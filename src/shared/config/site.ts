export const siteConfig = {
  name: "cbo",
  tagline: "магазин внутриигровой валюты",
  description:
    "Пополнение внутриигровой валюты игрового сервера cbo. Вход через аккаунт сервера, оплата через ЮKassa, автоматическое начисление.",
  documentsUpdatedAt: "29 октября 2026 г.",
  paymentProvider: "ЮKassa",
  currency: {
    inGameName: "Обрыгации",
  },
  disclaimer: {
    ru: "Проект не является официальным продуктом Minecraft, не одобрен Mojang или Microsoft и не связан с ними.",
    en: "NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.",
  },
} as const;
