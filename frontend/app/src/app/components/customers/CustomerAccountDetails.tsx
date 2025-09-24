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
import { Account } from "@/app/types/accounts";

function CustomerAccountDetails({
  accounts,
  isLoading,
  error,
}: {
  accounts?: Account[];
  isLoading: boolean;
  error?: Error;
}) {
  console.log(accounts);
  return (
    <Card variant="outlined" sx={{ maxWidth: "fit-content" }}>
      <CardHeader title="Customer Account Details" />
      <Divider />
      <CardContent>
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
              Error fetching customer account details
            </Typography>
          </Stack>
        ) : (
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={3} justifyContent={"space-between"}>
              <Typography variant="body1" fontWeight="bold" color="primary">
                Total Accounts:{" "}
              </Typography>
              <Typography variant="body1" textAlign={"right"}>
                {isLoading ? <Skeleton width={100} /> : <>{accounts?.length}</>}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={3} justifyContent={"space-between"}>
              <Typography variant="body1" fontWeight="bold" color="primary">
                Total Balance:{" "}
              </Typography>
              <Typography variant="body1" textAlign={"right"}>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <>
                    {accounts?.reduce(
                      (acc, account) => acc + Number(account.balance),
                      0
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

export default CustomerAccountDetails;
