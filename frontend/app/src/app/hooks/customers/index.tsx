import { backendAxios } from "@/app/utils/axios";
import useSWR, { mutate } from "swr";
import { useCallback } from "react";
import { Account, Customer, CustomerPaginatedAPIResponse  } from "@/app/types";

export interface GetCustomersParams {
  page?: number;
  size?: number;
}
export const useGetCustomers = (params: GetCustomersParams) => {
  const getCustomers: () => Promise<CustomerPaginatedAPIResponse> = async () => {
    try {
      const response = await backendAxios.get("/v1/customers/", { params });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  // Create a proper cache key that includes all parameters
  const cacheKey = ["/v1/customers/", params];

  return useSWR(cacheKey, getCustomers, {
    revalidateIfStale: false,
  });
};

export const useCreateCustomer = () => {
  const createCustomer = useCallback(
    async (customer: Pick<Customer, "name" | "email">) => {
      try {
        const response = await backendAxios.post("/v1/customers/", customer);
        // Revalidate all customers cache entries after creating a new customer
        mutate(
          (key) => Array.isArray(key) && key[0] === "/v1/customers/",
          undefined,
          { revalidate: true }
        );
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

export interface GetCustomerAccountsParams {
  page?: number;
  size?: number;
}

export const useGetCustomerAccountsByCustomerId = (id: number, params?: GetCustomerAccountsParams) => {
  const getCustomerAccountsByCustomerId: () => Promise<{ items: Account[], total: number }> = useCallback(async () => {
    const response = await backendAxios.get(`/v1/customers/${id}/accounts`, { params });
    return response.data;
  }, [id, params]);

  // Create a proper cache key that includes all parameters
  const cacheKey = [`/v1/customers/${id}/accounts`, params];

  return useSWR(cacheKey, getCustomerAccountsByCustomerId, {
    revalidateIfStale: false,
  });
};