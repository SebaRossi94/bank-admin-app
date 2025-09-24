import React from "react";
import {
  Card,
  Typography,
  CardContent,
  Skeleton,
  Stack,
  CardHeader,
  Divider,
} from "@mui/material";
import { Customer } from "@/app/types/customers";

function CustomerDetails({
  customer,
  isLoading,
  error,
}: {
  customer?: Customer;
  isLoading: boolean;
  error?: Error;
}) {
  return (
    <Card variant="outlined" sx={{ maxWidth: "fit-content" }}>
      <CardHeader title="Customer Details" />
      <Divider />
      <CardContent sx={{ overflowX: "auto" }}>
        {error ? (
          <Stack
            direction="column"
            spacing={2}
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ width: "100%" }}
          >
            <Typography variant="body1">
              Error fetching customer details
            </Typography>
          </Stack>
        ) : (
          <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
            <Stack direction="row" spacing={3} justifyContent={"space-between"}>
              <Typography variant="body1" fontWeight="bold" color="primary">
                Name:{" "}
              </Typography>
              <Typography variant="body1">
                {isLoading ? <Skeleton width={100} /> : <>{customer?.name}</>}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={3} justifyContent={"space-between"}>
              <Typography variant="body1" fontWeight="bold" color="primary">
                Email:{" "}
              </Typography>
              <Typography variant="body1">
                {isLoading ? <Skeleton width={100} /> : <>{customer?.email}</>}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={3} justifyContent={"space-between"}>
              <Typography variant="body1" fontWeight="bold" color="primary">
                Created At:{" "}
              </Typography>
              <Typography variant="body1">
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <>
                    {!isLoading && !customer ? (
                      <>No data</>
                    ) : (
                      <>{new Date(customer!.created_at).toLocaleDateString()}</>
                    )}
                  </>
                )}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={3} justifyContent={"space-between"}>
              <Typography variant="body1" fontWeight="bold" color="primary">
                Updated At:{" "}
              </Typography>
              <Typography variant="body1">
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <>
                    {!isLoading && !customer ? (
                      <>No data</>
                    ) : (
                      <>{new Date(customer!.updated_at).toLocaleDateString()}</>
                    )}
                  </>
                )}
              </Typography>
            </Stack>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

export default CustomerDetails;
