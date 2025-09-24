"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import {
  useGetCustomerAccountsByCustomerId,
  useGetCustomerById,
} from "@/app/hooks";
import { Divider, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { CreateAccountButton } from "@/app/components/CreateAccountButton";
import CustomerDetails from "@/app/components/customers/CustomerDetails";
import CustomerAccountDetails from "@/app/components/customers/CustomerAccountDetails";

function CustomerDetailsPage() {
  const { id } = useParams();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 20,
  });
  const {
    data: customer,
    isLoading: isCustomerLoading,
    error: customerError,
  } = useGetCustomerById(Number(id));
  const {
    data: customerAccountsResponse,
    error: customerAccountsError,
    isLoading: customerAccountsLoading,
  } = useGetCustomerAccountsByCustomerId(Number(id), {
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
    { field: "created_at", headerName: "Created At", width: 300 },
    { field: "updated_at", headerName: "Updated At", width: 300 },
  ];
  return (
    <Stack direction="column" spacing={2}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent={"space-around"}
      >
        <CustomerDetails
          customer={customer}
          isLoading={isCustomerLoading}
          error={customerError}
        />
        <CustomerAccountDetails
          accounts={customerAccountsResponse?.items}
          isLoading={customerAccountsLoading}
          error={customerAccountsError}
        />
      </Stack>
      <Divider />
      <Stack direction="column" spacing={2}>
        <Typography variant="h4">Accounts</Typography>
        <CreateAccountButton customerId={Number(id)} />
        <DataGrid
          rows={customerAccountsResponse?.items}
          columns={columns}
          loading={customerAccountsLoading}
          paginationMode={"server"}
          rowCount={customerAccountsResponse?.total || 0}
          pageSizeOptions={[1, 20, 50, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => {
            setPaginationModel(model);
          }}
        />
      </Stack>
    </Stack>
  );
}

export default CustomerDetailsPage;
