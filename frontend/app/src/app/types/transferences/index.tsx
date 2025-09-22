import { UUID } from "crypto";

export interface Transference {
    id: number;
    number: UUID;
    balance: number;
    from_account_number: UUID;
    to_account_number: UUID;
  }