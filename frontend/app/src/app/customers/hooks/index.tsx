import { backendAxios } from "@/app/utils/axios";
import useSWR from "swr";

interface Customer {
  created_at: string;
  updated_at: string;
  id: number;
  name: string;
  email: string;
}

export const useGetCustomers = () => {
  const getCustomers: () => Promise<Customer[]> = async () => {
    try {
      const response = await backendAxios.get("/v1/customers/");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return useSWR("/v1/customers/", getCustomers);
};