function fromEnv(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

const accounts = fromEnv("DRASL_URL")?.replace(/\/+$/, "") ?? null;

export const gameServer = {
  address: fromEnv("SERVER_ADDRESS"),
  version: fromEnv("SERVER_VERSION"),
  communityUrl: fromEnv("COMMUNITY_URL"),
  communityLabel: fromEnv("COMMUNITY_LABEL") ?? "Сообщество",
  accountsUrl: accounts,
  authServerUrl: accounts ? `${accounts}/authlib-injector` : null,
};
