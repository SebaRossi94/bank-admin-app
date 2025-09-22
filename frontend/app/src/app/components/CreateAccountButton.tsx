"use client";
import { useCreateAccount } from "@/app/hooks";
import CreateEntityButton, { FormFieldConfig } from "./CreateEntityButton";
import { AccountCreateAPIRequest } from "@/app/types/accounts";

export const CreateAccountButton = () => {
    const { mutate: createAccount } = useCreateAccount();
    const accountFields: FormFieldConfig[] = [
      {
        name: "balance",
        label: "Initial Balance",
        type: "number",
        required: true,
        validation: {
          min: {
            value: 0,
            message: "Balance cannot be negative",
          },
        },
        defaultValue: '',
      },
      {
        name: "customer_id",
        label: "Customer ID",
        type: "number",
        required: true,
        defaultValue: '',
      },
    ];
  
    const handleAccountSubmit = async (data: AccountCreateAPIRequest) => {
      await createAccount(data);
    };
  
    return (
      <CreateEntityButton
        buttonText="Add Account"
        dialogTitle="Create New Account"
        fields={accountFields}
        submitButtonText="Create Account"
        onSubmit={handleAccountSubmit}
      />
    );
  };