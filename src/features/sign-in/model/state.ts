export type LoginState = {
  error: string | null;
  username: string;
};

export const initialLoginState: LoginState = { error: null, username: "" };
