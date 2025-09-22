import { backendAxios } from "@/app/utils/axios";
import useSWR, { mutate } from "swr";
import {
  Account,
  AccountCreateAPIRequest,
  AccountPaginatedAPIResponse,
} from "@/app/types/accounts";

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

export const useCreateAccount = () => {
  const createAccount: (
    data: AccountCreateAPIRequest
  ) => Promise<Account> = async (data) => {
    try {
      const response = await backendAxios.post(`/v1/accounts/`, data);
      mutate(
        (key) => Array.isArray(key) && key[0] === "/v1/accounts/",
        undefined,
        { revalidate: true }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return { mutate: createAccount };
};
