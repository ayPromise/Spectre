"use client";

import React, { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createFlight } from "../utils/createFlight";
import { showError, showSuccess } from "@/utils/toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

const CreateFlightDialog = () => {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createMutation = useMutation({
    mutationFn: createFlight,
    onSuccess: () => {
      showSuccess("Політ додано");
      window.location.reload();
      setOpen(false);
    },
    onError: (err: Error) => showError(err.message),
  });

  const handleFileUpload = () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      showError("Оберіть файл для завантаження");
      return;
    }
    createMutation.mutate(file);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus size={16} className="mr-2" />
          Додати свій політ
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Завантажити новий політ</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="file">Файл польоту</Label>
          <Input id="file" type="file" ref={fileInputRef} />
        </div>
        <DialogFooter>
          <Button
            onClick={handleFileUpload}
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? "Завантаження..." : "Завантажити"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFlightDialog;
