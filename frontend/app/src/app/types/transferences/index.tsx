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