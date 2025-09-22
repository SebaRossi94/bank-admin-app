"use client";
import React, { useState } from "react";
import { useCreateCustomer, useGetCustomers } from "@/app/hooks";
import { Customer } from "@/app/types";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import {
  Button,
  DialogTitle,
  Dialog,
  Stack,
  Typography,
  DialogContent,
  TextField,
  FormControl,
  DialogActions,
  Link,
} from "@mui/material";
import { useForm } from "react-hook-form";

function CustomersPage() {
  const [createCustomerOpen, setCreateCustomerOpen] = useState<boolean>(false);
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Pick<Customer, "name" | "email">>();
  const { mutate: createCustomer } = useCreateCustomer();
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
  if (customersResponse && customersResponse.items.length === 0)
    return <div>No customers found</div>;
  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <Typography variant="h3">Customers</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCreateCustomerOpen(true)}
      >
        Create Customer
      </Button>
      <DataGrid
        rows={customersResponse?.items}
        columns={columns}
        sx={{ width: "100%", height: "100%" }}
        loading={isLoading}
        paginationMode={"server"}
        rowCount={customersResponse?.total}
        pageSizeOptions={[1, 20, 50, 100]}
        paginationModel={paginationModel}
        onPaginationModelChange={(model) => {
          setPaginationModel(model);
        }}
      />
      <Dialog
        open={createCustomerOpen}
        onClose={() => setCreateCustomerOpen(false)}
        fullWidth
      >
        <DialogTitle>Create Customer</DialogTitle>
        <br />
        <DialogContent>
          <FormControl fullWidth>
            <Stack direction="column" spacing={3} width="100%">
              <TextField
                label="Name"
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
              />
              <TextField
                label="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
            </Stack>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(async (data) => {
              try {
                await createCustomer(data);
                setCreateCustomerOpen(false);
                reset({});
              } catch (error) {
                console.error("Failed to create customer:", error);
              }
            })}
          >
            Create Customer
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setCreateCustomerOpen(false);
              reset({});
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default CustomersPage;
