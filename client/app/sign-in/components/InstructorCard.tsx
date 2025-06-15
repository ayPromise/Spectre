import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";
import React from "react";

const InstructorCard = () => {
  return (
    <div className="absolute -left-[350px] w-[250px]">
      <Card className="rounded-2xl shadow-xl bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            Тестовий Інструктор
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>test1@example.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span>strongPassword123</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorCard;
