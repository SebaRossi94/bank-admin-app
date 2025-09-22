"use client";
import React, { useState } from 'react'
import { Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import { useGetTransferences } from '@/app/hooks';

function TransferencesPage() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 20,
  });
  const {
    data: transferencesResponse,
    error,
    isLoading,
  } = useGetTransferences({
    page: paginationModel.page + 1,
    size: paginationModel.pageSize,
  });
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 10 },
    { field: "number", headerName: "Number", width: 300 },
    { field: "balance", headerName: "Balance", width: 150 },
    { field: "from_account_number", headerName: "From Account Number", width: 300 },
    { field: "to_account_number", headerName: "To Account Number", width: 300 },
  ];
  if (error) return <div>Error: {error.message}</div>;
  if (transferencesResponse && transferencesResponse.items.length === 0)
    return <div>No transferences found</div>;
  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <Typography variant="h3">Transferences</Typography>
      <DataGrid
        rows={transferencesResponse?.items}
        columns={columns}
        sx={{ width: "100%", height: "100%" }}
        loading={isLoading}
        paginationMode={"server"}
        rowCount={transferencesResponse?.total || 0}
        pageSizeOptions={[1, 20, 50, 100]}
        paginationModel={paginationModel}
        onPaginationModelChange={(model) => {
          setPaginationModel(model);
        }}
      />
    </Stack>
  )
}

export default TransferencesPage