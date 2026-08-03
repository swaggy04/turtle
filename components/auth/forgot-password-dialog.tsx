"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ForgotPasswordForm } from "./forgot-password-form";

export function ForgotPasswordDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        render={
          <button
            type="button"
            className="text-sm font-medium text-primary hover:underline"
          />
        }
      >
        Forgot your password?
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Forgot your password?
          </DialogTitle>
        </DialogHeader>

        <ForgotPasswordForm
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}