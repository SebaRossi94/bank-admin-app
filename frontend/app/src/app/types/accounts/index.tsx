import { UUID } from "crypto";
import { PaginatedAPIResponse } from "../api";

export interface Account {
    id: number;
    number: UUID;
    balance: number;
    customer_id: number;
  }

export type AccountPaginatedAPIResponse = PaginatedAPIResponse<Account>;