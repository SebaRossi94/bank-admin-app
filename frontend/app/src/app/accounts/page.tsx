"use client";
import { Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useGetAccounts } from "@/app/hooks";
import Link from "next/link";
import { CreateAccountButton } from "../components/CreateAccountButton";

function AccountsPage() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 20,
  });
  const {
    data: accountsResponse,
    error,
    isLoading,
  } = useGetAccounts({
    page: paginationModel.page + 1,
    size: paginationModel.pageSize,
  });
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
  if (error) return <div>Error: {error.message}</div>;
  if (accountsResponse && accountsResponse.items.length === 0)
    return <div>No accounts found</div>;
  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <Typography variant="h3">Accounts</Typography>
      <CreateAccountButton />
      <DataGrid
        rows={accountsResponse?.items}
        columns={columns}
        sx={{ width: "100%", height: "100%" }}
        loading={isLoading}
        paginationMode={"server"}
        rowCount={accountsResponse?.total || 0}
        pageSizeOptions={[1, 20, 50, 100]}
        paginationModel={paginationModel}
        onPaginationModelChange={(model) => {
          setPaginationModel(model);
        }}
      />
    </Stack>
  );
}

export default AccountsPage;
