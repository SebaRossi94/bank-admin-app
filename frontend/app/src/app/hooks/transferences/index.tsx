import { backendAxios } from "@/app/utils/axios";
import { UUID } from "crypto";
import useSWR, { mutate } from "swr";
import { Transference, TransferenceCreateAPIRequest, TransferencePaginatedAPIResponse } from "@/app/types/transferences";

export interface GetTransferencesParams {
  page?: number;
  size?: number;
}

export const useGetTransferences = (params?: GetTransferencesParams) => {
  const getTransferences: () => Promise<TransferencePaginatedAPIResponse> = async () => {
    try {
      const response = await backendAxios.get("/v1/transferences/", { params });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  // Create a proper cache key that includes all parameters
  const cacheKey = ["/v1/transferences/", params];

  return useSWR(cacheKey, getTransferences, {
    revalidateIfStale: false,
  });
};

export interface GetTransferencesByAccountParams {
  page?: number;
  size?: number;
}

export const useGetTransferencesByAccountNumber = (accountNumber?: UUID, params?: GetTransferencesByAccountParams) => {
  const getTransferencesByAccountNumber: () => Promise<TransferencePaginatedAPIResponse> = async () => {
    const response = await backendAxios.get(
      `/v1/accounts/${accountNumber}/transferences`,
      { params }
    );
    return response.data;
  };
  
  // Create a proper cache key that includes all parameters
  const cacheKey = accountNumber ? [`/v1/accounts/${accountNumber}/transferences`, params] : null;
  
  return useSWR(
    cacheKey,
    getTransferencesByAccountNumber,
    {
      revalidateIfStale: false,
    }
  );
};

export const useGetTransferenceById = (id: number) => {
  const getTransferenceById: () => Promise<Transference> = async () => {
    const response = await backendAxios.get(`/v1/transferences/${id}`);
    return response.data;
  };
  return useSWR(`/v1/transferences/${id}`, getTransferenceById);
};

export const useCreateTransference = () => {
  const createTransference: (data: TransferenceCreateAPIRequest) => Promise<Transference> = async (data) => {
    try {
      const response = await backendAxios.post("/v1/transferences/", data);
      mutate(
        (key) => Array.isArray(key) && key[0] === "/v1/transferences/",
        undefined,
        { revalidate: true }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return { mutate: createTransference };
};