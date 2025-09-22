import { useCreateCustomer } from "../hooks";
import CreateEntityButton, { FormFieldConfig } from "./CreateEntityButton";
import { CustomerCreateAPIRequest } from "@/app/types/customers";

export const CreateCustomerButton = () => {
    const { mutate: createCustomer } = useCreateCustomer();
    const customerFields: FormFieldConfig[] = [
      {
        name: "name",
        label: "Full Name",
        type: "text",
        required: true,
        validation: {
          minLength: {
            value: 2,
            message: "Name must be at least 2 characters",
          },
        },
        defaultValue: '',
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        required: true,
        validation: {
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        },
        defaultValue: '',
      },
    ];
  
    const handleCustomerSubmit = async (data: CustomerCreateAPIRequest) => {
      await createCustomer(data);
    };
  
    return (
      <CreateEntityButton
        buttonText="Add Customer"
        dialogTitle="Create New Customer"
        fields={customerFields}
        submitButtonText="Create Customer"
        onSubmit={handleCustomerSubmit}
      />
    );
  };