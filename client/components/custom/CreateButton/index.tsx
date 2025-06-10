import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

const CreateButton: React.FC<React.ComponentProps<"button">> = ({
  className = "",
  ...props
}) => {
  return (
    <Button className={className} {...props}>
      Створити <Plus className="w-5 h-5" strokeWidth={2} />
    </Button>
  );
};

export default CreateButton;
