import { Account } from "@/app/types";
import { PaginatedAPIResponse } from "../api";

export type Customer = {
    created_at: string;
    updated_at: string;
    id: number;
    name: string;
    email: string;
    accounts?: Account[];
  }

export type CustomerPaginatedAPIResponse = PaginatedAPIResponse<Customer>;