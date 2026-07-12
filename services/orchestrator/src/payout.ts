import { createHash } from "node:crypto";

export type PayoutIntent = {
  id: string;
  sessionId: string;
  amountUsdc: number;
  recipient?: string;
  status: "disabled" | "test" | "approval_required" | "submitted";
};

export class PayoutGateway {
  constructor(
    private readonly mode: "disabled" | "test" | "approval",
    private readonly maxUsdc: number,
    private readonly agentUrl?: string,
    private readonly agentToken?: string,
  ) {}

  async createIntent(sessionId: string, amountUsdc: number, recipient?: string): Promise<PayoutIntent> {
    const amount = Math.max(0, Math.min(amountUsdc, this.maxUsdc));
    const id = createHash("sha256").update(`${sessionId}:${amount}:${recipient ?? "unassigned"}`).digest("hex").slice(0, 24);
    if (this.mode === "disabled") return { id, sessionId, amountUsdc: amount, recipient, status: "disabled" };
    if (this.mode === "test" || !this.agentUrl || !this.agentToken) return { id, sessionId, amountUsdc: amount, recipient, status: "test" };
    return { id, sessionId, amountUsdc: amount, recipient, status: "approval_required" };
  }
}
