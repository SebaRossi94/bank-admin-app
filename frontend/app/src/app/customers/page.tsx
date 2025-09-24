"use client";
import React, { useState } from "react";
import { useGetCustomers } from "@/app/hooks";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import {
  Stack,
  Typography,
  Link,
} from "@mui/material";
import { CreateCustomerButton } from "../components/CreateCustomerButton";

function CustomersPage() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 1,
  });
  const {
    data: customersResponse,
    error,
    isLoading,
  } = useGetCustomers({
    page: paginationModel.page + 1,
    size: paginationModel.pageSize,
  });
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      renderCell: (params) => (
        <Link href={`/customers/${params.value}`}>{params.value}</Link>
      ),
    },
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "created_at",
      headerName: "Created At",
      width: 200,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      width: 200,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
  ];

  if (error) return <div>Error: {error.message}</div>;
  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <Typography variant="h3">Customers</Typography>
      <CreateCustomerButton />
      <DataGrid
        rows={customersResponse?.items}
        columns={columns}
        sx={{ width: "100%", height: "100%" }}
        loading={isLoading}
        paginationMode={"server"}
        rowCount={customersResponse?.total || 0}
        pageSizeOptions={[1, 20, 50, 100]}
        paginationModel={paginationModel}
        onPaginationModelChange={(model) => {
          setPaginationModel(model);
        }}
      />
    </Stack>
  );
}

export default CustomersPage;
