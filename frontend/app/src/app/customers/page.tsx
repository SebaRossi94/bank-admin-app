"use client";
import React, { useState } from "react";
import { Customer, useCreateCustomer, useGetCustomers } from "./hooks";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
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
} from "@mui/material";
import { useForm } from "react-hook-form";

function CustomersPage() {
  const [createCustomerOpen, setCreateCustomerOpen] = useState<boolean>(false);
  const { data: customers, error, isLoading } = useGetCustomers();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Pick<Customer, "name" | "email">>();
  const { mutate: createCustomer } = useCreateCustomer();
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCreateCustomerOpen(true)}
      >
        Create Customer
      </Button>
      <DataGrid
        rows={customers}
        columns={columns}
        sx={{ width: "100%", height: "100%" }}
        loading={isLoading}
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
