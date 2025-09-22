import { backendAxios } from "@/app/utils/axios";
import useSWR, { mutate } from "swr";
import { useCallback } from "react";
import { Account } from "../../accounts/hooks";

export interface Customer {
  created_at: string;
  updated_at: string;
  id: number;
  name: string;
  email: string;
  accounts?: Account[];
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

export const useGetCustomerById = (id: number | undefined) => {
  const getCustomerById: () => Promise<Customer> = useCallback(async () => {
    if (!id) throw new Error('Customer ID is required');
    const response = await backendAxios.get(`/v1/customers/${id}`);
    return response.data;
  }, [id]);

  return useSWR(id ? `/v1/customers/${id}` : null, getCustomerById);
};

export const useGetCustomerAccountsByCustomerId = (id: number) => {
  const getCustomerAccountsByCustomerId: () => Promise<Account[]> = useCallback(async () => {
    const response = await backendAxios.get(`/v1/customers/${id}/accounts`);
    return response.data;
  }, [id]);

  return useSWR(`/v1/customers/${id}/accounts`, getCustomerAccountsByCustomerId);
};