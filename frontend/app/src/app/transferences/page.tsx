"use client";
import React from 'react'
import { Divider, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useGetTransferences } from './hooks';

function TransferencesPage() {
  const { data: transferences, isLoading, error } = useGetTransferences();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 10 },
    { field: "number", headerName: "Number", width: 300 },
    { field: "balance", headerName: "Balance", width: 150 },
    { field: "from_account_number", headerName: "From Account Number", width: 300 },
    { field: "to_account_number", headerName: "To Account Number", width: 300 },
  ];
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (transferences && transferences.length === 0) return <div>No transferences found</div>;
  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <Typography variant="h3">Transferences</Typography>
      <DataGrid
        rows={transferences}
        columns={columns}
        loading={isLoading}
      />
    </Stack>
  )
}

export default TransferencesPage