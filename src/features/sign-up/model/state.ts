export type RegisterState = {
  error: string | null;
  username: string;
};

export const initialRegisterState: RegisterState = { error: null, username: "" };
