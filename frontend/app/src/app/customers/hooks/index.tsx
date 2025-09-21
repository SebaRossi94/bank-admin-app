import { backendAxios } from "@/app/utils/axios";
import useSWR, { mutate } from "swr";
import { useCallback } from "react";

export interface Customer {
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

export const useCreateCustomer = () => {
  const createCustomer = useCallback(
    async (customer: Pick<Customer, "name" | "email">) => {
      try {
        const response = await backendAxios.post("/v1/customers/", customer);
        // Revalidate the customers list after creating a new customer
        mutate("/v1/customers/");
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    []
  );

  return { mutate: createCustomer };
};
