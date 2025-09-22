import { Account } from "@/app/types";

export interface Customer {
    created_at: string;
    updated_at: string;
    id: number;
    name: string;
    email: string;
    accounts?: Account[];
  }