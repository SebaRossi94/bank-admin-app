"use client";
import React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import {
  useGetAccountById,
  useGetCustomerById,
  useGetTransferencesByAccountNumber,
} from "@/app/hooks";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function AccountDetails() {
  const { id } = useParams();
  const { data: account, isLoading, error } = useGetAccountById(Number(id));
  const {
    data: customer,
    isLoading: customerLoading,
    error: customerError,
  } = useGetCustomerById(account?.customer_id);
  const {
    data: transferences,
    isLoading: transferencesLoading,
    error: transferencesError,
  } = useGetTransferencesByAccountNumber(account?.number);
  const outgoingTransferences = transferences?.filter(
    (transference) => transference.from_account_number === account?.number
  );
  const incomingTransferences = transferences?.filter(
    (transference) => transference.to_account_number === account?.number
  );
  const columns: GridColDef[] = [
    { field: "number", headerName: "Number", width: 300 },
    { field: "balance", headerName: "Balance", width: 150 },
    {
      field: "from_account_number",
      headerName: "From Account Number",
      width: 300,
    },
    { field: "to_account_number", headerName: "To Account Number", width: 300 },
  ];

  if (isLoading || customerLoading) return <div>Loading...</div>;
  if (error || customerError)
    return <div>Error: {error?.message || customerError?.message}</div>;
  if (!account) return <div>Account not found</div>;
  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h3">Account Details</Typography>
      <Typography variant="body1">Number: {account?.number}</Typography>
      <Typography variant="body1">Balance: {account?.balance}</Typography>
      <Typography variant="body1">
        Customer ID: {account?.customer_id}
      </Typography>
      <Divider />
      <Typography variant="h4">Customer</Typography>
      <Typography variant="body1">Name: {customer?.name}</Typography>
      <Typography variant="body1">Email: {customer?.email}</Typography>
      <Divider />
      <Typography variant="h4">Transferences</Typography>
      <Typography variant="body1">Outgoing Transferences:</Typography>
      <DataGrid
        rows={outgoingTransferences}
        columns={columns}
        loading={transferencesLoading}
      />
      <Divider />
      <Typography variant="body1">Incoming Transferences:</Typography>
      <DataGrid
        rows={incomingTransferences}
        columns={columns}
        loading={transferencesLoading}
      />
      <Divider />
    </Stack>
  );
}

export default AccountDetails;
