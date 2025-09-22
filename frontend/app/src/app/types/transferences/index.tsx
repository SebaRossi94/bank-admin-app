import { UUID } from "crypto";
import { PaginatedAPIResponse } from "../api";

export interface Transference {
    id: number;
    number: UUID;
    balance: number;
    from_account_number: UUID;
    to_account_number: UUID;
  }

export type TransferencePaginatedAPIResponse = PaginatedAPIResponse<Transference>;

export type TransferenceCreateAPIRequest = Pick<Transference, "balance" | "from_account_number" | "to_account_number">;