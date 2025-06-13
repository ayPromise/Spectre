"use client";

import React, { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createFile } from "../utils/createFile";
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

interface CreateFileDialogProps {
  refetch: () => void;
}

const CreateFileDialog: React.FC<CreateFileDialogProps> = ({ refetch }) => {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createMutation = useMutation({
    mutationFn: createFile,
    onSuccess: () => {
      showSuccess("Файл завантажено");
      refetch();
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
          Завантажити свій файл
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Поділитися цікавим файлом</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="file">Файл матеріалу</Label>
          <Input id="file" type="file" ref={fileInputRef} />
        </div>
        <DialogFooter>
          <Button
            onClick={handleFileUpload}
            disabled={createMutation.isPending && !createMutation.isError}
          >
            {createMutation.isPending ? "Завантаження..." : "Завантажити"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFileDialog;
