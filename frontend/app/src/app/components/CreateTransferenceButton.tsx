import CreateEntityButton, { FormFieldConfig } from "./CreateEntityButton";
import { useCreateTransference } from "../hooks";
import { TransferenceCreateAPIRequest } from "../types/transferences";
import { UUID } from "crypto";

export const CreateTransferenceButton = ({ fromAccountNumber, accountId }: { fromAccountNumber?: UUID, accountId?: number }) => {
    const { mutate: createTransference } = useCreateTransference(accountId);
    const transferFields: FormFieldConfig[] = [
      {
        name: "from_account_number",
        label: "From Account",
        type: "text",
        required: true,
        validation: {
          pattern: {
            value: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            message: "Invalid account number",
          },
        },
        defaultValue: fromAccountNumber ? fromAccountNumber : '',
        readOnly: Boolean(fromAccountNumber),
      },
      {
        name: "to_account_number",
        label: "To Account",
        type: "text",
        required: true,
      },
      {
        name: "balance",
        label: "Amount",
        type: "number",
        required: true,
        validation: {
          min: {
            value: 0.01,
            message: "Amount must be greater than 0",
          },
        },
      },
    ];
  
    const handleTransferSubmit = async (data: TransferenceCreateAPIRequest) => {
      await createTransference(data);
    };
  
    return (
      <CreateEntityButton
        buttonText="Wire Transfer"
        dialogTitle="Create Wire Transfer"
        fields={transferFields}
        submitButtonText="Execute Transfer"
        onSubmit={handleTransferSubmit}
      />
    );
  };