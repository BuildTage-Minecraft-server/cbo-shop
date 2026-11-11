export type RegisterFailure = "username-taken" | "invalid-username" | "invalid-password" | "forbidden" | "rejected";

export function classifyRegisterFailure(status: number, message: string): RegisterFailure {
  const text = message.toLowerCase();

  if (status === 401 || status === 403) return "forbidden";
  if (status === 409 || /taken|already|exists|in use/.test(text)) return "username-taken";
  if (/password/.test(text)) return "invalid-password";
  if (/username|name/.test(text)) return "invalid-username";
  return "rejected";
}
