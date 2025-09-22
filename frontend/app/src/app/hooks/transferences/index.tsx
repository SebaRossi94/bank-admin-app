import { backendAxios } from "@/app/utils/axios";
import { UUID } from "crypto";
import useSWR from "swr";
import { Transference } from "@/app/types/transferences";



export const useGetTransferences = () => {
  const getTransferences: () => Promise<Transference[]> = async () => {
    try {
      const response = await backendAxios.get("/v1/transferences/");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return useSWR("/v1/transferences/", getTransferences);
};

export const useGetTransferencesByAccountNumber = (accountNumber?: UUID) => {
  const getTransferencesByAccountNumber: () => Promise<
    Transference[]
  > = async () => {
    const response = await backendAxios.get(
      `/v1/accounts/${accountNumber}/transferences`
    );
    return response.data;
  };
  return useSWR(
    accountNumber ? `/v1/accounts/${accountNumber}/transferences` : null,
    getTransferencesByAccountNumber
  );
};

export const useGetTransferenceById = (id: number) => {
  const getTransferenceById: () => Promise<Transference> = async () => {
    const response = await backendAxios.get(`/v1/transferences/${id}`);
    return response.data;
  };
  return useSWR(`/v1/transferences/${id}`, getTransferenceById);
};
