"use client";
import { useParams } from "next/navigation";
import React from "react";
import {
  useGetCustomerAccountsByCustomerId,
  useGetCustomerById,
} from "../hooks";
import { Divider, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function CustomerDetailsPage() {
  const { id } = useParams();
  const { data: customer, isLoading, error } = useGetCustomerById(Number(id));
  const {
    data: customerAccounts,
    error: customerAccountsError,
    isLoading: customerAccountsLoading,
  } = useGetCustomerAccountsByCustomerId(Number(id));
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!customer) return <div>Customer not found</div>;
  const columns: GridColDef[] = [
    { field: "number", headerName: "Number", width: 300 },
    { field: "balance", headerName: "Balance", width: 150 },
    { field: "created_at", headerName: "Created At", width: 300 },
    { field: "updated_at", headerName: "Updated At", width: 300 },
  ];
  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h3">Customer Details</Typography>
      <Typography variant="body1">Name: {customer?.name}</Typography>
      <Typography variant="body1">Email: {customer?.email}</Typography>
      <Typography variant="body1">
        Created At: {customer?.created_at}
      </Typography>
      <Typography variant="body1">
        Updated At: {customer?.updated_at}
      </Typography>
      <Divider />
      <Stack direction="column" spacing={2}>
        <Typography variant="h4">Accounts</Typography>
        <DataGrid
          rows={customerAccounts}
          columns={columns}
          loading={customerAccountsLoading}
        />
      </Stack>
    </Stack>
  );
}

export default CustomerDetailsPage;
