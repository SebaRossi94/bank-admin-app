"use client";
import React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useGetAccountById } from "../hooks";
import { useGetCustomerById } from "../../customers/hooks";

function AccountDetails() {
  const { id } = useParams();
  const { data: account, isLoading, error } = useGetAccountById(Number(id));
  const {
    data: customer,
    isLoading: customerLoading,
    error: customerError,
  } = useGetCustomerById(account?.customer_id);


  if (isLoading || customerLoading) return <div>Loading...</div>;
  if (error || customerError) return <div>Error: {error?.message || customerError?.message}</div>;
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
    </Stack>
  );
}

export default AccountDetails;
