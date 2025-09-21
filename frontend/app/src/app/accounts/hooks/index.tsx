import { backendAxios } from "@/app/utils/axios";
import { UUID } from "crypto";
import useSWR from "swr";

export interface Account {
  id: number;
  number: UUID;
  balance: number;
  customer_id: number;
}

export const useGetAccounts = () => {
  const getAccounts: () => Promise<Account[]> = async () => {
    try {
      const response = await backendAxios.get("/v1/accounts/");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return useSWR("/v1/accounts/", getAccounts);
};

export const useGetAccountById = (id: number) => {
  const getAccountById: () => Promise<Account> = async () => {
    const response = await backendAxios.get(`/v1/accounts/${id}`);
    return response.data;
  };
  return useSWR(`/v1/accounts/${id}`, getAccountById);
};