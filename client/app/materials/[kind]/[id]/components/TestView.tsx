import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Test } from "@shared/types";
import React from "react";

type Props = {
  test: Test;
};

const TestView: React.FC<Props> = ({ test }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold">
        Перевірка на засвоєння інформації
      </h2>
      <div className="space-y-6">
        {test.questions.map((question, qIndex) => (
          <Card key={question._id}>
            <CardHeader>
              <CardTitle>
                {qIndex + 1}. {question.text}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup>
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option._id} id={option._id} />
                    <Label htmlFor={option._id}>{option.text}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default TestView;
