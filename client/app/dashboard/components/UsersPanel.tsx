"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { User } from "@shared/types";
import { getAllUsers } from "../utils/getAllUsers";
import getAllMaterials from "@/app/materials/utils/getAllMaterials";
import { deleteUser } from "../utils/deleteUser";
import { editUser } from "../utils/editUser";
import MultiSelect from "@/components/custom/MultiSelect";
import { MaterialTypeNameUA } from "@shared/types/Enums";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/components/custom/Loader";

export default function UsersPanel() {
  const { data: users, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const { data: materials } = useQuery({
    queryKey: ["materials"],
    queryFn: getAllMaterials,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => refetch(),
  });

  const editMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<User> }) =>
      editUser(id, updates),
    onSuccess: () => refetch(),
  });

  const [editing, setEditing] = useState<Record<string, string>>({});
  const [tempValues, setTempValues] = useState<Record<string, any>>({});

  if (!users || !materials) return <Loader />;

  return (
    <div className="grid gap-6 mt-6">
      {users.map((user) => (
        <Card key={user._id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">
              Користувач: {user.firstName} {user.lastName}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(user).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <Label className="min-w-[160px] capitalize">{key}</Label>
                  <div className="flex-1">
                    {editing[user._id] === key ? (
                      Array.isArray(value) && key === "completedArticles" ? (
                        <MultiSelect
                          options={materials.map((m) => ({
                            label: `${m.title} (${MaterialTypeNameUA[m.kind]})`,
                            value: JSON.stringify(m._id),
                          }))}
                          selectedValues={(
                            tempValues[`${user._id}.${key}`] || []
                          ).map((r: any) => {
                            console.log("r", r);
                            return JSON.stringify(r);
                          })}
                          setSelectedValues={(sel) => {
                            const arr = sel.map((s) => JSON.parse(s));
                            setTempValues((prev) => ({
                              ...prev,
                              [`${user._id}.${key}`]: arr,
                            }));
                          }}
                          placeholder="Оберіть матеріали..."
                        />
                      ) : (
                        <Input
                          value={tempValues[`${user._id}.${key}`] ?? value}
                          onChange={(e) =>
                            setTempValues((prev) => ({
                              ...prev,
                              [`${user._id}.${key}`]: e.target.value,
                            }))
                          }
                        />
                      )
                    ) : Array.isArray(value) ? (
                      <ul className="list-disc list-inside space-y-1">
                        {value.map((v: any, i) => (
                          <li
                            key={i}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm text-muted-foreground">
                              {materials &&
                                materials.find((m) => m._id === v)?.title}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => {
                                const updated = [...value];
                                updated.splice(i, 1);
                                editMutation.mutate({
                                  id: user._id,
                                  updates: { [key]: updated },
                                });
                              }}
                            >
                              Видалити
                            </Button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm">{String(value)}</p>
                    )}
                  </div>
                  <div className="min-w-[100px] flex justify-end">
                    {editing[user._id] === key ? (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => {
                          editMutation.mutate({
                            id: user._id,
                            updates: {
                              [key]: tempValues[`${user._id}.${key}`],
                            },
                          });
                          setEditing((prev) => ({ ...prev, [user._id]: "" }));
                        }}
                      >
                        Зберегти
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setEditing((prev) => ({ ...prev, [user._id]: key }))
                        }
                      >
                        Редагувати
                      </Button>
                    )}
                  </div>
                </div>
                <Separator />
              </div>
            ))}

            <div className="pt-4 text-right">
              <Button
                variant="destructive"
                onClick={() => deleteMutation.mutate(user._id)}
              >
                Видалити користувача
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
