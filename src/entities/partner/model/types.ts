export type Partner = {
  id: number;
  playerUuid: string;
  playerName: string;
  code: string;
  rateBps: number;
};

export type PayoutStatus = "pending" | "paid" | "rejected";

export type PayoutRecord = {
  id: number;
  amountKopecks: number;
  status: PayoutStatus;
  createdAt: Date;
};

export type CommissionRecord = {
  amountKopecks: number;
  createdAt: Date;
  availableAt: Date;
};

export type PartnerDashboard = {
  referrals: number;
  buyers: number;
  earnedKopecks: number;
  holdKopecks: number;
  availableKopecks: number;
  pendingKopecks: number;
  paidKopecks: number;
  commissions: CommissionRecord[];
  payouts: PayoutRecord[];
};

export type PendingPayout = {
  id: number;
  partnerCode: string;
  playerName: string;
  amountKopecks: number;
  details: string;
  createdAt: Date;
};
