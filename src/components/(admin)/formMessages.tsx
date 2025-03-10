import { Alert } from "@mui/material";

interface FormMessagesProps {
  successMessage?: string;
  errorMessage?: string;
}

export default function FormMessages({ successMessage, errorMessage }: FormMessagesProps) {
  return (
    <>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </>
  );
}
