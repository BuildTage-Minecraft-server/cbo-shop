function fromEnv(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

function asLink(value: string | null): string | null {
  if (!value) return null;
  return /^https?:\/\//.test(value) || (value.startsWith("/") && !value.startsWith("//")) ? value : null;
}

const accounts = fromEnv("DRASL_URL")?.replace(/\/+$/, "") ?? null;

export const gameServer = {
  address: fromEnv("SERVER_ADDRESS"),
  version: fromEnv("SERVER_VERSION"),
  communityUrl: fromEnv("COMMUNITY_URL"),
  communityLabel: fromEnv("COMMUNITY_LABEL") ?? "Сообщество",
  launcherUrl: asLink(fromEnv("LAUNCHER_URL")),
  launcherNote: fromEnv("LAUNCHER_NOTE"),
  accountsUrl: accounts,
  authServerUrl: accounts ? `${accounts}/authlib-injector` : null,
};
