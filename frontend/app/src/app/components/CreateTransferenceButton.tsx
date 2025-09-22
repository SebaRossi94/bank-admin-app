import CreateEntityButton, { FormFieldConfig } from "./CreateEntityButton";
import { useCreateTransference } from "../hooks";
import { TransferenceCreateAPIRequest } from "../types";

export const CreateTransferenceButton = () => {
    const { mutate: createTransference } = useCreateTransference();
    const transferFields: FormFieldConfig[] = [
      {
        name: "from_account_number",
        label: "From Account",
        type: "text",
        required: true,
        validation: {

        }
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
        buttonText="New Transfer"
        dialogTitle="Create Money Transfer"
        fields={transferFields}
        submitButtonText="Execute Transfer"
        onSubmit={handleTransferSubmit}
      />
    );
  };