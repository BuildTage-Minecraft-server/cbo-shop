function fromEnv(name: string, fallback: string): string {
  const value = process.env[name]?.trim();
  return value ? value : fallback;
}

export const seller = {
  fullName: fromEnv("SELLER_FULL_NAME", "Фамилия Имя Отчество"),
  status: fromEnv("SELLER_STATUS", "самозанятый (плательщик налога на профессиональный доход)"),
  inn: fromEnv("SELLER_INN", "000000000000"),
  email: fromEnv("SELLER_EMAIL", "support@example.com"),
  phone: fromEnv("SELLER_PHONE", "+7 (000) 000-00-00"),
  supportHours: fromEnv("SELLER_SUPPORT_HOURS", "ежедневно, ответ в течение 24 часов"),
};
