"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  DialogActions,
  Dialog,
  Stack,
  FormControl,
  DialogContent,
  TextField,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

export interface FormFieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "number";
  required?: boolean;
  validation?: {
    pattern?: {
      value: RegExp;
      message: string;
    };
    min?: {
      value: number;
      message: string;
    };
    max?: {
      value: number;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
  };
  placeholder?: string;
  defaultValue?: any;
  readOnly?: boolean;
}

export interface CreateEntityProps {
  buttonText: string;
  dialogTitle?: string;
  fields: FormFieldConfig[];
  submitButtonText?: string;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}

function CreateEntityButton({
  buttonText,
  dialogTitle,
  fields,
  submitButtonText,
  onSubmit,
  isLoading = false,
}: CreateEntityProps) {
  const [open, setOpen] = useState<boolean>(false);
  const defaultValues = Object.fromEntries(fields.map((field) => [field.name, field.defaultValue]));
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<any>({
    defaultValues,
  });

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  const renderField = (field: FormFieldConfig) => {
    const fieldProps = {
      ...register(field.name, {
        required: field.required ? `${field.label} is required` : false,
        ...field.validation,
      }),
    };

    return (
      <TextField
        key={field.name}
        label={field.label}
        type={field.type}
        placeholder={field.placeholder}
        {...fieldProps}
        error={!!errors[field.name]}
        helperText={errors[field.name]?.message as string}
        fullWidth
        slotProps={{
          input: {
            readOnly: field.readOnly,
          },
        }}
      />
    );
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        {buttonText}
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{dialogTitle || buttonText}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <Stack direction="column" spacing={3} width="100%" sx={{ mt: 2 }}>
              {fields.map((field) => renderField(field))}
            </Stack>
          </FormControl>
        </DialogContent>
        {errors.root?.saveError && (
          <DialogContent>
            <Typography color="error">{errors.root.saveError.message}</Typography>
          </DialogContent>
        )}
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(async (data) => {
              try {
                await onSubmit(data);
                setOpen(false);
                reset();
              } catch (error: any) {
                setError("root.saveError", { message: error.message });
              }
            })}
            disabled={isLoading}
          >
            {submitButtonText || "Submit"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setOpen(false);
              reset();
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateEntityButton;
