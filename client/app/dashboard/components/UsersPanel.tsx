"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
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
import { showError, showSuccess } from "@/utils/toast";

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
    onSuccess: () => {
      showSuccess("Успішно було видалено користувача");
      refetch();
    },
    onError: () => {
      showError("Виникла помилка. Спробуйте пізніше");
    },
  });

  const editMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<User> }) =>
      editUser(id, updates),
    onSuccess: () => {
      showSuccess("Успішно було редаговано користувача");
      refetch();
    },
    onError: () => {
      showError("Виникла помилка. Спробуйте пізніше");
    },
  });

  const [editing, setEditing] = useState<Record<string, string>>({});
  const [tempValues, setTempValues] = useState<Record<string, any>>({});

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    return users?.filter((user) => {
      const valuesToSearch = [
        user.firstName,
        user.lastName,
        user.email,
        user.phoneNumber,
      ];

      return valuesToSearch.some((val) => val?.includes(searchTerm));
    });
  }, [searchTerm, users]);

  if (!users || !materials) return <Loader />;

  return (
    <div className="grid gap-6 mt-6">
      <div className="mb-6">
        <Input
          placeholder="Пошук по імені, прізвищу, email або номеру"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredUsers.map((user) => (
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
                      Array.isArray(value) &&
                      (key === "completedArticles" ||
                        key === "completedVideos" ||
                        key === "completedLectures") ? (
                        <MultiSelect
                          options={materials
                            .filter(
                              (m) =>
                                m.kind ===
                                key.split("completed")[1].slice(0, -1)
                            )
                            .map((m) => ({
                              label: `${m.title} (${
                                MaterialTypeNameUA[m.kind]
                              })`,
                              value: m._id,
                            }))}
                          selectedValues={(
                            tempValues[`${user._id}.${key}`] || []
                          ).map((r: any) => r)}
                          setSelectedValues={(sel) => {
                            const selected = materials.filter((m) =>
                              sel.includes(m._id)
                            );
                            setTempValues((prev) => ({
                              ...prev,
                              [`${user._id}.${key}`]: selected,
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
