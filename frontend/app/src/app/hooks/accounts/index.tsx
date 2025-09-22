import { backendAxios } from "@/app/utils/axios";
import useSWR from "swr";
import { Account, AccountPaginatedAPIResponse } from "@/app/types/accounts";

export interface GetAccountsParams {
  page?: number;
  size?: number;
}

export const useGetAccounts = (params?: GetAccountsParams) => {
  const getAccounts: () => Promise<AccountPaginatedAPIResponse> = async () => {
    try {
      const response = await backendAxios.get("/v1/accounts/", { params });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  // Create a proper cache key that includes all parameters
  const cacheKey = ["/v1/accounts/", params];

  return useSWR(cacheKey, getAccounts, {
    revalidateIfStale: false,
  });
};

export const useGetAccountById = (id: number) => {
  const getAccountById: () => Promise<Account> = async () => {
    const response = await backendAxios.get(`/v1/accounts/${id}`);
    return response.data;
  };
  return useSWR(`/v1/accounts/${id}`, getAccountById);
};