import { UUID } from "crypto";

export interface Account {
    id: number;
    number: UUID;
    balance: number;
    customer_id: number;
  }