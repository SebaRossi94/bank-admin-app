"use client";
import React from "react";
import { useGetCustomers } from "./hooks";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";

function CustomersPage() {
  const { data: customers, error, isLoading } = useGetCustomers();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email", width: 200 },
    { field: "created_at", headerName: "Created At", width: 150 },
    { field: "updated_at", headerName: "Updated At", width: 150 },
    { field: "actions", headerName: "", width: 150 },
  ];
  if (error) return <div>Error: {error.message}</div>;
  if (customers && customers.length === 0) return <div>No customers found</div>;
  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <Typography variant="h3">Customers</Typography>
      <DataGrid
        rows={customers}
        columns={columns}
        sx={{ width: "100%", height: "100%" }}
        loading={isLoading}
      />
    </Stack>
  );
}

export default CustomersPage;
