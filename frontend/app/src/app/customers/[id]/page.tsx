"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import {
  useGetCustomerAccountsByCustomerId,
  useGetCustomerById,
} from "@/app/hooks";
import { Divider, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";

function CustomerDetailsPage() {
  const { id } = useParams();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 20,
  });
  const { data: customer, isLoading, error } = useGetCustomerById(Number(id));
  const {
    data: customerAccountsResponse,
    error: customerAccountsError,
    isLoading: customerAccountsLoading,
  } = useGetCustomerAccountsByCustomerId(Number(id), {
    page: paginationModel.page + 1,
    size: paginationModel.pageSize,
  });
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
