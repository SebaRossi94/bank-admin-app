"use client";
import { Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { useGetAccounts } from "@/app/hooks";
import Link from "next/link";

function AccountsPage() {
  const { data: accounts, isLoading, error } = useGetAccounts();
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      renderCell: (params) => (
        <Link href={`/accounts/${params.value}`}>{params.value}</Link>
      ),
    },
    { field: "number", headerName: "Number", width: 300 },
    { field: "balance", headerName: "Balance", width: 150 },
    { field: "customer_id", headerName: "Customer ID", width: 150 },
  ];
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (accounts && accounts.length === 0) return <div>No accounts found</div>;
  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <Typography variant="h3">Accounts</Typography>
      <DataGrid
        rows={accounts}
        columns={columns}
        sx={{ width: "100%", height: "100%" }}
        loading={isLoading}
      />
    </Stack>
  );
}

export default AccountsPage;
