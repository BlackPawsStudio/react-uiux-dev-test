import type { AnyFieldApi } from "@tanstack/react-form";
import { FieldError } from "../Field";

export interface FormFieldErrorsProps {
  field: AnyFieldApi;
  id?: string;
  className?: string;
}

function toMessage(error: unknown): string | null {
  if (!error) return null;
  if (typeof error === "string") return error;
  if (typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return null;
}

export function FormFieldErrors({ field, id, className }: FormFieldErrorsProps) {
  if (!field.state.meta.isTouched) return null;
  const messages = field.state.meta.errors
    .map(toMessage)
    .filter((message): message is string => Boolean(message));
  if (messages.length === 0) return null;
  return (
    <FieldError id={id} className={className}>
      {messages[0]}
    </FieldError>
  );
}

export function hasErrors(field: AnyFieldApi): boolean {
  if (!field.state.meta.isTouched) return false;
  return field.state.meta.errors.some((error) => toMessage(error) !== null);
}
