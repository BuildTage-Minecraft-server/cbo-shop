export type BecomePartnerState = {
  error: string | null;
  code: string;
};

export const initialBecomePartnerState: BecomePartnerState = { error: null, code: "" };
