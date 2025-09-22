import { backendAxios } from "@/app/utils/axios";
import { UUID } from "crypto";
import useSWR from "swr";

export interface Transference {
  id: number;
  number: UUID;
  balance: number;
  from_account_number: UUID;
  to_account_number: UUID;
}

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

export const useGetTransferenceById = (id: number) => {
  const getTransferenceById: () => Promise<Transference> = async () => {
    const response = await backendAxios.get(`/v1/transferences/${id}`);
    return response.data;
  };
  return useSWR(`/v1/transferences/${id}`, getTransferenceById);
};