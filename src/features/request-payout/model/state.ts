export type PayoutState = {
  error: string | null;
  details: string;
  done: boolean;
};

export const initialPayoutState: PayoutState = { error: null, details: "", done: false };
