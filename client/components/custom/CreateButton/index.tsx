import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

interface CreateButtonProps {
  className?: string;
}

const CreateButton: React.FC<CreateButtonProps> = ({ className = "" }) => {
  return (
    <Button className={className}>
      Створити <Plus className="w-5 h-5" strokeWidth={2} />
    </Button>
  );
};

export default CreateButton;
